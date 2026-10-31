// 导言与序言 · 专属图解：①「生产之镜」三态（对立 / 共享语法 / 打破镜子）；② 全书路线图（五章各拆哪块镜片）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3f6b45";

const ROWS = [
  {
    key: "人", left: "经济人 homo economicus", right: "劳动者 homo faber",
    sym: "交换中的人：给予·回应",
    shared: "两边都先认定「人本质上是生产者」。政治经济学说人是追逐利益、计算得失的经济人；马克思拆穿了这个神话，却换上「通过劳动创造价值的人」。Poster 提醒：富兰克林和马克思都同意人是「制造工具的动物」。",
    symText: "在象征交换里，人不是先作为「生产力」存在、再去交换；人就在给予与回应的关系之中。Poster 用「言语」（la parole）举例：说话时意义来回传递，有得也有失。",
    cid: "productivism",
  },
  {
    key: "价值", left: "交换价值（市场价格）", right: "使用价值（真实有用）",
    sym: "礼物：不可折算",
    shared: "马克思把交换价值的「抽象」翻过来，露出背后「具体」的使用价值。鲍德里亚说这只是看到同一枚硬币的背面：把使用价值当作交换价值的「彼岸」，等于把一切超越都锁在价值这块场地里。",
    symText: "象征交换中流通的东西不按「有用多少」或「值多少」来衡量。礼物的意义在于它在关系中被给出、被回赠，一旦折算成价值，象征关系就被抹掉了。",
    cid: "use_value",
  },
  {
    key: "劳动", left: "抽象劳动（可计时的工时）", right: "具体劳动（应被解放）",
    sym: "耗费：纯粹的损失",
    shared: "马克思用「具体劳动」反对「抽象劳动」，但「劳动」这个西方理性主义概念本身没被追问。把人的各种活动统统看成劳动，本身就是一次抽象和化约。",
    symText: "象征交换里有能量与意义的释放，是「纯粹的损失」也是收获。政治经济学恰恰相反：它从不认赔，连战争最后都化为价值的积累与再投资。",
    cid: "labor_power",
  },
  {
    key: "需要", left: "消费者的理性需要", right: "人的真实需要（被资本扭曲）",
    sym: "互惠的义务与挑战",
    shared: "两边都设想一个「需要—满足」的人：需要是天然的、可计算的，生产就是为了满足它。马克思只是指控资本主义没有满足「真正的」需要。",
    symText: "在象征秩序里，交换的动力不是「满足需要」，而是关系中的义务：收到了就得回应，回应本身又是一种挑战。",
    cid: "use_value",
  },
  {
    key: "自然", left: "待开发的资源", right: "被劳动改造的对象",
    sym: "不被还原为生产力",
    shared: "人面对自然这个「必然性」，必须投入劳动、借助技术，迫使它交出财富。政治经济学与马克思主义在这里完全一致——都是以征服自然为人的目的（telos）的人类学，生态灾难出现后它就显得愈发可疑。",
    symText: "在这种视角里，劳动与自然都被还原为待实现的「价值」；象征交换的维度中没有这种单向的榨取，而是意义与行为的互相往来。",
    cid: "domination_of_nature",
  },
  {
    key: "历史", left: "市场是自然秩序", right: "生产方式依次更替",
    sym: "断裂：象征社会 ≠ 不发达的生产",
    shared: "政治经济学把市场说成永恒的自然；马克思把生产方式历史化，却又用「生产」去读全部历史，把原始社会看成生产力还不发达的阶段——仍然是用今天的镜子照过去。",
    symText: "鲍德里亚要说的是：原始社会与资本主义之间是深刻的断裂，不是程度差别。不过 Poster 也指出，如何让这种断裂变得可理解，鲍德里亚并没有给出理论。",
    cid: "universalization",
  },
];

const MODES = ["① 两侧对立", "② 共享语法", "③ 打破镜子"];
const MODE_NOTE = [
  "表面上，马克思主义（右）站在政治经济学（左）的对面：一边为资本辩护，一边揭露剥削。点任意一行看双方各自说什么。",
  "镜子显形：每一组对立都写在同一个词上——人、价值、劳动、需要、自然、历史。批判只是把概念翻到背面，「生产」这面镜子本身原封未动。",
  "鲍德里亚的做法：不在镜中换边站，而是打碎镜子，去看「生产」语法之外的象征交换。两侧的概念一起褪色。",
];

