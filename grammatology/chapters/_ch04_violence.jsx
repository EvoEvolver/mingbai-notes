// 第 4 章专属图解（一）：三层暴力的嵌套结构（原暴力 ⊃ 律法暴力 ⊃ 经验暴力）
// 可切换「列维-斯特劳斯眼中」与「德里达眼中」；点击任一层查看说明、南比夸拉例子与现代类比。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3c6b4a";

const LAYERS = [
  {
    id: "arche_violence", n: "第一层", name: "原暴力", en: "arche-violence", r: 150, color: BLUE,
    status: "必然发生 · 只要有语言就有",
    what: "命名本身就是暴力：给一个独一无二的人起名，就是把他写进一张「差异与分类」的表格里，让他成为「某一类」中的一个。绝对专有、只属于这一个人的呼唤从一开始就不可能。这正是原文字（arche-writing）的运作。",
    eg: "南比夸拉人的所谓「专名」，本身已是一种社会归属标记——德里达引列维-斯特劳斯自己在《野性的思维》里的话：人从不真正「命名」，只是在给别人或自己「归类」。",
    modern: "你叫「张伟」，全国有几十万个张伟；就算名字再独特，它也带着姓氏、辈分、性别与时代的印记。一个名字一出口，你就已被放进一张表格里。",
  },
  {
    id: "law_violence", n: "第二层", name: "律法的暴力", en: "law / prohibition", r: 100, color: GOLD,
    status: "建制性 · 保护与修补第一层",
    what: "社会察觉到命名会「割裂」专有性，于是用禁忌来补救：把名字藏起来、不许说。这层暴力是修补性的、保护性的，它创立了「道德」。可它禁止的恰恰证实了第一层暴力早已发生。",
    eg: "南比夸拉人不许使用专名，线路工人和人类学家只能另起外号（葡萄牙名、「兔子」「糖」，或因小尖胡子叫「卡芬雅克」）。",
    modern: "中国古代的「避讳」：不得直呼君父之名，甚至要改字缺笔。今天网上用昵称、不暴露真名，也是同一种保护性的遮蔽。",
  },
  {
    id: "empirical_violence", n: "第三层", name: "经验暴力", en: "empirical violence", r: 52, color: RED,
    status: "偶然 · 可能发生，也可能不发生",
    what: "我们平常说的暴力：战争、告密、冒犯、强行揭开。它揭开被禁忌遮住的名字，于是同时暴露了下面两层：最初的命名早已是剥夺，而被当作「真正自我」守护的名字其实只是替身。",
    eg: "小女孩挨了打，悄悄把对手的名字告诉人类学家；对手报复，也说出她的名字。人类学家趁机挑唆，最后连成年人的名字都套了出来。事情败露，孩子们挨骂，「消息来源」就此断了。",
    modern: "网上「开盒」：曝光某人的真名、单位、住址。它之所以伤人，是因为前两层早已存在——名字已经把人登记进系统（第一层），社会又约定把它保护起来（第二层）。",
  },
];

const CX = 300, CY = 218;

