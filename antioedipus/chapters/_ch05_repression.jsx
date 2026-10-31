// 第 5 章专属图解 A：压抑的三角链——社会生产 → 家庭（被委托者）→ 欲望生产，以及挡在前面的「俄狄浦斯诱饵」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#8a7f72";

const STEPS = [
  {
    label: "精神分析的读法",
    title: "两项图式：禁令 → 被禁止的欲望",
    text: "法律说「不许娶母亲、不许弑父」。精神分析（借弗雷泽之口）推论：既然要禁止，就说明人本来想要——禁什么，就证明欲望是什么。于是画面上只剩两样东西：家庭的禁令，和「乱伦欲望」。",
  },
  {
    label: "1 社会怕欲望",
    title: "真正的冲突：欲望生产 vs 社会生产",
    text: "欲望本质上是革命性的：哪怕一个很小的真实欲望，组装起来都可能拆掉整片社会部门，动摇剥削、奴役与等级。所以社会必须压抑欲望——而且最好让人连压抑本身也一并渴望。",
  },
  {
    label: "2 委托家庭",
    title: "社会压抑把权力委托给家庭",
    text: "社会生产需要一个既站在社会记录面上、又能插手欲望记录的代理人。家庭正好是：它本是「再生产劳动者」的社会单元，又从孩子最早的年纪起就介入欲望。于是社会压抑委托家庭去执行心理压抑。",
  },
  {
    label: "3 戴上面具",
    title: "家庭压抑欲望，同时给它画一张假脸",
    text: "心理压抑不只压住真正的欲望生产，它还制造一个被移置的形象：把欲望翻译成「对妈妈、对爸爸」的家庭冲动。德勒兹与加塔利称之为「翻译即背叛」。这张假脸就是俄狄浦斯。",
  },
  {
    label: "4 「原来我想要这个！」",
    title: "诱饵生效：欲望被羞辱、被困住",
    text: "主体望向自己的欲望，看到的却是面具：「原来我想要的是这个！」欲望因此羞愧、发呆、无路可走，并被说服以「文明」之名否定自己。被禁止的乱伦其实并不是被欲望的东西——它是压抑造出来、用来诱捕欲望的诱饵。",
  },
];

const NODES = {
  social: { x: 320, y: 58, w: 210, color: BLUE, icon: "🏭", name: "社会生产", sub: "压抑的施动者 · 社会压抑", cid: "social_repression",
    info: "压抑的真正源头：某种特定社会生产形式的结构（剥削、等级、奴役）。它压抑欲望，不是因为欲望想乱伦，而是因为欲望是革命性的。" },
  family: { x: 150, y: 190, w: 232, color: GOLD, icon: "🏠", name: "家庭", sub: "被委托的代理者 · 心理压抑", cid: "delegated_family",
    info: "压抑的执行者（the repressing representation，此处按我们的理解对应家庭这一被委托者）。它截留、筛选、切分欲望之流：「这里是爸爸、这里是妈妈、轮到你哥哥了」。" },
  desire: { x: 500, y: 288, w: 210, color: GREEN, icon: "⚙️", name: "欲望生产", sub: "被压抑的代表 · 真正的对象", cid: "desire_revolutionary",
    info: "压抑真正作用的对象（the repressed representative）：欲望机器的连接、断流、种族、大陆、历史……父母在这里只是普通刺激物，不是主角。" },
  mask: { x: 500, y: 288, w: 190, color: RED, icon: "🎭", name: "俄狄浦斯形象", sub: "被移置的表象 · 诱饵", cid: "oedipus_bait",
    info: "被移置的表象（the displaced represented）：压抑捏出来、贴到欲望脸上的假像——「乱伦欲望」。它并没有被压抑，也无需被压抑；它是诱捕欲望的饵。" },
};

function Box({ n, opacity = 1, onClick, active, dx = 0, dy = 0 }) {
  const h = 62;
  return (
    <g style={{ transform: `translate(${n.x - n.w / 2 + dx}px, ${n.y - h / 2 + dy}px)`, transition: "transform 1s ease, opacity .8s", opacity, cursor: "pointer" }} onClick={onClick}>
      <rect width={n.w} height={h} rx="14" fill="#fffdf8" stroke={n.color} strokeWidth={active ? 4 : 2} />
      <text x="16" y="38" fontSize="24">{n.icon}</text>
      <text x="50" y="28" fontSize="17" fontWeight="700" fill={n.color}>{n.name}</text>
      <text x="50" y="48" fontSize="12" fill={INK} opacity=".75">{n.sub}</text>
    </g>);
}

