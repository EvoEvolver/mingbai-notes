// 第 5 章专属图解：三全音替换。五度圈上，V7 与 ♭II7（subV7）恰好关于圆心对称，共用同一条「三全音直径」；
// 可换调、可换替换和弦（所有含同一对三全音的和弦），听它们都解决到主和弦。
import { useState } from "react";
import { play, sequence, stop, useAudioState, pcName, mod12 } from "@kit/audio";

// 相对主音的音级；root 为根音音级。所有成员都含有 11（导音）与 5（4 级音）这对三全音
const FAMILY = [
  { id: "V7", pcs: [7, 11, 2, 5], root: 7, suf: "7", deg: "V7", note: "原型：属七和弦。根音到主音是纯五度下行（五度圈上顺时针一步回家）。" },
  { id: "sub", pcs: [1, 5, 8, 11], root: 1, suf: "7", deg: "♭II7 = subV7", note: "三全音替换：根音移动三全音，三全音原封不动。低音变成半音下行到主音（「上导音」）。" },
  { id: "V7b5", pcs: [7, 11, 1, 5], root: 7, suf: "7♭5", deg: "V7♭5", note: "属七降五：五音降半音，同样只与 subV7 差一个音。" },
  { id: "sub7b5", pcs: [1, 5, 7, 11], root: 1, suf: "7♭5", deg: "♭II7♭5", note: "subV7 再降五音——与 V7♭5 是同一组音（两对三全音），根音互为三全音。" },
  { id: "subaug", pcs: [1, 5, 9, 11], root: 1, suf: "+7", deg: "♭II+7", note: "subV7 升五音的增七和弦。" },
  { id: "VII7b5", pcs: [11, 3, 5, 9], root: 11, suf: "7♭5", deg: "VII7♭5", note: "以导音为根的属七降五（C 调中为 B–D♯–F–A），保留导音与 4 级音这对三全音。" },
  { id: "IVhd", pcs: [5, 8, 11, 3], root: 5, suf: "ø", deg: "IVø", note: "以 4 级音为根的半减七（C 调中为 F–A♭–C♭–E♭），五音 C♭ 就是导音 B 的等音。" },
  { id: "IV7b5", pcs: [5, 9, 11, 3], root: 5, suf: "7♭5", deg: "IV7♭5", note: "以 4 级音为根的属七降五（C 调中为 F–A–C♭–E♭），同样含有这对三全音。" },
  { id: "sharpVdim", pcs: [8, 11, 2, 5], root: 8, suf: "°7", deg: "♯V°7", note: "♯5 级上的减七：把 V7 的根音升半音、其余不动（C 调中为 G♯°7），也是共同音减七和弦。" },
];
const TONIC = [0, 4, 7];
const II7 = { pcs: [2, 5, 9, 0], root: 2 };
const KEYS = [0, 7, 2, 9, 4, 5, 10, 3, 8];

// 低音放在 C2–B2，上方声部放在 G3–F♯4 一带，连接自然平稳
const voice = (pcs, root, t) => [36 + mod12(root + t - 36), ...pcs.map(p => 55 + mod12(p + t - 55)).sort((a, b) => a - b)];

