<template>
  <div class="page-songs">
    <div class="page-header">
      <button class="back-btn" @click="$router.push({ name: 'recite-home' })">&larr; 返回</button>
      <h1 class="page-title">方歌背诵</h1>
    </div>

    <!-- 模式切换 + 搜索 -->
    <div class="toolbar">
      <div class="mode-toggle">
        <button :class="['toggle-btn', { 'is-active': revealMode === 'line' }]" @click="revealMode = 'line'">逐行显示</button>
        <button :class="['toggle-btn', { 'is-active': revealMode === 'all' }]" @click="revealMode = 'all'">全部显示</button>
      </div>
      <input v-model="searchQuery" type="text" placeholder="搜索方剂名称..." class="search-input" />
    </div>

    <!-- 方歌网格 -->
    <div class="songs-grid">
      <div v-for="(formula, index) in filteredFormulas" :key="index" class="song-card" :class="{ 'is-expanded': revealedMap[getRealIndex(index)] }">
        <!-- 卡片头部 -->
        <div class="song-head" @click="toggleReveal(getRealIndex(index))">
          <div class="song-head-left">
            <h3 class="song-name">{{ formula.name }}</h3>
            <span class="song-source">《{{ formula.source }}》</span>
          </div>
          <span class="expand-icon">{{ revealedMap[getRealIndex(index)] ? '▴' : '▾' }}</span>
        </div>

        <!-- 展开内容 -->
        <div v-if="revealedMap[getRealIndex(index)]" class="song-body">
          <!-- 逐行模式 -->
          <template v-if="revealMode === 'line'">
            <div v-for="(line, li) in displayLines[getRealIndex(index)] ?? []" :key="li" class="verse-block">
              <p class="verse-text">{{ line.verse }}</p>
              <p v-if="line.pinyin" class="verse-pinyin">{{ line.pinyin }}</p>
            </div>
          </template>
          <!-- 全文模式 -->
          <template v-else>
            <div class="verse-block verse-block--all">
              <p v-for="(line, li) in formula.lines" :key="li" class="verse-text">{{ line.verse }}</p>
            </div>
          </template>

          <TcmDivider />

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">组成</span>
              <span class="info-value">{{ formula.composition }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">功效</span>
              <span class="info-value">{{ formula.effect }}</span>
            </div>
            <div class="info-item info-item--full">
              <span class="info-label">主治</span>
              <span class="info-value">{{ formula.indication }}</span>
            </div>
            <div v-if="formula.pathogenesis" class="info-item">
              <span class="info-label">病机</span>
              <span class="info-value">{{ formula.pathogenesis }}</span>
            </div>
          </div>

          <div class="song-tags">
            <TcmTag v-for="cat in formula.categories" :key="cat" type="default" size="sm">{{ cat }}</TcmTag>
          </div>
        </div>
      </div>
    </div>

    <TcmEmpty v-if="filteredFormulas.length === 0" description="没有匹配的方剂" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import TcmTag from '@/components/ui/TcmTag.vue'
import TcmDivider from '@/components/ui/TcmDivider.vue'
import TcmEmpty from '@/components/ui/TcmEmpty.vue'

const revealMode = ref<'line' | 'all'>('line')
const searchQuery = ref('')
const revealedMap = reactive<Record<number, boolean>>({})
const displayLines = reactive<Record<number, FormulaLine[]>>({})

interface FormulaLine { verse: string; pinyin?: string }
interface FormulaSong {
  name: string; source: string; lines: FormulaLine[]
  composition: string; effect: string; indication: string
  pathogenesis?: string; categories: string[]
}

const formulas: FormulaSong[] = [
  { name: '麻黄汤', source: '伤寒论', lines: [{ verse: '麻黄汤中用桂枝，', pinyin: 'má huáng tāng zhōng yòng guì zhī,' },{ verse: '杏仁甘草四般施，', pinyin: 'xìng rén gān cǎo sì bān shī,' },{ verse: '发热恶寒头项痛，', pinyin: 'fā rè wù hán tóu xiàng tòng,' },{ verse: '伤寒服此汗淋漓。', pinyin: 'shāng hán fú cǐ hàn lín lí.' }], composition: '麻黄、桂枝、杏仁、甘草', effect: '发汗解表，宣肺平喘', indication: '外感风寒表实证。恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧。', pathogenesis: '风寒束表，肺气不宣', categories: ['解表剂', '辛温解表'] },
  { name: '桂枝汤', source: '伤寒论', lines: [{ verse: '桂枝汤治太阳风，', pinyin: 'guì zhī tāng zhì tài yáng fēng,' },{ verse: '芍药甘草姜枣同，', pinyin: 'sháo yào gān cǎo jiāng zǎo tóng,' },{ verse: '解肌发表调营卫，', pinyin: 'jiě jī fā biǎo tiáo yíng wèi,' },{ verse: '汗出恶风此方功。', pinyin: 'hàn chū wù fēng cǐ fāng gōng.' }], composition: '桂枝、芍药、甘草、生姜、大枣', effect: '解肌发表，调和营卫', indication: '外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱。', pathogenesis: '风寒袭表，营卫不和', categories: ['解表剂', '辛温解表'] },
  { name: '银翘散', source: '温病条辨', lines: [{ verse: '银翘散主上焦疴，', pinyin: 'yín qiào sǎn zhǔ shàng jiāo kē,' },{ verse: '竹叶荆牛豉薄荷，', pinyin: 'zhú yè jīng niú chǐ bò he,' },{ verse: '甘桔芦根凉解法，', pinyin: 'gān jú lú gēn liáng jiě fǎ,' },{ verse: '风温初感此方卓。', pinyin: 'fēng wēn chū gǎn cǐ fāng zhuó.' }], composition: '金银花、连翘、竹叶、荆芥穗、牛蒡子、淡豆豉、薄荷、桔梗、甘草、芦根', effect: '辛凉透表，清热解毒', indication: '温病初起。发热无汗，或有汗不畅，微恶风寒，头痛口渴，咳嗽咽痛，舌尖红，苔薄白或薄黄，脉浮数。', pathogenesis: '风热犯表，热毒蕴结', categories: ['解表剂', '辛凉解表'] },
  { name: '桑菊饮', source: '温病条辨', lines: [{ verse: '桑菊饮中桔杏翘，', pinyin: 'sāng jú yǐn zhōng jú xìng qiào,' },{ verse: '芦根甘草薄荷饶，', pinyin: 'lú gēn gān cǎo bò he ráo,' },{ verse: '清疏肺卫轻宣剂，', pinyin: 'qīng shū fèi wèi qīng xuān jì,' },{ verse: '风温咳嗽服之消。', pinyin: 'fēng wēn ké sòu fú zhī xiāo.' }], composition: '桑叶、菊花、杏仁、连翘、薄荷、桔梗、甘草、芦根', effect: '疏风清热，宣肺止咳', indication: '风温初起，表热轻证。但咳，身热不甚，口微渴，脉浮数。', pathogenesis: '风热犯肺，肺气失宣', categories: ['解表剂', '辛凉解表'] },
  { name: '麻杏甘石汤', source: '伤寒论', lines: [{ verse: '伤寒麻杏甘石汤，', pinyin: 'shāng hán má xìng gān shí tāng,' },{ verse: '汗出而喘法度良，', pinyin: 'hàn chū ér chuǎn fǎ dù liáng,' },{ verse: '辛凉宣泄能清肺，', pinyin: 'xīn liáng xuān xiè néng qīng fèi,' },{ verse: '定喘除烦效力彰。', pinyin: 'dìng chuǎn chú fán xiào lì zhāng.' }], composition: '麻黄、杏仁、石膏、甘草', effect: '辛凉宣泄，清肺平喘', indication: '外感风邪，邪热壅肺证。身热不解，咳逆气急，鼻煽，口渴，舌苔薄白或黄，脉浮数。', pathogenesis: '风热袭肺，邪热壅肺', categories: ['解表剂', '辛凉解表'] },
  { name: '小青龙汤', source: '伤寒论', lines: [{ verse: '小青龙汤最有功，', pinyin: 'xiǎo qīng lóng tāng zuì yǒu gōng,' },{ verse: '风寒束表饮停胸，', pinyin: 'fēng hán shù biǎo yǐn tíng xiōng,' },{ verse: '麻桂姜辛芍药草，', pinyin: 'má guì jiāng xīn sháo yào cǎo,' },{ verse: '半夏五味一般同。', pinyin: 'bàn xià wǔ wèi yī bān tóng.' }], composition: '麻黄、桂枝、干姜、细辛、芍药、甘草、半夏、五味子', effect: '解表散寒，温肺化饮', indication: '外寒内饮证。恶寒发热，无汗，喘咳，痰涎清稀量多，舌苔白滑，脉浮。', pathogenesis: '风寒束表，水饮内停', categories: ['解表剂', '辛温解表'] },
  { name: '葛根汤', source: '伤寒论', lines: [{ verse: '葛根汤内麻黄襄，', pinyin: 'gé gēn tāng nèi má huáng xiāng,' },{ verse: '二味加入桂枝汤，', pinyin: 'èr wèi jiā rù guì zhī tāng,' },{ verse: '轻可去实因无汗，', pinyin: 'qīng kě qù shí yīn wú hàn,' },{ verse: '有汗加葛无麻黄。', pinyin: 'yǒu hàn jiā gé wú má huáng.' }], composition: '葛根、麻黄、桂枝、芍药、甘草、生姜、大枣', effect: '发汗解表，升津舒筋', indication: '外感风寒表实兼项背强几几证。项背强几几，无汗恶风。', pathogenesis: '风寒束表，经气不利', categories: ['解表剂', '辛温解表'] },
  { name: '大承气汤', source: '伤寒论', lines: [{ verse: '大承气汤用芒硝，', pinyin: 'dà chéng qì tāng yòng máng xiāo,' },{ verse: '大黄厚朴枳实饶，', pinyin: 'dà huáng hòu pò zhǐ shí ráo,' },{ verse: '阳明腑实痞满甚，', pinyin: 'yáng míng fǔ shí pǐ mǎn shèn,' },{ verse: '急下存阴功最高。', pinyin: 'jí xià cún yīn gōng zuì gāo.' }], composition: '大黄、芒硝、厚朴、枳实', effect: '峻下热结', indication: '阳明腑实证。大便不通，脘腹痞满，腹痛拒按，日晡潮热，舌苔黄燥起刺，脉沉实。', pathogenesis: '阳明腑实，热结肠道', categories: ['泻下剂', '峻下热结'] },
  { name: '大黄牡丹汤', source: '金匮要略', lines: [{ verse: '金匮大黄牡丹汤，', pinyin: 'jīn guì dà huáng mǔ dān tāng,' },{ verse: '桃仁瓜子芒硝襄，', pinyin: 'táo rén guā zǐ máng xiāo xiāng,' },{ verse: '肠痈初起腹按痛，', pinyin: 'cháng yōng chū qǐ fù àn tòng,' },{ verse: '泻热破瘀功效良。', pinyin: 'xiè rè pò yū gōng xiào liáng.' }], composition: '大黄、牡丹皮、桃仁、冬瓜仁、芒硝', effect: '泻热破瘀，散结消肿', indication: '肠痈初起，右少腹疼痛拒按，舌苔黄腻，脉滑数。', pathogenesis: '湿热蕴结，瘀滞肠道', categories: ['泻下剂', '逐瘀泻热'] },
  { name: '小柴胡汤', source: '伤寒论', lines: [{ verse: '小柴胡汤和解供，', pinyin: 'xiǎo chái hú tāng hé jiě gōng,' },{ verse: '半夏人参甘草从，', pinyin: 'bàn xià rén shēn gān cǎo cóng,' },{ verse: '更用黄芩加姜枣，', pinyin: 'gèng yòng huáng qín jiā jiāng zǎo,' },{ verse: '少阳百病此为宗。', pinyin: 'shào yáng bǎi bìng cǐ wéi zōng.' }], composition: '柴胡、黄芩、半夏、人参、甘草、生姜、大枣', effect: '和解少阳', indication: '伤寒少阳证。往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦咽干目眩，脉弦。', pathogenesis: '邪踞少阳，枢机不利', categories: ['和解剂', '和解少阳'] },
  { name: '逍遥散', source: '太平惠民和剂局方', lines: [{ verse: '逍遥散用当归芍，', pinyin: 'xiāo yáo sǎn yòng dāng guī sháo,' },{ verse: '柴苓术草加姜薄，', pinyin: 'chái líng zhú cǎo jiā jiāng bò,' },{ verse: '疏肝养血兼理脾，', pinyin: 'shū gān yǎng xuè jiān lǐ pí,' },{ verse: '肝郁血虚脾气弱。', pinyin: 'gān yù xuè xū pí qì ruò.' }], composition: '柴胡、当归、芍药、白术、茯苓、甘草、煨姜、薄荷', effect: '疏肝解郁，健脾养血', indication: '肝郁血虚脾弱证。两胁作痛，头痛目眩，神疲食少，月经不调，乳房胀痛，脉弦而虚。', pathogenesis: '肝气郁结，脾失健运', categories: ['和解剂', '调和肝脾'] },
  { name: '白虎汤', source: '伤寒论', lines: [{ verse: '白虎汤中石膏君，', pinyin: 'bái hǔ tāng zhōng shí gāo jūn,' },{ verse: '知母甘草粳米存，', pinyin: 'zhī mǔ gān cǎo jīng mǐ cún,' },{ verse: '阳明气分热盛证，', pinyin: 'yáng míng qì fēn rè shèng zhèng,' },{ verse: '清热生津除大烦。', pinyin: 'qīng rè shēng jīn chú dà fán.' }], composition: '石膏、知母、甘草、粳米', effect: '清热生津', indication: '阳明气分热盛证。壮热面赤，烦渴引饮，汗出恶热，脉洪大有力。', pathogenesis: '阳明气分热盛，津液耗伤', categories: ['清热剂', '清气分热'] },
  { name: '龙胆泻肝汤', source: '医方集解', lines: [{ verse: '龙胆泻肝栀芩柴，', pinyin: 'lóng dǎn xiè gān zhī qín chái,' },{ verse: '生地车前泽泻偕，', pinyin: 'shēng dì chē qián zé xiè xié,' },{ verse: '木通甘草当归合，', pinyin: 'mù tōng gān cǎo dāng guī hé,' },{ verse: '肝经湿热力能排。', pinyin: 'gān jīng shī rè lì néng pái.' }], composition: '龙胆草、栀子、黄芩、柴胡、生地黄、车前子、泽泻、木通、甘草、当归', effect: '清泻肝胆实火，清利肝经湿热', indication: '肝胆实火上炎：头痛目赤，胁痛口苦，耳聋耳肿；肝经湿热下注：阴肿阴痒，小便淋浊，带下黄臭，舌红苔黄，脉弦数。', pathogenesis: '肝胆实火上炎或湿热下注', categories: ['清热剂', '清脏腑热'] },
  { name: '四君子汤', source: '太平惠民和剂局方', lines: [{ verse: '四君子汤中和义，', pinyin: 'sì jūn zǐ tāng zhōng hé yì,' },{ verse: '参术茯苓甘草比，', pinyin: 'shēn zhú fú líng gān cǎo bǐ,' },{ verse: '益以夏陈名六君，', pinyin: 'yì yǐ xià chén míng liù jūn,' },{ verse: '祛痰补气阳虚饵。', pinyin: 'qū tán bǔ qì yáng xū ěr.' }], composition: '人参、白术、茯苓、甘草', effect: '益气健脾', indication: '脾胃气虚证。面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。', categories: ['补益剂', '补气'] },
  { name: '四物汤', source: '太平惠民和剂局方', lines: [{ verse: '四物地芍与归芎，', pinyin: 'sì wù dì sháo yǔ guī xiōng,' },{ verse: '血家百病此方通，', pinyin: 'xuè jiā bǎi bìng cǐ fāng tōng,' },{ verse: '八珍合入四君子，', pinyin: 'bā zhēn hé rù sì jūn zǐ,' },{ verse: '气血双补功独崇。', pinyin: 'qì xuè shuāng bǔ gōng dú chóng.' }], composition: '当归、川芎、白芍、熟地黄', effect: '补血调血', indication: '营血虚滞证。头晕目眩，心悸失眠，面色无华，月经不调，舌淡，脉细。', categories: ['补益剂', '补血'] },
  { name: '六味地黄丸', source: '小儿药证直诀', lines: [{ verse: '六味地黄益肝肾，', pinyin: 'liù wèi dì huáng yì gān shèn,' },{ verse: '山药丹萸泽泻苓，', pinyin: 'shān yào dān yú zé xiè líng,' },{ verse: '三补三泻配伍妙，', pinyin: 'sān bǔ sān xiè pèi wǔ miào,' },{ verse: '阴虚火旺此方珍。', pinyin: 'yīn xū huǒ wàng cǐ fāng zhēn.' }], composition: '熟地黄、山茱萸、山药、泽泻、牡丹皮、茯苓', effect: '滋补肾阴', indication: '肾阴精不足证。腰膝酸软，头晕目眩，耳鸣耳聋，盗汗遗精，骨蒸潮热，脉细数。', categories: ['补益剂', '补阴'] },
  { name: '补中益气汤', source: '脾胃论', lines: [{ verse: '补中益气芪术陈，', pinyin: 'bǔ zhōng yì qì qí zhú chén,' },{ verse: '参草升柴归姜身，', pinyin: 'shēn cǎo shēng chái guī jiāng shēn,' },{ verse: '脾胃气虚中气陷，', pinyin: 'pí wèi qì xū zhōng qì xiàn,' },{ verse: '补气升阳举陷升。', pinyin: 'bǔ qì shēng yáng jǔ xiàn shēng.' }], composition: '黄芪、白术、陈皮、人参、甘草、升麻、柴胡、当归、生姜', effect: '补中益气，升阳举陷', indication: '脾胃气虚，中气下陷证。少气懒言，体倦肢软，脱肛，子宫脱垂，久泻久痢，舌淡苔白，脉虚。', categories: ['补益剂', '补气'] },
  { name: '归脾汤', source: '济生方', lines: [{ verse: '归脾汤用术参芪，', pinyin: 'guī pí tāng yòng zhú shēn qí,' },{ verse: '归草茯神远志随，', pinyin: 'guī cǎo fú shén yuǎn zhì suí,' },{ verse: '酸枣木香龙眼肉，', pinyin: 'suān zǎo mù xiāng lóng yǎn ròu,' },{ verse: '益气补血健心脾。', pinyin: 'yì qì bǔ xuè jiàn xīn pí.' }], composition: '白术、人参、黄芪、当归、甘草、茯神、远志、酸枣仁、木香、龙眼肉', effect: '益气补血，健脾养心', indication: '心脾气血两虚证。心悸怔忡，健忘失眠，体倦食少，面色萎黄，舌淡，脉细弱。', categories: ['补益剂', '气血双补'] },
  { name: '血府逐瘀汤', source: '医林改错', lines: [{ verse: '血府逐瘀归地桃，', pinyin: 'xuè fǔ zhú yū guī dì táo,' },{ verse: '红花枳壳膝芎饶，', pinyin: 'hóng huā zhǐ ké xī xiōng ráo,' },{ verse: '柴胡赤芍甘桔梗，', pinyin: 'chái hú chì sháo gān jú gěng,' },{ verse: '胸中血瘀此方消。', pinyin: 'xiōng zhōng xuè yū cǐ fāng xiāo.' }], composition: '当归、生地、桃仁、红花、枳壳、牛膝、川芎、柴胡、赤芍、甘草、桔梗', effect: '活血化瘀，行气止痛', indication: '胸中血瘀证。胸痛头痛日久，痛如针刺有定处，舌质暗红有瘀斑，脉涩。', categories: ['理血剂', '活血祛瘀'] },
  { name: '镇肝熄风汤', source: '医学衷中参西录', lines: [{ verse: '镇肝熄风芍天冬，', pinyin: 'zhèn gān xī fēng sháo tiān dōng,' },{ verse: '玄参龟板赭石同，', pinyin: 'xuán shēn guī bǎn zhě shí tóng,' },{ verse: '龙牡膝草川楝茵，', pinyin: 'lóng mǔ xī cǎo chuān liàn yīn,' },{ verse: '肝阳上亢头眩晕。', pinyin: 'gān yáng shàng kàng tóu xuàn yūn.' }], composition: '白芍、天冬、玄参、龟板、代赭石、龙骨、牡蛎、牛膝、甘草、川楝子、茵陈', effect: '镇肝熄风，滋阴潜阳', indication: '类中风。头目眩晕，目胀耳鸣，脑部热痛，面色如醉，脉弦长有力。', categories: ['治风剂', '平熄内风'] },
  { name: '二陈汤', source: '太平惠民和剂局方', lines: [{ verse: '二陈汤用半夏陈，', pinyin: 'èr chén tāng yòng bàn xià chén,' },{ verse: '茯苓甘草共相成，', pinyin: 'fú líng gān cǎo gòng xiāng chéng,' },{ verse: '理气和中祛痰湿，', pinyin: 'lǐ qì hé zhōng qū tán shī,' },{ verse: '痰饮诸证此方珍。', pinyin: 'tán yǐn zhū zhèng cǐ fāng zhēn.' }], composition: '半夏、陈皮、茯苓、甘草', effect: '燥湿化痰，理气和中', indication: '湿痰证。咳嗽痰多，色白易咯，胸膈痞闷，恶心呕吐，舌苔白腻，脉滑。', categories: ['祛痰剂', '燥湿化痰'] },
  { name: '五苓散', source: '伤寒论', lines: [{ verse: '五苓散治水湿停，', pinyin: 'wǔ líng sǎn zhì shuǐ shī tíng,' },{ verse: '泽泻二苓术桂行，', pinyin: 'zé xiè èr líng zhú guì xíng,' },{ verse: '化气利水兼解表，', pinyin: 'huà qì lì shuǐ jiān jiě biǎo,' },{ verse: '水肿蓄水此方灵。', pinyin: 'shuǐ zhǒng xù shuǐ cǐ fāng líng.' }], composition: '泽泻、猪苓、茯苓、白术、桂枝', effect: '利水渗湿，温阳化气', indication: '膀胱气化不利之水湿内停证。小便不利，水肿，泄泻，舌苔白，脉浮。', categories: ['祛湿剂', '利水渗湿'] },
]

const filteredFormulas = computed(() => {
  if (!searchQuery.value.trim()) return formulas
  const q = searchQuery.value.trim().toLowerCase()
  return formulas.filter(f => f.name.includes(q) || f.composition.includes(q) || f.effect.includes(q))
})

// 建立过滤后的 index → 原始 index 映射
const indexMap = computed(() => {
  const map: Record<number, number> = {}
  filteredFormulas.value.forEach((f, i) => { map[i] = formulas.indexOf(f) })
  return map
})
function getRealIndex(filteredIdx: number): number { return indexMap.value[filteredIdx] }

function toggleReveal(index: number): void {
  if (revealedMap[index]) {
    revealedMap[index] = false
    delete displayLines[index]
  } else {
    revealedMap[index] = true
    if (revealMode.value === 'line') {
      displayLines[index] = [formulas[index].lines[0]]
    }
  }
}
</script>

<style scoped>
.page-songs { width: 100%; padding-bottom: 48px; }

.page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }

.back-btn { background: none; border: none; color: #8b4513; font-size: 14px; cursor: pointer; padding: 0; font-family: inherit; }
.back-btn:hover { opacity: 0.7; }

.page-title { font-family: var(--tcm-font-decorative); font-size: 26px; color: #3d3027; margin: 0; }

/* Toolbar */
.toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }

.mode-toggle { display: flex; gap: 0; border: 1px solid #d4c5a9; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.toggle-btn { padding: 7px 18px; border: none; background: #fffefb; color: #888; font-size: 13px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
.toggle-btn + .toggle-btn { border-left: 1px solid #d4c5a9; }
.toggle-btn.is-active { background: #8b4513; color: #fff; font-weight: 600; }

.search-input { flex: 1; min-width: 180px; padding: 8px 16px; border: 1px solid #d4c5a9; border-radius: 10px; font-size: 14px; font-family: inherit; color: #3d3027; background: #fffefb; outline: none; }
.search-input:focus { border-color: #8b4513; }

/* Songs grid — 2 columns on wide, 1 on narrow */
.songs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

.song-card { background: #fffefb; border: 1px solid #e8dcc8; border-radius: 12px; overflow: hidden; transition: all 0.2s; }
.song-card:hover { border-color: #c9a96e; box-shadow: 0 2px 12px rgba(139,69,19,0.05); }
.song-card.is-expanded { border-color: #c0392b; box-shadow: 0 4px 20px rgba(139,69,19,0.06); grid-column: 1 / -1; }

.song-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 22px; cursor: pointer; user-select: none; transition: background 0.15s; }
.song-head:hover { background: #fdf9f2; }

.song-head-left { display: flex; align-items: baseline; gap: 12px; }
.song-name { font-family: var(--tcm-font-decorative); font-size: 17px; font-weight: 700; color: #3d3027; margin: 0; }
.song-source { font-size: 12px; color: #bbb; font-style: italic; }
.expand-icon { font-size: 12px; color: #ccc; flex-shrink: 0; }

.song-body { padding: 0 22px 22px; }

.verse-block { padding: 10px 16px; margin-bottom: 6px; background: #faf7f0; border-left: 3px solid #c0392b; border-radius: 0 8px 8px 0; }
.verse-block--all { padding: 14px 18px; }
.verse-text { font-family: var(--tcm-font-decorative); font-size: 16px; color: #3d3027; line-height: 1.9; margin: 0; }
.verse-pinyin { font-size: 13px; color: #bbb; margin: 4px 0 0 0; font-style: italic; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; margin: 14px 0; }
.info-item { display: flex; gap: 8px; font-size: 14px; align-items: baseline; }
.info-item--full { grid-column: 1 / -1; }
.info-label { font-weight: 700; color: #8b4513; white-space: nowrap; flex-shrink: 0; }
.info-value { color: #666; line-height: 1.7; }

.song-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }

@media (max-width: 768px) {
  .songs-grid { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
