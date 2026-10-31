// 第 1 章小图解：异教剧场（瓦罗的众神） vs 宗教剧场（奥古斯丁的大零）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREY = "#8a8178";

const ACTS = [
  { g: "Virginensis", a: "解开腰带", x: 95, y: 70 },
  { g: "Subigus", a: "制服", x: 320, y: 45 },
  { g: "Prema", a: "压紧", x: 545, y: 70 },
  { g: "Pertunda", a: "进入", x: 95, y: 220 },
  { g: "Priapus", a: "生育", x: 320, y: 250 },
  { g: "Liber", a: "释放·狂欢", x: 545, y: 220 },
];

const MODES = [
  {
    name: "异教剧场（瓦罗 / 克洛索夫斯基）",
    gist: "每个动作、每次连接都有自己的小神：神名就是情动在此通过时发出的那一声「呼喊」。它们各自自足，不指向任何缺席的意义，也不需要中心来结账。",
  },
  {
    name: "宗教剧场（奥古斯丁）",
    gist: "奥古斯丁把众神一分为二：表象一侧是「荒唐、疯狂、虚假」，本质一侧是唯一真神——中央的大零、总导演。一切情动都要上交给他、由他「赎回」。带子就这样被折成剧场。",
  },
];

export default function PaganVsReligious() {
  const [v, setV] = useState(0);
  const rel = v === 1;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ margin: 0 }}>{MODES.map((m, j) =>
        <button key={j} className={v === j ? "on" : ""} onClick={() => setV(j)}>{m.name}</button>)}</div>
      <svg key={v} viewBox="0 0 640 300" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {rel && <>
          <line x1="20" y1="150" x2="620" y2="150" stroke={INK} strokeDasharray="6 5" opacity=".35" />
          <text x="24" y="142" fontSize="11" fill={GREY}>↑ 表象：「荒唐、疯狂、虚假」</text>
          <text x="24" y="168" fontSize="11" fill={GREY}>↓ 本质：唯一的真</text>
        </>}
        {ACTS.map((d, i) => {
          const X = rel ? 140 + i * 74 : d.x, Y = rel ? 75 : d.y;
          return <g key={i}>
            {rel && <line x1={X} y1={Y + 31} x2={320} y2={225} stroke={BLUE} strokeWidth="1.5" opacity=".6" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" /></line>}
            {!rel && <circle cx={X} cy={Y} r="34" fill={RED} opacity=".12">
              <animate attributeName="r" values="30;40;30" dur={`${1.4 + i * .23}s`} repeatCount="indefinite" /></circle>}
            <circle cx={X} cy={Y} r="31" fill={rel ? "var(--paper)" : GOLD} opacity={rel ? 1 : .85} stroke={rel ? GREY : RED} strokeWidth="1.5" />
            <text x={X} y={Y - 2} textAnchor="middle" fontSize="10" fill={rel ? GREY : INK} fontStyle="italic">{d.g}</text>
            <text x={X} y={Y + 13} textAnchor="middle" fontSize="11" fill={rel ? GREY : INK}>{d.a}</text>
            
          </g>;
        })}
        {rel && <g>
          <circle cx="320" cy="235" r="30" fill="var(--paper)" stroke={INK} strokeWidth="3" />
          <text x="320" y="246" textAnchor="middle" fontSize="30" fontFamily="var(--serif)" fill={INK}>0</text>
          <text x="362" y="240" fontSize="12" fill={INK}>上帝 = 大零 = 总导演</text>
        </g>}
        {!rel && <text x="320" y="152" textAnchor="middle" fontSize="12" fill={GREY}>没有中心 · 每个神名就是一次强度</text>}
      </svg>
      <p style={{ margin: 0 }}>{MODES[v].gist}</p>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
        利奥塔的要点：两者的差别不是「赞美世界里的神」vs「在世界之外歌颂上帝」，而是两种情动<C id="pagan_theatrics">装置</C>。
        奥古斯丁以为自己终结了剧场，其实是重新发明了它（见 <C id="great_zero">大零</C>）。
      </p>
    </div>);
}
