// 第 8 章专属图解 (b)：编码 vs 公理化。把一条新的流「喂」给两台机器，看谁卡死、谁加一条公理就吞下去；每加一条公理，内部界限外推一圈。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16";

// book: true = 书中例子；false = 现代类比（示意）
const NEW_FLOWS = [
  { id: "money", icon: "🪙", name: "外来的货币", book: true,
    code: "规则表里，日用品、威望品、女人与孩子各有回路，彼此不能用同一把尺子量。一种「能从钱开始、又以钱结束」的东西闯进来，回路被搅乱，有限的债务块瓦解。",
    axiom: "这正是公理系统的母语：M–C–M′，钱生钱，没有上限。无需新增公理。", addsAxiom: false },
  { id: "union", icon: "✊", name: "工人阶级与工会", book: true,
    code: "旧秩序里没有「阶级」这一格，只有身份、等级、行会。一个要求整体承认的工人群体，只能被镇压或被塞回某个等级。",
    axiom: "加一条公理：承认工会、集体谈判、福利。俄国革命之后资本主义正是这样「消化」了冲击——利润照样与工资并排流动。", axiomText: "承认工会与集体谈判" },
  { id: "dolphin", icon: "🐬", name: "海豚的语言（贝特森）", book: true,
    code: "没有任何既有身份能容纳「研究海豚说话的人」——在旧社会里他要么是巫师，要么什么也不是。",
    axiom: "加一条公理：基础研究经费。书中挖苦说，海豚之流最后流进了美国军方的研究项目，回到战备与剩余价值的吸收。", axiomText: "军方资助的基础研究" },
  { id: "mad", icon: "🌀", name: "疯人的话语、大作家的书", book: true,
    code: "旧编码会给疯癫一个仪式位置（巫者、圣愚），但它仍在码内。",
    axiom: "加一条公理：疯人的话可以在医院-行政-精神病学的框架里被「听」；大作家的文风可以交给电子机器统计。", axiomText: "医院与精神病学的倾听框架" },
  { id: "crypto", icon: "₿", name: "加密货币", book: false,
    code: "如果按「编码」思路，就得为每种新钱写死一套它能换什么、谁能持有的规矩——写不过来。",
    axiom: "加一条公理：把它当成可交易的资产，配上交易所、税表和监管牌照。原本宣称要逃离体系的流，变成体系里又一个价格。", axiomText: "资产化 + 交易所牌照 + 税" },
  { id: "rider", icon: "🛵", name: "外卖骑手的平台劳动", book: false,
    code: "旧行会会问：你是哪一行的学徒、归哪位师傅管？平台骑手哪一格也对不上。",
    axiom: "加一条公理：按单计价、算法派单、评分。不问你是谁，只问你这一单的数值——人只被当作「劳动能力」这个数量来登记。", axiomText: "按单计价 + 算法评分" },
  { id: "data", icon: "📊", name: "你的浏览记录与注意力", book: false,
    code: "注意力在任何传统规矩里都不是一种「物」，根本无从编码。",
    axiom: "加一条公理：注意力 = 广告位库存。广告本身就是书里说的吸收剩余价值的方式之一。", axiomText: "注意力 → 广告库存" },
  { id: "rebel", icon: "🎸", name: "反叛的亚文化", book: false,
    code: "在编码社会里，越轨者被放逐或纳入某个仪式性的「越轨角色」。",
    axiom: "加一条公理：把反叛做成形象——印在 T 恤上、做成联名款。书里说资本主义连绝望与反抗也变成「形象」来填满它的场域。", axiomText: "反叛的形象化 / 商品化" },
];

const SCHIZO = { id: "schizo", icon: "🔥", name: "真正不受束缚的精神分裂流", book: true };

function Rings({ n, flash }) {
  const R0 = 30, STEP = 10, shown = Math.min(n, 9);
  const inner = R0 + shown * STEP, outer = inner + 34;
  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320, background: "var(--paper)", borderRadius: 14 }}>
      {Array.from({ length: shown }, (_, k) =>
        <circle key={k} cx="160" cy="150" r={R0 + k * STEP} fill="none" stroke={GOLD} strokeWidth="1" opacity=".35" />)}
      <circle cx="160" cy="150" r={outer} fill="none" stroke={RED} strokeWidth={flash ? 4 : 2} strokeDasharray="5 6"
        style={{ transition: "r .6s, stroke-width .3s" }} />
      <circle cx="160" cy="150" r={inner} fill="rgba(184,134,43,.14)" stroke={GOLD} strokeWidth="3" style={{ transition: "r .6s" }} />
      <text x="160" y="146" textAnchor="middle" fontSize="13" fill={INK}>资本</text>
      <text x="160" y="163" textAnchor="middle" fontSize="11" fill={INK} opacity=".7">{n} 条新增公理</text>
      <g fontSize="10"><line x1="12" y1="300" x2="30" y2="300" stroke={RED} strokeWidth="2" strokeDasharray="4 4" /><text x="34" y="304" fill={RED}>外部极限（精神分裂）</text>
        <line x1="160" y1="300" x2="178" y2="300" stroke={GOLD} strokeWidth="3" /><text x="182" y="304" fill={GOLD}>内部界限（会移位）</text></g>
    </svg>);
}

