// 第 9 章图解（四）：曲式结构条——把乐段、二部 / 三部曲式、32 小节体、主歌—副歌体、回旋曲、奏鸣曲式、赋格画成彩色色块（图 9.5、9.15–9.18）
import { useState } from "react";

const C = { a: "#d9534f", b: "#5b8fd1", c: "#6aa84f", d: "#e3b23c", x: "#b9b2a6", y: "#8e7cc3" };
// 每个块：[文字, 颜色键, 宽度, 下标说明?]
const FORMS = [
  { id: "par", group: "乐段", label: "平行乐段 aa′", rows: [[["a", "a", 1, "半终止 HC"], ["a′", "a", 1, "完满正格终止 PAC"]]],
    note: "上下两句「同头异尾」：上句停在半终止（逗号），下句开头相同、结尾变化，落在完满终止（句号）。例：《在那遥远的地方》。依据是「同则分」。" },
  { id: "con", group: "乐段", label: "对比乐段 ab", rows: [[["a", "a", 1, "终止"], ["b", "b", 1, "终止"]]],
    note: "上下句材料不同。「异则分」的前提是上一句已明确收束（长音 + 终止式）。例：《草原上升起不落的太阳》。" },
  { id: "blues", group: "乐段", label: "12 小节布鲁斯 aa′b", rows: [[["a · I7", "a", 1, "4 小节 Call"], ["a′ · IV7→I7", "a", 1, "4 小节 Call"], ["b · V7→I7", "b", 1, "4 小节 Response"]]],
    note: "三句、每句四小节，一唱众和：前两句相似（Call），第三句回应（Response）。和弦只用 I、IV、V，且一般都是属七性质。" },
  { id: "dp", group: "二部", label: "平行复乐段 AA′", rows: [[["A", "x", 2], ["A′", "x", 2]], [["a", "a", 1], ["b", "d", 1], ["a′", "a", 1], ["c", "b", 1]]],
    note: "四句两两一组，第三句开头重复第一句（aba′c）：两个「同头」的大乐句，传统上仍算一个乐段。例：《阿童木之歌》。" },
  { id: "rb", group: "二部", label: "再现单二部 aa′ba′", rows: [[["A", "x", 2], ["B", "x", 2]], [["a", "a", 1, "HC"], ["a′", "a", 1, "PAC"], ["b", "b", 1, "HC"], ["a′", "a", 1, "PAC"]]],
    note: "「起承转合」：第三句「转」带来对比，第四句再现 A 段的材料收尾。例：《送别》。" },
  { id: "sb", group: "二部", label: "并列二部 aa′bc", rows: [[["A", "x", 2], ["B", "x", 2]], [["a", "a", 1], ["a′", "a", 1], ["b", "b", 1], ["c", "c", 1]]],
    note: "B 段始终不回到 A 段的材料，两段是对比关系。例：《童年》（A 为平行乐段 aa′，B 为对比乐段 bc）。" },
  { id: "aaba", group: "流行", label: "32 小节体 AABA", rows: [[["前奏", "x", 0.7], ["A 主歌", "a", 1], ["A 主歌", "a", 1], ["B 桥段", "b", 1], ["A 主歌", "a", 1], ["间奏", "x", 0.7], ["A", "a", 1], ["A", "a", 1], ["B", "b", 1], ["A", "a", 1], ["尾奏", "x", 0.7]]],
    note: "每部分 8 小节；A（主歌 Verse）反复出现、印象最深，B（桥段 Bridge / Middle 8）只是对比与调节。层次上是 [AA][BA] 的复二部曲式。例：《羞答答的玫瑰静悄悄地开》《Over the Rainbow》《月亮代表我的心》。" },
  { id: "vc", group: "流行", label: "主歌—副歌体", rows: [[["前奏", "x", 0.7], ["主歌", "a", 1], ["导歌", "d", 0.7], ["副歌", "b", 1.2], ["间奏", "x", 0.7], ["主歌", "a", 1], ["导歌", "d", 0.7], ["副歌", "b", 1.2], ["桥段/独奏", "c", 0.9], ["副歌", "b", 1.2], ["尾奏", "x", 0.7]]],
    note: "当今流行歌曲最常用：主歌（Verse）平顺铺垫，副歌（Chorus）是高潮与「Hook」，导歌（Pre-chorus）在二者之间过渡。与 32 小节体相反，它突出的是副歌。各段可以增删、调换，例如副歌前置到前奏里吸引试听者。" },
  { id: "ter", group: "多段", label: "三部曲式 ABA", rows: [[["A", "a", 1], ["B", "b", 1], ["A", "a", 1]]],
    note: "第三段完整再现第一段，中间夹一个对比段，像「夹心饼」。再现二部曲式只在 B 段后半再现部分材料，两段等长；ABA 三段篇幅相当。例：《长江之歌》。" },
  { id: "ron", group: "多段", label: "回旋曲式 ABACA…", rows: [[["A 叠部", "a", 1], ["B 插部", "b", 1], ["A", "a", 1], ["C 插部", "c", 1], ["A", "a", 1], ["D", "d", 1], ["A", "a", 1]]],
    note: "主题（叠部）至少出现三次，中间夹不同的插部，像「千层饼」。多用于器乐：莫扎特《土耳其进行曲》、贝多芬《致爱丽丝》。" },
  { id: "var", group: "多段", label: "变奏曲式 A A1 A2…", rows: [[["A 主题", "a", 1], ["A1", "a", 1, "装饰"], ["A2", "a", 1, "三连音"], ["A3", "a", 1, "切分"], ["A4", "b", 1, "同名小调"], ["…", "x", 0.6]]],
    note: "一个主题加若干变奏，例如莫扎特《小星星变奏曲》的 12 个变奏。中国传统的「重章叠唱」「换头合尾」与之相通而更自由。" },
  { id: "fug", group: "复调", label: "赋格", rows: [[["呈示部", "x", 2.2], ["中间部（发展部）", "x", 2.4], ["再现部", "x", 1.3], ["尾声", "x", 0.5]],
    [["主题 g", "a", 0.55], ["答题 d", "b", 0.55], ["主题", "a", 0.55], ["答题", "b", 0.55], ["插部", "x", 0.5], ["主题变形 / 关系大调", "c", 1.4], ["插部", "x", 0.5], ["主题 c / g", "a", 1.3], ["G 大三", "d", 0.5]]],
    note: "以巴赫《g 小调小赋格》BWV 578 为例：主题（Subject）在 g 小调进入，第二声部在属调 d 小调「答题」（Answer），先前的声部同时唱出对题（Counter subject）；四个声部轮流进入，构成呈示部。中间部自由发展（倒影、逆行、增减值、模进、不完全出现，并到关系大调 B♭），用插部衔接；再现部主题回到主调，最后以皮卡第三度的 G 大三和弦收尾。" },
  { id: "son", group: "复调", label: "奏鸣曲式", rows: [[["呈示部", "x", 4], ["展开部", "x", 2], ["再现部", "x", 4]],
    [["引子", "b", 0.5], ["主部 · 主调", "b", 1.2], ["连接部", "y", 0.8], ["副部 · 副调", "a", 1.1], ["结束部", "a", 0.6], ["发展 · 调性游移", "d", 1.6], ["属准备", "y", 0.4], ["主部 · 主调", "b", 1.2], ["连接部", "b", 0.8], ["副部 · 主调", "b", 1.1], ["结束部", "b", 0.5], ["尾声", "b", 0.4]]],
    note: "呈示部摆出矛盾：主部在主调，副部在副调（大调多用属调，小调多用关系大调），两者乐思也对比。展开部让矛盾交织冲突、频繁转调，最后停在主调的属和声上（属准备）。再现部主部、副部都回到主调——矛盾解决。颜色表示调性（蓝 = 主调，红 = 副调）。" },
];
const GROUPS = ["乐段", "二部", "流行", "多段", "复调"];

