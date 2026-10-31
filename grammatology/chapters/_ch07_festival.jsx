// 第 7 章专属图解 ③：从「永恒的春天」到水井边的节庆，再到节庆的翌日（StepThrough）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", GOLD = "#b8862b", INK = "#1f1b16", GREEN = "#4a6b3a";

const steps = [
  { label: "永恒的春天", content: <p>起点是「原始时代」：人稀稀落落地散居，只有家庭，没有民族；家里靠手势和几声不分节的声音交流。地轴与宇宙轴对齐，四季不分，自然丰足，人天性懒散，没有任何理由离开这种生活。卢梭顺带承认：那时兄妹成婚，并无禁忌，因为还没有社会。</p> },
  { label: "手指的一动", content: <p>静止的系统不可能自己动起来，所以起源必须来自外部：「那位愿人类合群的」用<C id="catastrophe">手指一碰</C>，把地轴倾斜。一个几乎为零的力量造出了季节、冷热、南北，也就是<b>地方差异</b>。德里达指出：手指和魔杖一样，都是卢梭心中「最雄辩的无声符号」。</p> },
  { label: "水井边", content: <p>在干旱的南方，水只能从井里取，人们不得不聚在一起挖井、商量用水。姑娘来打水，小伙子来饮牲口；从小看惯的眼睛开始带着新的快乐去看。<b>需要</b>（水）把人聚拢，<b>激情</b>由此被点燃：「从泉水纯净的水晶里，流出了最初的爱火」。</p> },
  { label: "节庆", content: <p>最初的<C id="festival">节庆</C>：脚步欢跃，手势不够用，声音带着激情的声调伴随它；「快乐与欲望交融，同时被感受」。没有任何东西标记钟点。这就是卢梭眼中纯粹的在场：已经有社会、激情、语言，却还没有奴役、偏好、分节、计量与间隔，欲望与满足之间没有任何延迟。</p> },
  { label: "节庆的翌日", content: <p>节庆之后是增补、分节、符号与代表的时代，也是<C id="incest_prohibition">乱伦禁忌</C>的时代：从此社会成立，契约代替爱情。卢梭自己引的史料说，条约和争端都起源于水井边。舞蹈退化，节庆变成战争。</p> },
  { label: "德里达：节庆只是一个点", content: <p>节庆不是一段可以停留的时期，而是一个虚构的、无法抓住的<b>界限点</b>：一到达就越过了。「开始，就开始衰败」，南方过渡到它自己的北方。节庆的翌日和节庆的前夜如出一辙，舞蹈的那一刻只是二者差异的界限。起源从一开始就已被<C id="supplementarity_nonorigin">增补</C>。</p> },
];

function Scene({ i }) {
  const tilt = i >= 1 ? 23 : 0;
  const people = i >= 2;
  const dance = i === 3;
  const after = i === 4;
  const point = i === 5;
  return (
    <svg viewBox="0 0 520 200" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      {/* 地球与地轴 */}
      <g transform="translate(70,100)">
        <circle r="46" fill={i === 0 ? "#e7efd9" : "#e9eef4"} stroke={INK} strokeOpacity=".3" />
        <g style={{ transition: "transform .8s", transform: `rotate(${tilt}deg)` }}>
          <line y1="-64" y2="64" stroke={INK} strokeWidth="2" />
          <circle cy="-64" r="4" fill={BLUE} /><circle cy="64" r="4" fill={RED} />
        </g>
        {i === 1 && <text x="18" y="-58" fontSize="22">👆<animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" /></text>}
        <text y="78" textAnchor="middle" fontSize="12" fill={INK} dy="16">{i === 0 ? "四季不分" : "季节 · 南北"}</text>
      </g>
      {/* 水井 */}
      {i >= 2 && <g transform="translate(300,130)">
        <rect x="-26" y="-8" width="52" height="30" rx="4" fill="#cdb79a" stroke={INK} strokeOpacity=".4" />
        <ellipse cx="0" cy="-8" rx="26" ry="7" fill="#7fb2d6" />
        <text y="44" textAnchor="middle" fontSize="12" fill={INK}>水井</text>
      </g>}
      {/* 人 */}
      {people && [[-110, "👧"], [-60, "🧑"], [60, "👦"], [110, "🧕"]].map(([dx, e], k) =>
        <text key={k} x={300 + dx * (dance ? .6 : 1)} y={dance ? 90 : 120} fontSize="26" textAnchor="middle" style={{ transition: "all .6s" }}>{e}
          {dance && <animate attributeName="y" values="90;76;90" dur=".9s" begin={`${k * .2}s`} repeatCount="indefinite" />}
        </text>)}
      {i === 0 && <g fontSize="22"><text x="230" y="80">🏕️</text><text x="330" y="140">🏕️</text><text x="440" y="70">🏕️</text>
        <text x="300" y="185" fontSize="12" textAnchor="middle" fill={INK}>分散的家庭 · 手势与不分节的声音</text></g>}
      {dance && <text x="300" y="40" textAnchor="middle" fontSize="15" fill={RED} fontFamily="var(--serif)">♪ 快乐与欲望同时 ♪
        <animate attributeName="opacity" values=".4;1;.4" dur="1.6s" repeatCount="indefinite" /></text>}
      {after && <g><text x="300" y="40" textAnchor="middle" fontSize="15" fill={BLUE} fontFamily="var(--serif)">📜 禁忌 · 契约 · ⚔️ 争端</text>
        <line x1="300" y1="55" x2="300" y2="160" stroke={BLUE} strokeWidth="2" strokeDasharray="5 4" /></g>}
      {point && <g>
        <line x1="160" y1="60" x2="500" y2="60" stroke={INK} strokeOpacity=".3" />
        <text x="190" y="50" fontSize="12" fill={GREEN}>节庆前夜</text><text x="440" y="50" fontSize="12" fill={BLUE}>节庆翌日</text>
        <circle cx="330" cy="60" r="6" fill={GOLD}><animate attributeName="r" values="3;9;3" dur="1.4s" repeatCount="indefinite" /></circle>
        <text x="330" y="40" textAnchor="middle" fontSize="12" fill={GOLD}>节庆 = 一个点</text>
      </g>}
      <text x="510" y="195" textAnchor="end" fontSize="11" fill={INK} opacity=".5">第 {i + 1} 步</text>
    </svg>);
}

export default function Festival() {
  return <StepThrough steps={steps} render={i => <Scene i={i} />} />;
}
