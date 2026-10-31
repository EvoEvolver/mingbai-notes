// 全书脉络专属图解：「欲望之流的命运」
// 同一股欲望之流，依次经过：欲望生产 → 原始领土机器（编码）→ 专制机器（超编码）
// → 资本主义（解码 + 公理化）→ 俄狄浦斯（私人化进家庭）→ 精神分裂分析（逃逸线）。
// 每一站用不同的「管道」形状处理同一批流动的粒子。
import { useState } from "react";
import { C, useChapter } from "@kit";

const INK = "#1f1b16", MUTED = "#8a8070";
const YS = [52, 92, 132, 172, 212];           // 五股流的入口高度
const FLOW_NAMES = ["奶", "精液", "劳动", "货币", "语言"];

// 每站：一组粒子路径 + 背景装饰
const STATIONS = [
  {
    ch: "ch01", chs: ["ch01", "ch02"], tag: "欲望生产", verb: "连接 · 切断 · 流动", body: "无器官身体（零强度平面）",
    how: "起点不是匮乏，而是生产：嘴接上乳房、眼睛接上太阳，每台欲望机器从流里切下一段，又把自己变成下游的流。流彼此交叉、分叉，没有中心，也没有「谁」在指挥。",
    oedipus: "还不存在。无意识是一座工厂，不是家庭剧场。",
    ids: ["ch01:desiring_machine", "ch01:flows_cuts", "ch01:connective_synthesis", "ch01:body_without_organs", "ch02:desire_as_production"],
    paths: YS.map((y, i) => `M20,${y} C180,${YS[(i + 2) % 5]} 330,${YS[(i + 4) % 5]} 480,${YS[(i + 1) % 5]} S640,${YS[(i + 3) % 5]} 700,${y}`),
  },
  {
    ch: "ch06", chs: ["ch06"], tag: "原始编码", verb: "编码", body: "大地",
    how: "原始领土机器给每一股流贴上标签和去向：哪些女人嫁去哪一族、哪些牲畜用来回礼、哪些果实归谁。规矩被残酷地刻进肉体，变成记忆；联姻制造永远对不平的流动债务。流被分渠管理，但每条渠都是地方性的、多样的。",
    oedipus: "只是一张被移置的「诱饵图像」：乱伦禁令自己造出「妈妈」「姐妹」的名字，再说欲望想要她们。",
    ids: ["ch06:coding_flows", "ch06:earth_full_body", "ch06:cruelty_memory", "ch06:filiation_alliance", "ch06:surplus_value_code"],
    paths: YS.map((y) => `M20,${y} C120,${y} 180,${y} 230,${y} L490,${y} C560,${y} 640,${y} 700,${y}`),
  },
  {
    ch: "ch07", chs: ["ch07"], tag: "专制超编码", verb: "超编码", body: "君主的身体",
    how: "君主（原国家）并不废除部落的地方编码，而是在上面再加一层码：所有流都要先经过他。有限的债务块变成对君主永远还不清的无限之债，税、贡赋、文字与「专制能指」是它的工具。",
    oedipus: "升格为「压抑的表象」：乱伦变成君主的特权（娶姐妹、娶母亲），俄狄浦斯有了名字，但还属于王座，不属于每个家庭。",
    ids: ["ch07:overcoding", "ch07:despot_full_body", "ch07:infinite_debt", "ch07:urstaat", "ch07:royal_incest"],
    paths: YS.map((y) => `M20,${y} C150,${y} 280,${y} 330,${y} C350,${y} 350,132 380,132 L700,132`),
  },
  {
    ch: "ch08", chs: ["ch08"], tag: "资本主义", verb: "解码 + 公理化", body: "资本-货币",
    how: "资本主义把一切旧码都拆掉：赤裸的劳动者撞上游荡的货币，流被彻底解码。但它不让流真正溜走——它不再给每种流写规矩，而是用一套纯数量的「公理」把任何流接回资本，在流与流的落差里抽取剩余价值。墙一被撞破，就在更远处重建。",
    oedipus: "终于「开张」：家庭被私人化、放到社会场外，资本主义把社会形象（老板、祖国）一一「应用」到爸爸-妈妈-我上。",
    ids: ["ch08:decoded_conjunction", "ch08:axiomatic", "ch08:capital_socius", "ch08:flux_surplus", "ch08:displaced_limit", "ch08:reterritorialization"],
    paths: YS.map((y, i) => `M20,${y} C120,${YS[(i + 3) % 5]} 250,${YS[(i + 1) % 5]} 380,${y} L500,${y} C580,${y} 600,132 650,132 L700,132`),
  },
  {
    ch: "ch03", chs: ["ch03", "ch04", "ch05", "ch08"], tag: "俄狄浦斯", verb: "私人化进家庭", body: "家庭三角（爸-妈-我）",
    how: "被解码的欲望在现代社会里最后被关进家里。精神分析把一切——上帝、种族、战争——翻译成爸爸妈妈；三种综合被非法使用：部分对象归于完整的人、包含析取变成「要么…要么…」、游牧的「原来是我！」变成被隔离的自我。流在小三角里打转。",
    oedipus: "成为「情结」本身：资本主义把精神分裂这个外部极限内化为一块私密的殖民地。",
    ids: ["ch03:oedipalization", "ch04:paralogism_application", "ch04:exclusive_disjunction", "ch05:oedipus_bait", "ch08:application", "ch08:oedipus_colony"],
    paths: YS.map((y) => `M20,${y} C160,${y} 250,132 320,132 L360,82 L410,172 L310,172 L360,82 L410,172 L310,172 L360,82`),
  },
  {
    ch: "ch10", chs: ["ch09", "ch10"], tag: "精神分裂分析", verb: "拆除 · 释放 · 逃逸", body: "无器官身体（不动的马达）",
    how: "否定任务：拆掉俄狄浦斯、自我、阉割与剧场；第一积极任务：像机械师一样找出你的欲望机器怎样运转；第二积极任务：看你的欲望朝哪一极投注社会——偏执-法西斯，还是精神分裂-革命。流穿过墙缝，沿逃逸线带出更多逃逸。",
    oedipus: "被拆除：家庭降回「诱导者」，三种综合恢复内在用法，欲望重新直接投注社会场。",
    ids: ["ch09:destroy_task", "ch10:schizo_mechanic", "ch09:line_of_escape", "ch10:molecular_chain", "ch10:two_poles", "ch10:process_breakthrough"],
    paths: YS.map((y, i) => `M20,${y} C200,${y} 330,${132 + (i - 2) * 16} 430,${132 + (i - 2) * 16} C520,${132 + (i - 2) * 22} 600,${[18, 70, 132, 200, 250][i]} 700,${[8, 60, 140, 210, 255][i]}`),
  },
];

