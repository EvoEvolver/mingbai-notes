// 第 6 章专属图解 (c)：乱伦禁忌如何「挖渠」——从强度的胚种流到被移置的俄狄浦斯图像（StepThrough）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257", VIOLET = "#5b3f7a";

const steps = [
  { label: "强度的洪流",
    content: <p>起点不是「爸爸-妈妈-我」，而是一股<C id="intensive_extensive">强度的、胚种的流</C>（germinal influx）：还没有可区分的人，只有强弱变化；符号都是两可的，既可以是 +，也可以是 −。
      多贡神话里，约鲁古偷走一块胎盘，觉得自己和母亲是同一实体、同一代，于是把自己当成母亲的孪生兄弟——「我是儿子，也是我母亲的兄弟、我姐妹的丈夫、我自己的父亲」。这股流是欲望的「代表者」，却也是原始社会最怕的东西：一股<b>无法编码</b>的流。</p> },
  { label: "联姻挖渠",
    content: <p>社会要编码，就得让这股流变成一个<b>外延的系统</b>：有的部分放行，有的部分堵住，还有某人负责堵与放。借列维-斯特劳斯的正负号：(+−)/(−+) 的表亲是交表亲，可以通婚，流<b>通过</b>；(++)/(−−) 是平表亲，禁婚，流被<b>堵住</b>。
      多贡的例子里，负责「既堵又放」的是舅舅，他因此既得到代码剩余价值，也承受某种「负价值」（外甥们会到他家里进行仪式性的偷窃）。德勒兹-加塔利强调：这更像一个<b>物理系统</b>（能量的通过与阻断），而不是一套交换的逻辑组合。</p> },
  { label: "名字由禁令造出",
    content: <p>渠挖好了，才有了可区分的人和名字：「母亲」「姐妹」恰恰是作为<b>被禁止的配偶</b>才被分辨出来的——她们并不先于禁令存在。所以严格说<C id="incest_impossible">乱伦不存在</C>：要么我们在它的<b>此岸</b>（强度之中，根本没有可辨认的人），要么在它的<b>彼岸</b>（人已可辨认，但正因如此不可能成为性伴侣）。
      人和名字永远无法同时被享有——名字在人身上滑动，像一枚太湿的印章。至多只有「优先婚」（如多贡人娶舅舅的女儿）算是「第一个被允许的乱伦」，而它恰恰很少真的发生。</p> },
  { label: "移置：这就是你想要的！",
    content: <p>关键一步：压抑的表象（联姻）把<b>它自己造出来的范畴</b>（母亲、姐妹）投射回被压抑的强度流上，好像人们原本欲望的就是「妈妈」。于是出现<C id="displaced_represented">三重领土表象</C>：
      ① 被压抑的代表者（强度的胚种流）；② 压抑的表象（联姻）；③ 被移置的被表象者（俄狄浦斯/乱伦图像）——一张诱饵般的假图像：「你看，这就是你想要的！解码的流就是乱伦！」从禁止推出「被禁止的东西原本就被欲望」，正是社会压抑的谬误推理。</p> },
  { label: "普遍，但未被占据",
    content: <p>在这个意义上俄狄浦斯是「普遍」的：每个社会都怕解码的流，都把这道界限<b>移置</b>到自己内部。但在原始社会，它从来没被「占据」：家庭向联姻敞开，与社会场同延，人们总停在 <b>4+n</b>（祖先与姻亲的系统），远到不了 <b>3+1</b>——如果有原始俄狄浦斯，那也是一个「负俄狄浦斯」（neg-Oedipus，仿「负熵」）。
      要让俄狄浦斯真正坐上欲望代表者的位置，需要社会生产脱离家庭再生产、需要一个超越的「被分离物」把社会场折叠成家庭——这些条件只在资本主义（并借用专制帝国的遗产）中实现；在原始人那里，只有<C id="colonial_oedipus">殖民</C>才把它强加上去。</p> },
];

