// 译者序专属图解 1：「抹除之下」(sous rature) —— 一个词被划掉却仍可读
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", INK = "#1f1b16", GOLD = "#b8862b", BLUE = "#2c4a6e";

const WORDS = [
  {
    id: "being", zh: "存在", en: "Being", who: "海德格尔",
    why_bad: "一说「存在是……」，就把存在当成了一个摆在那儿的东西；而它恰恰是一切「是什么」之前就已被预先领会的。",
    why_need: "可我们的语言里没有更好的词。另造新词只会让人以为问题已经解决。",
    keep: "海德格尔的叉号：仍指向一个说不出来、却「在」的东西。",
  },
  {
    id: "sign", zh: "符号", en: "sign", who: "德里达",
    why_bad: "「符号」暗示：一个能指背后站着一个完整在场的所指，只等被领取。德里达认为这样的终点并不存在。",
    why_need: "可是谈语言、谈意义，离不开这个词——包括批评它的时候。",
    keep: "德里达的叉号：标记的是「在场的缺席」——源头处本来就是一个缺口。",
  },
  {
    id: "experience", zh: "经验", en: "experience", who: "德里达",
    why_bad: "「经验」历来指与某种在场的关系（我亲眼看见、亲身感到）。而德里达要说：我们从未与纯粹的在场打过照面。",
    why_need: "必须先把这个概念的资源用尽，才能越过它；否则只会落入素朴的经验论，或同样素朴的经验批判。",
    keep: "用旧词，同时提醒自己：它的地基已经被挖空。",
  },
  {
    id: "origin", zh: "起源", en: "origin", who: "斯皮瓦克",
    why_bad: "斯皮瓦克说《论文字学》是她这篇序言的「起源」——不准确：她的阅读、重读、重排早已改写了那本书，书本身也没有稳定的身份。",
    why_need: "但又不得不这么说，否则连这篇序为何存在都讲不清。",
    keep: "「不准确却必要」——这正是整篇序言的第一句姿态。",
  },
];

const MODES = [
  { label: "① 照常使用", tag: "形而上学的习惯", color: INK,
    say: "把词当作透明的窗户：词一出口，意义就完整到场。问题在于，这个词里暗藏的假设也一起被你签收了。" },
  { label: "② 直接丢掉", tag: "天真的批判", color: GOLD,
    say: "既然不可信，那就不用！——可你会发现无话可说；或者造个新词，结果它很快又变成同一种「主词」，问题原样复活。" },
  { label: "③ 抹除之下", tag: "德里达的姿态", color: RED,
    say: "写下这个词，划掉它，再把两者一起印出来。划掉，因为它不准确；保留，因为它必要。读者既读得到词，也读得到对它的不信任。" },
];

export default function SousRature() {
  const [w, setW] = useState(0), [m, setM] = useState(2);
  const word = WORDS[w], mode = MODES[m];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>选一个词：</span>
        <div className="seg" style={{ marginBottom: 0 }}>{WORDS.map((x, j) =>
          <button key={x.id} className={w === j ? "on" : ""} onClick={() => setW(j)}>{x.zh} <span className="muted-it">{x.en}</span></button>)}</div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>怎么对待它：</span>
        <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
          <button key={j} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.label}</button>)}</div>
      </div>

      <svg key={word.id + m} viewBox="0 0 520 190" style={{ width: "100%", maxHeight: 250, background: "var(--paper)", borderRadius: 14 }}>
        {m === 1 ? <>
          <rect x="170" y="45" width="180" height="90" rx="10" fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="8 7">
            <animate attributeName="stroke-dashoffset" values="0;30" dur="1.5s" repeatCount="indefinite" /></rect>
          <text x="260" y="104" textAnchor="middle" fontSize="44" fill={INK} opacity="0">{word.zh}
            <animate attributeName="opacity" values=".9;0" dur="1.2s" fill="freeze" /></text>
          <text x="260" y="104" textAnchor="middle" fontSize="30" fill={GOLD} opacity="0">？？
            <animate attributeName="opacity" values="0;1" begin="1s" dur=".6s" fill="freeze" /></text>
        </> : <>
          <text x="260" y="108" textAnchor="middle" fontSize="58" fontFamily="var(--serif)" fill={INK}>{word.zh}</text>
          <text x="260" y="142" textAnchor="middle" fontSize="18" fontStyle="italic" fill={INK} opacity=".6">{word.en}</text>
          {m === 2 && <>
            <line x1="185" y1="40" x2="335" y2="150" stroke={RED} strokeWidth="4" strokeLinecap="round" strokeDasharray="190" strokeDashoffset="190">
              <animate attributeName="stroke-dashoffset" from="190" to="0" dur=".7s" fill="freeze" /></line>
            <line x1="335" y1="40" x2="185" y2="150" stroke={RED} strokeWidth="4" strokeLinecap="round" strokeDasharray="190" strokeDashoffset="190">
              <animate attributeName="stroke-dashoffset" from="190" to="0" begin=".6s" dur=".7s" fill="freeze" /></line>
          </>}
          {m === 0 && <circle cx="260" cy="92" r="70" fill="none" stroke={BLUE} strokeWidth="2" opacity=".35">
            <animate attributeName="r" values="66;76;66" dur="2.4s" repeatCount="indefinite" /></circle>}
        </>}
        <text x="16" y="24" fontSize="13" fill={mode.color}>{mode.tag}</text>
        <text x="504" y="24" textAnchor="end" fontSize="12" fill={INK} opacity=".55">用例出自：{word.who}</text>
      </svg>

      <p style={{ margin: 0 }}><b style={{ color: mode.color }}>{mode.label}：</b>{mode.say}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <div style={{ borderLeft: `4px solid ${RED}`, paddingLeft: 12 }}>
          <b>为什么要划掉「{word.zh}」</b>
          <p style={{ margin: "4px 0 0", fontSize: 15 }}>{word.why_bad}</p>
        </div>
        <div style={{ borderLeft: `4px solid ${BLUE}`, paddingLeft: 12 }}>
          <b>为什么又必须留着</b>
          <p style={{ margin: "4px 0 0", fontSize: 15 }}>{word.why_need}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>✖ {word.keep} —— 这就是 <C id="sous_rature">抹除之下</C> 的双重姿态。</p>
    </div>);
}