export function MirrorOfProduction() {
  const [mode, setMode] = useState(0);
  const [sel, setSel] = useState(0);
  const r = ROWS[sel];
  const y0 = 92, dy = 54;
  const broken = mode === 2;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((m, j) =>
        <button key={j} className={mode === j ? "on" : ""} onClick={() => setMode(j)}>{m}</button>)}</div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{MODE_NOTE[mode]}</p>
      <svg viewBox="0 0 640 430" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <text x="135" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={BLUE} opacity={broken ? .35 : 1}>政治经济学（资本）</text>
        <text x="505" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={RED} opacity={broken ? .35 : 1}>马克思主义的批判</text>
        {/* 镜面 */}
        <g key={"mirror" + mode}>
          <rect x="262" y="48" width="116" height="358" rx="10"
            fill={mode === 1 ? "#f3e6c4" : "#e8edf2"} stroke={mode === 1 ? GOLD : "#9aa7b4"} strokeWidth="2" opacity={broken ? .25 : 1} />
          <text x="320" y="68" textAnchor="middle" fontSize="13" fill={INK} opacity={broken ? .3 : .75}>
            {mode === 0 ? "批判 ⇄ 被批判" : "镜面：生产"}</text>
          {mode === 0 && <rect x="270" y="56" width="10" height="340" fill="#fff" opacity=".7">
            <animate attributeName="x" values="270;360;270" dur="4s" repeatCount="indefinite" /></rect>}
          {broken && <>
            <polyline points="320,48 300,120 338,170 296,240 342,300 310,360 326,406" fill="none" stroke={INK} strokeWidth="2.5"
              strokeDasharray="420" strokeDashoffset="420">
              <animate attributeName="stroke-dashoffset" from="420" to="0" dur=".7s" fill="freeze" /></polyline>
            <path d="M300,120 L266,150 M338,170 L376,196 M296,240 L262,268 M342,300 L378,330" stroke={INK} strokeWidth="1.5" opacity=".6" />
          </>}
        </g>
        {ROWS.map((row, i) => {
          const y = y0 + i * dy, on = i === sel, fade = broken ? .28 : 1;
          return <g key={row.key} style={{ cursor: "pointer" }} onClick={() => setSel(i)}>
            <rect x="14" y={y - 18} width="232" height="36" rx="8" fill={on ? "#dfe7f0" : "#fff"} stroke={BLUE} strokeWidth={on ? 2 : 1} opacity={fade} />
            <text x="130" y={y + 5} textAnchor="middle" fontSize="13.5" fill={BLUE} opacity={fade}>{row.left}</text>
            <rect x="394" y={y - 18} width="232" height="36" rx="8" fill={on ? "#f4e1dc" : "#fff"} stroke={RED} strokeWidth={on ? 2 : 1} opacity={fade} />
            <text x="510" y={y + 5} textAnchor="middle" fontSize="13.5" fill={RED} opacity={fade}>{row.right}</text>
            {mode === 0 && <text x="320" y={y + 5} textAnchor="middle" fontSize="18" fill={INK} opacity=".35">⟷</text>}
            {mode === 1 && <>
              <line x1="246" y1={y} x2="286" y2={y} stroke={GOLD} strokeWidth="2" strokeDasharray="4 3" />
              <line x1="354" y1={y} x2="394" y2={y} stroke={GOLD} strokeWidth="2" strokeDasharray="4 3" />
              <rect x="286" y={y - 16} width="68" height="32" rx="16" fill={on ? GOLD : "#fff"} stroke={GOLD} strokeWidth="2">
                <animate attributeName="opacity" values="0;1" dur=".5s" begin={`${i * .12}s`} fill="freeze" /></rect>
              <text x="320" y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={on ? "#fff" : GOLD}>{row.key}</text>
            </>}
            {broken && <g>
              <rect x="150" y={y - 17} width="340" height="34" rx="17" fill={on ? GREEN : "#fff"} stroke={GREEN} strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0;1" dur=".5s" begin={`${.6 + i * .12}s`} fill="freeze" /></rect>
              <text x="320" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={on ? "#fff" : GREEN} opacity="0">{row.key} → {row.sym}
                <animate attributeName="opacity" values="0;1" dur=".5s" begin={`${.6 + i * .12}s`} fill="freeze" /></text>
            </g>}
          </g>;
        })}
        <text x="320" y="424" textAnchor="middle" fontSize="12" fill={INK} opacity=".55">点击任意一行查看说明</text>
      </svg>
      <div style={{ borderLeft: `4px solid ${broken ? GREEN : mode === 1 ? GOLD : INK}`, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 4 }}>「{r.key}」 · <C id={broken ? "symbolic_exchange" : r.cid}>{broken ? "象征交换" : "相关概念"}</C></div>
        {mode === 0 && <p style={{ margin: 0 }}><b style={{ color: BLUE }}>左：</b>{r.left}。<b style={{ color: RED }}>右：</b>{r.right}。看上去针锋相对——切到「② 共享语法」看看它们其实站在哪里。</p>}
        {mode === 1 && <p style={{ margin: 0 }}>{r.shared}</p>}
        {mode === 2 && <p style={{ margin: 0 }}>{r.symText}</p>}
      </div>
    </div>);
}

