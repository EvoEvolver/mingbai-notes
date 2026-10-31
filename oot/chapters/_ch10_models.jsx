// 第 10 章专属图解 ②：三个模型 —— 三门经验科学投下三对概念，覆盖人文科学的三个区域
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16";
const XS = [150, 315, 480];

const M = [
  { src: "生物学", pair: ["功能", "规范"], region: "心理学", col: GREEN, cid: "function_norm",
    surface: "人是有功能的存在：接受刺激（生理的，也有社会的、文化的）、作出反应、适应、进化、消除失衡，找到执行功能的平均规范。",
    second: "心理学也能次要地用冲突与意义、规则与系统来解读——比如把心理冲突看作社会冲突，把症状读作文本。" ,
    poles: ["正常", "病态"], badWord: "「病态意识」", flipBy: "戈尔德斯坦" },
  { src: "经济学", pair: ["冲突", "规则"], region: "社会学", col: RED, cid: "conflict_rule",
    surface: "人有需要和欲望，追求利益与利润，因而与他人对立，处在不可化约的冲突中；他订立规则，规则既限制冲突，也是冲突的结果。",
    second: "社会学常被引向次要模型：把群体当作有机体（功能），或当作写成、说出的文本（意义系统）。",
    poles: ["可调和", "致命冲突"], badWord: "「原始心态」", flipBy: "莫斯" },
  { src: "语文学 / 语言学", pair: ["意义", "系统"], region: "文学与神话研究", col: BLUE, cid: "signification_system",
    surface: "人的行为都在试图说出点什么：最细小的手势、失误都有意义；物品、仪式、习俗、话语与痕迹构成一个融贯的符号系统。",
    second: "文学与神话分析也能按功能的融贯或冲突与规则来进行，例如在意义分析上叠加社会学模型研究印欧神话。",
    poles: ["有意义", "无意义"], badWord: "「无意义话语」", flipBy: "杜梅齐尔" },
];

const ERAS = [
  { label: "浪漫时期", dom: 0, text: "生物模型称王：人、他的心灵、他的群体、社会、所说的语言，都被当作「活着的」东西，以有机的方式存在，用功能来分析。" },
  { label: "孔德 · 马克思", dom: 1, text: "经济模型称王：人和他的全部活动都是冲突的场所，既是冲突或明或暗的表达，又是冲突或成或败的解决。" },
  { label: "弗洛伊德之后", dom: 2, text: "语文学模型（诠释、发现隐藏意义）与语言学模型（为符号系统赋予结构）称王。整个一百年：从「活的模型」走向「语言的模型」。" },
];

function PairText({ x, y, pair, emph, col }) {
  // emph: -1 两项等重；0 第一项；1 第二项
  const w = i => emph === -1 ? 700 : emph === i ? 800 : 400;
  const s = i => emph === -1 ? 16 : emph === i ? 19 : 13;
  const o = i => emph === -1 || emph === i ? 1 : .45;
  return <text x={x} y={y} textAnchor="middle" fill={col}>
    <tspan fontSize={s(0)} fontWeight={w(0)} opacity={o(0)}>{pair[0]}</tspan>
    <tspan fontSize="14" fill={INK} opacity=".5"> / </tspan>
    <tspan fontSize={s(1)} fontWeight={w(1)} opacity={o(1)}>{pair[1]}</tspan>
  </text>;
}

