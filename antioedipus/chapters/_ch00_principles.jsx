// 序言专属图解 (a)：「非法西斯生活指南」卡片墙。
// 正面 = 福柯原则的中文改写；背面 = 大白话 + 日常场景（示意）+ 自查问题。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", INK = "#1f1b16";

const PRINCIPLES = [
  {
    no: 1, tag: "拒绝总体化", icon: "🧩", cid: "non_fascist_life",
    front: "把政治行动从一切「统一化、总体化」的偏执中解放出来。",
    plain: "别指望一个大理论、一个大组织、一条唯一正确路线能统摄一切。",
    scene: "群里总有人说：「所有问题的根源只有一个，只要听我们的就全解决了。」其他声音于是都成了「跑题」。",
    check: "我是不是觉得：只要找到那个唯一正确答案，别人就都可以闭嘴了？",
  },
  {
    no: 2, tag: "横向增殖", icon: "🌱", cid: "deterritorialized_flows",
    front: "通过增殖、并置、析取来发展行动、思想与欲望，而不是靠细分与金字塔式层级。",
    plain: "让事情像蘑菇菌丝一样横着长、彼此串联，而不是总部—分部—小组层层审批。",
    scene: "街坊自发组织的读书会、修车互助、共享厨房各自冒出来又互相借人借场地，没有谁是谁的「下级」。",
    check: "我做一件事时，第一反应是「先找上级批准」，还是「先找旁边的人接上」？",
  },
  {
    no: 3, tag: "告别否定", icon: "➕", cid: "desiring_production",
    front: "不再效忠「否定」的旧范畴（法律、界限、阉割、匮乏、缺口）；偏爱肯定与多样、差异胜过划一、流胜过统一体、可移动的配置胜过体系。生产性的东西是游牧的，而非定居的。",
    plain: "别从「我缺什么」出发理解自己，而从「我能接上什么、产出什么」出发。",
    scene: "广告天天说「你还缺一支新手机、一段完美关系」。换个问法：我手头的时间、朋友、技能，今天能连出点什么新东西？",
    check: "我是不是把「欲望」默认等于「缺口」——永远差一点才圆满？",
  },
  {
    no: 4, tag: "快乐地抗争", icon: "🎉", cid: "non_fascist_life",
    front: "别以为要战斗就必须悲伤，哪怕对手再可憎。有革命力量的是欲望与现实的连接，而不是欲望退缩进「表象」里。",
    plain: "苦大仇深、自我惩罚不等于更革命；真正有力量的是把欲望直接接到现实上。",
    scene: "一个社区抗议拆迁：一种办法是每天开批判会、互相检讨「立场不坚定」；另一种是把抗议办成街坊天天来的集市和音乐会。",
    check: "我是不是把「愁眉苦脸」当成认真、把「快乐」当成不严肃？",
  },
  {
    no: 5, tag: "思想 × 行动", icon: "🔁", cid: "theory_toolbox",
    front: "不要用思想替政治实践奠定「真理」的根基，也不要用政治行动把思想贬成空谈。让实践成为思想的放大器，让分析成为介入方式的倍增器。",
    plain: "理论不是给行动发「正确证书」的，行动也不该嘲笑理论「没用」；两者互相加码。",
    scene: "两种极端：「先把经典读透再行动」和「理论都是空谈，干就完了」。福柯要的是第三种：做的过程中冒出新问题，新分析又打开新的做法。",
    check: "我引用理论，是为了打开新可能，还是为了证明「我才是对的」？",
  },
  {
    no: 6, tag: "去个体化", icon: "👥", cid: "de_individualize",
    front: "不要要求政治去恢复哲学所定义的个人「权利」。个人是权力的产物。要通过增殖、移位、多样组合来「去个体化」；群体不应是把层级化个人捆在一起的有机纽带，而应是不断生产去个体化的发生器。",
    plain: "「我」这个被评估、被打分的个体，本身就是权力塑造出来的；别只想着保住它，要敢于在组合中变成别的。",
    scene: "绩效表、信用分、个人画像把你钉成一个可管理的「个体」。而一支角色不断轮换的小乐队里，今天你是鼓手、明天是写词的——没人被定死。",
    check: "我加入一个群体，是为了在金字塔里找到「我的位置」，还是为了变成新的自己？",
  },
  {
    no: 7, tag: "别爱上权力", icon: "👑", cid: "inner_fascism",
    front: "不要爱上权力。",
    plain: "最难的不是反对别人手里的权力，而是戒掉自己对权力的那点迷恋。",
    scene: "当上群主后开始享受踢人、定规矩；做了小组长就爱听别人汇报。这些「小小的暴政」正是福柯说要追踪的日常法西斯。",
    check: "我上一次享受「别人得听我的」那种感觉，是在什么时候？",
  },
];

