// 第 3 章专属图解 B：弗洛伊德的三个文本 —— 材料 → 弗洛伊德的读法 → 德勒兹/加塔利的读法
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

// ---- 文本 1：施瑞伯 —— 「父亲」在谵妄里占多大？（示意比例）
function SchreberSvg() {
  const parts = [["上帝与神学", 18], ["宇宙、太阳、光线", 16], ["身体的变形", 14], ["种族、民族、历史", 16], ["政治与法律", 12], ["医生与精神病院", 14], ["其他", 7], ["父亲的回忆", 3]];
  let x = 20;
  return <svg viewBox="0 0 720 150" style={{ width: "100%" }}>
    <text x="20" y="22" fontSize="13" fill={MUTED}>施瑞伯《回忆录》的内容构成（示意，非统计）</text>
    {parts.map(([t, v], i) => {
      const ww = v * 6.8, x0 = x; x += ww;
      const fa = t === "父亲的回忆";
      return <g key={i}>
        <rect x={x0} y={34} width={ww - 2} height={34} rx={4} fill={fa ? RED : i % 2 ? "#cfdccf" : "#dde6d6"} />
        {ww > 70 && <text x={x0 + ww / 2} y={56} textAnchor="middle" fontSize="12" fill={INK}>{t}</text>}
        {fa && <text x={x0 + ww - 2} y={84} textAnchor="end" fontSize="12" fill={RED}>↑ 父亲的回忆</text>}
      </g>;
    })}
    <text x="20" y="100" fontSize="13" fill={INK}>原著：施瑞伯只<tspan fill={RED} fontWeight="700">极简短地</tspan>提到过父亲。</text>
    <text x="20" y="120" fontSize="13" fill={RED} fontWeight="700">弗洛伊德的读法：整条色带 → 全部归于那一小格红色。</text>
    <text x="20" y="142" fontSize="12" fill={MUTED}>（他自己承认「跟上这一步很困难」，却依然坚定地走了下去。）</text>
  </svg>;
}

// ---- 文本 2：一个孩子被打 —— 两个不对称系列 + 那个「从未存在」的阶段
function BeatenSvg() {
  const [hi, setHi] = useState(false);
  const box = (x, y, t, ghost, k) => <g key={k}>
    <rect x={x} y={y} width={178} height={44} rx={10} fill={ghost ? (hi ? "#fbeee9" : "#fffdf8") : "#fffdf8"}
      stroke={ghost ? RED : BLUE} strokeWidth={ghost ? 2.2 : 1.4} strokeDasharray={ghost ? "6 4" : ""} />
    <text x={x + 89} y={y + 27} textAnchor="middle" fontSize="13" fill={ghost ? RED : INK}>{t}</text>
  </g>;
  return <div>
    <svg viewBox="0 0 720 210" style={{ width: "100%" }} onMouseEnter={() => setHi(true)} onMouseLeave={() => setHi(false)}>
      <text x="10" y="50" fontSize="14" fill={INK} fontWeight="700">女孩系列</text>
      <text x="10" y="150" fontSize="14" fill={INK} fontWeight="700">男孩系列</text>
      {box(90, 26, "父亲打一个（我讨厌的）孩子", false, 1)}
      {box(310, 26, "我被父亲打", true, 2)}
      {box(530, 26, "一些男孩被老师打（我在看）", false, 3)}
      {box(310, 126, "我被父亲打", true, 4)}
      {box(530, 126, "妈妈打我", false, 5)}
      <path d="M270,48 L306,48 M490,48 L526,48 M490,148 L526,148" stroke={MUTED} strokeWidth="1.5" />
      <path d="M399,72 L399,124" stroke={RED} strokeWidth="1.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite" />
      </path>
      <text x="408" y="102" fontSize="12" fill={RED}>唯一的「共同阶段」= 父亲登场</text>
      <text x="360" y="198" textAnchor="middle" fontSize="12" fill={RED}>虚线框：弗洛伊德自己说它「从未被记起，从未成为意识，是分析的构造」——却「同样必要」</text>
    </svg>
  </div>;
}

