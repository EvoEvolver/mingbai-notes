// 全书脉络：《力比多经济》各章概念之间的联系 + 全书主线
import { BookPage, Block, C, ArgumentFlow, ConceptMap, CompareTable, Tabs, Takeaways, Callout, Bridge, Grid, Card } from "@kit";
import { ZeroMetamorphosis, Trace } from "./_connections_zero.jsx";

export const links = [
  // 术语表 → 第 1 章：装置的零件先登记，再上场
  { from: "ch00:libidinal_band", to: "ch01:libidinal_band", label: "术语落地", note: "术语表里的「带」只是定义；第 1 章把身体剖开摊平，让这条只有一面的皮肤真正动起来。" },
  { from: "ch00:the_bar", to: "ch01:turning_bar", label: "横杠旋转", note: "术语表说横杠与带是同一个东西；第 1 章用一根绕随机中心疯狂旋转的线段，演示它如何扫出整条力比多带。" },
  { from: "ch00:theatrical_volume", to: "ch01:abatement", label: "减速成体积", note: "剧场体积不是另一种实体：第 1 章推演横杠一减速，这/非这便分开，边界、价值、记忆随之出现。" },
  { from: "ch00:great_zero", to: "ch01:great_zero", label: "空的中心", note: "同一个概念：导言列出它的诸多名字（上帝、理念、菲勒斯），第 1 章把它放回剧场后台，作为一切意义的结账处。" },
  { from: "ch00:intensity", to: "ch01:intensity", label: "无所代表", note: "术语表强调强度不可意愿、抗拒记忆；第 1 章补上：它不代表任何东西，也不缺任何东西。" },
  // 第 1 章 → 第 2 章：两面性长成张量
  { from: "ch01:great_zero", to: "ch02:great_zero", label: "零成缺席所指", note: "第 1 章剧场的大零，在第 2 章换上符号学的面孔：意义链尽头那个永远缺席、却让一切有意义的中心。" },
  { from: "ch01:duplicity_of_signs", to: "ch02:tensor_sign", label: "两面性成张量", note: "第 1 章说同一张表面既是皮肤又是登记册；第 2 章把这种双重性命名为张量符号。" },
  { from: "ch00:tensor_sign", to: "ch02:tensor_sign", label: "术语展开", note: "术语表的定义在第 2 章获得完整论证：符号学符号与单一强度互相掩饰，不能分开。" },
  { from: "ch01:critique_religion", to: "ch02:semiotic_nihilism", label: "意义即宗教", note: "批判预设外部真理，符号学预设「有人在对我们说话」：两者都是同一个剧场里的宗教。" },
  // 第 1/2 章 → 第 3 章：装置用到马克思身上
  { from: "ch01:critique_religion", to: "ch03:no_critique", label: "拒绝批判", note: "第 1 章的原则落到马克思身上：利奥塔不批判马克思，因为批判就是宣称自己站到了更真的位置。" },
  { from: "ch00:critique_garrison", to: "ch03:subversive_region", label: "守住一块内部", note: "批判即驻军：挖出一块内部、守住边界。第 3 章说任何「颠覆性区域」都会这样长出统治与符号。" },
  { from: "ch00:dispositif", to: "ch03:every_economy_libidinal", label: "装置即经济", note: "既然一切都是能量的布置，政治经济学就没有理由例外：资本主义交换里的强度不比象征交换少。" },
  { from: "ch01:great_zero", to: "ch03:inorganic_body", label: "马克思的零", note: "马克思批判资本时需要的完整大身体（人、公社、大地浑然一体），就是他剧场背后的大零。" },
  { from: "ch02:adultery_prostitution", to: "ch03:universal_prostitution", label: "卖淫的两条路", note: "第 2 章说卖淫与通奸是同一条原地的路；第 3 章由此读出马克思对「普遍卖淫」的厌恶里藏着的欲望。" },
  // 第 3 章 → 第 4 章：没有外部，希腊也不例外
  { from: "ch03:no_primitive", to: "ch04:meson_zero", label: "城邦已有零", note: "没有资本之外的原始乐园：第 4 章表明，被浪漫化的希腊城邦中心早就立着一个让交换归零的 méson。" },
  { from: "ch03:inorganic_body", to: "ch04:citizen_body", label: "完整身体的神话", note: "马克思怀念的完整身体，在第 4 章被拆穿：「完整的希腊人」只是力比多带上被裁下的一小条。" },
  { from: "ch03:symbolic_exchange", to: "ch04:outlet_valve", label: "献祭也付款", note: "象征交换想当政治经济学的外部；第 4 章说献祭与卖淫一样是泄口，付款总把泄出的强度收回循环。" },
  // 第 3/4 章 → 第 5 章：零的放大
  { from: "ch03:tautology", to: "ch05:concentratory_zero", label: "不是机器", note: "第 3 章欣赏斯拉法自足的系统；第 5 章说资本既非斯拉法的均衡机器，也非必然崩溃的矛盾机器，而是建在一个中心零上。" },
  { from: "ch04:meson_zero", to: "ch05:concentratory_zero", label: "中心之零放大", note: "城邦广场与货币的零，到了资本成为测量、翻译、抵消一切扰动的集中之零。" },
  { from: "ch00:concentratory_zero", to: "ch05:concentratory_zero", label: "零的后半身", note: "术语表把集中之零称为大零贪婪的后半身；第 5 章把它展开为资本的结构法则。" },
  { from: "ch04:comparison_annuls", to: "ch05:two_zeros", label: "清偿之零", note: "比较即取消强度；第 5 章把这种抵消命名为价格的清偿之零，并给它配上一个征服扩张的利润之零。" },
  { from: "ch04:gold_vs_credit", to: "ch05:credit_money", label: "从金子到信用", note: "第 4 章末尾区分可焚烧的宝藏与作为关系的资本之币；第 5 章说信用是对尚不存在之财富的预付。" },
  { from: "ch04:war_of_silver", to: "ch05:jealousy_finitude", label: "有限财富与嫉妒", note: "柯尔贝尔假定白银总量有限；第 5 章说投机也带着同样的假设，于是重商主义在资本内部复活。" },
  { from: "ch02:living_currency", to: "ch05:duplicity_credit", label: "货币即张量", note: "第 2 章已说货币既是价值又是强度；第 5 章在信用上把它推到极致：符号与张量并存于不同的时空。" },
  // → 第 6 章：理论自身也是装置
  { from: "ch01:disintensification", to: "ch06:disjunctive_bar", label: "析取横杠", note: "第 1 章的「要么这、要么非这」，在第 6 章被转向理论写作本身：说出析取时你已同时站在两边。" },
  { from: "ch03:old_prosecutor", to: "ch06:medusa", label: "理论家的享乐", note: "收集罪证、建构理论的检察官马克思，在第 6 章被普遍化：理论的快感就是把流动之物盯住、定住。" },
  { from: "ch05:reproductive_credit", to: "ch06:mimesis_model", label: "自我复制", note: "资本以商品生产商品；第 6 章说可被无限复述的理论模型与它同构。" },
  { from: "ch03:subversive_region", to: "ch06:no_anti_theory", label: "没有强度之所", note: "第 3 章否认颠覆性区域，第 6 章同样否认诗、混乱或「反理论」是强度的专属地盘。" },
  { from: "ch02:dissimulation", to: "ch06:dissimulation_discourse", label: "掩饰的写作", note: "张量符号的掩饰最终成为利奥塔自己的写法：不预设读者如何接收的碎片，瓶中无信。" },
  { from: "ch00:drift", to: "ch06:conductor", label: "漂移即导体", note: "导言说「就在里面，然后忘掉它」；第 6 章给出写作的形象：不做作者，只做让强度通过的匿名导体。" },
];