function Decor({ k, col }) {
  if (k === 0) return <g>
    {[[150, 70], [300, 190], [420, 100], [560, 160]].map(([x, y], i) =>
      <g key={i}><circle cx={x} cy={y} r="13" fill="var(--card)" stroke={col} strokeWidth="2" />
        <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill={col}>⚙</text></g>)}
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>无中心的接线：每个齿轮都是一处「切流」</text>
  </g>;
  if (k === 1) return <g>
    <rect x="230" y="34" width="260" height="196" rx="10" fill={col} fillOpacity="0.07" stroke={col} strokeDasharray="5 4" />
    {YS.map((y, i) => <g key={i}>
      <line x1="230" y1={y - 10} x2="490" y2={y - 10} stroke={col} strokeOpacity=".5" />
      <line x1="230" y1={y + 10} x2="490" y2={y + 10} stroke={col} strokeOpacity=".5" />
      {[270, 330, 390, 450].map((x) => <line key={x} x1={x} y1={y - 10} x2={x} y2={y - 4} stroke={col} strokeWidth="2" />)}
      <text x="236" y={y - 13} fontSize="10" fill={col}>{["嫁娶", "回礼", "耕作", "交换", "仪式"][i]}之码</text>
    </g>)}
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>大地上刻满记号：每股流有自己的渠与规矩</text>
  </g>;
  if (k === 2) return <g>
    {YS.map((y, i) => <g key={i}>{[120, 200, 270].map((x) => <line key={x} x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={col} strokeOpacity=".4" strokeWidth="2" />)}</g>)}
    <circle cx="390" cy="132" r="26" fill={col} fillOpacity=".15" stroke={col} strokeWidth="3" />
    <text x="390" y="137" textAnchor="middle" fontSize="15">👑</text>
    <rect x="420" y="118" width="260" height="28" rx="6" fill="none" stroke={col} strokeWidth="2" />
    <text x="550" y="108" textAnchor="middle" fontSize="12" fill={col}>无限之债 · 税 · 贡赋</text>
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>旧码还在（灰色刻痕），上面再压一层码：一切经过君主</text>
  </g>;
  if (k === 3) return <g>
    <rect x="380" y="38" width="120" height="188" rx="8" fill={col} fillOpacity=".08" stroke={col} strokeWidth="2" />
    {[60, 80, 100, 120].map((d) => <line key={d} x1={380 + d} y1="38" x2={380 + d} y2="226" stroke={col} strokeOpacity=".35" />)}
    <text x="440" y="30" textAnchor="middle" fontSize="12" fill={col}>公理（纯数量关系）</text>
    <rect x="640" y="112" width="60" height="40" rx="8" fill={col} />
    <text x="670" y="137" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">资本</text>
    <path d="M300,30 C340,10 370,10 378,40" fill="none" stroke={MUTED} strokeDasharray="3 3" />
    <text x="250" y="22" fontSize="11" fill={MUTED}>旧码被拆：流变「赤裸」</text>
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>先解码，再用公理把任何流接回资本</text>
  </g>;
  if (k === 4) return <g>
    <path d="M360,82 L410,172 L310,172 Z" fill={col} fillOpacity=".12" stroke={col} strokeWidth="3" />
    <text x="360" y="72" textAnchor="middle" fontSize="12" fill={INK}>爸爸</text>
    <text x="430" y="186" textAnchor="middle" fontSize="12" fill={INK}>妈妈</text>
    <text x="290" y="186" textAnchor="middle" fontSize="12" fill={INK}>我</text>
    <text x="560" y="110" fontSize="12" fill={MUTED}>老板 → 爸爸</text>
    <text x="560" y="135" fontSize="12" fill={MUTED}>祖国 → 妈妈</text>
    <text x="560" y="160" fontSize="12" fill={MUTED}>社会场 → 我的家</text>
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>社会的一切被「应用」到家庭三角，流只能在里面打转</text>
  </g>;
  return <g>
    <path d="M360,82 L410,172 L310,172 Z" fill="none" stroke={MUTED} strokeOpacity=".4" strokeDasharray="4 6" />
    {[[24, 90], [105, 111], [121, 127], [137, 143], [153, 159], [174, 248]].map(([a, b], i) =>
      <line key={i} x1="440" y1={a} x2="440" y2={b} stroke={INK} strokeWidth="6" strokeOpacity=".7" />)}
    <text x="452" y="26" fontSize="12" fill={MUTED}>墙（系统的界限）</text>
    <text x="620" y="132" fontSize="12" fill={col} fontWeight="700">逃逸线 →</text>
    <text x="360" y="252" textAnchor="middle" fontSize="12" fill={MUTED}>俄狄浦斯三角被拆（虚线），流从墙缝漏出并带出更多逃逸</text>
  </g>;
}