function FlipCard({ p, flipped, onFlip }) {
  const face = {
    gridArea: "1 / 1", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    borderRadius: 16, padding: "16px 18px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 8,
  };
  return (
    <div onClick={onFlip} style={{ perspective: 1200, cursor: "pointer" }} title="点击翻面">
      <div style={{
        display: "grid", transformStyle: "preserve-3d", transition: "transform .6s cubic-bezier(.4,.2,.2,1)",
        transform: flipped ? "rotateY(180deg)" : "none", minHeight: 250,
      }}>
        <div style={{ ...face, background: "var(--card)", borderTop: `4px solid ${RED}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 30, color: RED, opacity: .8 }}>{p.no}</span>
            <span style={{ fontSize: 28 }}>{p.icon}</span>
          </div>
          <b style={{ fontSize: 17 }}>{p.tag}</b>
          <div style={{ fontSize: 14.5, lineHeight: 1.65, color: INK }}>{p.front}</div>
          <div style={{ marginTop: "auto", fontSize: 12, color: "var(--muted)" }}>点击翻面 · 大白话与日常场景 ↻</div>
        </div>
        <div style={{ ...face, background: INK, color: "var(--paper)", transform: "rotateY(180deg)" }}>
          <b style={{ fontSize: 16, color: "#f0c674" }}>{p.icon} {p.plain}</b>
          <div style={{ fontSize: 14, lineHeight: 1.6 }}><span style={{ opacity: .6 }}>场景（示意）：</span>{p.scene}</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, borderLeft: "3px solid #f0c674", paddingLeft: 10, opacity: .95 }}>
            🔍 自查：{p.check}</div>
          <div style={{ marginTop: "auto", fontSize: 12, opacity: .55 }}>再点一次翻回</div>
        </div>
      </div>
    </div>);
}

export default function PrincipleWall() {
  const [flip, setFlip] = useState({});
  const n = Object.values(flip).filter(Boolean).length;
  const all = n === PRINCIPLES.length;
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 15, flex: "1 1 360px" }}>
          福柯说：如果把这本书改写成一本「日常生活手册」，它会是这七条。每张卡正面是原则（中文改写），
          背面是大白话、一个<b>示意性的</b>日常场景（编者所拟，非原著内容），以及一个自查问题——
          因为福柯要追踪的<C id="inner_fascism">法西斯</C>，首先藏在我们自己身上。
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>已翻 {n}/{PRINCIPLES.length}</span>
          <div className="seg" style={{ margin: 0 }}>
            <button className={all ? "on" : ""} onClick={() => setFlip(all ? {} : Object.fromEntries(PRINCIPLES.map(p => [p.no, true])))}>
              {all ? "全部翻回" : "全部翻面"}</button>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
        {PRINCIPLES.map(p => <FlipCard key={p.no} p={p} flipped={!!flip[p.no]} onFlip={() => setFlip(s => ({ ...s, [p.no]: !s[p.no] }))} />)}
        <div style={{ borderRadius: 16, border: "2px dashed var(--line)", padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, minHeight: 250 }}>
          <b style={{ fontFamily: "var(--serif)", fontSize: 18 }}>为什么叫「伦理学」？</b>
          <div style={{ fontSize: 14, lineHeight: 1.65 }}>
            基督教道德家在灵魂深处搜寻「肉欲」的痕迹；福柯说，德勒兹与加塔利则在<b>身体</b>里搜寻最细微的法西斯痕迹。
            这七条不是政治纲领，而是一种<C id="non_fascist_life">生活的艺术</C>：问的不是「为什么」，而是「怎么做」。
          </div>
        </div>
      </div>
    </div>);
}