// ---- 文本 3：可终结与不可终结的分析 —— 力比多的三种「质地」撞上三角
function FlowsSvg() {
  const [t, setT] = useState(0);
  const TYPES = [
    { name: "黏稠型（Green 的第 I 类）", desc: "沉闷、黏滞：讲当天的琐事，叙述连成一条不肯断开的线，梦被讲成故事。什么都「黏」在那里，不进入三角。" },
    { name: "液态型（第 II 类）", desc: "流得太快：表象飞速变换、话语滔滔不绝，说反话也无所谓，分析「像水从鸭背上滑走」，什么都「挂不住」。" },
    { name: "理想型（第 III 类）", desc: "病人把话串成一条能指链，意义总在事后浮现：「原来这意味着……」——而这个「原来」，最后总被压到俄狄浦斯和阉割上。" },
  ];
  const tri = "360,30 250,190 470,190";
  return <div>
    <div className="seg">{TYPES.map((x, j) => <button key={j} className={t === j ? "on" : ""} onClick={() => setT(j)}>{x.name}</button>)}</div>
    <svg key={t} viewBox="0 0 720 220" style={{ width: "100%", background: "var(--paper)", borderRadius: 12 }}>
      <polygon points={tri} fill="rgba(155,44,31,.06)" stroke={RED} strokeWidth="2" />
      <text x="360" y="140" textAnchor="middle" fontSize="13" fill={RED}>俄狄浦斯三角</text>
      <text x="360" y="208" textAnchor="middle" fontSize="11" fill={MUTED}>底部：阉割的「岩床」</text>
      <rect x="250" y="190" width="220" height="6" fill={MUTED} opacity=".5" />
      {t === 0 && [0, 1, 2].map(i => <ellipse key={i} cx="120" cy={70 + i * 50} rx="46" ry="16" fill={GOLD} opacity=".75">
        <animate attributeName="cx" values="90;210;200;90" dur={`${6 + i}s`} repeatCount="indefinite" />
        <animate attributeName="rx" values="40;60;56;40" dur={`${6 + i}s`} repeatCount="indefinite" />
      </ellipse>)}
      {t === 1 && Array.from({ length: 12 }, (_, i) => <circle key={i} r="5" fill={BLUE}>
        <animateMotion dur={`${1.4 + (i % 4) * .3}s`} begin={`${i * .17}s`} repeatCount="indefinite"
          path={i % 2 ? "M40,40 C300,0 420,0 700,60" : "M40,200 C300,230 440,220 700,170"} />
      </circle>)}
      {t === 2 && Array.from({ length: 8 }, (_, i) => <circle key={i} r="5" fill={GREEN}>
        <animateMotion dur="2.6s" begin={`${i * .32}s`} repeatCount="indefinite" path={`M40,${40 + i * 20} C200,${40 + i * 20} 300,120 360,140`} />
      </circle>)}
      {t === 0 && <text x="620" y="120" textAnchor="middle" fontSize="13" fill={GOLD}>黏在三角外，进不去</text>}
      {t === 1 && <text x="640" y="120" textAnchor="middle" fontSize="13" fill={BLUE}>从三角旁边滑走</text>}
      {t === 2 && <text x="600" y="120" textAnchor="middle" fontSize="13" fill={RED}>「原来这意味着……」→ 三角</text>}
    </svg>
    <p style={{ margin: "8px 0 0", fontSize: 15 }}>{TYPES[t].desc}</p>
    <p style={{ margin: "4px 0 0", fontSize: 13, color: MUTED }}>动画为示意。德勒兹/加塔利的翻转：前两类「阻抗」并非病人的毛病，而是欲望之流本身是反俄狄浦斯的证据——流像熔岩、像渗水一样压向三角的墙。</p>
  </div>;
}

