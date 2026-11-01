// 第 1 章专属图解 ②：1750 年前后的「技术记分牌」 + 煤在哪里
import { useState } from "react";
import { C } from "@kit";
import { REG } from "./_ch01_dashboard.jsx";

const TIE = { label: "相当 / 各有所长", color: "var(--muted)" };
const lead = k => (k === "tie" ? TIE : REG[k]);

// later: 0 = 后来无关紧要, 1 = 有一定影响, 2 = 决定性
const FIELDS = [
  { id: "agri", icon: "🌾", name: "农业与灌溉", who: "cn", whoTxt: "中国、印度、日本、东南亚",
    why: "灌溉是最明显的例子，在许多农业技术上欧洲都落后。1753 年成立的一个威尔士农业改良协会，把让威尔士「像中国一样繁荣」当作目标；不靠灌溉的山东能养活的人口密度是荷兰的两倍多。中国、日本农业还撑住了激增的纤维需求，华北保持土壤肥力也比英、法好。",
    later: 1, laterTxt: "本该极重要：农业是 18 世纪最大的经济部门。之所以后来显得「不要紧」，是因为欧洲从大西洋彼岸拿到了大量额外土地（第 6 章）。" },
  { id: "textile", icon: "🧵", name: "织造、染色与瓷器", who: "ot", whoTxt: "印度、中国",
    why: "18 世纪末，西欧人在许多织染工艺上仍在模仿印度和中国，瓷器也是如此。",
    later: 0, laterTxt: "被后来的机器纺织盖过，成了「被追上的领域」。" },
  { id: "spin", icon: "🪡", name: "纺纱织布机械", who: "tie", whoTxt: "最终欧洲（英国）突破",
    why: "中国早有与哈格里夫斯珍妮纺纱机、凯伊飞梭只差「一处关键细节」的机器；在这两项发明真正出现之前，谈不上欧洲领先。纺纱机械化把纺一定量纱所需劳动削减了九成以上。",
    later: 1, laterTxt: "看似核心，其实依赖美洲：棉花来自海外，若没有美国南方的棉花，原料涨价会让这些发明只是「有趣的新奇玩意」。" },
  { id: "cellar", icon: "🕳️", name: "北方纺纱地窖", who: "cn", whoTxt: "中国",
    why: "17 世纪有人发现某种地窖能保持湿度，让华北干燥的月份也能纺棉；此后一百多年迅速传遍，让一个人口超过任何欧洲国家的地区自产布匹、减少季节性失业——而推广者是最穷、最分散、最不识字的人。",
    later: 0, laterTxt: "只因一百年后家庭纺织整体变得「落后」，它才没被当成一项传播惊人的突破。" },
  { id: "iron", icon: "⚒️", name: "钢铁质量与价格", who: "ot", whoTxt: "印度（及非洲部分地区）",
    why: "1827 和 1842 年两位英国观察者都说印度条铁与英国铁一样好或更好；1829 年的报价不到英国铁在英国售价的一半。非洲一些地方的钢铁质量也不逊于近代早期欧洲，只是受燃料木材所限。",
    later: 1, laterTxt: "决定钢铁业命运的，最终是能否摆脱木炭、改用煤——见下方的煤。" },
  { id: "health", icon: "🚰", name: "公共卫生与妇婴医学", who: "cn", whoTxt: "东亚城市；清代医学",
    why: "东亚（大概还有东南亚）城市在卫生与清洁饮水上远远领先；清代医学在妇婴保健上可能仍优于欧洲，尽管没有哈维血液循环那样的概念突破。天花预防则在欧洲、中国、印度各自独立出现。",
    later: 0, laterTxt: "直接影响寿命，但不会引发工业突破。" },
  { id: "stove", icon: "🔥", name: "炉灶热效率", who: "cn", whoTxt: "中国",
    why: "约 1700 年中国与西欧人均能源使用大致相当（Smil）。欧洲在单台动力机器的效率上领先，而中国在做饭、取暖炉灶的热效率上有同样明显的优势；燃料节省的创新（如用锅炒菜代替用重器煮）越来越重要。",
    later: 0, laterTxt: "化石燃料兴起后，省每一点柴火不再要紧，它才沦为「脚注」；若欧洲因燃料短缺停滞，浪费的欧洲壁炉反倒会被当作技术落后的典型。" },
  { id: "water", icon: "⚙️", name: "水车与动力机械", who: "eu", whoTxt: "西欧",
    why: "西欧拥有当时世界上最高效的水车，单台动力机器效率是欧洲最大的优势之一。",
    later: 0, laterTxt: "水力受地点限制、无法搬动、季节不稳，也不能无限扩大；单靠它征服不了别处的市场。" },
  { id: "canal", icon: "🚢", name: "运河与内河航运", who: "tie", whoTxt: "欧洲最佳、中国普及",
    why: "牛顿力学让 1750 年的欧洲人造出世上最好的水泵和船闸；但中国运河无处不在，在内河航运的平均利用程度上可能领先得更久。这正是「最佳技术」与「平均技术」的差别。",
    later: 0, laterTxt: "不是分流的关键。" },
  { id: "instr", icon: "🕰️", name: "精密仪器、枪炮、航海仪", who: "eu", whoTxt: "西欧，尤其英国",
    why: "按 Mokyr 的说法，欧洲（以及欧洲内部的英国）18 世纪真正的技术优势不在工具或机器，而在仪器——钟表、望远镜、眼镜等，主要是富裕城市人的享受品。中国也有手艺不差的钟表匠，但几乎都在长江三角洲和东南沿海。",
    later: 2, laterTxt: "意外地关键：从仪器和枪炮制造转移来的精密镗削与校准技艺，让纽可门蒸汽机勉强好用，又使瓦特把效率提高到四倍。" },
  { id: "sci", icon: "📚", name: "科学文化", who: "tie", whoTxt: "西北欧或有优势（待研究）",
    why: "Margaret Jacob 等人描述的英格兰「科学文化」：识字与印刷、科学学会、公开讲座。但中国 17 世纪起对数学、物理的兴趣也明显上升，精英间书信讨论活跃而务实，医书畅销；中国也没有一个需要科学学会去抵挡的敌对教会。",
    later: 1, laterTxt: "有助于工匠、企业家与科学知识互通，但彭慕兰认为单凭它不足以解释分流。" },
  { id: "coal", icon: "⛏️", name: "采煤与蒸汽机", who: "eu", whoTxt: "英国",
    why: "英国在采矿上领先；矿井积水催生了强力蒸汽水泵。没有蒸汽，英国采煤难以超过 1700 年的水平；实际上此后 50 年产量增长约 70%，1750–1830 年又增长近 500%（合计约 900%）。",
    later: 2, laterTxt: "唯一一项纯属欧洲本土、对 19 世纪突破至关重要、又不依赖海外资源的技术优势。但它成为「对的那匹马」，很大程度靠地理位置——往下看。" },
];

