// 第 10 章图解：全书和声地图。同一张 Tonnetz（以 C 为中心），按章节分层叠加：
// 每层标出该章新增的和弦，附一句话、一段可听的典型进行和回到该章的链接。
import { useState } from "react";
import { pageUrl } from "@kit";
import { Tonnetz, Play } from "@kit/audio";

const LAYERS = [
  { ch: "ch01", no: 1, title: "循环与网格图", part: "工具", hl: ["C", "Cm", "Em", "G"],
    gist: "十二个音围成一圈，三和弦是三角形：朝上红色为大三，朝下蓝色为小三。",
    demos: [{ label: "C ⇄ Cm", seq: ["C", "Cm", "C", "Cm"] }, { label: "C、Em、G 三个邻居", seq: ["C", "Em", "G"] }] },
  { ch: "ch02", no: 2, title: "大调和声", part: "用什么和弦", hl: ["C", "Dm", "Em", "F", "G", "Am", "B°"],
    gist: "一块平行四边形框住七个音、七个和弦；主 T、属 D、下属 S 三个功能组构成 T–S–D–T 功能圈。",
    demos: [{ label: "I–IV–V–I", seq: ["C", "F", "G", "C"] }, { label: "1645：C–Am–F–G", seq: ["C", "Am", "F", "G", "C"] }] },
  { ch: "ch03", no: 3, title: "小调和声", part: "用什么和弦", hl: ["C", "Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb"],
    gist: "同主音的 c 小调就在网格「下方一格」：大调可以向它借 Fm、A♭、B♭、E♭ 等和弦（交替大小调）。",
    demos: [{ label: "小下属 C–F–Fm–C", seq: ["C", "F", "Fm", "C"] }, { label: "C–A♭–B♭–C", seq: ["C", "Ab", "Bb", "C"] }] },
  { ch: "ch04", no: 4, title: "副调和弦", part: "用什么和弦", hl: ["C", "D", "E", "A", "B", "F", "G"],
    gist: "把调内任一和弦临时当主和弦，在它前面放它的属和弦：D（V/V）、E（V/vi）、A（V/ii）……一路沿五度圈回家。",
    demos: [{ label: "C–D7–G7–C（重属）", seq: ["C", "D7", "G7", "C"] }, { label: "E7–A7–D7–G7–C", seq: ["E7", "A7", "D7", "G7", "C"] }] },
  { ch: "ch05", no: 5, title: "变化与延伸", part: "用什么和弦", hl: ["C", "Db", "G+", "AbGer+6", "Fm"],
    gist: "升降和弦里的音：拿坡里 D♭、增五 G+、德国增六、三全音替换 D♭7；再往上叠成九、十一、十三和弦。",
    demos: [{ label: "拿坡里 C–D♭–G7–C", seq: ["C", "Db", "G7", "C"] }, { label: "三全音替换 Dm7–D♭7–C", seq: ["Dm7", "Db7", "Cmaj7"] }, { label: "G13", seq: ["G13", "Cmaj9"] }] },
  { ch: "ch06", no: 6, title: "排列与连接", part: "怎么用和弦", hl: ["C", "F", "G"],
    gist: "同样的 C–F–G–C，纵向怎样排列（下疏上密）、横向怎样连接（保留共同音、就近进行）、何时用转位。",
    demos: [{ label: "原位跳进", seq: ["C3 E3 G3", "F3 A3 C4", "G3 B3 D4", "C3 E3 G3"] }, { label: "平稳连接 + 转位", seq: ["C3 G3 C4 E4", "C3 A3 C4 F4", "B2 G3 D4 G4", "C3 G3 C4 E4"] }] },
  { ch: "ch07", no: 7, title: "和弦外音", part: "怎么用和弦", hl: ["C", "Db", "F", "G"],
    gist: "经过、辅助、倚音、趋近和弦，平行与反向和声，挂留、附加音、四五度和声：从线条里长出来的和声。",
    demos: [{ label: "半音趋近 D♭7→C", seq: ["Dm7", "Db7", "C"] }, { label: "平行和声", seq: ["C", "Dm", "Em", "F", "Em", "Dm", "C"] }, { label: "挂留 Csus4→C", seq: ["Csus4", "C"] }] },
  { ch: "ch08", no: 8, title: "和弦变换", part: "怎么用和弦", hl: ["C", "Cm", "Am", "Em", "E", "Ab"],
    gist: "P、R、L 三元变换都只动一个音，走到网格上相邻的三角形；大三度循环 C–E–A♭ 等非功能进行由此而来。",
    demos: [{ label: "P / R / L", seq: ["C", "Cm", "C", "Am", "C", "Em"] }, { label: "大三度循环 C–E–A♭–C", seq: ["C", "E", "Ab", "C"] }] },
  { ch: "ch09", no: 9, title: "音乐的结构", part: "结构", hl: ["C", "Am", "F", "G"],
    gist: "动机与发展、卡农与赋格、织体的五个层次、旋律线、节奏与曲式：和声在纵、横两个方向上搭成整首乐曲。",
    demos: [{ label: "和声模进 C–F–Dm–G–Em–Am", seq: ["C", "F", "Dm", "G", "Em", "Am"] }] },
];

export default function BookMap() {
  const [k, setK] = useState(1), L = LAYERS[k];
  const all = [...new Set(LAYERS.slice(0, k + 1).flatMap(x => x.hl))];
  const [cum, setCum] = useState(false);
  return <div className="card">
    <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
      <span className="au-lab">图层</span>
      {LAYERS.map((x, j) => <button key={x.ch} className={j === k ? "on" : ""} onClick={() => setK(j)}>{x.no} {x.title}</button>)}
    </div>
    <div className="au-ctrl"><button className={cum ? "on" : ""} onClick={() => setCum(!cum)}>{cum ? "✓ " : ""}叠加前面各章</button>
      <span className="au-hint">关闭时只看本章新增的和弦；打开后把第 1 章到本章的和弦全部叠在一起。</span></div>
    <Tonnetz key={k + (cum ? "c" : "")} cols={11} rows={6} center="C" unit={52} highlight={cum ? all : L.hl}
      caption={`第 ${L.no} 章 · ${L.part}`} />
    <div className="au-info">
      <b>第 {L.no} 章 · {L.title}</b>（{L.part}）：{L.gist}
      <div style={{ marginTop: 6 }}>{L.demos.map(d => <Play key={d.label} seq={d.seq} gap={0.85}>{d.label}</Play>)}
        {" "}<a href={pageUrl(L.ch)}>→ 回到第 {L.no} 章</a></div>
    </div>
  </div>;
}
