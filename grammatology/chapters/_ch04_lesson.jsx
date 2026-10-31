// 第 4 章专属图解（二）：「文字课」分步拆解——场景 → 列维-斯特劳斯的解读 → 德里达的反驳
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3c6b4a";

const Wavy = ({ x, y, w = 90, color = INK, anim }) => {
  const d = `M${x},${y} q${w / 8},-10 ${w / 4},0 t${w / 4},0 t${w / 4},0 t${w / 4},0`;
  return <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
    strokeDasharray={anim ? 140 : undefined} strokeDashoffset={anim ? 140 : undefined}>
    {anim && <animate attributeName="stroke-dashoffset" values="140;0;0" dur="2.4s" repeatCount="indefinite" />}
  </path>;
};

// 场景：族人、酋长（拿纸）、人类学家
function Scene({ i }) {
  return <>
    {[0, 1, 2, 3, 4].map(k => <text key={k} x={60 + (k % 3) * 46} y={150 + Math.floor(k / 3) * 52} fontSize="30">🧑🏽</text>)}
    <text x="80" y="250" fontSize="12" fill={INK} opacity=".6">族人</text>
    <text x="275" y="175" fontSize="44">🧔🏽</text>
    {i >= 1 && <text x="268" y="122" fontSize="22">👑<animate attributeName="opacity" values="0;1" dur=".8s" fill="freeze" /></text>}
    <rect x="250" y="190" width="110" height="56" rx="6" fill="#fff" stroke={INK} strokeOpacity=".3" />
    <Wavy x={262} y={208} anim /><Wavy x={262} y={228} anim={i >= 1} />
    <text x="305" y="270" textAnchor="middle" fontSize="12" fill={INK} opacity=".6">酋长「读」清单</text>
    <text x="480" y="175" fontSize="40">🧑‍🔬</text>
    <text x="478" y="210" fontSize="12" fill={INK} opacity=".6">人类学家</text>
    {i === 0 && <text x="300" y="50" textAnchor="middle" fontSize="15" fill={INK}>发下纸笔 → 大家都画起波浪线（他们叫它「画线」）</text>}
    {i === 1 && <>
      <text x="300" y="44" textAnchor="middle" fontSize="15" fill={GOLD}>「弓箭给他，砍刀给他，珠子给她……」——念了两个小时</text>
      {[0, 1, 2].map(k => <line key={k} x1="250" y1={170 + k * 10} x2={210 - k * 8} y2={150 + k * 30} stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 4" />)}
      <line x1="365" y1="160" x2="465" y2="160" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="415" y="152" textAnchor="middle" fontSize="11" fill={GOLD}>「我和白人结盟了」</text>
    </>}
  </>;
}

// 列维-斯特劳斯的模型：一条时间线被「文字」劈成两半
function LSModel({ i }) {
  return <>
    <text x="300" y="34" textAnchor="middle" fontSize="15" fill={INK}>列维-斯特劳斯的历史图景</text>
    <rect x="30" y="70" width="250" height="120" rx="12" fill={GREEN} fillOpacity=".12" />
    <text x="155" y="110" textAnchor="middle" fontSize="16" fill={GREEN}>🌿 纯真的言语社会</text>
    <text x="155" y="136" textAnchor="middle" fontSize="12" fill={INK} opacity=".7">人人在声音所及之处 · 温柔 · 无剥削</text>
    <rect x="320" y="70" width="250" height="120" rx="12" fill={RED} fillOpacity=".1" />
    <text x="445" y="110" textAnchor="middle" fontSize="16" fill={RED}>⛓️ 文字社会</text>
    <text x="445" y="136" textAnchor="middle" fontSize="12" fill={INK} opacity=".7">等级 · 奴役 · 谎言 · 「不知法不免责」</text>
    <line x1="300" y1="56" x2="300" y2="206" stroke={RED} strokeWidth="5">
      <animate attributeName="stroke-width" values="5;8;5" dur="1.4s" repeatCount="indefinite" /></line>
    <text x="300" y="226" textAnchor="middle" fontSize="13" fill={RED} fontWeight="700">🪓 文字「突然」从外面闯入</text>
    {i === 3 && <>
      <text x="445" y="168" textAnchor="middle" fontSize="12" fill={RED}>首要功能：便于奴役他人</text>
      <text x="155" y="168" textAnchor="middle" fontSize="12" fill={GREEN}>「倔强的人」退入丛林，赢得喘息</text>
    </>}
    {i === 2 && <text x="300" y="254" textAnchor="middle" fontSize="12" fill={INK} opacity=".7">文字的目的是「社会学的」（威望、权力），而非「智识的」（知识）</text>}
  </>;
}

// 德里达：墙变成虚线，下面露出「原文字」地基，暴力早已在左边
function DerridaModel({ i }) {
  return <>
    <text x="300" y="30" textAnchor="middle" fontSize="15" fill={INK}>德里达的改写</text>
    <rect x="30" y="56" width="250" height="100" rx="12" fill={GREEN} fillOpacity=".06" stroke={GREEN} strokeOpacity=".3" strokeDasharray="5 5" />
    <text x="155" y="80" textAnchor="middle" fontSize="13" fill={GREEN} opacity=".7">「无文字社会」？</text>
    {i >= 5 && [["👑", "首领与等级", 60], ["🧪", "投毒请求", 130], ["⚔️", "战争与劫掠", 200]].map(([e, t, x], k) =>
      <g key={k}><text x={x} y="118" fontSize="22">{e}<animate attributeName="opacity" values="0;1" dur=".6s" begin={k * .3 + "s"} fill="freeze" /></text>
        <text x={x + 12} y="142" textAnchor="middle" fontSize="10" fill={RED}>{t}</text></g>)}
    <rect x="320" y="56" width="250" height="100" rx="12" fill={RED} fillOpacity=".06" />
    <text x="445" y="100" textAnchor="middle" fontSize="13" fill={INK} opacity=".7">狭义文字（字母、笔记、清单）</text>
    <line x1="300" y1="50" x2="300" y2="160" stroke={RED} strokeWidth="2" strokeDasharray="4 8" opacity=".5" />
    <text x="300" y="176" textAnchor="middle" fontSize="11" fill={RED} opacity=".8">{i === 4 ? "这里只是「借用」的一刻，不是文字的起源" : "这道墙不存在"}</text>
    <rect x="30" y="190" width="540" height="52" rx="10" fill={BLUE} fillOpacity=".85">
      <animate attributeName="fill-opacity" values=".5;.85" dur="1s" fill="freeze" /></rect>
    <text x="300" y="214" textAnchor="middle" fontSize="15" fill="#fff" fontWeight="700">原文字 · 延异：命名、分类、家谱、差异</text>
    <text x="300" y="233" textAnchor="middle" fontSize="11" fill="#fff" opacity=".85">言语与文字共同的地基——也是暴力的可能性所在</text>
    {i === 4 && <text x="300" y="262" textAnchor="middle" fontSize="12" fill={INK} opacity=".7">论文里：南比夸拉人很快就画出了家谱和社会结构图</text>}
    {i === 6 && <text x="300" y="262" textAnchor="middle" fontSize="12" fill={GOLD}>「纯真的他者」= 把自己的在场之梦投射到别人身上</text>}
  </>;
}

const steps = [
  {
    label: "发纸笔",
    content: <p>列维-斯特劳斯在南比夸拉人中间分发纸和铅笔。起初没人用；后来大家都在纸上画<b>水平的波浪线</b>，模仿他记笔记的样子。他断言：南比夸拉人「当然不会写字」，甚至几乎不会画画，只在葫芦上画些点和折线。他的博士论文还记下：他们把这个动作叫作 <i>iekariukedjutu</i>，意思是「画线」。</p>,
  },
  {
    label: "酋长的表演",
    content: <p>只有酋长「看得更远」。他向人类学家要了一个本子，回答问题时不说话，而是画几道波浪线递过去，仿佛对方读得懂；两人心照不宣地演下去。交换礼物那天，他从篮子里掏出画满线条的纸，装作照着「清单」念：谁得弓箭、谁得砍刀……念了两个小时。他想让族人相信：交易是靠他促成的，他已和白人结盟、分享了白人的秘密。</p>,
  },
  {
    label: "夜里的推论（上）",
    content: <p>当晚列维-斯特劳斯失眠，从这件「荒唐的小事」推出两条结论：① 文字是<b>突然</b>出现的，无须漫长学习——可见文字的可能性不在言语之内，而在言语之外（<C id="epigenetism">突现论</C>）；② 酋长并不懂文字的内容却会用它，可见文字的目的是<b>社会学的</b>（增加个人的威望与权力），而不是<b>智识的</b>（获取和保存知识）。</p>,
  },
  {
    label: "夜里的推论（下）",
    content: <p>他进一步提出「假说」：文字作为交流手段，首要功能是<b>方便奴役他人</b>。新石器时代没有文字也创造了文明的基本结构；文字出现后几千年，知识时增时减；19 世纪的义务教育与兵役、无产阶级化并肩推进——人人识字，当局才能宣布「不知法不免责」。故事的结尾：许多族人离开了这位酋长，退入丛林。列维-斯特劳斯说他们模糊地明白了，文字一来到他们中间，就与谎言结了盟。</p>,
  },
  {
    label: "德里达：那不是起源",
    content: <p>德里达先拆前提。那一幕不是文字的<b>诞生</b>，而是对一种现成文字的<b>模仿和借用</b>——借用当然可以很快，但文字的真实起源是漫长、渐进、分阶段的；借用能这么快，恰恰说明对应的结构早就存在。再说，把对方表示书写的词译成「画线」就断定他们不会写字，那么许多语言里「写」的本义也不过是刮、刻、划。中文的「文」可以指石木纹理、星象连线、鸟兽足迹、龟甲花纹——难道中国人也没有文字？更关键的是：论文后面记载，有些南比夸拉人很快就画出了<b>家谱和社会结构图</b>。家谱和社会分类，正是<C id="arche_violence">原文字</C>的缝合线。</p>,
  },
  {
    label: "德里达：暴力早已在场",
    content: <p>把「社会学的」和「智识的」一刀两断，本身就站不住：如果文字离不开主体之间的暴力，那有什么知识、什么语言能完全逃开这种暴力？列维-斯特劳斯举的例子都对，却<b>对得太多了</b>——它们同样适用于没有文字的言语。翻开他自己的书和论文，南比夸拉社会有首领的权谋、多妻、群体分裂、劫掠妇女、战争，甚至有人逼他往别人饭里<b>下毒</b>。等级与暴力，不必等到字母出现。</p>,
  },
  {
    label: "德里达：纯真是一场梦",
    content: <p>结论：「<C id="society_without_writing">无文字的纯真社会</C>」是一个神话，是卢梭式的梦——一个人人都在彼此声音所及之处、对自己完全在场的小共同体。列维-斯特劳斯以反民族中心主义的姿态赞美他者，却用的是西方语音中心主义的「文字」概念来衡量他们，这就是<C id="anti_ethnocentrism">反民族中心主义的民族中心主义</C>。德里达也同意「暴力就是文字」，但意思完全相反：不是文字败坏了纯真言语，而是言语本身从来就是一种文字。</p>,
  },
];

export default function WritingLesson() {
  return <StepThrough steps={steps} render={i =>
    <svg key={i} viewBox="0 0 600 280" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
      {i <= 1 ? <Scene i={i} /> : i <= 3 ? <LSModel i={i} /> : <DerridaModel i={i} />}
    </svg>} />;
}
