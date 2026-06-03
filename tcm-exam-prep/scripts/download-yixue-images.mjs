/**
 * 从医学百科 (www.yixue.com) 批量下载中药材图片和穴位定位图
 * 用法: node scripts/download-yixue-images.mjs
 */
import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HERB_DIR = path.resolve(__dirname, '..', 'public', 'images', 'herbs')
const ACU_DIR = path.resolve(__dirname, '..', 'public', 'images', 'acupoints')

fs.mkdirSync(HERB_DIR, { recursive: true })
fs.mkdirSync(ACU_DIR, { recursive: true })

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'

function fetch(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      https.get(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'zh-CN,zh;q=0.9' }, rejectUnauthorized: false }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location, retries).then(resolve).catch(reject)
        }
        if (res.statusCode !== 200) {
          if (n < retries) return setTimeout(() => attempt(n + 1), 1000)
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      }).on('error', (e) => {
        if (n < retries) return setTimeout(() => attempt(n + 1), 1000)
        reject(e)
      })
    }
    attempt(0)
  })
}

async function downloadFile(url, dest) {
  try {
    const data = await fetch(url)
    fs.writeFileSync(dest, data)
    const size = fs.statSync(dest).size
    if (size < 1000) throw new Error('Too small')
    console.log(`  OK [${(size/1024).toFixed(0)}KB] ${path.basename(dest)}`)
    return true
  } catch(e) {
    console.log(`  FAIL ${path.basename(dest)}: ${e.message}`)
    try { fs.unlinkSync(dest) } catch {}
    return false
  }
}

// 所有需要下载的药材 — 从医学百科搜索
const HERBS = [
  '麻黄','桂枝','紫苏','生姜','荆芥','防风','羌活','白芷','细辛','薄荷','牛蒡子','蝉蜕','桑叶','菊花','柴胡','升麻','葛根',
  '石膏','知母','栀子','夏枯草','黄芩','黄连','黄柏','金银花','连翘','板蓝根','蒲公英','鱼腥草','生地黄','玄参','牡丹皮','赤芍','青蒿','地骨皮',
  '大黄','芒硝','火麻仁','甘遂',
  '独活','威灵仙','秦艽','防己','桑寄生','五加皮',
  '藿香','佩兰','苍术','厚朴','砂仁',
  '茯苓','泽泻','薏苡仁','车前子','滑石','木通','茵陈','金钱草',
  '附子','干姜','肉桂','吴茱萸','丁香',
  '陈皮','青皮','枳实','木香','香附','川楝子',
  '山楂','神曲','麦芽','莱菔子',
  '使君子','槟榔',
  '大蓟','小蓟','地榆','白及','三七','艾叶',
  '川芎','延胡索','郁金','丹参','红花','桃仁','益母草','牛膝',
  '半夏','天南星','川贝母','浙贝母','瓜蒌','桔梗','苦杏仁','百部',
  '朱砂','龙骨','酸枣仁','远志',
  '石决明','牡蛎','代赭石','钩藤','天麻','全蝎',
  '人参','党参','黄芪','白术','甘草','当归','熟地黄','白芍','阿胶','麦冬','枸杞子','鹿茸',
  '五味子','乌梅','山茱萸','莲子',
]

// 穴位 — 从医学百科搜索
const ACUPOINTS = ['合谷','足三里','三阴交','太冲','内关','百会','大椎','关元','气海','命门','涌泉','太溪','列缺','曲池','委中','神门']

async function downloadHerbImage(name) {
  const dest = path.join(HERB_DIR, `${name}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
    console.log(`  SKIP ${name}.jpg (already exists)`)
    return true
  }

  try {
    // 获取药材页面，提取图片URL
    const html = (await fetch(`https://www.yixue.com/${encodeURIComponent(name)}`)).toString()
    const match = html.match(/<img[^>]+alt="[^"]*"[^>]+src="(\/images\/[^"]+\.(?:jpg|png|JPG|PNG))"/)
    if (!match) {
      console.log(`  FAIL ${name}: no image found on page`)
      return false
    }
    const imgUrl = `https://www.yixue.com${match[1]}`
    return downloadFile(imgUrl, dest)
  } catch(e) {
    console.log(`  FAIL ${name}: ${e.message}`)
    return false
  }
}

async function downloadAcupointImage(name) {
  // 尝试编码格式
  for (const enc of [encodeURIComponent(name), name]) {
    const dest = path.join(ACU_DIR, `${name}.jpg`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log(`  SKIP ${name}.jpg (already exists)`)
      return true
    }

    try {
      const html = (await fetch(`https://www.yixue.com/${enc}`)).toString()
      const match = html.match(/<img[^>]+alt="[^"]*"[^>]+src="(\/images\/[^"]+\.(?:jpg|png|JPG|PNG))"/)
      if (match) {
        const imgUrl = `https://www.yixue.com${match[1]}`
        return downloadFile(imgUrl, dest)
      }
    } catch {}
  }
  console.log(`  FAIL ${name}: no image found`)
  return false
}

async function main() {
  console.log('=== 下载药材图片 from 医学百科 ===')
  let herbOk = 0, herbFail = 0
  for (const name of HERBS) {
    const ok = await downloadHerbImage(name)
    if (ok) herbOk++; else herbFail++
  }
  console.log(`药材: ${herbOk} OK, ${herbFail} failed`)

  console.log('\n=== 下载穴位图片 from 医学百科 ===')
  let acuOk = 0, acuFail = 0
  for (const name of ACUPOINTS) {
    const ok = await downloadAcupointImage(name)
    if (ok) acuOk++; else acuFail++
  }
  console.log(`穴位: ${acuOk} OK, ${acuFail} failed`)
  console.log('\nDone!')
}

main()