const FLOW = [
  { claim: "导言：一本拒绝批判的「邪恶之书」", detail: <>术语表先把零件摆好：<C id="ch00:libidinal_band">力比多带</C>、<C id="ch00:the_bar">横杠</C>、<C id="ch00:great_zero">大零</C>、<C id="ch00:tensor_sign">张量符号</C>、<C id="ch00:dispositif">装置</C>。导言提醒：这不是对「真实」的描述，而是一种更有力的虚构；对手不是被扬弃，而是被 <C id="ch00:drift">漂移与遗忘</C>。</> },
  { claim: "第 1 章：皮肤、横杠与剧场", detail: <>身体摊平成一条只有一面的 <C id="ch01:libidinal_band">皮肤</C>，<C id="ch01:intensity">强度</C> 在上面奔流。<C id="ch01:turning_bar">横杠</C> 一减速，就折出 <C id="ch01:theatrical_volume">剧场体积</C>，后台供着 <C id="ch01:great_zero">大零</C>。所以 <C id="ch01:critique_religion">批判即宗教</C>。</> },
  { claim: "第 2 章：每个符号都是双面的", detail: <><C id="ch02:semiotic_sign">符号学符号</C> 把意义推给缺席者，是一门 <C id="ch02:semiotic_nihilism">虚无主义</C> 的科学；但同一个符号又是 <C id="ch02:tensor_sign">张量</C>，两种读法互相 <C id="ch02:dissimulation">掩饰</C>。连 <C id="ch02:living_currency">货币</C> 也是如此——这为后三章埋下伏笔。</> },
  { claim: "第 3 章：马克思的欲望，以及外部的幻想", detail: <><C id="ch03:little_girl_marx">小女孩马克思</C> 渴望一具完整的 <C id="ch03:inorganic_body">（无）机身体</C>；批判需要这个外部。利奥塔回答：没有 <C id="ch03:subversive_region">颠覆性区域</C>，<C id="ch03:no_primitive">没有原始社会</C>，<C id="ch03:every_economy_libidinal">一切政治经济学都是力比多的</C>。</> },
  { claim: "第 4 章：零的谱系——从 méson 到货币", detail: <>希腊城邦中心的 <C id="ch04:meson_zero">中项之零</C> 就是亚里士多德的货币；<C id="ch04:comparison_annuls">比较即取消</C> 强度。献祭、卖淫、精神分析是 <C id="ch04:outlet_valve">泄口</C>，付款又把强度收回。重商主义的 <C id="ch04:war_of_silver">白银之战</C> 让零与嫉妒公开同台。</> },
  { claim: "第 5 章：资本的零及其双重性", detail: <>资本建在 <C id="ch05:concentratory_zero">集中之零</C> 上，分为 <C id="ch05:two_zeros">清偿之零与征服之零</C>。<C id="ch05:credit_money">信用</C> 预付「无」，<C id="ch05:speculation_mercantilism">投机</C> 是资本里的重商主义；同一笔信用里符号与张量并存——<C id="ch05:duplicity_credit">双重性</C>，而非矛盾。</> },
  { claim: "第 6 章：把同一副眼光转向理论自身", detail: <>理论是 <C id="ch06:medusa">美杜莎</C>：把流动之物定住，本身就是享乐；理想的理论是 <C id="ch06:theoretical_body">凝固的有机身体</C>，与资本同构。但 <C id="ch06:no_anti_theory">没有反理论</C>，只能做一个 <C id="ch06:conductor">匿名导体</C>。</> },
];

