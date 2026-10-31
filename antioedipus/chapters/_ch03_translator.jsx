// 第 3 章专属图解 A：「俄狄浦斯翻译机」
// 同一份谵妄/幻想材料，三种视图：原始材料 → 俄狄浦斯读法（压进爸爸-妈妈-我三角或直接删除）→ 精神分裂分析读法（回到社会场的多元连接）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

// 三角顶点
const V = { papa: [380, 62], mama: [190, 300], me: [570, 300], drop: [380, 398] };
const VLABEL = { papa: "爸爸", mama: "妈妈", me: "我", drop: "🗑 直接删掉" };

// 每个元素：t 文本；raw 原始位置；oe 俄狄浦斯读法落点（papa/mama/me/drop）；oeNote 分析师的翻译；sz 社会场位置；region 所投注的社会-历史区域；szNote
const CASES = [
  {
    id: "schreber", label: "施瑞伯法官的谵妄", src: "弗洛伊德 1911 年的施瑞伯案例",
    note: "谵妄元素据施瑞伯《一个神经病人的回忆录》概括；本章本身只笼统地说这场谵妄有「巨量的政治、社会、历史内容」，而弗洛伊德一个字也没保留。",
    items: [
      { t: "上帝", raw: [120, 60], oe: "papa", oeNote: "弗洛伊德：谵妄里的上帝，是父亲的放大版。", sz: [110, 70], region: "宗教 · 神学", szNote: "直接投注宗教与神学这一整片历史领域，而不是经由父亲中转。" },
      { t: "太阳", raw: [300, 40], oe: "papa", oeNote: "弗洛伊德：太阳也是父亲的象征（他明说：到处都碰到父亲，不怪我，怪性欲的顽固象征）。", sz: [300, 40], region: "宇宙 · 自然", szNote: "谵妄与宇宙、自然直接相连：人与自然在无意识里本来就是共延的。" },
      { t: "弗莱希格医生", raw: [520, 90], oe: "papa", oeNote: "弗洛伊德：对医生的「同性恋力比多爆发」，医生其实替代了父亲（他自己也承认这一步很难跟上）。", sz: [520, 80], region: "精神病院 · 医学权力", szNote: "医生首先是精神病院与医学权力这台社会机器的代理人。" },
      { t: "天国的光线", raw: [660, 170], oe: "me", oeNote: "被归为「我」对父亲的被动欲望。", sz: [680, 190], region: "身体 · 强度", szNote: "光线穿过身体、在身体上登记：这是欲望机器在身体表面运作，不是家庭剧情。" },
      { t: "变成女人", raw: [90, 200], oe: "me", oeNote: "被归为「我」的被动同性恋愿望（指向父亲）。", sz: [90, 200], region: "性别的流动", szNote: "一次跨越两性的生成，而不是某个固定自我对父亲的态度。" },
      { t: "世界毁灭", raw: [260, 180], oe: "me", oeNote: "被读成「我」把力比多从世界撤回的内心事件。", sz: [270, 300], region: "历史 · 末世", szNote: "谵妄在思考的是整个历史与世界的命运。" },
      { t: "民族与种族", raw: [470, 220], oe: "drop", oeNote: "不翻译，直接删除：弗洛伊德从这些内容里一个字也没保留。", sz: [470, 290], region: "种族 · 国家", szNote: "力比多直接投注种族、民族、国家这些社会-历史构成。" },
      { t: "法院与法律", raw: [600, 320], oe: "drop", oeNote: "删除（施瑞伯本人就是高等法院的庭长，这在读法里毫无位置）。", sz: [640, 330], region: "法律 · 国家机器", szNote: "法官的谵妄与法律、国家机器直接相连。" },
      { t: "教派之争", raw: [150, 330], oe: "drop", oeNote: "删除：仿佛力比多对这些事毫不关心。", sz: [120, 340], region: "宗教 · 政治", szNote: "宗教-政治冲突本身就是欲望投注的对象。" },
    ],
    links: [[0, 1], [0, 8], [0, 5], [2, 3], [2, 7], [3, 4], [5, 6], [6, 7], [6, 8], [1, 3]],
  },
  {
    id: "beaten", label: "「一个孩子被打」与越战", src: "弗洛伊德 1919 年《一个孩子被打》+ 本书的越战蒙太奇",
    note: "老师、被打的男孩、旁观的女孩来自弗洛伊德的病例；教官、上校、陆战队员来自本书作者对纪录片《心灵与智慧》(Hearts and Minds) 的引申。",
    items: [
      { t: "打人的老师", raw: [110, 60], oe: "papa", oeNote: "弗洛伊德：打人的人必须是「父亲的替代」。", sz: [110, 60], region: "学校", szNote: "老师是学校这一社会机器的执行者。" },
      { t: "被打的男孩们", raw: [320, 40], oe: "me", oeNote: "弗洛伊德：被打的孩子们其实是「主体本人的替身」。", sz: [300, 120], region: "群体", szNote: "一群男孩：这本来是个群体幻想，而不是一个人的私事。" },
      { t: "旁观的女孩", raw: [530, 70], oe: "me", oeNote: "归为「我」：女孩一系列幻想中的自我。", sz: [520, 60], region: "观看机器", szNote: "女孩的「看」是一台观看机器，场面在她的情欲舞台上上演。" },
      { t: "教官", raw: [670, 180], oe: "papa", oeNote: "传统精神分析：教官就是父亲。", sz: [640, 200], region: "军队", szNote: "教官是军队这一生产/反生产代理人。爸爸的胡子最多只是挂在他身边的一小块碎片。" },
      { t: "上校", raw: [90, 200], oe: "papa", oeNote: "传统精神分析：上校也是父亲。", sz: [90, 210], region: "军队 · 国家", szNote: "上校连向军队与国家：「他们是一帮该死的好杀手」不是家事。" },
      { t: "母亲", raw: [270, 200], oe: "papa", oeNote: "讽刺之处：作者说在这种读法里，连母亲最后也还是父亲。", sz: [500, 250], region: "坐在教官膝上", szNote: "母亲并没有消失，但她是散落在社会场某个角落的一个碎片——坐在教官膝上。" },
      { t: "海军陆战队员", raw: [460, 210], oe: "me", oeNote: "被读成又一个「我」的替身。", sz: [380, 300], region: "战争机器", szNote: "被打-被训练的士兵：欲望投注了战争机器及其压迫形式。" },
      { t: "越南村庄", raw: [620, 320], oe: "drop", oeNote: "删除：与爸爸-妈妈-我无关。", sz: [640, 340], region: "殖民战争", szNote: "殖民战争这一历史事实，就是幻想所投注的社会场。" },
      { t: "祖国", raw: [170, 330], oe: "drop", oeNote: "删除，或者也被说成是「父亲」。", sz: [150, 330], region: "国家 · 民族", szNote: "「热爱祖国」是一种直接的社会投注。" },
    ],
    links: [[0, 1], [1, 2], [3, 6], [4, 3], [4, 8], [5, 3], [6, 7], [8, 6], [4, 6]],
  },
  {
    id: "modern", label: "示意：一个当代打工人的梦", src: "现代示意（非原著内容）",
    note: "这是为了帮助理解而编造的示意案例，不出自原著；其中 ② 的「俄狄浦斯读法」是对庸俗化套路的模仿，不代表任何具体分析师。",
    items: [
      { t: "开会被老板点名", raw: [120, 60], oe: "papa", oeNote: "套路解读：老板 = 父亲，你在重演对父亲的恐惧。", sz: [110, 60], region: "公司 · 职场等级", szNote: "直接投注公司等级制与绩效考核。" },
      { t: "房贷催缴短信", raw: [330, 40], oe: "mama", oeNote: "套路解读：房子 = 家 = 母亲，你怕失去母亲的庇护。", sz: [320, 50], region: "金融 · 债务", szNote: "连向银行、债务与房地产：一整套资本的流。" },
      { t: "外卖算法差评", raw: [540, 80], oe: "me", oeNote: "套路解读：差评唤起「我」的阉割焦虑。", sz: [560, 90], region: "平台 · 算法", szNote: "连向平台经济与算法管理。" },
      { t: "热搜上的战争", raw: [660, 200], oe: "drop", oeNote: "删除：「这些和你的童年无关，我们回到家庭」。", sz: [650, 210], region: "地缘政治", szNote: "梦直接投注远方的战争与地缘政治。" },
      { t: "考不上的学校", raw: [90, 190], oe: "papa", oeNote: "套路解读：学校的门槛 = 父亲的禁令。", sz: [100, 200], region: "教育 · 选拔", szNote: "连向考试与选拔制度。" },
      { t: "海关排长队", raw: [300, 200], oe: "papa", oeNote: "套路解读：边境 = 父亲的律法。", sz: [330, 300], region: "国境 · 移民", szNote: "连向国境、身份证件与人口流动。" },
      { t: "一辆在飞的自行车", raw: [480, 220], oe: "me", oeNote: "套路解读：飞行象征「我」的愿望满足。", sz: [500, 300], region: "欲望机器", szNote: "一台乱接的欲望机器：自行车 + 天空，无需翻译，先看它怎么运转。" },
      { t: "外婆家的灶台", raw: [620, 330], oe: "mama", oeNote: "套路解读：外婆 = 母亲的母亲，进入「三代人」的俄狄浦斯。", sz: [660, 340], region: "迁徙 · 乡村", szNote: "连向城乡迁徙与消失的乡村生活。" },
      { t: "地铁早高峰", raw: [160, 330], oe: "drop", oeNote: "删除：太「表面」，不值得分析。", sz: [150, 340], region: "城市 · 通勤", szNote: "通勤是城市生产机器每天对身体的编排。" },
    ],
    links: [[0, 2], [0, 1], [1, 7], [2, 8], [3, 5], [4, 0], [5, 7], [6, 8], [6, 3], [1, 4]],
  },
];

