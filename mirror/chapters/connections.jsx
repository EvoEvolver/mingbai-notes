// 全书脉络：《生产之镜》各章概念之间的联系 + 全书主线
import { BookPage, Block, C, ArgumentFlow, ConceptMap, CompareTable, Tabs, Takeaways, Callout, Bridge } from "@kit";
import { FiveLenses, Trace } from "./_connections_lenses.jsx";

export const links = [
  // 导言 → 第 1 章：镜子立起来，先落在劳动上
  { from: "ch00:mirror_of_production", to: "ch01:mirror_of_production", label: "镜像落到劳动", note: "导言提出「生产之镜」的总命题；第 1 章把它落实为对劳动力、劳动二重性等具体范畴的拆解。" },
  { from: "ch00:use_value", to: "ch01:use_value_alibi", label: "背面而非彼岸", note: "导言说使用价值只是交换价值的背面；第 1 章论证它是交换体系给自己找的「不在场证明」。" },
  { from: "ch00:labor_power", to: "ch01:labor_power", label: "天然性受审", note: "同一个概念：导言质疑劳动力是人「天生拥有」的能力，第 1 章证明这种天然性本身是体系的产物。" },
  // 第 1 章 → 第 2 章：劳动的另一端是自然与需要
  { from: "ch01:labor_power", to: "ch02:double_liberation", label: "人与自然同被解放", note: "人被「解放」成劳动力的同时，自然被「解放」成生产力——第 2 章说这两次分离是同谋。" },
  { from: "ch01:generic_man", to: "ch02:natural_necessity", label: "需要的另一端", note: "「人有需要、人有劳动力」的类本质，对应着「人必须与自然搏斗」的必然性；两者都是政治经济学写出的人类学。" },
  { from: "ch01:work_ethic", to: "ch02:ascetic_to_productive", label: "劳动伦理的谱系", note: "第 1 章的劳动伦理在第 2 章被追溯到更长的谱系：从禁欲到生产再到消费，分离与压抑的原则不变。" },
  { from: "ch00:domination_of_nature", to: "ch02:nature_as_referent", label: "展开为一章", note: "导言点出的「征服自然的人类学」，在第 2 章被展开：自然本身就是被支配者的名字。" },
  // 回溯投射：第 2 → 3 → 4 → 5
  { from: "ch02:retrospective_projection", to: "ch03:retrospective_abstraction", label: "回溯投射", note: "第 2 章末尾提出的回溯性投射，在第 3 章成为方法论批判：越抽象的范畴越显得普遍，恰恰是意识形态。" },
  { from: "ch01:boomerang_concepts", to: "ch03:potential_surplus", label: "概念回旋镖", note: "第 1 章警告把「生产方式」套到原始社会会照出自己；第 3 章的「潜在剩余」正是这种回旋镖的实例。" },
  { from: "ch03:retrospective_abstraction", to: "ch04:retrospective_reading", label: "从原始到奴隶", note: "同一手术从原始社会推进到古代：先用雇佣工人定义劳动，再倒回去拼出「被剥削的奴隶」。" },
  { from: "ch04:ethnocentrism_of_code", to: "ch03:critique_museum", label: "种族中心主义", note: "两章互为注脚：历史唯物主义在路灯下找钥匙，也把他者文化收进西方自我批判的博物馆。" },
  { from: "ch03:anatomy_key", to: "ch05:euclidean_history", label: "历史目的论", note: "「人体解剖是猴体解剖的钥匙」在第 5 章被概括为历史的欧几里得几何：资本主义成了回看一切的制高点。" },
  // 象征交换的主线
  { from: "ch00:symbolic_exchange", to: "ch01:symbolic_exchange", label: "真正的断裂处", note: "导言预告的象征交换，在第 1 章被确立为与整个价值领域相对立的另一端。" },
  { from: "ch01:symbolic_exchange", to: "ch03:symbolic_exchange", label: "从概念到民族志", note: "第 1 章抽象地提出礼物、回赠、耗费；第 3 章用原始社会的对抗性互惠给它血肉。" },
  { from: "ch02:symbolic_exchange_nature", to: "ch03:take_and_return", label: "与自然交换", note: "人与自然之间有给有还；第 3 章说收成不是劳动的回报，而是取与还的交换的一环。" },
  { from: "ch01:productive_eros", to: "ch03:anti_production", label: "耗费而非投资", note: "马克思的「耗费」是投资；原始社会的耗费则刻意拒绝积累——这就是反生产。" },
  { from: "ch03:anti_production", to: "ch04:work_not_labor", label: "作品中的耗费", note: "工匠的作品同样不是投资出价值，而是把付出耗费在象征交换中。" },
  { from: "ch03:symbolic_exchange", to: "ch04:symbolic_obligation", label: "主奴互负义务", note: "古代主奴关系不是剥削，而是一种相互义务的象征关系——原始交换的逻辑在古代的延续。" },
  { from: "ch04:symbolic_obligation", to: "ch05:symbolic_demand", label: "可逆性的要求", note: "从古代的相互义务到当下的象征要求：有给必有还，这正是代码体系唯一给不了的东西。" },
  // 解放的幻象
  { from: "ch04:repressive_desublimation", to: "ch05:hyperrepressive", label: "解放即编码", note: "第 4 章对「重新掌握劳动」的怀疑，在第 5 章扩展为整个体系的超压抑式解放。" },
  { from: "ch02:subject_object_split", to: "ch04:separation_principle", label: "分离原则", note: "主体与自然-客体的分裂，在第 4 章被提升为我们的现实原则本身：一切范畴都长在分离的裂缝上。" },
  // 第三阶段：代码与颠覆
  { from: "ch00:mode_of_signification", to: "ch05:form_sign", label: "商品→符号形式", note: "导言预告的「表意方式」，在第 5 章成为第三阶段统治的核心：符号形式取代商品形式。" },
  { from: "ch00:historical_stages", to: "ch05:three_phases", label: "三个阶段", note: "导言概括的历史分期，在第 5 章被细化为政治经济学的三个阶段。" },
  { from: "ch01:use_value_alibi", to: "ch05:referent_abolished", label: "所指成借口", note: "第 1 章的「使用价值是不在场证明」，到第 5 章扩展为所有指涉物的消失：符号只指向其他符号。" },
  { from: "ch01:critique_in_form", to: "ch05:class_trap", label: "形式未被批判", note: "保留政治经济学形式的批判，必然把无产阶级定义为「生产者阶级」，从而锁进资产阶级的生产逻辑。" },
  { from: "ch00:la_parole", to: "ch05:subversion", label: "边缘发声", note: "被代码排除者的言语，在第 5 章成为来自「别处」的颠覆，而非体系内部的矛盾。" },
  { from: "ch02:promethean_myth", to: "ch05:deferred_revolution", label: "革命被推迟", note: "相信生产力足够发达革命才会来，等于把革命推迟到历史终点。" },
  { from: "ch01:real_rupture", to: "ch05:utopia_now", label: "断裂即此刻", note: "真正的断裂不在劳动内部，而在价值与象征之间；第 5 章说乌托邦就在此时此地，而不在未来。" },
];