const tag = s => <small style={{ color: "var(--muted)", display: "block", marginTop: 4 }}>— {s}</small>;
const ROWS = [
  { aspect: "基本图像", left: <>有里有外的剧场体积：台前是表象，台后是本质{tag("导言 / 第 1 章")}</>, right: <>只有一面、无内外的力比多带（巨大的短暂皮肤）{tag("导言 / 第 1 章")}</> },
  { aspect: "区分从哪来", left: <>概念的「这/非这」是现成的逻辑形式{tag("第 1 章")}</>, right: <>横杠旋转减速的效果；转快了就分不开{tag("第 1 / 6 章")}</> },
  { aspect: "意义 / 中心", left: <>一切都向一个缺席的大零结账：上帝、理念、能指{tag("第 1 / 2 章")}</>, right: <>大零只是皮肤上一种被投注的布置，不是后台的真相{tag("第 1 / 4 章")}</> },
  { aspect: "符号", left: <>替代：指向缺席意义，要被破译、带回收益{tag("第 2 章")}</>, right: <>张量：同时是不可交换的单一强度，两面互相掩饰{tag("第 2 章")}</> },
  { aspect: "批判的支点", left: <>一个外部：有机身体、超越的劳动力、象征交换、原始社会{tag("第 3 章")}</>, right: <>没有外部，没有颠覆性区域，没有原始社会{tag("第 3 章")}</> },
  { aspect: "货币与交换", left: <>货币是中性尺度，价格之下藏着劳动价值的「地下室」{tag("第 4 章")}</>, right: <>货币是让强度归零的 méson，同时自身也是强度{tag("第 2 / 4 章")}</> },
  { aspect: "资本", left: <>均衡机器，或终将因矛盾而崩溃的机器{tag("第 5 章")}</>, right: <>集中之零与不可预测的投注并存：信用的双重性{tag("第 5 章")}</> },
  { aspect: "理论", left: <>欲望之外的冷静、中立区域{tag("第 6 章")}</>, right: <>美杜莎式的享乐，一种与资本同构的装置{tag("第 6 章")}</> },
  { aspect: "姿态", left: <>批判、揭露、许诺解放（宗教与虚无主义）{tag("第 1 / 3 章")}</>, right: <>描述装置，在内部漂移，做让强度通过的导体{tag("导言 / 第 6 章")}</> },
];

