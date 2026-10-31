// 第 6 章专属图解 (b)：同一个病人 K（恩丹布人，据特纳），三种读法
// 精神分析的家庭三角 / 恩丹布占卜的社会分析 / 殖民之后的「棚户区俄狄浦斯」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257", VIOLET = "#5b3f7a";

const MODES = [
  { label: "🛋️ 精神分析的读法（示意）", formula: "3 + 1", sub: "爸爸、妈妈、我，再加一个折叠一切的超越项（阳具 / 父之名）",
    caption: "一切都被折回家庭：外祖父的亡灵只是「严父」的替身，K 的失败与软弱是没处理好的俄狄浦斯冲突。注意——这一栏是我们按常见精神分析思路构拟的示意读法，书中说的是：在「我们被训练过的眼睛」看来，起点像是俄狄浦斯式的。" },
  { label: "🥁 恩丹布占卜（特纳）", formula: "4 + n", sub: "祖先与姻亲的系统：每个家庭角色都同时是政治、经济、领土上的位置",
    caption: "占卜师和医者做的是一场「社会分析」：酋长位、家系分支、联姻与归属、殖民关系……病因（祖先的门牙）一路追到村落政治。疗愈仪式时断时续：击鼓、吟唱、村民轮流发言、病人发言、召唤亡灵、医者解释，再从头开始——这是一场以病人为中心的群体分析。" },
  { label: "🏚️ 殖民之后：棚户区的俄狄浦斯", formula: "3 + 1（但合不拢）", sub: "社会再生产被夺走，人被压回「只是家庭」",
    caption: "殖民者废除或利用酋长制，并对被殖民者说：你父亲就是你父亲，你外祖父就是外祖父，别把他们当成酋长；你的家就只是你的家。于是一个俄狄浦斯框架被勾勒出来。但它合不拢：三角的每个角都粘着白人、传教士、收税官、替行政当局办事的村中显贵。" },
];

// 每个节点：名字、颜色、三种模式下的位置 [x,y] 或 null（隐藏），以及三种模式下的说明
const NODES = {
  k: { n: "病人 K", c: RED, p: [[330, 330], [330, 225], [330, 300]],
    t: ["一个软弱、难以相处、虚荣、事事失败的儿子：看上去是没处理好的俄狄浦斯冲突。",
      "恩丹布人从母系、本应住在母系亲属中，K 却在父亲的母系里待得格外久（他是父亲的宠儿），还娶了父方的表亲。父亲一死，他被赶回母系村落；他没能扮演调解人的角色，也就失去了竞选酋长的资格。",
      "他被告知：你的问题只是你家里的问题，去你的角落里被三角化吧。"] },
  father: { n: "父亲（已故）", c: BLUE, p: [[160, 150], [165, 225], [170, 140]],
    t: ["禁止者、罪疚之源；K 对他又爱又恨。",
      "K 是他的宠儿。他死后 K 在父系那边失去立足之地——这是家系归属与居住权的问题，而不是一个「情结」。",
      "「你父亲就是你父亲，别把他当成酋长。」"] },
  mother: { n: "母亲", c: GREEN, p: [[500, 150], [495, 225], [490, 140]],
    t: ["欲望最初的对象。",
      "在母系社会里，母亲首先意味着 K 本该归属的那条家系。父亲、母亲在这里都只起「刺激物」的作用，真正组织局面的是酋长和他身边的人物。",
      "家庭只剩一个用途：为一种新的再生产秩序供应「材料」。"] },
  grandpa: { n: "外祖父的亡灵", c: VIOLET, p: [[330, 55], [330, 50], [330, 40]],
    t: ["严父 / 超我的替身，残酷地责备 K。",
      "致病的门牙主要是他的。而他曾是一位大酋长——所以他的责备不指向「父之名」，而是打开了「历史上所有的名字」：继承、让位、谁才是真酋长。",
      "被降格为「只是外祖父」，不再是酋长。"] },
  incisor: { n: "祖先猎人的门牙", c: GOLD, p: [null, [330, 135], null],
    t: ["", "两颗上门牙装在圣袋里，可能逃出来钻进病人身体。诊断就是追问：是谁的牙？为什么咬他？——这一问把整个村落的政治都牵了出来。", ""] },
  realchief: { n: "「真正的酋长」", c: VIOLET, p: [null, [150, 50], null],
    t: ["", "外祖父的继任者，因害怕被施巫术而让出了王座。于是在位者并不是「真正的」酋长。", ""] },
  heir: { n: "有野心的继承人", c: VIOLET, p: [null, [520, 50], null],
    t: ["", "聪明、有野心，却并不掌权。权力的空转正是这场病的背景。", ""] },
  patri: { n: "父亲一方的住区", c: BLUE, p: [null, [140, 330], null],
    t: ["", "K 在这一支里长大、娶妻；他的房子一侧紧挨着他们。", ""] },
  matri: { n: "K 自己的母系住区", c: GREEN, p: [null, [520, 330], null],
    t: ["", "他被赶回的地方；他的房子另一侧紧挨着他们。", ""] },
  house: { n: "K 的房子", c: INK, p: [null, [330, 352], null],
    t: ["", "正好楔在两片房屋之间：一边是父亲的人，一边是自己的母系。住在哪里，本身就是他处境的地图。", ""] },
  english: { n: "英国殖民当局", c: INK, p: [null, [95, 140], [70, 90]],
    t: ["", "不承认酋长职位。村子本身就是两群逃避英国人的人合并而成，日渐贫困衰败，长老们哀叹今不如昔。", "白人、传教士——粘在「父亲」这个角上，三角因此合不拢。"] },
  village: { n: "衰败的村落", c: MUTED, p: [null, [575, 140], null],
    t: ["", "两个群体合并、贫困、分裂：这些都被欲望直接投注，而不只是「背景」。", ""] },
  collector: { n: "收税官 / 行政代理人", c: INK, p: [null, null, [570, 90]],
    t: ["", "", "收税官、出口商、成了行政代理人的村中显贵、诅咒白人的长老、投身政治斗争的年轻人……三角的各个角都粘在压迫性的社会再生产的代理人身上。"] },
};