const SHARDS = [
  { no: 1, title: "劳动的概念", piece: "劳动 · 使用价值 · 需要",
    text: "拆最核心的一块：马克思用来批判资本的「使用价值」「具体劳动」「劳动力」，本身就是政治经济学的产物。另有「劳动伦理 vs 游戏美学」的讨论。" },
  { no: 2, title: "马克思主义人类学与对自然的支配", piece: "自然 · 人",
    text: "追问「人通过劳动征服自然」这套人类学从哪里来：启蒙的道德哲学、犹太—基督教把自然当作对立面的传统。" },
  { no: 3, title: "历史唯物主义与原始社会", piece: "历史（向过去投射）",
    text: "检查马克思主义人类学家怎样把「生产方式」「剩余」套到原始社会上，并提出「反-生产」：原始社会的剩余是用来耗费与交换的。" },
  { no: 4, title: "论古代与封建生产方式", piece: "历史（奴隶、农奴、匠人）",
    text: "以奴隶与主人等关系为例：用「劳动 / 劳动力」的网格回溯过去，会把其中互惠的象征关系读丢。" },
  { no: 5, title: "马克思主义与政治经济学体系", piece: "镜子本身：代码与第三阶段",
    text: "政治经济学进入「第三阶段」：主导的不再是商品生产，而是符号与代码。随之重新讨论矛盾、颠覆、阶级与革命。" },
];

export function BookRoadmap() {
  const [i, setI] = useState(0);
  const s = SHARDS[i];
  // 五块竖向镜片，边界参差
  const xs = [20, 136, 250, 372, 492, 620];
  const jag = (x, k) => `${x},20 ${x + (k % 2 ? 8 : -8)},70 ${x + (k % 2 ? -6 : 6)},120 ${x},170`;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox="0 0 640 220" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {SHARDS.map((sh, k) => {
          const l = xs[k], rr = xs[k + 1], on = k === i;
          const left = k === 0 ? `${l},20 ${l},170` : jag(l, k);
          const right = k === 4 ? `${rr},170 ${rr},20` : jag(rr, k + 1).split(" ").reverse().join(" ");
          return <g key={k} style={{ cursor: "pointer" }} onClick={() => setI(k)}>
            <polygon points={`${left} ${right}`} fill={on ? "#f3e6c4" : "#e8edf2"} stroke={on ? GOLD : "#9aa7b4"} strokeWidth={on ? 3 : 1.5}
              transform={on ? "translate(0,-6)" : ""} />
            <text x={(l + rr) / 2} y={on ? 84 : 90} textAnchor="middle" fontSize="26" fontFamily="var(--serif)" fill={on ? GOLD : INK}>{sh.no}</text>
            <text x={(l + rr) / 2} y={on ? 114 : 120} textAnchor="middle" fontSize="12" fill={INK} opacity=".75">第 {sh.no} 章</text>
          </g>;
        })}
        <text x="320" y="200" textAnchor="middle" fontSize="13" fill={INK} opacity=".6">「生产之镜」被分成五块：点一块镜片，看哪一章负责打碎它</text>
      </svg>
      <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>第 {s.no} 章 · {s.title}</div>
        <div style={{ color: GOLD, fontWeight: 700, margin: "2px 0 6px" }}>拆下的镜片：{s.piece}</div>
        <p style={{ margin: 0 }}>{s.text}</p>
      </div>
    </div>);
}