const FLOW = [
  { claim: "导言：批判者与被批判者共用一套语法", detail: <>马克思批判资本主义的生产内容，却没批判「生产」这个形式。全书从 <C id="ch00:mirror_of_production">生产之镜</C> 和 <C id="ch00:productivism">生产主义</C> 出发：人只能透过生产来认识自己。</> },
  { claim: "第 1 章：劳动与使用价值是镜像，不是本质", detail: <><C id="ch01:labor_power">劳动力</C>、<C id="ch01:double_labor">劳动二重性</C> 与 <C id="ch01:use_value_alibi">使用价值</C> 都由交换价值的逻辑生成；马克思是 <C id="ch01:critique_in_form">以政治经济学的形式批判政治经济学</C>。</> },
  { claim: "第 2 章：自然与需要同样是被写出来的", detail: <><C id="ch02:nature_as_referent">自然</C>、<C id="ch02:natural_necessity">必然性</C>、<C id="ch02:scarcity">匮乏</C> 并非永恒处境；人与自然的 <C id="ch02:double_liberation">双重解放</C> 是同一次支配的两面。</> },
  { claim: "方法转折：回溯投射", detail: <>用成熟资本主义的范畴去照亮过去，就是 <C id="ch02:retrospective_projection">回溯性投射</C>——这把钥匙打开后面两章：越抽象的范畴越像普遍真理（<C id="ch03:retrospective_abstraction">回溯幻觉</C>）。</> },
  { claim: "第 3 章：原始社会不是不发达的生产", detail: <>把 <C id="ch03:potential_surplus">潜在剩余</C>、<C id="ch03:subsistence_illusion">生存经济</C> 加给原始人是误读；他们的 <C id="ch03:symbolic_exchange">象征交换</C> 是 <C id="ch03:anti_production">反生产</C> 的，生存只是它的残余。</> },
  { claim: "第 4 章：奴隶不是劳动者，工匠不是生产者", detail: <>主奴之间是 <C id="ch04:symbolic_obligation">象征性义务</C> 与 <C id="ch04:personal_domination">人身支配</C>；工匠的 <C id="ch04:work_not_labor">作品不是劳动</C>。在哪儿都只找到生产方式，是 <C id="ch04:ethnocentrism_of_code">代码的种族中心主义</C>。</> },
  { claim: "第 5 章：镜子转向当下——代码统治的第三阶段", detail: <>政治经济学进入 <C id="ch05:three_phases">第三阶段</C>：统治从商品形式转为 <C id="ch05:form_sign">符号形式</C> 与 <C id="ch05:monopoly_code">代码的垄断</C>，<C id="ch05:referent_abolished">指涉物消失</C>。</> },
  { claim: "第 5 章：矛盾可被吸收，颠覆来自边缘", detail: <>体系内部的 <C id="ch05:contradiction">矛盾</C> 能被消化；真正的威胁是被代码标记为 <C id="ch05:non_marked">非标记项</C> 的人从外部发起的 <C id="ch05:subversion">颠覆</C>。</> },
  { claim: "收束：象征交换与此时此地的乌托邦", detail: <>体系唯一给不了的是可逆的 <C id="ch05:symbolic_demand">象征要求</C>；革命不该被 <C id="ch05:deferred_revolution">推迟</C> 到历史终点，<C id="ch05:utopia_now">乌托邦就在此时此地</C>。</> },
];