const MODES = [
  { id: "raw", label: "① 原始材料", color: INK },
  { id: "oe", label: "② 俄狄浦斯读法", color: RED },
  { id: "sz", label: "③ 精神分裂分析读法", color: GREEN },
];

const w = t => t.length * 15 + 22; // 药丸宽度（中文约 15px/字）

function pos(item, k, mode, items) {
  if (mode === "raw") return { x: item.raw[0], y: item.raw[1], s: 1, o: 1 };
  if (mode === "sz") return { x: item.sz[0], y: item.sz[1], s: 1, o: 1 };
  // 俄狄浦斯：堆叠到对应顶点
  const same = items.filter(x => x.oe === item.oe), idx = same.indexOf(item);
  const [vx, vy] = V[item.oe];
  if (item.oe === "drop") return { x: vx - (same.length - 1) * 60 + idx * 120, y: vy, s: .78, o: .35 };
  const dy = item.oe === "papa" ? 34 + idx * 24 : -34 - idx * 24;
  return { x: vx, y: vy + dy, s: .82, o: 1 };
}

export default function OedipusTranslator() {
  const [ci, setCi] = useState(0), [mode, setMode] = useState("raw"), [sel, setSel] = useState(null);
  const cs = CASES[ci], items = cs.items;
  const dropped = items.filter(x => x.oe === "drop").length;
  const onTri = items.length - dropped;
  const it = sel != null ? items[sel] : null;
  const pickCase = j => { setCi(j); setSel(null); setMode("raw"); };

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ color: MUTED, fontSize: 14 }}>选材料：</span>
        <div className="seg" style={{ margin: 0 }}>{CASES.map((c, j) =>
          <button key={c.id} className={ci === j ? "on" : ""} onClick={() => pickCase(j)}>{c.label}</button>)}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ color: MUTED, fontSize: 14 }}>怎么读：</span>
        <div className="seg" style={{ margin: 0 }}>{MODES.map(m =>
          <button key={m.id} className={mode === m.id ? "on" : ""} onClick={() => setMode(m.id)}>{m.label}</button>)}</div>
      </div>

      <svg viewBox="0 0 760 430" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {/* 俄狄浦斯三角 */}
        <g style={{ opacity: mode === "oe" ? 1 : 0, transition: "opacity .8s" }}>
          <polygon points={`${V.papa[0]},${V.papa[1] + 10} ${V.mama[0] + 10},${V.mama[1] - 10} ${V.me[0] - 10},${V.me[1] - 10}`}
            fill="rgba(155,44,31,.06)" stroke={RED} strokeWidth="2.5" strokeDasharray="8 5">
            {mode === "oe" && <animate attributeName="stroke-dashoffset" values="0;-26" dur="1.2s" repeatCount="indefinite" />}
          </polygon>
          {["papa", "mama", "me"].map(k => <g key={k}>
            <circle cx={V[k][0]} cy={V[k][1]} r="22" fill={RED} />
            <text x={V[k][0]} y={V[k][1] + 6} textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700">{VLABEL[k]}</text>
          </g>)}
          <line x1="40" y1="372" x2="720" y2="372" stroke={MUTED} strokeDasharray="3 4" opacity=".5" />
          <text x="40" y="365" fontSize="12" fill={MUTED}>三角之外 = 不存在：</text>
        </g>
        {/* 社会场的区域标签与连线 */}
        <g style={{ opacity: mode === "sz" ? 1 : 0, transition: "opacity .8s .3s" }}>
          {cs.links.map(([a, b], j) => <line key={j} x1={items[a].sz[0]} y1={items[a].sz[1]} x2={items[b].sz[0]} y2={items[b].sz[1]}
            stroke={GREEN} strokeWidth="1.6" strokeDasharray="5 4" opacity=".55">
            {mode === "sz" && <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.4s" repeatCount="indefinite" />}
          </line>)}
          {items.map((x, j) => <text key={j} x={x.sz[0]} y={x.sz[1] - 20} textAnchor="middle" fontSize="12" fill={GREEN} fontStyle="italic">{x.region}</text>)}
          <text x="752" y="422" textAnchor="end" fontSize="12" fill={MUTED}>社会-历史场：没有中心，处处连接</text>
        </g>
        {/* 元素 */}
        {items.map((x, j) => {
          const p = pos(x, j, mode, items), ww = w(x.t);
          const col = mode === "oe" ? (x.oe === "drop" ? MUTED : RED) : mode === "sz" ? GREEN : BLUE;
          return <g key={cs.id + j} onClick={() => setSel(j)} style={{ cursor: "pointer",
            transform: `translate(${p.x}px,${p.y}px) scale(${p.s})`, opacity: p.o,
            transition: `transform 1s cubic-bezier(.6,.05,.3,1) ${j * 70}ms, opacity .8s ${j * 70}ms` }}>
            <rect x={-ww / 2} y={-14} width={ww} height={28} rx={14} fill="#fffdf8" stroke={col} strokeWidth={sel === j ? 3 : 1.6} />
            <text y={6} textAnchor="middle" fontSize="15" fill={col} style={{ textDecoration: mode === "oe" && x.oe === "drop" ? "line-through" : "none" }}>{x.t}</text>
          </g>;
        })}
        {mode === "raw" && <text x="380" y="422" textAnchor="middle" fontSize="12" fill={MUTED}>原始材料：五花八门，什么都有（点任一元素看解读）</text>}
      </svg>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
        <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontSize: 15 }}>
          {mode === "raw" && <><b>材料本身</b>：{cs.src}。元素来自宗教、战争、国家、宇宙……远远超出一个家庭。</>}
          {mode === "oe" && <><b style={{ color: RED }}>俄狄浦斯读法</b>：{onTri} 个元素被压到三角的三个点上，{dropped} 个社会-历史元素被直接删掉。剩下的「意义」只有一个：爸爸-妈妈-我。这就是 <C id="oedipalization">俄狄浦斯化</C>。</>}
          {mode === "sz" && <><b style={{ color: GREEN }}>精神分裂分析读法</b>：每个元素都直接连向社会场的某个区域，彼此横向连接；家庭人物即使出现，也只是散落其中的小碎片。这就是 <C id="social_investment">力比多直接投注社会场</C>。</>}
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontSize: 15, minHeight: 64 }}>
          {!it && <span style={{ color: MUTED }}>👆 点图中任何一个元素，看它在当前读法里被怎么处理。</span>}
          {it && mode === "raw" && <><b>{it.t}</b>：切到 ② 或 ③，看它被翻译成什么。</>}
          {it && mode === "oe" && <><b>{it.t} → {VLABEL[it.oe]}</b>。{it.oeNote}</>}
          {it && mode === "sz" && <><b>{it.t} → {it.region}</b>。{it.szNote}</>}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: MUTED }}>注：{cs.note}</p>
    </div>);
}