const TEXTS = [
  {
    tab: "① 施瑞伯案例（1911）", svg: <SchreberSvg />,
    material: "施瑞伯法官的回忆录：一场关于上帝、天国光线、太阳、变成女人、世界毁灭的宏大谵妄，充满政治、社会、历史内容；对父亲的回忆只有寥寥几笔。弗洛伊德没见过病人，只读了书。",
    freud: "病因是对弗莱希格医生的同性恋力比多；医生替代父亲，父亲再解释上帝、太阳。到处都碰到父亲？「不怪我，怪性欲的顽固象征」；而且父亲在宗教与古代神话里本就无处不在——神话与无意识是「对等」的。",
    dg: <>施瑞伯生前被天国光线「鸡奸」，死后又被弗洛伊德<C id="oedipalization">俄狄浦斯化</C>。所有政治、历史内容一字不留，仿佛力比多不关心这些。弗洛伊德的两条论据——性欲必须与家庭情结结合、无意识以神话为尺度（<C id="myth_postulate">神话对等公设</C>）——都把社会与宗教推到了欲望「之后」或「之上」。</>,
  },
  {
    tab: "② 一个孩子被打（1919）", svg: <BeatenSvg />,
    material: "一个常见的幻想：「一些男孩在小女孩们面前被（比如老师）打。」这是一个带着学校、群体、观看者的场景。",
    freud: "双重还原：(1) 群体变个人——被打的孩子是「我」的替身，打人者是「父亲的替代」；(2) 排他的两性分组——女孩系列三阶段、男孩系列两阶段。唯一共同的阶段「我被父亲打」，恰恰是从未被记起、由分析构造出来的那一个。",
    dg: <>俄狄浦斯的帝国在这里建立在「缺席」上。两性被强行做成<C id="inclusive_disjunction">排他析取</C>，再用「阉割」这一共同的匮乏把它们分开并教人认命。反过来读：这是一个<C id="group_fantasy">群体幻想</C>——学校、军队、越战的海军陆战队，爸爸妈妈只是社会场中散落的碎片。</>,
  },
  {
    tab: "③ 可终结与不可终结的分析（1937）", svg: <FlowsSvg />,
    material: "弗洛伊德临终前的「遗嘱」式文本：分析能结束吗？疗程越来越长、越来越无尽。他清点疗愈的障碍。",
    freud: "三个质性障碍：(1) 阉割的「岩床」——两面不对称、无法再往下挖；(2) 一种天生的冲突倾向（异性恋/同性恋两股力不可调和）；(3) 无法定位的阻抗——有人的力比多太黏，有人太稀，什么都「挂不住」。",
    dg: <>弗洛伊德从不质疑疗法本身。这些「障碍」恰是疗法的效果：阉割的岩床是<C id="castration_operation">阉割这个分析行为</C>造成的；俄狄浦斯式同性恋是俄狄浦斯化的产物；而太黏、太稀的流则是欲望生产对三角的呐喊（<C id="qualitative_flows">质性的流</C>）。</>,
  },
];

export default function FreudThree() {
  const [i, setI] = useState(0), x = TEXTS[i];
  const col = (title, color, body, icon) => <div style={{ background: "var(--paper)", borderRadius: 12, padding: "12px 14px", borderTop: `3px solid ${color}` }}>
    <div style={{ fontFamily: "var(--serif)", fontWeight: 700, color, marginBottom: 6 }}>{icon} {title}</div>
    <div style={{ fontSize: 15, lineHeight: 1.7 }}>{body}</div>
  </div>;
  return <div className="card">
    <div className="tabs">{TEXTS.map((t, j) => <button key={j} className={i === j ? "on" : ""} onClick={() => setI(j)}>{t.tab}</button>)}</div>
    <div style={{ marginBottom: 12 }}>{x.svg}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>
      {col("材料", BLUE, x.material, "📄")}
      {col("弗洛伊德的读法", RED, x.freud, "🛋️")}
      {col("德勒兹/加塔利的读法", GREEN, x.dg, "🏭")}
    </div>
  </div>;
}