export default function ThreeModels() {
  const [mode, setMode] = useState(0);
  const [r, setR] = useState(0);
  const [era, setEra] = useState(0);
  const [flip, setFlip] = useState(0);

  const dom = mode === 1 ? ERAS[era].dom : null;
  const srcOn = i => mode === 0 ? i === r : mode === 1 ? i === dom : true;

  return <div className="card" style={{ display: "grid", gap: 12 }}>
    <div className="seg">
      {["三对概念", "一百年的王朝更替", "第二项的翻转"].map((t, j) =>
        <button key={j} className={mode === j ? "on" : ""} onClick={() => setMode(j)}>{t}</button>)}
    </div>
    {mode === 0 && <div className="seg" style={{ marginBottom: 0 }}>{M.map((m, j) =>
      <button key={j} className={r === j ? "on" : ""} onClick={() => setR(j)}>{m.region}</button>)}</div>}
    {mode === 1 && <div className="seg" style={{ marginBottom: 0 }}>{ERAS.map((e, j) =>
      <button key={j} className={era === j ? "on" : ""} onClick={() => setEra(j)}>{j + 1}. {e.label}</button>)}</div>}
    {mode === 2 && <div className="seg" style={{ marginBottom: 0 }}>
      <button className={flip === 0 ? "on" : ""} onClick={() => setFlip(0)}>第一项为主：功能 · 冲突 · 意义</button>
      <button className={flip === 1 ? "on" : ""} onClick={() => setFlip(1)}>第二项为主：规范 · 规则 · 系统</button>
    </div>}

    <svg viewBox="0 0 560 340" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
      <defs>
        <marker id="ar10m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={INK} opacity=".6" /></marker>
      </defs>
      <text x="8" y="46" fontSize="11" fill="var(--muted)">经验科学</text>
      <text x="8" y="152" fontSize="11" fill="var(--muted)">投影面</text>
      <text x="8" y="274" fontSize="11" fill="var(--muted)">人文科学</text>

      {/* 投影光束 */}
      {M.map((m, i) => <polygon key={"beam" + i} points={`${XS[i] - 34},62 ${XS[i] + 34},62 ${XS[i] + 70},128 ${XS[i] - 70},128`}
        fill={m.col} opacity={srcOn(i) ? .16 : .04} style={{ transition: ".4s" }}>
        {srcOn(i) && <animate attributeName="opacity" values=".1;.24;.1" dur="2.4s" repeatCount="indefinite" />}
      </polygon>)}

      {/* 源科学 */}
      {M.map((m, i) => <g key={"src" + i} opacity={srcOn(i) ? 1 : .4} style={{ transition: ".4s" }}>
        <rect x={XS[i] - 66} y="22" width="132" height="40" rx="10" fill="#fff" stroke={m.col} strokeWidth={srcOn(i) ? 3 : 1.5} />
        <text x={XS[i]} y="48" textAnchor="middle" fontSize="15" fontWeight="700" fill={m.col}>{m.src}</text>
        {mode === 1 && dom === i && <text x={XS[i]} y="16" textAnchor="middle" fontSize="16">👑</text>}
      </g>)}

      {/* 概念对 */}
      {M.map((m, i) => <g key={"pair" + i}>
        <rect x={XS[i] - 72} y="128" width="144" height="38" rx="19" fill="#fff" stroke={m.col} strokeWidth="1.5" opacity=".95" />
        <PairText x={XS[i]} y="153" pair={m.pair} emph={mode === 2 ? flip : -1} col={m.col} />
      </g>)}

      {/* 连线：概念对 → 学科区域 */}
      {mode === 0 && M.map((m, i) => {
        const main = i === r;
        return <line key={"l" + i} x1={XS[i]} y1="168" x2={XS[r]} y2="244" stroke={m.col}
          strokeWidth={main ? 5 : 2} strokeDasharray={main ? "" : "5 5"} opacity={main ? .9 : .5} markerEnd="url(#ar10m)">
          {!main && <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />}
        </line>;
      })}
      {mode === 1 && M.map((m, i) => <line key={"e" + i} x1={XS[dom]} y1="168" x2={XS[i]} y2="244" stroke={M[dom].col}
        strokeWidth={i === dom ? 4 : 3} opacity=".75" markerEnd="url(#ar10m)">
        <animate attributeName="opacity" values=".4;.85;.4" dur="2s" begin={`${i * .25}s`} repeatCount="indefinite" /></line>)}
      {mode === 2 && M.map((m, i) => <line key={"f" + i} x1={XS[i]} y1="168" x2={XS[i]} y2="244" stroke={m.col} strokeWidth="3" opacity=".7" markerEnd="url(#ar10m)" />)}

      {/* 学科区域 */}
      {M.map((m, i) => {
        const hi = mode === 0 ? i === r : true;
        return <g key={"reg" + i} opacity={hi ? 1 : .45} style={{ transition: ".4s" }}>
          {mode === 2 && flip === 0 ? <>
            <rect x={XS[i] - 70} y="248" width="68" height="44" rx="10" fill={m.col} opacity=".18" />
            <rect x={XS[i] + 2} y="248" width="68" height="44" rx="10" fill="#fff" stroke={m.col} strokeDasharray="4 3" />
            <text x={XS[i] - 36} y="275" textAnchor="middle" fontSize="12" fill={INK}>＋ {m.poles[0]}</text>
            <text x={XS[i] + 36} y="275" textAnchor="middle" fontSize="12" fill={RED}>－ {m.poles[1]}</text>
            <line x1={XS[i]} y1="244" x2={XS[i]} y2="296" stroke={INK} strokeWidth="2" strokeDasharray="2 3" />
            <text x={XS[i]} y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill={m.col}>{m.region}</text>
          </> : mode === 2 ? <>
            <ellipse cx={XS[i]} cy="270" rx="70" ry="24" fill={m.col} opacity=".14" stroke={m.col} strokeWidth="2">
              <animate attributeName="ry" values="22;26;22" dur="2.6s" repeatCount="indefinite" /></ellipse>
            <text x={XS[i]} y="267" textAnchor="middle" fontSize="13" fontWeight="700" fill={m.col}>{m.region}</text>
            <text x={XS[i]} y="284" textAnchor="middle" fontSize="11" fill={INK}>自成一体的体系</text>
          </> : <>
            <rect x={XS[i] - 72} y="248" width="144" height="42" rx="10" fill={m.col} opacity={hi ? .9 : .5} />
            <text x={XS[i]} y="274" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">{m.region}</text>
          </>}
        </g>;
      })}
      {mode === 2 && flip === 1 && <g>
        <line x1="20" y1="328" x2="540" y2="328" stroke={GOLD} strokeWidth="3" markerEnd="url(#ar10m)" />
        <text x="20" y="322" fontSize="12" fill={GOLD}>意识</text>
        <text x="520" y="322" textAnchor="end" fontSize="12" fill={GOLD}>无意识</text>
        <text x="300" y="322" textAnchor="middle" fontSize="12" fill={GOLD}>新的轴取代了「正常 / 病态」</text>
      </g>}
    </svg>

    <div>
      {mode === 0 && <>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{M[r].region}：以 <C id={M[r].cid}>{M[r].pair.join(" / ")}</C> 为基本模型</div>
        <p style={{ margin: "6px 0" }}>📐 在<b>{M[r].src}</b>的投影面上，{M[r].surface}</p>
        <p style={{ margin: "6px 0", color: "var(--muted)", fontSize: 15 }}>虚线 = 次要模型。{M[r].second}三对概念遍布整个人文科学，所以学科边界总是模糊；区分它们的形式标准是：<b>哪一对是基本模型，其余怎样排在次要位置</b>。</p>
      </>}
      {mode === 1 && <>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>第 {era + 1} 朝：{ERAS[era].label}</div>
        <p style={{ margin: "6px 0" }}>{ERAS[era].text}</p>
        <p style={{ margin: "6px 0", color: "var(--muted)", fontSize: 15 }}>福柯说，整部 19 世纪以来的人文科学史，都可以沿着这三个模型的「王朝更替」重写一遍。</p>
      </>}
      {mode === 2 && (flip === 0 ? <>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>第一项为主：学科内部总有一正一负</div>
        <p style={{ margin: "6px 0" }}>只要功能压过规范、冲突压过规则、意义压过系统，人文科学就得在自己的领域里划一道价值线：正常与病态（里博、让内的病理心理学，涂尔干的「社会病理」，列维-布留尔笔下近乎病态的信仰）、可调和与致命的冲突、有意义与无意义的领域。它总指认出一个「他者」。</p>
      </> : <>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>第二项为主：每个体系自有其融贯性</div>
        <p style={{ margin: "6px 0" }}>从规范、规则、系统出发，每个区域都有自己的一致性和有效性，再也不能谈 {M.map(m => m.badWord).join("、")}。领域因多元化反而统一了。{M.map(m => m.flipBy).join("、")}大致代表各模型内部翻转的时刻；而弗洛伊德最先抹掉正负之分，预示了整体转向。</p>
        <p style={{ margin: "6px 0", color: "var(--muted)", fontSize: 15 }}>规范、规则、系统都不呈现给日常意识，于是「正常/病态」让位于「意识/无意识」：见 <C id="representation_unconscious">表征与无意识</C>。</p>
      </>)}
    </div>
  </div>;
}
