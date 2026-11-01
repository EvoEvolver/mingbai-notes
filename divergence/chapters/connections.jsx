// 全书脉络：《大分流》各章如何连成一条论证
import { BookPage, Block, C, ArgumentFlow, ConceptMap, CompareTable, Takeaways, Callout, Hook } from "@kit";
import Knockout from "./_connections_knockout.jsx";

export const links = [
  // —— 导论提出问题与方法 → 第一部分检验 ——
  { from: "ch00:eurocentric_story", to: "ch01:eurocentric_head_start", label: "领先论受审", note: "导论概括的欧洲中心论，在第 1 章落成可检验的命题：欧洲早在工业化前几百年就靠少生多攒领先了吗？" },
  { from: "ch00:demographic_story", to: "ch01:european_marriage_pattern", label: "晚婚不独有", note: "人口—积累说的核心是欧洲婚姻模式；第 1 章表明它确实存在，却不是唯一的「少生」办法。" },
  { from: "ch00:demographic_story", to: "ch01:marital_fertility_control", label: "中国也控生育", note: "中国几乎人人早婚，却靠婚内推迟、停止生育让出生率低于西欧——人口—积累说的前提落空。" },
  { from: "ch00:institutional_story", to: "ch02:market_ideal", label: "市场论受审", note: "市场—制度说在第 2 章被放到同一把新古典尺子下量：谁离理想市场更远？" },
  { from: "ch00:units_of_comparison", to: "ch02:multiple_cores", label: "英格兰比江南", note: "导论要求拿规模相当的核心区相比；第 2 章据此看到欧亚有好几个长得很像的核心区。" },
  { from: "ch00:reciprocal_comparison", to: "ch02:industrious_revolution", label: "双向套用", note: "相互比较的一个做法：把描述欧洲的「勤勉革命」概念拿来看江南，发现它在中国同样适用。" },

  // —— 第一部分内部与向后的延伸 ——
  { from: "ch01:transport_capital", to: "ch02:private_grain_market", label: "粮食流通", note: "中国水运把粮食运得更远更多；第 2 章接着说清廷维持多买家竞争的粮市，流通并不比欧洲差。" },
  { from: "ch01:labor_saving_thesis", to: "ch02:jiangnan_women_earnings", label: "中国劳力不贱", note: "「欧洲工资高才逼出机器」暗含中国劳力廉价；第 2 章显示会织布的江南妇女挣得不比男雇工少。" },
  { from: "ch01:best_vs_average_tech", to: "ch04:interest_rate_gap", label: "缺技术不缺钱", note: "平均技术欧亚相当；第 4 章补充：欧洲利率虽低，前工业时代缺的是值得投钱的技术，而不是资本。" },
  { from: "ch01:calorie_intake", to: "ch03:spice_to_staple", label: "热量从哪来", note: "中国人光吃粮食的热量就不比英国劳工少；第 3 章指出英国人的额外热量越来越多来自殖民地的糖。" },
  { from: "ch01:livestock_capital", to: "ch05:soil_depletion", label: "牲畜与地力", note: "欧洲牲畜多只是土地用法不同；到第 5 章，牲畜与粪肥的减少反而成了欧洲地力衰竭的征兆。" },
  { from: "ch01:ecological_strain", to: "ch05:fuel_crisis", label: "生态压力详算", note: "第 1 章点到为止的西欧森林锐减、水土流失，第 5 章逐项算账：柴木价格涨得比什么都快。" },
  { from: "ch01:land_saving_innovation", to: "ch06:ghost_acreage", label: "省地＝幽灵地", note: "第 1 章说关键是让增长不再依赖土地的突破；第 6 章用「幽灵土地」把这种节省折算成英亩。" },
  { from: "ch01:coal_location", to: "ch06:coal_forest", label: "地下的森林", note: "煤的位置是第 1 章唯一要紧的技术差异；第 6 章算出 1815 年英国的煤相当于多出 1500 万英亩森林。" },
  { from: "ch02:enclosure_new_husbandry", to: "ch05:european_slack", label: "落后留余地", note: "第 2 章里被世袭租佃挡住的新农法，在第 5 章变成欧洲的「松弛」：未用尽的潜力，可惜挖得很慢。" },
  { from: "ch02:multiple_cores", to: "ch05:fully_populated_cores", label: "同一天花板", note: "第 2 章的「多个核心区」到第 5 章被证明面对同一条死胡同：人最密，空地最少。" },
  { from: "ch02:involution", to: "ch05:danish_path", label: "欧洲也内卷", note: "黄宗智的内卷化并非中国专利：丹麦靠多投两倍以上的劳动稳住生态，换来的是停滞。" },
  { from: "ch02:industrious_revolution", to: "ch06:labor_intensive_path", label: "勤勉走到头", note: "家庭多干活卖给市场的勤勉，在没有新大陆的东亚最终沉淀为劳动密集型道路。" },
  { from: "ch02:rural_industry_guilds", to: "ch06:growing_up", label: "原工业长大", note: "江南乡村纺织不比欧洲落后；第 6 章说明，原工业要「长大」成工厂，还得有人替它种粮种棉。" },

  // —— 第二部分：消费、企业与海外 ——
  { from: "ch02:industrious_revolution", to: "ch03:drug_foods", label: "为糖茶而勤", note: "勤勉革命的动力之一是想买糖、茶、烟草这类「药物食品」；而它们大多长在殖民地。" },
  { from: "ch03:english_exception", to: "ch06:coal_forest", label: "英国特例", note: "消费爆发是英国一国的事，煤与殖民地的好处也集中在英国：分流首先是英格兰与江南的分流。" },
  { from: "ch03:colonial_land_relief", to: "ch06:ghost_acreage", label: "嗜好品的地", note: "第 3 章指出糖、烟草、棉花不和欧洲本土粮食抢地；第 6 章把这块地算成数千万英亩的幽灵土地。" },
  { from: "ch03:silver_as_good", to: "ch04:silver_china_demand", label: "中国要银", note: "白银是中国最想要的商品；第 4 章接着说，正是中国的需求让美洲银矿有利可图。" },
  { from: "ch03:global_conjuncture", to: "ch06:silver_windfall", label: "时尚靠白银", note: "欧洲舶来品涌入靠的是手里的美洲白银；第 6 章说明这批银很大部分是靠强制得来的「横财」。" },
  { from: "ch04:silver_china_demand", to: "ch06:silver_streams", label: "白银三股流", note: "中国需求是最大的一股；第 6 章把白银去向分成三股，说明各自对欧洲土地压力的不同作用。" },
  { from: "ch03:sombart_thesis", to: "ch04:braudel_capitalism", label: "资本主义何来", note: "从奢侈造就资本家，到站在市场之上靠特权赚钱的大资本：两章检验同一个「资本主义独有」的问题。" },
  { from: "ch04:armed_trading_company", to: "ch06:new_periphery", label: "武力造边缘", note: "带军队的贸易公司与殖民立法，是新型边缘得以建立的前提：美洲不是靠市场「自然」长出来的。" },
  { from: "ch04:military_fiscalism", to: "ch06:beyond_numbers", label: "关税养军力", note: "为打仗而生的金融制度，在第 6 章与殖民地关税、海上军力连成一体，成为数字之外的红利。" },
  { from: "ch04:stateless_diaspora", to: "ch06:new_periphery", label: "没有国家撑腰", note: "华商在东南亚很成功，但没有国家撑腰与殖民强制，东南亚就成不了中国的「新大陆」。" },
  { from: "ch04:williams_thesis", to: "ch06:small_differences", label: "不大但关键", note: "殖民利润能否解释工业化，第 4 章存疑；第 6 章换个问法：美洲的意义不在钱多，而在小差异造成大分流。" },
  { from: "ch04:protoindustrial_culdesac", to: "ch05:ecological_window", label: "死胡同", note: "第二部分结论是没有谁注定会工业化；第 5 章说明原因：人口与原工业化正在关上那扇生态窗口。" },
  { from: "ch04:fortunate_freak", to: "ch00:coal_and_colonies", label: "两次意外", note: "「幸运的异类」回应导论的预告：欧洲本不特别，是煤与殖民地两次断裂让它脱颖而出。" },

  // —— 第三部分：共同的约束 → 解除约束 ——
  { from: "ch00:land_constraint", to: "ch05:land_constraint", label: "约束展开", note: "导论提出的土地约束在第 5 章逐项展开：食物、纤维、燃料、建材，欧亚核心区都卡在这里。" },
  { from: "ch00:smithian_growth", to: "ch05:smithian_ceiling", label: "斯密的极限", note: "导论说欧亚核心区都有斯密式增长；第 5 章说明它的天花板：找个落后的贸易伙伴，走不远。" },
  { from: "ch05:import_substitution", to: "ch06:old_world_plateau", label: "旧边缘封顶", note: "边缘自己长人口、自己织布，可出口的余粮余木越来越少——旧世界的边缘迟早停涨。" },
  { from: "ch05:smithian_ceiling", to: "ch06:new_periphery", label: "新边缘破局", note: "斯密式办法走不远，因为旧边缘会长大；奴隶制美洲则是一个「不会用完」的新型边缘。" },
  { from: "ch05:fuel_crisis", to: "ch06:coal_forest", label: "煤解柴荒", note: "西欧的柴荒在英国被煤化解，但煤只替代了燃料用途，建材木材仍要靠进口。" },
  { from: "ch05:china_hidden_costs", to: "ch06:labor_intensive_path", label: "代价累积", note: "中国解决了燃料与地力，却在水利与安全边际上透支；没有新大陆，只能继续用更多劳动对付土地压力。" },
  { from: "ch00:new_periphery", to: "ch06:new_periphery", label: "预告兑现", note: "导论预告的「新型边缘」在最后一章得到完整论证：奴隶制使它只能不断出口原料、进口制成品。" },
  { from: "ch00:polycentric_world", to: "ch06:polycentric_world", label: "多中心世界", note: "导论说 1800 年前没有单一中心；第 6 章用白银流向证明，中国需求同样塑造了全球经济。" },
  { from: "ch00:labor_intensive_path", to: "ch06:labor_intensive_path", label: "两条道路", note: "导论勾勒、终章落定：东亚走劳动密集型道路，欧洲靠煤与美洲走上资源密集的道路。" },
];

