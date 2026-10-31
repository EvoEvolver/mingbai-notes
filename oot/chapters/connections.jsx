// 全书脉络：章节之间的 connection。links 供各章节页底部「这一章和其他章节的联系」使用。
import { BookPage, Block, C, ConceptMap, CompareTable, DragSort, Takeaways, Callout, Grid, Card, Paras, Tabs } from "@kit";
import { links as LINKS, KINDS } from "./_connections_links.jsx";
import Overview from "./_connections_overview.jsx";
import Matrix from "./_connections_matrix.jsx";
import ManThread from "./_connections_man.jsx";
import LinkList from "./_connections_list.jsx";

export const links = LINKS;

// 关系图分页：全部 + 每类联系各一张（数组在模块层生成，保证引用稳定）
const MAP_TABS = [
  { label: `全部 ${LINKS.length} 条`, content: <ConceptMap edges={LINKS} height={760} /> },
  ...KINDS.map(k => {
    const edges = LINKS.filter(l => l.kind === k.id);
    return { label: `${k.label} ${edges.length}`, content: <ConceptMap edges={edges} height={edges.length > 8 ? 600 : 480} /> };
  }),
];

const ruptureRows = [
  { aspect: "发生时间", left: "17 世纪中叶（第 3 章）", right: "约 1775–1825，分两步（第 7 章）" },
  { aspect: "被瓦解的", left: <><C id="ch03:critique_of_resemblance">相似</C>不再是知识的形式，而成了错误之源</>, right: <><C id="ch07:representation_limits">表征</C>不再能奠定表征之间的秩序</> },
  { aspect: "新的地基", left: <>同一与差异的<C id="ch03:table">表格</C>：<C id="ch03:mathesis">mathesis</C> + <C id="ch03:taxinomia">taxinomia</C></>, right: <>表格之下的深处与<C id="ch07:age_of_history">历史</C>：劳动、生命、语言</> },
  { aspect: "符号 / 秩序", left: <>三元符号 → <C id="ch03:binary_sign">二元符号</C></>, right: <>统一的 mathesis <C id="ch07:mathesis_fracture">双重断裂</C></> },
  { aspect: "三个领域", left: "普遍语法 · 博物学 · 财富分析诞生", right: "语文学 · 生物学 · 政治经济学诞生" },
  { aspect: "文学的见证", left: <><C id="ch03:don_quixote">堂吉诃德</C>：用相似读世界而显得疯狂</>, right: <>萨德：<C id="ch06:desire_representation">欲望冲撞表征的极限</C></> },
  { aspect: "幸存下来的残余", left: <>相似只在<C id="ch03:madman_poet">疯子与诗人</C>身上活着</>, right: <>表征退守在<C id="ch10:representation_unconscious">人文科学</C>里</> },
];

const sortItems = [
  { text: "核桃仁长得像大脑，所以能治头部的伤", answer: "ren", why: "靠可见的标记读出隐秘的相似（第 2 章）。" },
  { text: "知识就是给古书写评注，追寻最初的那个文本", answer: "ren", why: "文艺复兴把读自然和读古书看作同一种解释（第 2 章）。" },
  { text: "金子能衡量财富，因为它本身就是最珍贵的财富", answer: "ren", why: "16 世纪：金属自身带着真实的记号（第 6 章开头）。" },
  { text: "金子珍贵，是因为它被用作交换的货币", answer: "cla", why: "重商主义的翻转：货币的价值来自交换功能（第 6 章）。" },
  { text: "给植物命名，就是挑几个可见特征，把它放进表格", answer: "cla", why: "博物学的特征同时命名并定位（第 5 章）。" },
  { text: "研究语言，就是研究词的先后如何表征同时的思想", answer: "cla", why: "这是普遍语法的定义（第 4 章）。" },
  { text: "一切动词都可还原为「是」", answer: "cla", why: "古典命题理论的核心（第 4 章）。" },
  { text: "器官重不重要，要看它服务于哪种看不见的功能", answer: "mod", why: "居维叶的功能与组织计划（第 8 章）。" },
  { text: "价值来自生产它所耗费的劳动", answer: "mod", why: "李嘉图：劳动是价值的源泉（第 8 章）。" },
  { text: "语言有自己的屈折规律和内在历史，可以分成互不过渡的语系", answer: "mod", why: "19 世纪语文学（第 8 章）。" },
  { text: "人既是被认识的对象，又是使认识可能的条件", answer: "mod", why: "经验—先验复本（第 9 章）。" },
];

