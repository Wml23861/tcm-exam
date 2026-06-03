/**
 * 批量下载中药材图片和穴位图
 * 用法: node scripts/download-images.mjs
 * 需要外网 VPN
 */
import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HERB_DIR = path.resolve(__dirname, '..', 'public', 'images', 'herbs')
const ACU_DIR = path.resolve(__dirname, '..', 'public', 'images', 'acupoints')

fs.mkdirSync(HERB_DIR, { recursive: true })
fs.mkdirSync(ACU_DIR, { recursive: true })

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://www.google.com/',
      },
      rejectUnauthorized: false,
    }
    const file = fs.createWriteStream(dest)
    mod.get(url, opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        console.log(`  FAIL [${res.statusCode}] ${path.basename(dest)}`)
        return resolve(false)
      }
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        const size = fs.statSync(dest).size
        console.log(`  OK [${(size/1024).toFixed(0)}KB] ${path.basename(dest)}`)
        resolve(true)
      })
    }).on('error', (e) => {
      file.close()
      try { fs.unlinkSync(dest) } catch {}
      console.log(`  ERR ${path.basename(dest)}: ${e.message}`)
      resolve(false)
    })
  })
}

// 药材图片 — 来源：Wikipedia/Wikimedia Commons
const HERBS = {
  // 解表药
  '麻黄': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Ephedra_distachya_Sturm61.jpg',
  '桂枝': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg',
  '紫苏': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Perilla_frutescens_var._crispa_20041002.jpg',
  '生姜': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg',
  '荆芥': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Nepeta_cataria_Sturm47.jpg',
  '防风': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Saposhnikovia_divaricata_Blanco1.66.png',
  '羌活': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Notopterygium_incisum_Blanco1.62.png',
  '白芷': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Angelica_dahurica_Blanco1.12.png',
  '细辛': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Asarum_europaeum_Sturm7.jpg',
  '薄荷': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Mentha_spicata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg',
  '桑叶': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Morus_alba_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-093.jpg',
  '菊花': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Chrysanthemum_indicum0.jpg',
  '柴胡': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bupleurum_falcatum_Sturm7.jpg',
  // 清热药
  '石膏': 'https://upload.wikimedia.org/wikipedia/commons/9/94/Gypsum_-_Sperekop%2C_Dellater_Quarry%2C_De_Kelders%2C_Gansbaai%2C_Overberg_District%2C_Western_Cape%2C_South_Africa.jpg',
  '知母': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Anemarrhena_asphodeloides_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-016.jpg',
  '黄芩': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Scutellaria_baicalensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-177.jpg',
  '黄连': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Coptis_chinensis_Blanco1.11.png',
  '黄柏': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Phellodendron_amurense_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-104.jpg',
  '金银花': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Lonicera_japonica_Blanco1.136.png',
  '连翘': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Forsythia_suspensa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-086.jpg',
  '生地黄': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Rehmannia_glutinosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-166.jpg',
  '牡丹皮': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Paeonia_suffruticosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-147.jpg',
  // 补虚药
  '人参': 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Panax_ginseng_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-128.jpg',
  '黄芪': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Astragalus_membranaceus_Blanco1.29.png',
  '甘草': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Glycyrrhiza_glabra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-207.jpg',
  '当归': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Angelica_sinensis_Blanco1.13.png',
  '白术': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Atractylodes_macrocephala_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg',
  '白芍': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Paeonia_lactiflora_Blanco1.72-cropped.jpg',
  '阿胶': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Ejiao_cake.jpg',
  '麦冬': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Ophiopogon_japonicus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-121.jpg',
  '枸杞子': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Lycium_barbarum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-111.jpg',
  // 泻下/祛风湿/化湿
  '大黄': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Rheum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-155.jpg',
  '芒硝': 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Mirabilite-118908.jpg',
  '独活': 'https://upload.wikimedia.org/wikipedia/commons/0/01/Angelica_pubescens_Blanco1.14.png',
  '苍术': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Atractylodes_lancea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-028.jpg',
  '厚朴': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Magnolia_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-079.jpg',
  // 利水渗湿
  '茯苓': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Wolfiporia_extensa.jpg',
  '泽泻': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Alisma_plantago-aquatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-004.jpg',
  // 温里药
  '附子': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Aconitum_carmichaelii_BotMag_t93.jpg',
  '肉桂': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg',
  '干姜': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg',
  // 理气/消食
  '陈皮': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Citrus_reticulata_Blanco1.42-cropped.jpg',
  '枳实': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Poncirus_trifoliata.jpg',
  '山楂': 'https://upload.wikimedia.org/wikipedia/commons/0/09/Crataegus_monogyna_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-034.jpg',
  // 活血化瘀
  '川芎': 'https://upload.wikimedia.org/wikipedia/commons/0/01/Ligusticum_chuanxiong_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-127.jpg',
  '丹参': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Salvia_miltiorrhiza_Blanco1.80.png',
  '红花': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Carthamus_tinctorius_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-047.jpg',
  '桃仁': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Prunus_persica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-139.jpg',
  // 化痰止咳
  '半夏': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Pinellia_ternata_Blanco1.75.png',
  '川贝母': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Fritillaria_cirrhosa_BotMag_t89.jpg',
  '桔梗': 'https://upload.wikimedia.org/wikipedia/commons/0/09/Platycodon_grandiflorus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-133.jpg',
  // 安神/平肝
  '酸枣仁': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ziziphus_jujuba_MS_2465.JPG',
  '天麻': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Gastrodia_elata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-089.jpg',
}

// 穴位图 — 来源：Wikipedia 针灸穴位定位图
const ACUPOINTS = {
  'LI4': 'https://upload.wikimedia.org/wikipedia/commons/0/07/He_Gu_LI4.jpg',
  'ST36': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Zu_San_Li_ST36.jpg',
  'SP6': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/San_Yin_Jiao_SP6.jpg',
  'LR3': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tai_Chong_LR3.jpg',
  'PC6': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Nei_Guan_PC6.jpg',
  'GV20': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bai_Hui_GV20.jpg',
}

async function main() {
  console.log('=== Downloading herb images ===')
  let herbOk = 0, herbFail = 0
  for (const [name, url] of Object.entries(HERBS)) {
    const dest = path.join(HERB_DIR, `${name}.jpg`)
    const ok = await download(url, dest)
    if (ok) herbOk++; else herbFail++
  }
  console.log(`Herbs: ${herbOk} OK, ${herbFail} failed`)

  console.log('\n=== Downloading acupoint images ===')
  let acuOk = 0, acuFail = 0
  for (const [code, url] of Object.entries(ACUPOINTS)) {
    const dest = path.join(ACU_DIR, `${code}.jpg`)
    const ok = await download(url, dest)
    if (ok) acuOk++; else acuFail++
  }
  console.log(`Acupoints: ${acuOk} OK, ${acuFail} failed`)
  console.log('\nDone!')
}

main()