export function TechScoreboard() {
  const [sel, setSel] = useState("agri");
  const [hind, setHind] = useState(false);
  const f = FIELDS.find(x => x.id === sel);
  const tally = { eu: 0, asia: 0, tie: 0 };
  FIELDS.forEach(x => { if (x.who === "eu") tally.eu++; else if (x.who === "tie") tally.tie++; else tally.asia++; });
  const scale = x => (!hind ? 1 : x.later === 2 ? 1.1 : x.later === 1 ? .9 : .78);
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={!hind ? "on" : ""} onClick={() => setHind(false)}>👁️ 站在 1750 年看</button>
          <button className={hind ? "on" : ""} onClick={() => setHind(true)}>🔭 站在 1850 年回头看</button>
        </div>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          记分（{FIELDS.length} 个领域，示意性归类）：欧洲领先 <b style={{ color: "var(--blue)" }}>{tally.eu}</b> · 亚洲领先 <b style={{ color: "var(--accent)" }}>{tally.asia}</b> · 相当 <b>{tally.tie}</b>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
        {FIELDS.map(x => {
          const L = lead(x.who), dim = hind && x.later === 0, key = hind && x.later === 2;
          return (
            <button key={x.id} onClick={() => setSel(x.id)} style={{
              textAlign: "left", font: "inherit", cursor: "pointer", borderRadius: 12, padding: "10px 12px",
              background: "var(--paper)", border: sel === x.id ? "2px solid var(--ink)" : "1px solid var(--line)",
              borderTop: `5px solid ${L.color}`, opacity: dim ? .45 : 1, transform: `scale(${scale(x)})`,
              transition: "transform .5s, opacity .5s, box-shadow .5s",
              boxShadow: key ? "0 0 0 3px var(--gold)" : "none",
            }}>
              <div style={{ fontSize: 20 }}>{x.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.35 }}>{x.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>领先：{x.whoTxt}</div>
              {hind && <div style={{ fontSize: 11, marginTop: 4, color: key ? "var(--ink)" : "var(--muted)", fontWeight: key ? 700 : 400 }}>
                {x.later === 2 ? "★ 决定性" : x.later === 1 ? "有影响，但另有条件" : "后来成了脚注"}</div>}
            </button>);
        })}
      </div>
      <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
        {["eu", "cn", "ot"].map(k => <span key={k}><i style={{ display: "inline-block", width: 14, height: 5, background: REG[k].color, marginRight: 5, verticalAlign: "middle" }} />{k === "eu" ? "欧洲领先" : k === "cn" ? "中国 / 东亚领先" : "印度等其他地区领先"}</span>)}
        <span><i style={{ display: "inline-block", width: 14, height: 5, background: TIE.color, marginRight: 5, verticalAlign: "middle" }} />{TIE.label}</span>
      </div>
      <div style={{ background: "var(--paper)", borderRadius: 12, padding: "12px 16px", borderLeft: `4px solid ${lead(f.who).color}` }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{f.icon} {f.name} <span style={{ fontSize: 14, color: "var(--muted)" }}>· 领先：{f.whoTxt}</span></div>
        <p style={{ margin: "6px 0" }}>📖 {f.why}</p>
        <p style={{ margin: 0, fontSize: 15, color: hind ? "var(--ink)" : "var(--muted)" }}>
          {hind ? "🔭 事后看：" : "（切到「站在 1850 年回头看」，看它后来是否要紧）"}{hind && f.laterTxt}</p>
      </div>
      <div style={{ fontSize: 15 }}>
        {!hind ? <>站在 1750 年，这是一张「互有胜负」的成绩单：欧洲没有全面的<C id="best_vs_average_tech">技术优势</C>，亚洲在农业、土地管理和省燃料方面反而领先。</>
          : <>回头看，大多数领域都褪成了背景，只剩一两格发光——但彭慕兰强调，这种「重要性」是<b>事后</b>才显现的，而且要靠位置合适的煤与美洲的土地。</>}
      </div>
    </div>);
}