const routes = [
  { t: "⏱ 只有 1 小时", chs: [["ch00", "前言"], ["ch01", "宫娥"], ["ch03", "表征"], ["ch07", "表征的界限"], ["ch09", "人及其复本"]],
    d: "每章只看开篇、「论证主线」和专属图解。前言给你框架，第 1 章给你一个画面，第 3、7 章是两次断裂，第 9 章是全书的落点。" },
  { t: "📚 一个下午", chs: [["ch00", "前言"], ["ch02", "世界的散文"], ["ch03", "表征"], ["ch06", "交换（看「总表」）"], ["ch07", "表征的界限"], ["ch08", "劳动、生命、语言"], ["ch09", "人及其复本"], ["ch10", "人文科学"]],
    d: "按知识型顺序走一遍：相似 → 表征 → 历史 → 人。第 6 章末尾的总表把古典三领域收在一起，最省时间。第 1、4、5 章可以留到以后。" },
  { t: "🧵 追一条线", chs: [["ch02", "语言即物"], ["ch04", "普遍语法"], ["ch08", "语文学"], ["ch09", "语言的回归"]],
    d: "语言线如上。生命线：第 2 → 5 → 7 → 8 章；财富线：第 6 → 7 → 8 → 10 章。配合上面的矩阵读，每条线大约 40 分钟。" },
  { t: "👤 只关心「人」", chs: [["ch00", "前言"], ["ch01", "宫娥"], ["ch07", "表征的界限"], ["ch09", "人及其复本"], ["ch10", "人文科学"]],
    d: "顺着上面「人」的八站走。读第 9 章前先回看第 1 章的空位，「国王的位置」那一节才会真正落地。" },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="The Order of Things · 章节之间的联系"
      lead="每个时代都有一张看不见的「秩序地基」：文艺复兴靠相似，古典时代靠表征，现代靠历史——而「人」只是最后这张地基上的一个晚近形象。">

      <Block id="mainline" toc="一句话主线" kicker="总览" title="三个知识型，两次断裂"
        lead="《词与物》不是一部观念进步史，而是一次地层挖掘：它把 16 世纪以来的西方知识切成三层，每层都有自己的规则，层与层之间是突然的断裂。">
        <Overview />
        <div style={{ height: 18 }} />
        <Grid min={260}>
          <Card><b>横着读（时间）</b><p>同一个领域在三个时代里面目全非：语言从「要破译的物」变成「透明工具」再变成「有历史的对象」。第 2、4、8 章是同一条线上的三站。</p></Card>
          <Card><b>竖着读（同代）</b><p>同一个时代的不同学问长得一模一样：古典的语法、博物学、财富分析共享一个四边形（第 6 章「总表」），现代的语文学、生物学、政治经济学同时转向深处。</p></Card>
          <Card><b>贯穿全书（人）</b><p>第 1 章那个空着的「国王的位置」，到第 9 章才被「人」站满；前言预告的人之发明，在第 10 章以人之死收尾。</p></Card>
        </Grid>
      </Block>

      <Block id="ruptures" toc="两次断裂" kicker="断裂" title="第 3 章与第 7 章：地基两次整体翻转"
        lead="福柯强调断裂是整体性的：不是某门学科进步了，而是所有学问同时换了一张地基。两次断裂的结构可以对照着看。">
        <CompareTable left="第一次断裂：相似 → 表征" right="第二次断裂：表征 → 历史" rows={ruptureRows} />
        <Callout tone="warn" title="别把断裂读成「进步」">
          <p>古典博物学不是「幼稚的生物学」，财富分析也不是「不成熟的经济学」。<C id="ch05:no_biology_yet">18 世纪根本没有「生命」这个对象</C>，所以居维叶不是在林奈的基础上更进一步，而是站在另一张地基上。这也是<C id="ch00:archaeology">考古学</C>与观念史的根本区别。</p>
        </Callout>
      </Block>

      <Block id="matrix" toc="三条线索" kicker="横向" title="三条线索穿越三个时代"
        lead="语言、自然、财富是福柯挑选的三块「试验田」。把它们排成一张矩阵，每一列是一个知识型，每一行是一条演变线。">
        <Matrix />
      </Block>

      <Block id="iso" toc="古典的同构" kicker="纵向" title="古典三领域：同一个四边形"
        lead="第 4、5、6 章看似各讲各的，其实在讲同一个结构的三种填法。第 6 章末尾的「总表」把它们叠在了一起。">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 620 }}>
            <thead><tr style={{ borderBottom: "2px solid var(--ink)" }}>
              <th style={{ textAlign: "left", padding: 8 }}>四边形的位置</th>
              <th style={{ textAlign: "left", padding: 8, color: "#5b3f7a" }}>普遍语法（第 4 章）</th>
              <th style={{ textAlign: "left", padding: 8, color: "#3c6b4a" }}>博物学（第 5 章）</th>
              <th style={{ textAlign: "left", padding: 8, color: "#b8862b" }}>财富分析（第 6 章）</th></tr></thead>
            <tbody>
              {[
                ["上边：连接与分析", <C id="ch04:verb_to_be">命题与「是」</C>, <C id="ch05:structure">结构</C>, <C id="ch06:value_exchange">价值</C>],
                ["下边：命名与定位", <><C id="ch04:roots">词根</C>与<C id="ch04:derivation_tropes">转义</C></>, <C id="ch05:character">特征</C>, <C id="ch06:quantity_law">货币与价格</C>],
                ["对角线交点", <C id="ch04:the_name">名称</C>, "给生物一个名字和表中位置", "货币：给财富一个记号"],
                ["敞开的边靠什么缝合", <C id="ch04:resemblance_edge">相似与想象</C>, <C id="ch05:continuity">自然的连续性</C>, <C id="ch06:continuity_of_being">需要的连续</C>],
              ].map((r, i) => <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>{r.map((c, j) => <td key={j} style={{ padding: 8, fontWeight: j ? 400 : 600 }}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <p>所以福柯说古典时代有一张<C id="ch06:general_table">总表</C>：上下两条闭合的边是它在科学上的强项，左右两条敞开的边只能靠「世界是连续的」这一形而上学假设来缝合。断裂之后，新科学恰恰长在这些缝隙里——语文学、生物学、政治经济学并没有坐上旧学问的位子。</p>
      </Block>

      <Block id="man" toc="「人」的线索" kicker="贯穿" title="「人」从哪里来，又往哪里去"
        lead="全书真正的主角在前 8 章几乎不出场。跟着这八站走，看一个空位怎样被填满，又怎样可能再次空出来。">
        <ManThread />
      </Block>

      <Block id="map" toc="跨章关系图" kicker="网络" title="跨章概念关系图"
        lead={`全书 ${LINKS.length} 条跨章联系画成一张网，颜色代表所属章节。全图较密，可切换到单条线索看得更清楚；悬停高亮邻居，点击打开概念卡，可拖动节点。`}>
        <Tabs tabs={MAP_TABS} />
      </Block>

      <Block id="list" toc="联系列表" kicker="细读" title="按章节查看全部联系"
        lead="选择一章，看它与哪些章节相连；也可以只看某一类联系（断裂、某条线索、「人」）。">
        <LinkList links={LINKS} />
      </Block>

      <Block id="sort" toc="小测验" kicker="试一试" title="这句话属于哪个知识型？"
        lead="把每句话拖进（或点选后点击）它所属的时代。同一种「常识」，在不同地基上意思完全不同。">
        <DragSort categories={[{ id: "ren", label: "文艺复兴 · 相似" }, { id: "cla", label: "古典 · 表征" }, { id: "mod", label: "现代 · 历史与人" }]} items={sortItems} />
      </Block>

      <Block id="routes" toc="阅读路线" kicker="怎么读" title="阅读路线建议">
        <Grid min={280}>{routes.map(r => <Card key={r.t}>
          <b style={{ fontSize: 17 }}>{r.t}</b>
          <div className="chips">{r.chs.map(([id, t], i) => <a key={i} className="chip" href={`#/${id}`}>{id === "ch00" ? "前言" : `${Number(id.slice(2))}`} · {t}</a>)}</div>
          <Paras text={r.d} />
        </Card>)}</Grid>
      </Block>

      <Block id="takeaways" toc="收束" kicker="全书收束" title="带走这几句话">
        <Takeaways items={[
          "知识型是一个时代所有学问共享的、看不见的地基；它决定什么能被看见、什么话能算真。",
          "两次断裂都是整体性的：第 3 章相似让位于表征，第 7 章表征让位于历史；各门学问同时换了地基。",
          "语言、自然、财富三条线在每个时代都同构：横着读看演变，竖着读看同构。",
          "「人」只诞生于第二次断裂之后：当生命、劳动、语言的有限性被翻转为认识的根基，人站进了《宫娥》里那个空位。",
          "如果这张地基再次翻转——比如语言重新聚拢——人可能像沙滩上的脸一样被抹去。",
        ]} />
      </Block>
    </BookPage>);
}