function River({ i }) {
  const wave = "M20,110 C90,60 150,160 220,110";
  return <svg viewBox="0 0 600 255" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
    <defs>
      <linearGradient id="ch06lava" x1="0" x2="1"><stop offset="0" stopColor={RED} /><stop offset="1" stopColor={GOLD} /></linearGradient>
      <marker id="ch06ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill={VIOLET} /></marker>
    </defs>
    {i === 0 && <g>
      <path d="M10,115 C120,40 220,190 330,115 S500,40 590,115" fill="none" stroke="url(#ch06lava)" strokeWidth="70" strokeLinecap="round" opacity=".55">
        <animate attributeName="stroke-width" values="60;80;60" dur="3s" repeatCount="indefinite" /></path>
      {[[70, 100], [160, 130], [250, 95], [340, 125], [430, 90], [520, 120]].map(([x, y], k) =>
        <text key={k} x={x} y={y} fontSize="22" fill="#fffdf8" fontWeight="700" textAnchor="middle">±
          <animate attributeName="y" values={`${y};${y - 14};${y}`} dur={`${2 + k * .3}s`} repeatCount="indefinite" /></text>)}
      <text x="300" y="215" textAnchor="middle" fontSize="13" fill={MUTED}>没有人、没有名字，只有强度的起伏与两可的符号（示意）</text>
    </g>}
    {i >= 1 && i <= 3 && <g>
      <path d={wave} fill="none" stroke="url(#ch06lava)" strokeWidth="56" strokeLinecap="round" opacity=".5" />
      <text x="110" y="116" textAnchor="middle" fontSize="13" fill="#fffdf8">强度的胚种流</text>
      <path d="M220,110 C280,110 300,62 380,62 L590,62" fill="none" stroke={GREEN} strokeWidth="16" opacity=".55" />
      <path d="M220,110 L360,110" fill="none" stroke={RED} strokeWidth={i >= 2 ? 26 : 16} opacity=".45" />
      <path d="M220,110 C280,110 300,180 380,180 L590,180" fill="none" stroke={GREEN} strokeWidth="16" opacity=".55" />
      <rect x="360" y="86" width="12" height="48" fill={INK} />
      <circle cx="232" cy="110" r="16" fill="#fffdf8" stroke={VIOLET} strokeWidth="2.5" />
      <text x="232" y="115" textAnchor="middle" fontSize="13" fill={VIOLET}>舅</text>
      <text x="232" y="82" textAnchor="middle" fontSize="11" fill={VIOLET}>既堵又放</text>
      <text x="490" y="44" textAnchor="middle" fontSize="12" fill={GREEN}>(+−) 交表亲：通过 → 可婚</text>
      <text x="490" y="208" textAnchor="middle" fontSize="12" fill={GREEN}>(−+) 交表亲：通过 → 可婚</text>
      <text x="384" y="117" fontSize="12" fill={RED}>(++)/(−−) 平表亲：堵住</text>
      {i >= 2 && <g>
        <text x="305" y="115" textAnchor="middle" fontSize="12" fill="#fffdf8" fontWeight="700">母亲·姐妹</text>
        <text x="590" y="90" textAnchor="end" fontSize="11" fill={INK}>可婚的表姐妹＝「第一个被允许的乱伦」</text>
        <line x1="376" x2="376" y1="26" y2="226" stroke={INK} strokeDasharray="3 5" opacity=".35" />
        <text x="180" y="18" textAnchor="middle" fontSize="12" fill={MUTED}>此岸：没有可辨认的人</text>
        <text x="490" y="18" textAnchor="middle" fontSize="12" fill={MUTED}>彼岸：人可辨认，却不可欲</text>
        {i === 2 && <text x="376" y="246" textAnchor="middle" fontSize="12" fill={INK}>虚线＝界限＝「乱伦」：永远已越过或尚未越过</text>}
      </g>}
      {i === 3 && <g>
        <path d="M300,124 C270,225 150,225 110,165" fill="none" stroke={VIOLET} strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#ch06ar2)">
          <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" /></path>
        <text x="215" y="214" textAnchor="middle" fontSize="13" fill={VIOLET} fontWeight="700">投射：「这就是你想要的！」</text>
        <text x="20" y="44" fontSize="11" fill={RED}>① 被压抑的代表者</text>
        <text x="232" y="44" textAnchor="middle" fontSize="11" fill={VIOLET}>② 压抑的表象（联姻）</text>
        <text x="20" y="246" fontSize="11" fill={INK}>③ 被移置的被表象者：投射回去的「母亲」图像（俄狄浦斯）</text>
      </g>}
    </g>}
    {i === 4 && <g>
      <text x="150" y="26" textAnchor="middle" fontSize="14" fill={GREEN} fontWeight="700">原始领土机器：4 + n</text>
      {[[150, 115], [90, 70], [210, 70], [70, 140], [230, 140], [110, 190], [190, 190], [150, 50]].map(([x, y], k, arr) => <g key={k}>
        {k > 0 && <line x1="150" y1="115" x2={x} y2={y} stroke={GREEN} opacity=".4" />}
        {k > 1 && <line x1={arr[k - 1][0]} y1={arr[k - 1][1]} x2={x} y2={y} stroke={GREEN} opacity=".25" />}
        <circle cx={x} cy={y} r={k === 0 ? 12 : 8} fill={k === 0 ? GREEN : "#fffdf8"} stroke={GREEN} strokeWidth="2" />
      </g>)}
      <text x="150" y="222" textAnchor="middle" fontSize="11" fill={MUTED}>祖先、姻亲、酋长、邻村……家庭向社会场敞开</text>
      <text x="300" y="120" textAnchor="middle" fontSize="26" fill={MUTED}>→</text>
      <text x="300" y="145" textAnchor="middle" fontSize="11" fill={MUTED}>资本主义 / 殖民</text>
      <text x="450" y="26" textAnchor="middle" fontSize="14" fill={RED} fontWeight="700">被「占据」的俄狄浦斯：3 + 1</text>
      <polygon points="390,180 510,180 450,80" fill={RED} fillOpacity=".08" stroke={RED} strokeWidth="2" />
      <text x="390" y="200" textAnchor="middle" fontSize="12" fill={RED}>爸爸</text>
      <text x="510" y="200" textAnchor="middle" fontSize="12" fill={RED}>妈妈</text>
      <text x="450" y="72" textAnchor="middle" fontSize="12" fill={RED}>我</text>
      <circle cx="450" cy="148" r="9" fill={RED}><animate attributeName="r" values="7;11;7" dur="1.6s" repeatCount="indefinite" /></circle>
      <text x="450" y="232" textAnchor="middle" fontSize="11" fill={RED}>中间的 +1：超越项（阳具）把社会场折叠进来</text>
    </g>}
  </svg>;
}

export default function IncestChannels() {
  return <StepThrough steps={steps} render={i => <River i={i} />} />;
}