// ---------- 煤在哪里：英国 vs 中国（示意图，非比例地图） ----------
const STAGES = [
  { label: "煤在哪", text: "欧洲最大的几处煤田恰好在英国：靠近优良水运、欧洲最有活力的经济和大量熟练工匠，而且英国早在 1600 年前后就缺柴。中国的煤绝大部分在西北：今天山西加内蒙古占全国煤储量 61.4%，南方九省只有 1.8%，东部十一省 8%。" },
  { label: "运得到吗", text: "能源开采的成本主要是运输成本。西北的煤从矿口运到 50 公里外的河岸，价格就涨到五倍；离长江三角洲较近的徐州煤矿，运到同时是运河码头的县城，煤价也翻倍。英国矿区则紧挨水路与市场。" },
  { label: "矿井的难题", text: "英国矿井的难题是积水，需要强力水泵——这正好催生了蒸汽机，而蒸汽机还有许多别的用途。华北、西北矿井太干燥，难题是自燃，需要的是通风；通风再好，也帮不了运输。" },
  { label: "边干边学", text: "1712–1800 年间一共只造了约 2500 台蒸汽机，别的行业多押宝改良水车；唯独煤田在 1800 年已用着约 1000 台。在矿口，机器笨重无所谓，劣质「碎煤」几乎免费，于是蒸汽机能在那里被反复使用、改进。用煤的工艺诀窍靠工匠口耳相传——法国照搬设备也学不会。江南的工匠与市场，却离煤太远。" },
];