export function FormMap({ initial = "rb", only }) {
  const list = only ? FORMS.filter(f => only.includes(f.id)) : FORMS;
  const [id, setId] = useState(initial);
  const F = list.find(f => f.id === id) || list[0];
  return <div className="card">
    {GROUPS.map(g => list.some(f => f.group === g) && <div className="au-ctrl" key={g}><span className="au-lab" style={{ minWidth: 36 }}>{g}</span>
      {list.map(f => f.group === g && <button key={f.id} className={f.id === F.id ? "on" : ""} onClick={() => setId(f.id)}>{f.label}</button>)}
    </div>)}
    {F.rows.map((row, ri) => <div key={ri} style={{ display: "flex", gap: 3, margin: "6px 0" }}>
      {row.map(([t, c, w, s], k) => <div key={k} style={{ flex: w, minWidth: 0, background: C[c], color: c === "x" ? "var(--ink)" : "#fff", borderRadius: 6,
        padding: ri === 0 && F.rows.length > 1 ? "3px 4px" : "10px 4px", textAlign: "center", fontSize: 13, fontWeight: 600, lineHeight: 1.3, opacity: ri === 0 && F.rows.length > 1 ? 0.75 : 1 }}>
        {t}{s && <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.9 }}>{s}</div>}
      </div>)}
    </div>)}
    <div className="au-info"><b>{F.label}</b>：{F.note}</div>
  </div>;
}
