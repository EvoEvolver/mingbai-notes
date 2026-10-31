// 第 5 章专属图解 B：过程的旅程与三种中断（神经症 / 倒错 / 精神病）以及突破
import { useEffect, useRef, useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#8a7f72";
const START = "M95 175 C 200 175, 300 170, 400 175";

const ROUTES = [
  {
    id: "breakthrough", icon: "🌅", name: "突破", en: "breakthrough", color: GREEN, cid: "breakthrough_breakdown",
    path: START + " C 440 176, 470 178, 500 176 C 560 172, 600 170, 640 168",
    end: [640, 168],
    how: "过程穿墙而过，带着解码的流穿越无器官身体的荒漠，在「新大地」上安装欲望机器。旅程可以是原地的——一场强度上的旅行。",
    terr: "不再抓住任何残余领土",
    eg: "透纳秘而不展的晚期画作：画布被一个洞、一团火、一阵旋风刺穿，只剩金色与雾——这是突破，而不是崩溃。",
    modern: "（示意）一个乐手把即兴越拉越远，不再回到熟悉的副歌，也没有就此散架，而是长出一种前所未有的声音。",
  },
  {
    id: "neurosis", icon: "🔺", name: "神经症", en: "neurosis", color: GOLD, cid: "three_territorialities",
    path: START + " C 450 176, 450 120, 380 110 C 300 98, 160 120, 100 160",
    end: [100, 160],
    how: "走近墙，吓得后退，把极限搬进社会内部、再搬进俄狄浦斯两极之间，从此在三角里来回打转。过程「被困住，在三角里绕圈」。",
    terr: "俄狄浦斯的家庭领土——最后缩成分析师的躺椅",
    eg: "英美作家一次次重回死路：爸爸-妈妈、美国、回到故土。",
    modern: "（示意）辞职去远方三个月，最后回家，把整段经历解释成「其实是在跟我爸较劲」，在咨询室里一遍遍复盘。",
  },
  {
    id: "perversion", icon: "🏝️", name: "倒错", en: "perversion", color: VIOLET, cid: "three_territorialities",
    path: START + " C 440 175, 450 150, 452 120 C 454 95, 440 75, 428 68",
    end: [428, 68],
    how: "不回家，而是沿着墙建造更「异域」的处女地、更人工的家庭、更秘密的社团。过程「把自己当成目的本身」。",
    terr: "人工的、异国情调的领土",
    eg: "英美作家的另一种失败：异国情调的领土，随后是毒品、酒精，或更糟的旧法西斯梦。",
    modern: "（示意）不回家，但在半路建了一个规则精致、自给自足的小圈子，从此一直住在里面。",
  },
  {
    id: "psychosis", icon: "🪨", name: "精神病", en: "psychosis", color: RED, cid: "schizo_entity",
    path: START + " C 440 175, 455 180, 452 182 C 430 190, 425 230, 430 285",
    end: [430, 285],
    how: "厌倦了俄狄浦斯的工具性、也厌倦了倒错的造作，冲到墙上猛烈反弹，退回无器官身体——一片荒漠般的领土，一切生产停止或僵住。过程「在虚空里继续，以可怕的激化代替完成」。",
    terr: "无器官身体（强度 = 0）的荒漠",
    eg: "紧张症的身体像铅块沉入河底，像一动不动、再不浮上来的河马；随后被宣布为医院里「缺乏俄狄浦斯」的临床分裂者。",
    modern: "（示意）冲向一面推不动的墙，撞回来后把自己关进房间，不说话、不回应——旁人却说「他天生就这样」。",
  },
];

function Traveller({ route }) {
  const ref = useRef(null);
  useEffect(() => { try { ref.current?.beginElement(); } catch { /* 不支持 SMIL 时静止 */ } }, [route.id]);
  return (
    <g>
      <circle r="11" fill={route.color} stroke="#fff" strokeWidth="3">
        <animateMotion ref={ref} begin="indefinite" dur="3.2s" fill="freeze" path={route.path} calcMode="spline" keyTimes="0;1" keySplines=".4 0 .3 1" />
      </circle>
    </g>);
}

export default function ProcessJourney() {
  const [i, setI] = useState(0), [run, setRun] = useState(0);
  const r = ROUTES[i];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ flexWrap: "wrap" }}>{ROUTES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => { setI(j); setRun(run + 1); }}>{x.icon} {x.name}</button>)}
        <button onClick={() => setRun(run + 1)} title="重播">↻ 重播</button>
      </div>

      <svg viewBox="0 0 700 320" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
        {/* 区域底色 */}
        <rect x="0" y="0" width="455" height="320" fill="#efe6d6" opacity=".5" />
        <rect x="470" y="0" width="230" height="320" fill="#e3ecdf" opacity=".6" />
        <text x="20" y="28" fontSize="13" fill={MUTED}>社会内部：被编码、被俄狄浦斯化的领土</text>
        <text x="485" y="28" fontSize="13" fill={GREEN}>墙外：新大地（解码的流）</text>

        {/* 俄狄浦斯三角 */}
        <g>
          <polygon points="95,120 55,200 135,200" fill="#fff" stroke={GOLD} strokeWidth="3" />
          <text x="95" y="114" fontSize="12" textAnchor="middle" fill={INK}>爸爸</text>
          <text x="48" y="216" fontSize="12" textAnchor="middle" fill={INK}>妈妈</text>
          <text x="142" y="216" fontSize="12" textAnchor="middle" fill={INK}>我</text>
          <text x="95" y="245" fontSize="12" textAnchor="middle" fill={GOLD}>起点：家庭三角</text>
        </g>

        {/* 墙 */}
        <g>
          <rect x="455" y="40" width="15" height="270" fill={INK} opacity=".85" />
          {i === 0 && <path d="M455 150 L470 160 L456 172 L470 186" stroke="#f6f1e7" strokeWidth="4" fill="none">
            <animate attributeName="opacity" values="0;0;1" keyTimes="0;.6;1" dur="3.2s" fill="freeze" begin="0s" /></path>}
          <text x="462" y="105" dy="4" fontSize="11" textAnchor="middle" fill="#fff" transform="rotate(-90 462 105)">墙：资本主义的极限</text>
        </g>

        {/* 倒错的人工领土 */}
        <g opacity={i === 2 ? 1 : .35}>
          <rect x="358" y="48" width="88" height="40" rx="8" fill="#fff" stroke={VIOLET} strokeDasharray="4 3" />
          <text x="388" y="73" fontSize="11" textAnchor="middle" fill={VIOLET}>人工领土</text>
        </g>
        {/* 精神病的荒漠 */}
        <g opacity={i === 3 ? 1 : .35}>
          <ellipse cx="430" cy="290" rx="44" ry="14" fill="#d9cfc0" />
          <text x="360" y="296" fontSize="11" textAnchor="end" fill={RED}>CsO 荒漠 · 强度=0</text>
        </g>
        {/* 新大地 */}
        <g opacity={i === 0 ? 1 : .4}>
          <circle cx="640" cy="168" r="26" fill="none" stroke={GREEN} strokeWidth="2" strokeDasharray="5 4">
            <animateTransform attributeName="transform" type="rotate" from="0 640 168" to="360 640 168" dur="12s" repeatCount="indefinite" />
          </circle>
          <text x="640" y="214" fontSize="12" textAnchor="middle" fill={GREEN}>新大地</text>
        </g>

        {/* 所有路线（淡），选中的加粗 */}
        {ROUTES.map((x, j) => <path key={x.id} d={x.path} fill="none" stroke={x.color} strokeWidth={j === i ? 3.5 : 1.5}
          strokeDasharray={j === i ? "none" : "4 6"} opacity={j === i ? .9 : .3} />)}
        <text x="270" y="160" fontSize="12" textAnchor="middle" fill={MUTED}>去领土化：带着流出发 →</text>

        <Traveller key={r.id + run} route={r} />
      </svg>

      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21, color: r.color }}>{r.icon} <C id={r.cid}>{r.name}</C> <span className="muted-it">{r.en}</span></div>
        <p style={{ margin: "6px 0" }}>{r.how}</p>
        <p style={{ margin: "4px 0", fontSize: 15 }}><b>抓住的残余领土：</b>{r.terr}</p>
        <p style={{ margin: "4px 0", fontSize: 15, color: "var(--muted)" }}>📖 书中一例：{r.eg}</p>
        <p style={{ margin: "4px 0 0", fontSize: 15, color: "var(--muted)" }}>💡 {r.modern}</p>
      </div>
    </div>);
}