export function CoalGeography() {
  const [s, setS] = useState(0);
  const BL = "var(--blue)", RD = "var(--accent)", INK = "var(--ink)", MU = "var(--muted)";
  const show = k => s >= k;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{STAGES.map((x, j) =>
        <button key={j} className={s === j ? "on" : ""} onClick={() => setS(j)}>{j + 1}. {x.label}</button>)}</div>
      <svg viewBox="0 0 780 330" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <text x="770" y="322" textAnchor="end" fontSize="11" fill={MU}>示意图：位置关系示意，非比例地图</text>
        {/* 英国 */}
        <text x="190" y="28" textAnchor="middle" fontSize="16" fill={BL} fontWeight="700">英国</text>
        <path d="M172 42 L212 46 L222 80 L238 112 L246 150 L262 190 L276 236 L262 262 L216 270 L168 280 L186 250 L160 238 L180 214 L170 186 L154 150 L166 120 L152 88 Z"
          fill="var(--card)" stroke={BL} strokeWidth="2" />
        <path d="M110 60 Q90 180 130 300 M300 60 Q320 180 290 300" stroke={BL} strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity=".5" />
        <text x="96" y="186" fontSize="11" fill={MU} transform="rotate(-90 96 186)">海运 / 沿海航道</text>
        {[[205, 105, "东北煤田"], [205, 185, "中部煤田"], [175, 230, "南威尔士"]].map(([x, y, t], i) =>
          <g key={i}><circle cx={x} cy={y} r="8" fill={INK} /><text x={x + 16} y={y + 4} fontSize="11" fill={INK}>{t}</text></g>)}
        <circle cx="240" cy="245" r="9" fill="none" stroke={BL} strokeWidth="3" />
        <text x="240" y="268" textAnchor="middle" fontSize="11" fill={BL}>伦敦（市场）</text>
        {show(1) && <path d="M205 105 Q250 160 240 236" stroke={BL} strokeWidth="3" fill="none" markerEnd="url(#arB)" />}
        {show(1) && <text x="262" y="150" fontSize="11" fill={BL}>近、走水路</text>}
        {show(2) && <g><text x="140" y="305" fontSize="12" fill={BL}>矿井难题：积水 → 水泵 → 蒸汽机 ✔</text></g>}
        {show(3) && <g>
          <text x="236" y="52" fontSize="12" fill={INK}>⚙️ 蒸汽机在矿口</text>
          <text x="236" y="68" fontSize="11" fill={MU}>1800 年约 1000 台在煤田</text>
          <text x="236" y="84" fontSize="11" fill={MU}>工匠 · 仪器匠在附近</text>
        </g>}
        <line x1="390" y1="20" x2="390" y2="300" stroke="var(--line)" />
        {/* 中国 */}
        <text x="590" y="28" textAnchor="middle" fontSize="16" fill={RD} fontWeight="700">中国</text>
        <path d="M420 70 L560 50 L700 70 L740 140 L720 200 L690 260 L610 290 L520 280 L460 230 L430 160 Z"
          fill="var(--card)" stroke={RD} strokeWidth="2" />
        <circle cx="500" cy="110" r="42" fill={INK} opacity=".88" />
        <text x="500" y="106" textAnchor="middle" fontSize="11" fill="var(--paper)">山西+内蒙古</text>
        <text x="500" y="122" textAnchor="middle" fontSize="12" fill="var(--paper)" fontWeight="700">61.4%</text>
        <circle cx="640" cy="165" r="8" fill={INK} opacity=".7" />
        <text x="652" y="160" fontSize="11" fill={INK}>徐州</text>
        <text x="600" y="120" fontSize="11" fill={MU}>东部十一省 8%</text>
        <circle cx="590" cy="268" r="5" fill={INK} opacity=".55" />
        <text x="580" y="272" textAnchor="end" fontSize="11" fill={MU}>南方九省 1.8%</text>
        <circle cx="675" cy="215" r="12" fill="none" stroke={RD} strokeWidth="3" />
        <text x="675" y="240" textAnchor="middle" fontSize="11" fill={RD}>江南（市场 · 工匠）</text>
        <text x="500" y="166" textAnchor="middle" fontSize="10.5" fill={MU}>（今日煤储量占比）</text>
        {show(1) && <g>
          <path d="M530 125 Q610 170 664 208" stroke={RD} strokeWidth="3" fill="none" strokeDasharray="7 6" markerEnd="url(#arR)" />
          <text x="462" y="205" fontSize="11" fill={RD}>远、靠陆运：离矿 50 公里煤价 ×5</text>
          <path d="M645 172 L668 203" stroke={RD} strokeWidth="2" fill="none" markerEnd="url(#arR)" />
          <text x="700" y="185" fontSize="11" fill={RD}>到运河口 ×2</text>
        </g>}
        {show(2) && <text x="420" y="305" fontSize="12" fill={RD}>矿井难题：干燥自燃 → 通风（帮不了运输）</text>}
        {show(3) && <text x="608" y="88" fontSize="11" fill={MU}>钟表匠多在江南、东南沿海</text>}
        <defs>
          <marker id="arB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill={BL} /></marker>
          <marker id="arR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill={RD} /></marker>
        </defs>
      </svg>
      <p style={{ margin: 0 }}><b>{s + 1}. {STAGES[s].label}：</b>{STAGES[s].text}</p>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <button className="chip" disabled={s === 0} onClick={() => setS(s - 1)}>← 上一步</button>
        <button className="chip" disabled={s === STAGES.length - 1} onClick={() => setS(s + 1)}>下一步 →</button>
      </div>
    </div>);
}