const STEPS = [
  { claim: "问题与方法：相互比较，多中心世界", detail: "别拿英国比整个中国，而要拿英格兰比江南；并且双向互问——既问江南为何不是英格兰，也问英格兰为何不是江南。1800 年前的世界有好几个核心区，没有唯一的中心（导论）。" },
  { claim: "人口、寿命与资本：惊人地相似", detail: "欧洲婚姻模式并不独有，中国靠婚内控制同样少生；中日较好地区的人活得一样长、吃得一样饱；牲畜、运输、房屋也看不出欧洲的资本优势（第 1 章）。" },
  { claim: "技术：唯一要紧的差异指向煤", detail: "1750 年平均技术欧亚相当，「高工资逼出机器」大多不成立；真正关键的是煤的位置——英国的煤紧挨市场与水运，蒸汽机在矿口上最划算（第 1 章）。" },
  { claim: "市场：中国更像教科书", detail: "土地买卖、劳动流动、粮食与乡村工业，清代中国离新古典理想不比西欧更远，甚至更近；江南妇女的纺织收入说明家庭劳动并非一文不值（第 2 章）。" },
  { claim: "消费：欧洲不更爱买，只是换得更快", detail: "消费爆发主要是英国一国的事；欧洲突出的是时尚速度，而这靠美洲白银与殖民地嗜好品，不是民族性（第 3 章）。" },
  { claim: "资本主义：优势只在武装贸易", detail: "欧洲的利率、企业组织与金融制度没有决定性优势；它独特的只是带枪做远洋生意、开殖民地的能力（第 4 章）。" },
  { claim: "共同的约束：同一块生态天花板", detail: "1800 年前后，欧亚核心区都撞上土地、木材与燃料的天花板，中国并不更糟；旧世界的边缘会长大、会自给，斯密式办法走不远（第 5 章）。" },
  { claim: "解除约束：煤 + 美洲", detail: "煤是地下的森林；奴隶制美洲是只能不断出口原料的新型边缘，糖、棉、木材折成数千万英亩幽灵土地，白银又打开了亚洲的货（第 6 章）。" },
  { claim: "两条道路：劳动密集 vs 资源密集", detail: "没有新大陆和便利的煤，东亚只能用越来越多的劳动对付土地压力；英国则靠化石能源与海外土地，走上资源密集型的工业道路——这就是大分流（第 6 章）。" },
];