const EDGES = [
  [["k", "father"], ["k", "mother"], ["father", "mother"], ["grandpa", "father", "替身"]],
  [["k", "house"], ["house", "patri"], ["house", "matri"], ["k", "father"], ["father", "patri"], ["k", "mother"], ["mother", "matri"],
    ["grandpa", "incisor"], ["incisor", "k", "咬"], ["grandpa", "realchief", "让位"], ["grandpa", "heir"], ["grandpa", "mother"],
    ["english", "realchief", "不承认酋长"], ["english", "father"], ["village", "matri"], ["village", "mother"], ["k", "heir", "未成调解人"]],
  [["k", "father"], ["k", "mother"], ["father", "mother"], ["english", "father", "粘连"], ["collector", "mother", "粘连"], ["english", "k"], ["collector", "k"]],
];

export default function NdembuDiagnosis() {
  const [m, setM] = useState(1);
  const [sel, setSel] = useState("k");
  const M = MODES[m];
  const pos = id => NODES[id].p[m];
  const cur = NODES[sel] && NODES[sel].p[m] ? sel : "k";
  const tri = m !== 1;

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
        <button key={j} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.label}</button>)}</div>

      <svg viewBox="0 0 660 390" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <style>{`.ch06e{animation:ch06f .9s ease .45s both}@keyframes ch06f{from{opacity:0}to{opacity:1}}
          .ch06n{transition:transform .8s cubic-bezier(.5,0,.2,1),opacity .6s}`}</style>
        {tri && <polygon key={"tri" + m} className="ch06e" points={`${pos("father")} ${pos("mother")} ${pos("k")}`}
          fill={RED} fillOpacity=".06" stroke={RED} strokeOpacity=".3" strokeWidth="2" strokeDasharray={m === 2 ? "10 7" : "none"} />}
        <g key={"edges" + m} className="ch06e">
          {EDGES[m].map(([a, b, l], i) => {
            const A = pos(a), B = pos(b);
            if (!A || !B) return null;
            const on = sel === a || sel === b;
            return <g key={i}>
              <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={on ? RED : INK} strokeOpacity={on ? .7 : .22} strokeWidth={on ? 2.4 : 1.4}
                strokeDasharray={l === "替身" || l === "粘连" ? "5 5" : "none"} />
              {l && <text x={(A[0] + B[0]) / 2} y={(A[1] + B[1]) / 2 - 5} textAnchor="middle" fontSize="11" fill={MUTED}>{l}</text>}
            </g>;
          })}
        </g>
        {Object.entries(NODES).map(([id, nd]) => {
          const p = nd.p[m] || nd.p[1] || nd.p[2];
          const vis = !!nd.p[m];
          const w = Math.max(70, nd.n.length * 13 + 18);
          return <g key={id} className="ch06n" style={{ transform: `translate(${vis ? p[0] : 330}px,${vis ? p[1] : 200}px)`, opacity: vis ? 1 : 0, cursor: vis ? "pointer" : "default", pointerEvents: vis ? "auto" : "none" }}
            onClick={() => setSel(id)}>
            <rect x={-w / 2} y="-15" width={w} height="30" rx="15" fill={cur === id ? nd.c : "#fffdf8"} stroke={nd.c} strokeWidth="2" />
            <text textAnchor="middle" dy="5" fontSize="13" fill={cur === id ? "#fffdf8" : nd.c}>{nd.n}</text>
            {m === 2 && id === "grandpa" && <line x1={-w / 2} x2={w / 2} y1="0" y2="0" stroke={RED} strokeWidth="2" />}
          </g>;
        })}
        <text x="644" y="376" textAnchor="end" fontSize="22" fontFamily="var(--serif)" fill={m === 1 ? GREEN : RED}>{M.formula}</text>
      </svg>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
        <div>
          <b style={{ color: NODES[cur].c }}>{NODES[cur].n}</b>
          <p style={{ margin: "4px 0", fontSize: 15 }}>{NODES[cur].t[m] || "（点图中的节点查看）"}</p>
          <p style={{ margin: 0, fontSize: 13, color: MUTED }}>点图中任意节点查看它在这种读法里的意思。</p>
        </div>
        <div>
          <b>{M.formula}：</b><span style={{ fontSize: 14 }}>{M.sub}</span>
          <p style={{ margin: "4px 0", fontSize: 14 }}>{M.caption}</p>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: MUTED }}>
        病例细节据书中转述的特纳（Victor Turner）民族志；布局与连线是示意。对照的要点：<C id="ndembu_cure">恩丹布疗愈</C>把欲望直接接到社会场上，
        而<C id="colonial_oedipus">俄狄浦斯</C>只有在殖民剥夺了人们对社会再生产的掌控之后才被「装」上去。
      </p>
    </div>);
}