export default function AxiomMachine() {
  const [fed, setFed] = useState([]);       // 已喂入的流 id
  const [cur, setCur] = useState(null);     // 当前展示
  const [flash, setFlash] = useState(false);
  const [over, setOver] = useState(false);
  const axioms = fed.map(id => NEW_FLOWS.find(f => f.id === id)).filter(f => f && f.addsAxiom !== false);

  const feed = id => {
    if (id === "schizo") {
      setCur(SCHIZO); setFlash(true); setTimeout(() => setFlash(false), 900); return;
    }
    const f = NEW_FLOWS.find(x => x.id === id);
    setCur(f);
    if (!fed.includes(id)) setFed([...fed, id]);
  };
  const onDrop = e => { e.preventDefault(); setOver(false); const id = e.dataTransfer.getData("text/plain"); if (id) feed(id); };

  const chip = f => <button key={f.id} draggable onDragStart={e => e.dataTransfer.setData("text/plain", f.id)} onClick={() => feed(f.id)}
    style={{
      border: "1px solid var(--line)", borderRadius: 99, padding: "4px 12px", font: "inherit", fontSize: 14, cursor: "grab",
      background: fed.includes(f.id) ? "var(--paper)" : "var(--card)", opacity: fed.includes(f.id) ? .55 : 1,
      color: f.id === "schizo" ? RED : "var(--ink)", fontWeight: f.id === "schizo" ? 700 : 400,
    }}>{f.icon} {f.name} <span style={{ fontSize: 11, color: f.book ? BLUE : GREEN }}>{f.book ? "📖书中" : "🧪示意"}</span></button>;

  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 6 }}>① 选一条新的流——点击，或拖进下面的机器：</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{NEW_FLOWS.map(chip)}{chip(SCHIZO)}</div>
      </div>

      <div onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={onDrop}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14,
          outline: over ? `2px dashed ${GOLD}` : "none", borderRadius: 14, padding: over ? 6 : 0, transition: ".2s" }}>
        {/* 编码机器 */}
        <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 14, background: "var(--paper)" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>📜 编码机器 <span className="muted-it">code</span></div>
          <div style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 8px" }}>为每一种「质」写死规则，规则之间只能间接换算</div>
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}><tbody>
            {[["日用品", "在自己的消费回路里流通"], ["威望品", "在威望回路里流转，关乎节庆与地位"], ["女人与孩子", "沿联姻圈流动，造成有限的债务块"], ["铁匠、天文学家的知识", "锁在特定身份里"]].map(([a, b]) =>
              <tr key={a}><td style={{ padding: "3px 6px", borderTop: "1px solid var(--line)", fontWeight: 600 }}>{a}</td><td style={{ padding: "3px 6px", borderTop: "1px solid var(--line)" }}>{b}</td></tr>)}
            <tr><td style={{ padding: "3px 6px", borderTop: "1px solid var(--line)", fontWeight: 600, color: RED }}>{cur ? cur.icon + " " + cur.name : "（新来的流）"}</td>
              <td style={{ padding: "3px 6px", borderTop: "1px solid var(--line)", color: RED }}>{cur ? "❌ 没有这一格" : "？"}</td></tr>
          </tbody></table>
          <p style={{ margin: "10px 0 0", fontSize: 14, minHeight: 60 }}>
            {cur ? (cur.id === "schizo" ? "编码机器面对彻底解码的流，只会恐慌：它的全部本领就是防止这种流出现。" : cur.code) : "选一条流看看。"}
          </p>
        </div>

        {/* 公理机器 */}
        <div style={{ border: `1px solid ${GOLD}`, borderRadius: 14, padding: 14, background: "rgba(184,134,43,.06)" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>⚙️ 公理机器 <span className="muted-it">axiomatic</span></div>
          <div style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 8px" }}>不问流是什么，只问它能否作为数量接进资本</div>
          <div style={{ fontFamily: "var(--serif)", background: INK, color: "#fff", borderRadius: 8, padding: "6px 10px", fontSize: 14 }}>
            任何流 x → 可计量？→ 进入差异关系 <span style={{ color: GOLD }}>dy/dx</span> → 产出并实现剩余价值 M′
          </div>
          <ol style={{ margin: "8px 0 0", paddingLeft: 22, fontSize: 13, maxHeight: 130, overflowY: "auto" }}>
            <li>劳动能力可以买卖</li><li>货币可以无限增殖（M–C–M′）</li>
            {axioms.map(f => <li key={f.id} style={{ color: f.book ? BLUE : GREEN }}>{f.axiomText}{f.book ? "" : "（示意）"}</li>)}
          </ol>
          <p style={{ margin: "10px 0 0", fontSize: 14, minHeight: 60 }}>
            {cur ? (cur.id === "schizo"
              ? <>这是唯一让公理机器不安的流。它的对策两手并用：一边把它推开、关起来（让病人「真的」生病），一边能吸纳多少就加多少公理。但真正越过墙的部分，就是 <C id="absolute_limit">绝对极限</C>——红色虚线闪了一下，又被推远。</>
              : cur.axiom) : "公理机器的强项：永不饱和，总能再加一条。"}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, alignItems: "center" }}>
        <Rings n={axioms.length} flash={flash} />
        <div style={{ fontSize: 15 }}>
          <p style={{ margin: "0 0 8px" }}>② 每加一条公理，金色的<C id="displaced_limit">内部界限</C>就外推一圈；旧界限没有消失，只是被越过（淡圈）。</p>
          <p style={{ margin: "0 0 8px" }}>③ 红色虚线是<C id="absolute_limit">外部极限</C>：彻底解码、不再接回资本的流。资本主义向它靠近，又靠推远它才能运转。</p>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>标 🧪 的是本页编者给出的现代类比（示意），书中没有；标 📖 的出自原著第 9–10 节。</p>
          <button onClick={() => { setFed([]); setCur(null); }} style={{ marginTop: 10, border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 99, padding: "3px 14px", cursor: "pointer", font: "inherit", fontSize: 13 }}>↺ 重置</button>
        </div>
      </div>
    </div>);
}