export default function ThreeViolences() {
  const [view, setView] = useState(1); // 0 = 列维-斯特劳斯, 1 = 德里达
  const [sel, setSel] = useState(2);
  const L = LAYERS[sel];
  const ls = view === 0;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={ls ? "on" : ""} onClick={() => setView(0)}>👓 列维-斯特劳斯眼中</button>
        <button className={!ls ? "on" : ""} onClick={() => setView(1)}>🔍 德里达眼中</button>
      </div>
      <svg viewBox="0 0 600 390" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        {ls && <>
          <text x="300" y="24" textAnchor="middle" fontSize="15" fill={GREEN}>🌿 纯真的言语共同体（背景被设想为「无暴力」）</text>
          <text x="300" y="44" textAnchor="middle" fontSize="12" fill={INK} opacity=".6">暴力 = 外来者 / 文字闯入时才出现的事故</text>
        </>}
        {!ls && <>
          <text x="300" y="24" textAnchor="middle" fontSize="15" fill={INK}>暴力不是从外面闯进来的</text>
          <text x="300" y="44" textAnchor="middle" fontSize="12" fill={INK} opacity=".6">它一层套一层，最外层就是语言本身</text>
        </>}
        {LAYERS.map((l, i) => {
          const hidden = ls && i < 2;
          const on = sel === i;
          return <g key={l.id} style={{ cursor: hidden ? "default" : "pointer" }} onClick={() => !hidden && setSel(i)}>
            <circle cx={CX} cy={CY} r={l.r} fill={hidden ? "none" : l.color} fillOpacity={hidden ? 0 : on ? .32 : .12}
              stroke={l.color} strokeWidth={on && !hidden ? 4 : 2} strokeDasharray={hidden ? "4 7" : "none"} opacity={hidden ? .3 : 1}>
              {on && !hidden && <animate attributeName="stroke-opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            {!hidden && <text x={CX} y={CY - l.r + (i === 2 ? 30 : 22)} textAnchor="middle" fontSize={i === 2 ? 14 : 15} fontWeight="700" fill={l.color}>{l.name}</text>}
            {!hidden && i === 2 && <text x={CX} y={CY + 16} textAnchor="middle" fontSize="20">🗣️</text>}
            {!hidden && i === 1 && <text x={CX} y={CY - l.r + 40} textAnchor="middle" fontSize="11" fill={INK} opacity=".7">禁止说出名字</text>}
            {!hidden && i === 0 && <text x={CX} y={CY - l.r + 40} textAnchor="middle" fontSize="11" fill={INK} opacity=".7">命名 = 分类 = 抹去专有</text>}
            {hidden && i === 0 && <text x={CX} y={CY - l.r + 22} textAnchor="middle" fontSize="12" fill={INK} opacity=".45">（看不见：语言被当作纯真的）</text>}
          </g>;
        })}
        {/* 第三层揭开下面两层：向外的箭头 */}
        {!ls && sel === 2 && [[-1, 0], [1, 0]].map(([d], k) =>
          <g key={k}>
            <line x1={CX + d * 54} y1={CY + 30} x2={CX + d * 138} y2={CY + 78} stroke={RED} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arr4)">
              <animate attributeName="stroke-dashoffset" values="18;0" dur=".9s" repeatCount="indefinite" />
            </line>
            <text x={CX + d * 150} y={CY + 100} textAnchor="middle" fontSize="11" fill={RED}>{k ? "揭穿「专名」只是替身" : "暴露最初的命名已是剥夺"}</text>
          </g>)}
        <defs><marker id="arr4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill={RED} /></marker></defs>
        {ls && <text x={CX} y={CY + 52 + 20} textAnchor="middle" fontSize="12" fill={RED}>⚡ 人类学家来了，暴力才「开始」</text>}
        <text x="590" y="382" textAnchor="end" fontSize="11" fill={INK} opacity=".5">{ls ? "切到「德里达眼中」看见外面两层" : "点击任意一层"}</text>
      </svg>
      {ls ? <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>只有最里面那一圈</div>
        <p style={{ margin: "6px 0" }}>在《忧郁的热带》的叙述里，南比夸拉人原本温柔、纯真；是外来者的目光与挑唆让孩子们互相泄露名字。暴力被讲成一件<b>突然从外面落下的事故</b>，落在一片无辜的土地上——这正是后面「文字课」要用的前提。</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>德里达不否认这里有暴力，也不否认人类学家有责任；他追问的是：为什么名字「能被」泄露、泄露为什么「会」伤人？</p>
      </div> : <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{L.n} · <C id={L.id}>{L.name}</C> <span className="muted-it">{L.en}</span></div>
        <div style={{ fontSize: 13, color: L.color, fontWeight: 600, margin: "2px 0 6px" }}>{L.status}</div>
        <p style={{ margin: "6px 0" }}>{L.what}</p>
        <p style={{ margin: "6px 0", fontSize: 15 }}>📖 <b>南比夸拉：</b>{L.eg}</p>
        <p style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>📱 <b>现代类比：</b>{L.modern}</p>
      </div>}
    </div>);
}