export default function FlowFate() {
  const { color } = useChapter();
  const [k, setK] = useState(0);
  const s = STATIONS[k], col = color(s.ch);
  const W = 720, x0 = 60, step = (W - 120) / (STATIONS.length - 1);
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      {/* 站点 */}
      <svg viewBox={`0 0 ${W} 96`} style={{ width: "100%" }}>
        <line x1={x0} y1="34" x2={W - x0} y2="34" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
        {STATIONS.map((t, i) => {
          const on = i === k, c = color(t.ch), cx = x0 + i * step;
          return <g key={i} style={{ cursor: "pointer" }} onClick={() => setK(i)}>
            <circle cx={cx} cy="34" r={on ? 16 : 11} fill={on ? c : "var(--card)"} stroke={c} strokeWidth="2.5">
              {on && <animate attributeName="r" values="15;18;15" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            <text x={cx} y="38.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "#fff" : c}>{i + 1}</text>
            <text x={cx} y="66" textAnchor="middle" fontSize="12.5" fill={on ? INK : MUTED} fontWeight={on ? 700 : 400}>{t.tag}</text>
            <text x={cx} y="84" textAnchor="middle" fontSize="10.5" fill={MUTED}>{t.verb}</text>
          </g>;
        })}
      </svg>

      {/* 流的场景 */}
      <svg key={k} viewBox="0 0 720 262" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <Decor k={k} col={col} />
        {YS.map((y, i) => <text key={i} x="6" y={y - 8} fontSize="10" fill={MUTED}>{FLOW_NAMES[i]}</text>)}
        {s.paths.map((d, i) => <g key={i}>
          <path d={d} fill="none" stroke={col} strokeOpacity=".28" strokeWidth="2" />
          {[0, 1, 2].map((j) => <circle key={j} r="4.5" fill={col} opacity=".9">
            <animateMotion dur={`${4 + (i % 3) * 0.6}s`} begin={`${-(j * 1.4 + i * 0.5)}s`} repeatCount="indefinite" path={d} />
          </circle>)}
        </g>)}
      </svg>

      <div style={{ borderLeft: `4px solid ${col}`, paddingLeft: 14 }}>
        <p style={{ margin: "0 0 6px" }}><b>第 {k + 1} 站 · {s.tag}（{s.verb}）</b>
          <span style={{ color: "var(--muted)" }}> · 社会的「满盈身体」：{s.body}</span></p>
        <p style={{ margin: "0 0 8px" }}>{s.how}</p>
        <p style={{ margin: "0 0 8px" }}><b>俄狄浦斯此时：</b>{s.oedipus}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: ".95em" }}>
          相关概念：{s.ids.map((id, i) => <span key={id}>{i > 0 && "、"}<C id={id} /></span>)}
          {" · "}{s.chs.map((c, i) => <span key={c}>{i > 0 && " "}<a href={`#/${c}`}>📖 第 {+c.slice(2)} 章</a></span>)}
        </p>
      </div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9em" }}>
        点上方圆点换一站。左边进场的始终是同一批流（奶、精液、劳动、货币、语言），变的只是「管道」的形状：自由接线 → 分渠刻码 → 汇入君主 → 拆码后被公理收回 → 关进三角 → 穿墙逃逸。</p>
    </div>);
}