const tag = s => <small style={{ color: "var(--muted)", display: "block", marginTop: 4 }}>— {s}</small>;
const ROWS = [
  { aspect: "人是什么", left: <>拥有劳动力与需要的生产者（类本质）{tag("第 1 章")}</>, right: <>处于给予与回应关系中的人，不先作为「生产力」存在{tag("第 1 章 / 导言")}</> },
  { aspect: "价值", left: <>使用价值是交换价值背后的真实{tag("第 1 章")}</>, right: <>使用价值只是交换价值的不在场证明；礼物不可折算{tag("第 1 章")}</> },
  { aspect: "人与自然", left: <>人必须与自然搏斗，征服匮乏{tag("第 2 章")}</>, right: <>与自然有给有还、互负义务的交换{tag("第 2 / 3 章")}</> },
  { aspect: "剩余与耗费", left: <>剩余是生产力发展的标志，可积累、再投资{tag("第 3 章")}</>, right: <>多余的被耗费，以此拒绝积累——反生产{tag("第 3 章")}</> },
  { aspect: "古代奴隶", left: <>被剥削到极点的劳动者{tag("第 4 章")}</>, right: <>人身支配与相互义务中的一方，不是出卖劳动力的个体{tag("第 4 章")}</> },
  { aspect: "工匠", left: <>掌控自身劳动的主人，自我管理的黄金时代{tag("第 4 章")}</>, right: <>作品不是劳动，是生产者与使用者之间的象征交换{tag("第 4 章")}</> },
  { aspect: "历史", left: <>生产方式依次更替，资本主义是解读一切的钥匙{tag("第 3 / 5 章")}</>, right: <>不同社会之间是断裂，不是程度差别；回溯投射是种族中心主义{tag("第 2 / 4 / 5 章")}</> },
  { aspect: "当下的统治", left: <>资本剥削劳动，核心是商品形式{tag("第 5 章")}</>, right: <>代码与符号形式的统治，仿真取代指涉{tag("导言 / 第 5 章")}</> },
  { aspect: "革命与主体", left: <>无产阶级作为生产者阶级，在历史终点完成革命{tag("第 5 章")}</>, right: <>被边缘化者的颠覆，此时此地的象征要求与乌托邦{tag("第 5 章")}</> },
];