function Arrow({ d, color, label, lx, ly, show, dashed, anim }) {
  return (
    <g style={{ opacity: show ? 1 : 0, transition: "opacity .8s" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="3" strokeDasharray={dashed ? "8 7" : undefined} markerEnd={`url(#ah-${color.slice(1)})`}>
        {anim && show && <animate attributeName="stroke-dashoffset" values="30;0" dur="1s" repeatCount="indefinite" />}
      </path>
      <text x={lx} y={ly} fontSize="13" fill={color} fontWeight="600" textAnchor="middle" style={{ paintOrder: "stroke", stroke: "#f6f1e7", strokeWidth: 4 }}>{label}</text>
    </g>);
}

export default function RepressionChain() {
  const [s, setS] = useState(0);
  const [sel, setSel] = useState(null);
  const [unmask, setUnmask] = useState(false);
  const go = k => { setS(k); setUnmask(false); };
  const psy = s === 0;
  // 面具位置：0 步时它就是「欲望本身」；1–2 步躲在一旁；3–4 步挡在欲望前面；揭穿后移开
  const maskD = psy ? { dx: 0, dy: 0 } : s < 3 ? { dx: 0, dy: -130 } : unmask ? { dx: -130, dy: -140 } : { dx: -14, dy: 12 };
  const st = STEPS[s];
  const info = sel && NODES[sel];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ flexWrap: "wrap" }}>{STEPS.map((x, j) =>
        <button key={j} className={s === j ? "on" : ""} onClick={() => go(j)}>{x.label}</button>)}</div>

      <svg viewBox="0 0 640 360" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          {[RED, GOLD, BLUE, GREEN, MUTED].map(c => <marker key={c} id={`ah-${c.slice(1)}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={c} /></marker>)}
        </defs>

        {/* 欲望对社会的威胁 */}
        <Arrow d="M520 252 C 600 180, 560 110, 430 70" color={GREEN} label="威胁：能炸掉整片社会部门" lx={565} ly={165} show={s >= 1} dashed anim />
        {/* 社会 → 家庭：委托 */}
        <Arrow d="M240 80 C 180 100, 150 130, 145 156" color={BLUE} label="委托" lx={168} ly={112} show={s >= 2} dashed anim />
        {/* 家庭 → 欲望：压抑 */}
        <Arrow d="M266 205 C 330 230, 360 270, 392 282" color={GOLD} label="心理压抑" lx={315} ly={232} show={s >= 3 || psy} anim={!psy} />
        {psy && <text x="315" y="262" fontSize="12" fill={MUTED} textAnchor="middle">「禁止的，就是想要的」</text>}

        <Box n={NODES.social} opacity={psy ? .12 : 1} active={sel === "social"} onClick={() => setSel("social")} />
        <Box n={{ ...NODES.family, name: psy ? "禁令（家庭 / 法律）" : "家庭" }} opacity={s === 1 ? .3 : 1} active={sel === "family"} onClick={() => setSel("family")} />
        <Box n={NODES.desire} opacity={psy ? 0 : s >= 3 && !unmask ? .25 : 1} active={sel === "desire"} onClick={() => setSel("desire")} />
        <Box n={{ ...NODES.mask, sub: psy ? "精神分析眼中：被压抑的欲望本身" : NODES.mask.sub }} dx={maskD.dx} dy={maskD.dy}
          opacity={s === 1 || s === 2 ? 0 : 1} active={sel === "mask"} onClick={() => setSel("mask")} />

        {/* 主体与视线 */}
        <g style={{ opacity: s === 4 ? 1 : 0, transition: "opacity .8s" }}>
          <text x="60" y="330" fontSize="30">🧍</text>
          <line x1="92" y1="318" x2={unmask ? 400 : 390} y2={unmask ? 298 : 304} stroke={MUTED} strokeWidth="2" strokeDasharray="3 5" />
          <rect x="20" y="248" width="250" height="34" rx="10" fill="#fff" stroke={RED} />
          <text x="145" y="270" fontSize="13" textAnchor="middle" fill={RED}>{unmask ? "……原来面具后面是一整座工厂？" : "「原来我想要的是这个！」"}</text>
        </g>
        {unmask && s === 4 && <g>
          {["流", "断流", "大陆", "种族", "历史", "机器"].map((w, i) =>
            <text key={w} x={420 + (i % 3) * 62} y={337 + Math.floor(i / 3) * 16} fontSize="12" fill={GREEN} opacity="0">{w}
              <animate attributeName="opacity" values="0;1" dur=".6s" begin={`${i * .12}s`} fill="freeze" /></text>)}
        </g>}
      </svg>

      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{st.title}</div>
        <p style={{ margin: "6px 0" }}>{st.text}</p>
        {s === 4 && <button className="btn" style={{ border: "1px solid var(--accent)", background: unmask ? "var(--accent)" : "var(--card)", color: unmask ? "#fff" : "var(--accent)", borderRadius: 99, padding: "4px 14px", cursor: "pointer", font: "inherit", fontSize: 14 }}
          onClick={() => setUnmask(!unmask)}>{unmask ? "↺ 把面具放回去" : "🎭 揭开面具"}</button>}
      </div>
      <div style={{ background: "var(--card)", borderRadius: 12, padding: "10px 14px", fontSize: 15, minHeight: 48 }}>
        {info ? <><b style={{ color: info.color }}>{info.icon} <C id={info.cid}>{info.name}</C></b>：{info.info}</>
          : <span style={{ color: "var(--muted)" }}>👆 点击图中任一方框，查看它在「三项结构」里扮演的角色。</span>}
      </div>
    </div>);
}