const TRACES = [
  {
    label: "横杠", color: "#1f1b16", stations: [
      { ch: "ch00", id: "the_bar", text: "术语表：一根会转的区分，转快了就是带，转慢了就是剧场。" },
      { ch: "ch01", id: "turning_bar", text: "绕随机漂移的中心疯狂旋转，扫出的曲面就是力比多带。" },
      { ch: "ch01", id: "disintensification", text: "减速时变成析取：要么这、要么非这，被排斥者成了要征服的外部。" },
      { ch: "ch04", id: "comparison_annuls", text: "在交换里，横杠表现为比较：一比较，强度就被取消。" },
      { ch: "ch06", id: "disjunctive_bar", text: "转向理论：说「是这不是那」时，你已经同时站在两边。" },
    ],
  },
  {
    label: "两面性", color: "#b8862b", stations: [
      { ch: "ch01", id: "duplicity_of_signs", text: "同一张表面既是强度的皮肤，又是记账的登记册。" },
      { ch: "ch02", id: "tensor_sign", text: "张量符号：意义网中的一项，同时是一次不可交换的强度。" },
      { ch: "ch02", id: "living_currency", text: "货币既是可计算的价值，也是力比多强度。" },
      { ch: "ch03", id: "every_economy_libidinal", text: "所以资本主义交换里的强度，并不比象征交换少。" },
      { ch: "ch05", id: "duplicity_credit", text: "信用：符号与张量并存于不同时空——双重性，不是矛盾心理。" },
      { ch: "ch06", id: "dissimulation_discourse", text: "写作本身也只能是掩饰的话语。" },
    ],
  },
  {
    label: "外部的幻想", color: "#9b2c1f", stations: [
      { ch: "ch00", id: "critique_garrison", text: "批判即驻军：挖出一块内部，守住它的边界。" },
      { ch: "ch01", id: "critique_religion", text: "批判总要一个外部真理来对照，这和宗教是同一套剧场。" },
      { ch: "ch03", id: "inorganic_body", text: "马克思的外部：人、公社、大地浑然一体的身体。" },
      { ch: "ch03", id: "symbolic_exchange", text: "鲍德里亚的外部：馈赠与回赠之域。" },
      { ch: "ch04", id: "citizen_body", text: "希腊人的「完整身体」也只是被裁下的一小条。" },
      { ch: "ch06", id: "no_anti_theory", text: "连强度也没有专属地盘：没有反理论。" },
    ],
  },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="How one skin, one bar and one zero run through the whole book"
      lead="从术语表里的皮肤、横杠、大零，到符号、马克思、货币、资本，最后到理论自身——利奥塔用同一副装置读完一切，而每一章都在追捕同一个「零」的新面孔。">
      <Block id="flow" toc="全书主线" kicker="一副装置贯穿六章" title="全书主线：先造装置，再拿它读一切"
        lead="前两章搭起装置（皮肤、横杠、剧场、张量），后三章用它读政治经济学（马克思、交易、资本），末章把它转向理论写作本身。">
        <ArgumentFlow steps={FLOW} />
      </Block>

      <Block id="zero" toc="零的变形记" kicker="全书专属图解" title="零的变形记：大零的六副面孔"
        lead="每一章都有一个把强度结账归零的中心，只是名字不同。点击圆圈看各章的「零」；切换横杠的转速，看同一处从剧场里看与从皮肤上看有什么不同。">
        <ZeroMetamorphosis />
      </Block>

      <Block id="map" toc="跨章关系图" kicker="概念网络" title="跨章概念关系图"
        lead="按章节着色。悬停看邻接关系，点击节点打开概念卡。注意导言术语与各章同名概念（力比多带、大零、强度、张量符号、集中之零）的重复——这正是全书的线索。">
        <ConceptMap edges={links} height={760} />
      </Block>

      <Block id="trace" toc="贯穿线索" kicker="同一问题的变奏" title="三条贯穿全书的线索"
        lead="切换标签，看横杠、两面性与「外部」如何一章章换上新面孔。">
        <Tabs tabs={TRACES.map(t => ({ label: t.label, content: <Trace stations={t.stations} color={t.color} /> }))} />
      </Block>

      <Block id="compare" toc="全书总表" kicker="两种经济" title="表征 / 批判 vs 力比多经济：全书总表"
        lead="把六章压成一张表。左栏是利奥塔要摆脱的剧场式思维（马克思主义、符号学、精神分析、鲍德里亚都在其中），右栏是他的力比多读法。">
        <CompareTable left="表征 / 批判（剧场、大零、外部）" right="力比多经济（皮肤、强度、张量、无外部）" rows={ROWS} />
        <Callout tone="warn" title="右栏不是一个新的「外部」">
          把右栏当作要奔赴的真理，就又立起了一个大零。利奥塔反复强调两面互相 <C id="ch02:dissimulation">掩饰</C>、不可分离：剧场就是转慢的皮肤，皮肤也总在被登记成剧场。导言还提醒，几年后利奥塔自己把这套力比多学说称为「欲望形而上学」，转向了 <C id="ch00:kant_turn">康德与异识</C>。
        </Callout>
      </Block>

      <Block id="baudrillard" toc="与鲍德里亚交锋" kicker="同站一侧，又彼此为敌" title="与鲍德里亚《生产之镜》的交锋"
        lead="本站的另一本书——鲍德里亚《生产之镜》——批判马克思仍困在生产与劳动之中，并把象征交换立为政治经济学之外的另一端。利奥塔在第 3 章说自己与他「既很近又很远」。">
        <Grid min={260}>
          <Card>
            <div className="kicker">很近</div>
            <p>两人都要摧毁经济理性，都不满马克思主义把一切归结为生产、劳动与价值。利奥塔承认与鲍德里亚「同步、同极化」。</p>
          </Card>
          <Card>
            <div className="kicker">很远</div>
            <p>鲍德里亚仍在批判、仍在找真理：<C id="ch03:symbolic_exchange">象征交换</C> 是他的外部，原始社会是他的不在场证明。利奥塔说这只是把边界往前挪，剧场的内外结构原封不动——与马克思的 <C id="ch03:inorganic_body">（无）机身体</C> 同属一个谱系。</p>
          </Card>
          <Card>
            <div className="kicker">利奥塔的回答</div>
            <p><C id="ch03:no_primitive">没有原始社会</C>：民族志里最极端的强度也组成秩序；礼物问题式本身带着西方「好野蛮人」的想象。资本主义交换里的强度并不更少，<C id="ch03:every_economy_libidinal">一切政治经济学都是力比多的</C>。</p>
          </Card>
          <Card>
            <div className="kicker">延伸到后面两章</div>
            <p>第 4 章把献祭也读成 <C id="ch04:outlet_valve">付款的泄口</C>，希腊城邦早有 <C id="ch04:meson_zero">中心之零</C>；第 5 章的资本不是外部能颠覆的机器，而是自身带着 <C id="ch05:duplicity_credit">双重性</C> 的装置。</p>
          </Card>
        </Grid>
        <Callout title="对照阅读">
          第 3 章页面有一张「鲍德里亚：象征交换 vs 利奥塔：没有原始社会」的对照表；也可以打开本站《生产之镜》的「全书脉络」，看鲍德里亚那一侧如何把象征交换一路推到「此时此地的乌托邦」。
        </Callout>
      </Block>

      <Block id="takeaways" toc="收获" kicker="带走什么" title="读完全书，带走这几点">
        <Takeaways items={[
          "全书只有一副装置：一条只有一面的皮肤、一根会转的横杠。横杠慢下来就有了剧场、内外与意义；所有二元对立都是它减速的产物。",
          "意义理论、符号学、马克思主义批判、精神分析共享同一个结构：把强度结账到一个缺席的「大零」。名字变了（上帝、所指、有机身体、货币、资本、理论），结构不变。",
          "每个符号都是双面的：既是可交换的符号，又是不可交换的强度，二者互相掩饰、无法分离——连货币和信用也一样。",
          "没有外部：没有颠覆性区域，没有原始社会，象征交换也不是政治经济学的彼岸。一切政治经济学都是力比多的。",
          "理论本身是一种享乐（美杜莎式的定住），也没有「反理论」可以逃出；剩下的姿态是描述装置、在内部漂移、做强度的导体。",
        ]} />
        <Bridge title="→ 回到章节">
          建议从 <a href="#/ch01">第 1 章 · 巨大的短暂皮肤</a> 开始重读：每一章页底的「跨章联系」区块会把你带回这张网络中的相应节点。
        </Bridge>
      </Block>
    </BookPage>);
}