const TRACES = [
  {
    label: "象征交换", color: "#b8862b", stations: [
      { ch: "ch00", id: "symbolic_exchange", text: "导言先把它立为对抗生产主义的武器，也指出它在理论上还不充分。" },
      { ch: "ch01", id: "symbolic_exchange", text: "礼物、回赠、耗费、献祭：真正的断裂在价值领域与象征交换之间。" },
      { ch: "ch02", id: "symbolic_exchange_nature", text: "延伸到人与自然：不是主体征服客体，而是有给有还。" },
      { ch: "ch03", id: "symbolic_exchange", text: "在原始社会中获得具体形态：对抗性互惠，生存反倒是它的残余。" },
      { ch: "ch04", id: "symbolic_obligation", text: "在主奴与工匠关系中延续：相互义务、作品中的耗费。" },
      { ch: "ch05", id: "symbolic_demand", text: "回到当下，成为体系唯一给不了的东西——可逆性的象征要求。" },
    ],
  },
  {
    label: "回溯投射", color: "#2c4a6e", stations: [
      { ch: "ch00", id: "universalization", text: "导言的诊断：历史唯物主义忘了自己的历史边界。" },
      { ch: "ch01", id: "boomerang_concepts", text: "把「生产方式」套到他者身上，像回旋镖一样照出自己。" },
      { ch: "ch02", id: "retrospective_projection", text: "马克思用成熟资本主义的结构照亮过去，把政治经济学的光投向一切历史。" },
      { ch: "ch03", id: "anatomy_key", text: "「人体解剖是猴体解剖的钥匙」：结构的目的论替代了进化的目的论。" },
      { ch: "ch04", id: "ethnocentrism_of_code", text: "路灯下找钥匙：在哪儿都只找到生产方式。" },
      { ch: "ch05", id: "euclidean_history", text: "历史的欧几里得几何：一切社会都成了通往资本主义的过渡阶段。" },
    ],
  },
  {
    label: "使用价值 → 指涉物", color: "#9b2c1f", stations: [
      { ch: "ch00", id: "use_value", text: "马克思用来对抗交换价值的「真实有用性」，其实是它的背面。" },
      { ch: "ch01", id: "use_value_alibi", text: "使用价值是交换体系的不在场证明，需要也是被生产出来的。" },
      { ch: "ch04", id: "service_relation", text: "把古代关系说成「以使用价值为纽带的服务」，仍是经济学加心理学。" },
      { ch: "ch05", id: "referent_abolished", text: "第三阶段：所有指涉物都成了符号的借口，符号只指向其他符号。" },
    ],
  },
  {
    label: "劳动力与「解放」", color: "#5b3f7a", stations: [
      { ch: "ch00", id: "labor_power", text: "劳动力被当作人天生的能力——导言对此表示怀疑。" },
      { ch: "ch01", id: "alienated_as_labor_power", text: "问题不只是出卖劳动力，而是被定义为劳动力。" },
      { ch: "ch02", id: "double_liberation", text: "人被解放成劳动力，自然被解放成生产力，两者同谋。" },
      { ch: "ch04", id: "liberation_ideology", text: "从奴隶到雇佣工人的「进步」，是西方理性的解放神话。" },
      { ch: "ch05", id: "hyperrepressive", text: "体系慷慨地给出各种自由，但每种都被重新编码。" },
    ],
  },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="How the five chapters break the mirror of production"
      lead="从导言立起「生产之镜」，到五章逐块拆下劳动、自然、原始剩余、奴隶与工匠、历史与阶级——镜子背后露出的是象征交换。">
      <Block id="flow" toc="全书主线" kicker="一条论证贯穿五章" title="全书主线：从镜子到镜子背后"
        lead="鲍德里亚的论证有清晰的推进：先拆概念（劳动、自然），再拆历史（原始、古代），最后把镜子转向当下（代码），并在每一步都指向同一个「别处」——象征交换。">
        <ArgumentFlow steps={FLOW} />
      </Block>

      <Block id="lenses" toc="五块镜片" kicker="全书专属图解" title="五块镜片：每章拆掉一块"
        lead="把政治经济学之镜想成由五块镜片拼成，每一章拆下一块。点击镜片：左侧看马克思主义在镜中看到了什么，右侧看鲍德里亚拆下之后说了什么。">
        <FiveLenses />
      </Block>

      <Block id="map" toc="跨章关系图" kicker="概念网络" title="跨章概念关系图"
        lead="按章节着色。悬停看邻接关系，点击节点打开概念卡。注意很多章节有同名概念（象征交换、劳动力、生产之镜）——这些重复正是全书的线索。">
        <ConceptMap edges={links} height={720} />
      </Block>

      <Block id="trace" toc="贯穿概念" kicker="同一概念的变奏" title="四条贯穿全书的线索"
        lead="同一个问题在不同章节换了面目反复出现。切换标签，看它如何一章章被推进。">
        <Tabs tabs={TRACES.map(t => ({ label: t.label, content: <Trace stations={t.stations} color={t.color} /> }))} />
      </Block>

      <Block id="compare" toc="全书总表" kicker="两种视角" title="生产之镜 vs 象征交换：全书总表"
        lead="把五章的论点压成一张表。左侧是被批判的视角（马克思主义与政治经济学共享的语法），右侧是鲍德里亚的回答。">
        <CompareTable left="马克思主义 / 政治经济学视角" right="象征交换视角（鲍德里亚）" rows={ROWS} />
        <Callout tone="warn" title="读这张表时要小心">
          右栏不是一套现成的替代方案。导言中 Poster 就提醒：鲍德里亚没有充分说明象征交换社会如何过渡到政治经济学，<C id="ch00:historical_stages">三阶段之间的断裂</C> 是被断言而非被解释的。全书的力量主要在于拆镜子，而非建造新房子。
        </Callout>
      </Block>

      <Block id="takeaways" toc="收获" kicker="带走什么" title="读完全书，带走这几点">
        <Takeaways items={[
          "批判的激进程度取决于它是否质疑了对手的「形式」：只换内容（谁占有生产）、不换形式（一切都是生产），批判就仍在镜中。",
          "劳动、需要、使用价值、自然、匮乏看似人类的永恒处境，其实是政治经济学的历史产物；把它们当作普遍本质，就会把我们的经济学投射到一切社会。",
          "原始社会、古代奴隶与工匠提供了「镜子之外」的参照：象征交换以耗费、义务和可逆性对抗积累与价值。",
          "今天的统治主要不是剥削劳动，而是代码把一切变成可互换的符号；能被体系吸收的矛盾不构成威胁，来自边缘的颠覆才是。",
          "乌托邦不在历史终点，而在此时此地对可逆的象征关系的要求。",
        ]} />
        <Bridge title="→ 回到章节">
          建议从 <a href="#/ch01">第 1 章 · 劳动的概念</a> 开始重读：每一章页底的「跨章联系」区块会把你带回这张网络中的相应节点。
        </Bridge>
      </Block>
    </BookPage>);
}