const ROWS = [
  { aspect: "比较单位", left: "「欧洲」对「中国」，以国家或文明为单位", right: "英格兰对江南：规模与发展水平相当的核心区" },
  { aspect: "1800 年前的世界", left: "欧洲早已领先，是唯一的中心", right: "多中心：欧亚好几个核心区惊人地相似" },
  { aspect: "人口与生活水平", left: "欧洲婚姻模式少生多攒，更长寿更富", right: "中国靠婚内控制少生，寿命与热量不逊西欧" },
  { aspect: "市场与制度", left: "欧洲率先有自由市场与清晰产权", right: "清代中国在土地、劳动、产品市场上更接近理想" },
  { aspect: "消费与资本主义", left: "消费革命与资本主义企业是欧洲的独特成分", right: "差别只在时尚速度与武装贸易，靠的是白银与殖民" },
  { aspect: "工业化的原因", left: "长期内生积累的自然结果", right: "两次带偶然性的断裂：煤的位置 + 美洲新大陆" },
  { aspect: "亚洲为何没有工业化", left: "停滞、专制或文化缺陷", right: "撞上同样的生态约束，却没有煤与新型边缘，走上劳动密集道路" },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="How the chapters of The Great Divergence connect"
      lead="一条主线：直到 1800 年，欧亚核心区一样繁荣、也一样被土地卡住；把欧洲送出天花板的，是煤与美洲。">
      <Block id="intro" toc="引言" kicker="先看全景" title="一场针对「欧洲早已领先」的系统审查">
        <Hook title="一本讲工业革命的书，为什么前四章都在说「欧洲没什么特别」？">
          {"《大分流》的结构像一场审判。导论先把欧洲中心论的说法列成清单：人口与婚姻、资本积累、技术、市场与产权、消费文化、资本主义企业……然后定下比较规则——拿英格兰比江南，并且双向互问。\n\n第一、二部分逐条检验，结论几乎都是「欧亚相似」：这些解释要么被推翻，要么只在一个狭窄的地方成立。到第三部分，问题反转过来：既然大家都一样，为什么都没有冲破同一块生态天花板？答案落在两件带有偶然性的事上——英国脚下恰好可开采的煤，和靠暴力与奴隶制得来的美洲。全书因此既是「去欧洲中心」的拆解，也是一个关于土地约束的正面理论。"}
        </Hook>
        <Callout tone="key" title="读这页的方法">
          导论（第 0 章）给出方法：<C id="ch00:units_of_comparison" />、<C id="ch00:reciprocal_comparison" />、<C id="ch00:polycentric_world" />，以及要检验的<C id="ch00:demographic_story" />与<C id="ch00:institutional_story" />。
          第一部分（第 1-2 章）证明<C id="ch02:multiple_cores">惊人相似</C>：<C id="ch01:marital_fertility_control" />、<C id="ch01:life_expectancy" />、<C id="ch02:land_alienability" />，唯一要紧的技术差异是<C id="ch01:coal_location" />。
          第二部分（第 3-4 章）看消费与资本主义：<C id="ch03:english_exception" />、<C id="ch03:silver_as_good" />、<C id="ch04:armed_trading_company" />，结论是<C id="ch04:fortunate_freak" />。
          第三部分（第 5-6 章）讲<C id="ch05:land_constraint" />如何被解除：<C id="ch06:coal_forest" />、<C id="ch06:new_periphery" />、<C id="ch06:ghost_acreage" />，最后分出<C id="ch06:labor_intensive_path" />。点任何概念都能看解释。
        </Callout>
      </Block>

      <Block id="flow" toc="论证主线" kicker="九步走完全书" title="全书的论证主线" lead="先拆掉「欧洲早已领先」，再解释共同的天花板为何只在英国被打破。">
        <ArgumentFlow steps={STEPS} />
      </Block>

      <Block id="knockout" toc="解释的淘汰赛" kicker="全书图解" title="欧洲中心论解释的淘汰赛"
        lead="十种「欧洲为何领先」的解释，按全书三部分逐轮受检。点上方轮次推进比赛，点任意卡片看是哪一章检验、怎么判的。最后只剩两张：煤（英国，蓝）与美洲（其他地区，金）。">
        <Knockout />
      </Block>

      <Block id="threads" toc="主题的旅程" kicker="同一个主题，在多章出现" title="六个主题的跨章旅程">
        <Callout tone="key" title="⛏️ 煤：从地理的幸运到地下的森林">
          <C id="ch00:coal_and_colonies">导论</C> 预告第一次断裂 → <C id="ch01:coal_location">第 1 章</C> 英国的煤紧挨市场，<C id="ch01:pithead_steam">矿口蒸汽机</C>最划算 → <C id="ch05:fuel_crisis">第 5 章</C> 西欧的木材与燃料危机让煤变得紧迫 → <C id="ch06:coal_forest">第 6 章</C> 1815 年的煤＝1500 万英亩森林。
        </Callout>
        <Callout tone="info" title="🪙 白银：不是补逆差，而是一种商品">
          <C id="ch03:silver_as_good">第 3 章</C> 欧洲卖给中国的是中国最想要的货，<C id="ch03:global_conjuncture">时尚靠白银</C> → <C id="ch04:silver_china_demand">第 4 章</C> 中国需求撑起西属美洲的银矿 → <C id="ch06:silver_windfall">第 6 章</C> 强制得来的横财，<C id="ch06:silver_streams">三股流向</C>，<C id="ch06:polycentric_world">多中心的世界经济</C>。
        </Callout>
        <Callout tone="info" title="🌎 边缘：从会长大的旧边缘到不会用完的新边缘">
          <C id="ch00:new_periphery">导论</C> 预告 → <C id="ch02:bound_labor">第 2 章</C> 核心区束缚劳动消退 → <C id="ch05:import_substitution">第 5 章</C> 旧边缘自己织布，<C id="ch05:bound_labor_periphery">东欧被农奴制冻住</C>，<C id="ch05:smithian_ceiling">斯密式办法封顶</C> → <C id="ch06:old_world_plateau">第 6 章</C> 旧世界边缘封顶，<C id="ch06:slave_market">奴隶制造就的进口市场</C>成为<C id="ch06:new_periphery">新型边缘</C>。
        </Callout>
        <Callout tone="info" title="🧺 勤勉与劳动密集：东亚道路的由来">
          <C id="ch00:labor_intensive_path">导论</C> 勾勒 → <C id="ch02:industrious_revolution">第 2 章</C> 勤勉革命、<C id="ch02:involution">内卷化</C>、<C id="ch02:jiangnan_women_earnings">江南妇女的收入</C> → <C id="ch05:danish_path">第 5 章</C> 丹麦道路、<C id="ch05:china_hidden_costs">中国道路的隐性代价</C> → <C id="ch06:labor_intensive_path">第 6 章</C> 没有新大陆，只能用更多劳动对付土地。
        </Callout>
        <Callout tone="info" title="🌲 生态约束：所有核心区的天花板">
          <C id="ch00:land_constraint">导论</C> 土地约束、<C id="ch00:fully_populated">人口饱和</C> → <C id="ch01:ecological_strain">第 1 章</C> 18 世纪欧洲的生态压力 → <C id="ch02:multiple_cores">第 2 章</C> 多个核心区共同受限 → <C id="ch05:land_constraint">第 5 章</C> 逐项算账，<C id="ch05:ecological_window">窗口正在关闭</C> → <C id="ch06:ghost_acreage">第 6 章</C> 幽灵土地解除约束。
        </Callout>
        <Callout tone="info" title="⚔️ 武力与海外：欧洲唯一的「独有优势」">
          <C id="ch03:colonial_land_relief">第 3 章</C> 殖民地替欧洲种嗜好品 → <C id="ch04:armed_trading_company">第 4 章</C> 武装贸易公司、<C id="ch04:military_fiscalism">军事财政主义</C>、<C id="ch04:williams_thesis">威廉斯论题</C>，对照<C id="ch04:stateless_diaspora">无国家撑腰的华商</C> → <C id="ch06:beyond_numbers">第 6 章</C> 关税与军力，<C id="ch06:small_differences">小差异，大分流</C>。
        </Callout>
      </Block>

      <Block id="map" toc="跨章关系图" kicker="全书概念网" title="跨章关系图" lead="颜色代表章节，点节点看概念卡。连线最密的地方——煤、新型边缘、劳动密集型道路、幽灵土地——就是全书反复回访的枢纽。">
        <ConceptMap edges={links} height={780} />
      </Block>

      <Block id="compare" toc="两种视角" kicker="全书对照" title="欧洲中心论 vs 彭慕兰">
        <CompareTable left="欧洲中心论" right="彭慕兰的大分流" rows={ROWS} />
      </Block>

      <Block id="take" toc="带走什么" kicker="一句话记住全书" title="带走这几点">
        <Takeaways items={[
          "比较要对等、要双向：拿英格兰比江南，既问江南为何不是英格兰，也问英格兰为何不是江南。",
          "直到 1800 年前后，欧亚核心区在人口、寿命、资本、技术、市场与消费上惊人地相似；「欧洲早已领先」的解释大多经不起检验。",
          "欧洲独有的只是武装贸易与海外殖民的能力——它本身不造就工业化，却为美洲这个新型边缘开了路。",
          "所有核心区都撞上同一块生态天花板；煤（地下的森林）与美洲（幽灵土地、白银）替英国解除了土地约束。",
          "大分流是两条道路的分岔：东亚走向劳动密集，欧洲走向资源密集——差异不大，却决定了现代世界。",
        ]} />
      </Block>
    </BookPage>);
}