export default function TritoneSub() {
  const { active } = useAudioState();
  const [t, setT] = useState(0), [pick, setPick] = useState("sub"), [cur, setCur] = useState(null);
  const A = FAMILY[0], B = FAMILY.find(f => f.id === pick);
  const activePc = new Set([...active].map(mod12));
  const S = 300, R = 112, cx = S / 2, cy = S / 2;
  const pos = pc => { const k = mod12(pc * 7), a = (-90 + 30 * k) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
  const poly = (f, rel = true) => { const ks = f.pcs.map(p => mod12(p + (rel ? t : 0))).sort((a, b) => mod12(a * 7) - mod12(b * 7)); return ks.map(pos).map(p => p.join(",")).join(" "); };
  const sharpKey = [7, 2, 9, 4].includes(t);
  const nm = pc => pcName(pc + t, sharpKey && ![1, 3, 8, 10].includes(mod12(pc)) ? "sharp" : "flat");
  const cname = f => nm(f.root) + f.suf;
  const go = (steps, labels) => { stop(); sequence(steps.map(s => ({ notes: s })), { gap: 1.1, onStep: i => setCur(i < 0 ? null : labels[i]) }); };
  const I = voice(TONIC, 0, t), ii = voice(II7.pcs, II7.root, t);
  const tri = [mod12(11 + t), mod12(5 + t)].map(pos);
  return <div className="card">
    <div className="au-ctrl">
      <span className="au-lab">调</span>
      {KEYS.map(k => <button key={k} className={t === k ? "on" : ""} onClick={() => setT(k)}>{pcName(k, "flat")}</button>)}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
      <svg viewBox={`0 0 ${S} ${S}`} style={{ flex: "1 1 260px", maxWidth: 360, userSelect: "none" }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line)" />
        <polygon points={poly(A)} fill="rgba(155,44,31,.12)" stroke="var(--accent)" strokeWidth="2.5" />
        {pick !== "V7" && <polygon points={poly(B)} fill="rgba(60,130,70,.16)" stroke="var(--green, #3c8246)" strokeWidth="2.5" strokeDasharray="6 4" />}
        <line x1={tri[0][0]} y1={tri[0][1]} x2={tri[1][0]} y2={tri[1][1]} stroke="var(--gold)" strokeWidth="7" strokeLinecap="round" opacity=".85" />
        {Array.from({ length: 12 }, (_, pc) => {
          const [x, y] = pos(pc), rel = mod12(pc - t), on = activePc.has(pc);
          const inA = A.pcs.includes(rel), inB = B.pcs.includes(rel), tonic = rel === 0;
          return <g key={pc} style={{ cursor: "pointer" }} onClick={() => play([60 + pc], { dur: 1 })}>
            <circle cx={x} cy={y} r={on ? 19 : 16} fill={on ? "var(--gold)" : tonic ? "#fff6e0" : "#fff"}
              stroke={tonic ? "var(--ink)" : inA && inB ? "var(--gold)" : inA ? "var(--accent)" : inB ? "var(--green, #3c8246)" : "var(--line)"} strokeWidth={tonic || inA || inB ? 2.5 : 1} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={nm(rel).length > 1 ? 11 : 13} fontWeight="600">{nm(rel)}</text>
          </g>;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="12" fill="#6b645a">五度圈</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#6b645a">金线 = 共享三全音</text>
      </svg>
      <div style={{ flex: "1 1 260px", minWidth: 240 }}>
        <div className="au-lab" style={{ marginBottom: 6 }}>选一个替换和弦（都含 {nm(11)}–{nm(5)}）：</div>
        <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
          {FAMILY.slice(1).map(f => <button key={f.id} className={pick === f.id ? "on" : ""}
            onClick={() => { setPick(f.id); play(voice(f.pcs, f.root, t), { arp: 0.04, dur: 1.4 }); }}>{cname(f)}</button>)}
        </div>
        <div className="au-info" style={{ marginTop: 8 }}>
          <b style={{ color: "var(--accent)" }}>{cname(A)}</b>（{A.deg}，实线）与 <b style={{ color: "var(--green, #3c8246)" }}>{cname(B)}</b>（{B.deg}，虚线）
          都含有 <b>{nm(11)}</b> 与 <b>{nm(5)}</b>：前者上行半音到主音 {nm(0)}，后者下行半音到 {nm(4)}。{B.note}
          {cur && <div style={{ marginTop: 4 }}>正在发声：<b>{cur}</b></div>}
        </div>
        <div className="au-ctrl" style={{ flexWrap: "wrap", marginTop: 6 }}>
          <button className="au-go" onClick={() => go([voice(A.pcs, A.root, t), I], [cname(A), nm(0)])}>▶ {cname(A)} → {nm(0)}</button>
          <button className="au-go" onClick={() => go([voice(B.pcs, B.root, t), I], [cname(B), nm(0)])}>▶ {cname(B)} → {nm(0)}</button>
          <button className="au-go" onClick={() => go([ii, voice(A.pcs, A.root, t), I], [nm(2) + "m7", cname(A), nm(0)])}>▶ ii–V–I</button>
          <button className="au-go" onClick={() => go([ii, voice(B.pcs, B.root, t), I], [nm(2) + "m7", cname(B), nm(0)])}>▶ ii–替换–I</button>
          <button onClick={() => play([60 + mod12(11 + t), 60 + mod12(5 + t) + (mod12(5 + t) < mod12(11 + t) ? 12 : 0)], { dur: 1.6 })}>只听三全音</button>
        </div>
        <div className="au-hint">点圆上的音可试听。注意 {cname(A)} 与 {nm(1)}7 在圆上正好互为 180° 旋转：五度圈上「相距三全音」就是「正对面」。</div>
      </div>
    </div>
  </div>;
}
