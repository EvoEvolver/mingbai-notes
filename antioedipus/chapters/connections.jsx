// 全书脉络：《反俄狄浦斯》各章如何连成一条论证
import { BookPage, Block, C, ArgumentFlow, ConceptMap, CompareTable, Takeaways, Callout, Hook } from "@kit";
import FlowFate from "./_connections_flow.jsx";

export const links = [
  // —— 主线一：欲望生产与三种综合（第 1-2 章 → 第 3-4 章）——
  { from: "ch00:desiring_production", to: "ch01:desiring_production", label: "导论预告", note: "导论先说欲望与资本是「同一种流的经济」；第 1 章正式把无意识写成一座到处接线、截流的工厂。" },
  { from: "ch01:desiring_production", to: "ch02:desiring_social_identity", label: "欲望即社会生产", note: "第 1 章的欲望生产在第 2 章推出政治结论：只有欲望与社会，别无他物，两者是同一种生产。" },
  { from: "ch01:flows_cuts", to: "ch02:flow_break", label: "机器=切流", note: "第 1 章说欲望既让流动又截断；第 2 章把这条原则写成机器的定义：每台机器从上游切一段，自己又是下游的流。" },
  { from: "ch03:partial_objects", to: "ch10:partial_objects", label: "变成工作部件", note: "全书末尾，部分对象成为精神分裂分析要找的零件：彼此真实区分、互不隶属，只靠流间接相连。" },
  { from: "ch01:connective_synthesis", to: "ch04:connective_synthesis", label: "连接：合法/非法", note: "第 1 章的「和……然后……」在第 4 章被分出两种用法：部分·非特定的内在用法，与归于完整人格的俄狄浦斯用法。" },
  { from: "ch01:disjunctive_synthesis", to: "ch04:disjunctive_synthesis", label: "包含性析取", note: "无器官身体上的「或……或……或」在第 4 章被定为包含性用法：两端都被肯定，主体在其间滑行。" },
  { from: "ch03:inclusive_disjunction", to: "ch04:exclusive_disjunction", label: "排他之误", note: "第 3 章点出「男孩或女孩」式的排他用法；第 4 章把它定为第二个谬误：你必须待在三角的某个格子里。" },
  { from: "ch01:conjunctive_synthesis", to: "ch04:conjunctive_synthesis", label: "原来是我！", note: "第 1 章残余主体的享受，在第 4 章成为游牧的合取：主体穿过一个个强度区，每处都说「原来是我！」。" },
  { from: "ch02:desire_as_lack", to: "ch04:lack_law_signifier", label: "匮乏之误", note: "「欲望即匮乏」在第 4 章与律法、能指并列为同一个虔诚的错误。" },
  { from: "ch03:castration_operation", to: "ch04:paralogism_extrapolation", label: "抽出那个「1」", note: "阉割不是无意识本有的恐惧，而是外推谬误：从部分对象里抽出超越的阳具，让每个位置都显得「缺它」。" },

  // —— 主线二：无器官身体 → 社会体（三个满盈身体）——
  { from: "ch01:body_without_organs", to: "ch10:bwo_motor", label: "不动的马达", note: "全书收尾时，无器官身体不再只是排斥机器的平面，而是与零件一起对抗「有机体」的不动马达。" },
  { from: "ch01:socius", to: "ch06:earth_full_body", label: "第一个社会体", note: "第 1 章说社会也有无器官身体；第 6 章给出第一个：大地，一切生产都被记在它名下。" },
  { from: "ch06:earth_full_body", to: "ch07:despot_full_body", label: "大地→君主", note: "专制机器把社会的「满盈身体」从大地换成君主的身体，一切仿佛都从他那里流出。" },
  { from: "ch07:despot_full_body", to: "ch08:capital_socius", label: "君主→资本", note: "第三个满盈身体是资本-货币：它把一切生产奇迹般地显示为自己的产物。" },

  // —— 主线三：社会机器史：编码 → 超编码 → 解码与公理化 ——
  { from: "ch06:coding_flows", to: "ch07:overcoding", label: "编码→超编码", note: "君主不废除部落的地方编码，而是在上面再压一层码，把所有流挤进同一个瓶颈。" },
  { from: "ch07:overcoding", to: "ch08:axiomatic", label: "超编码→公理化", note: "资本主义拆掉一切码，换成一套纯数量的公理：不规定流是什么，只规定它们怎样接回资本。" },
  { from: "ch06:surplus_value_code", to: "ch08:flux_surplus", label: "代码剩余→流剩余", note: "原始经济靠永远对不平的礼物债运转；资本主义改从两股流之间的落差里抽剩余价值。" },
  { from: "ch02:schizo_limit", to: "ch08:absolute_limit", label: "绝对极限", note: "第 2 章说资本主义不断解码又拼命圈回；第 8 章精确化：资本主义是相对极限，精神分裂是它不敢越过的绝对极限。" },

  // —— 主线四：俄狄浦斯的历史 ——
  { from: "ch00:oedipus", to: "ch03:oedipal_triangle", label: "靶子登场", note: "福柯序言称俄狄浦斯为权力装置；第 3 章正面描绘精神分析如何让一切绕着三角打转。" },
  { from: "ch03:oedipalization", to: "ch04:paralogism_application", label: "翻译即应用", note: "把病人说的一切翻成爸爸妈妈，在第 4 章被诊断为「应用谬误」：整个社会场被一一对应到三角上。" },
  { from: "ch04:paralogism_application", to: "ch08:application", label: "谬误的历史根源", note: "第 4 章的逻辑错误在第 8 章找到历史条件：家庭被私人化后，资本主义才需要把社会形象「应用」到家里。" },
  { from: "ch05:oedipus_bait", to: "ch06:displaced_represented", label: "诱饵图像", note: "第 5 章说俄狄浦斯是压抑捏出的假像；第 6 章在原始社会找到它的最初形态：被移置的表象。" },
  { from: "ch06:displaced_represented", to: "ch07:oedipal_migration", label: "从移置到表象", note: "在帝国里，乱伦从「被移置的形象」升格为「压抑的表象」，俄狄浦斯有了名字，但还属于君主。" },
  { from: "ch07:oedipal_migration", to: "ch08:oedipus_colony", label: "终于成情结", note: "俄狄浦斯最后迁进每个私人家庭：资本主义把外部极限内化为一块「私密的殖民地」。" },
  { from: "ch05:delegated_family", to: "ch08:privatized_family", label: "家庭被外包", note: "第 5 章说社会把驯化欲望外包给家庭；第 8 章解释为什么：家庭被放到社会场外，只负责生产「人力材料」。" },
  { from: "ch08:privatized_family", to: "ch09:reprivatization", label: "财产↔家庭", note: "第 9 章把它与政治经济学并读：资本主义解放劳动与欲望，又分别锁进私有财产与私人家庭。" },

  // —— 主线五：过程 ——
  { from: "ch00:schizo_process", to: "ch01:process", label: "过程非病名", note: "导论说精神分裂首先是过程；第 1 章定义它：生产、记录、消费是同一过程，人与自然不分。" },
  { from: "ch01:process", to: "ch05:process", label: "过程即旅程", note: "第 5 章把过程讲成一段去领土化的旅程，并区分它与临床上的「精神分裂症」。" },
  { from: "ch05:breakthrough_breakdown", to: "ch10:process_breakthrough", label: "突破非崩溃", note: "同一次「疯」可能穿墙而过也可能撞墙倒下；全书结尾重申：让人生病的是过程被打断。" },

  // —— 主线六：社会场投注、两极与主体群体 ——
  { from: "ch02:reich_question", to: "ch04:unconscious_investment", label: "欲望投注社会", note: "答案在第 4 章：法西斯或革命，都是欲望本身在无意识地投注社会场，不只是利益或意识形态。" },
  { from: "ch04:delirium_history", to: "ch09:social_investment", label: "谵妄先是社会的", note: "谵妄首先谈种族、大陆与战争；第 9 章推广为原则：社会投注先于家庭投注。" },
  { from: "ch09:social_investment", to: "ch10:social_primacy", label: "家庭降为触发器", note: "第 10 章把社会投注优先列为分析原则：父母只是触发器，俄狄浦斯是最后的结果。" },
  { from: "ch09:interest_desire", to: "ch10:interest_vs_desire", label: "利益≠欲望", note: "你算计上要的与你无意识迷恋的可以完全错位；第 10 章用它解释为何「革命」团体也会压制欲望。" },
  { from: "ch08:two_poles", to: "ch09:two_poles", label: "从历史到投注", note: "现代社会在复活君主与让流逃逸之间摆动；第 9 章把这两极转成欲望投注社会的两种方向。" },
  { from: "ch09:two_poles", to: "ch10:two_poles", label: "偏执 vs 革命", note: "最终版：让小零件服从大集合（偏执-法西斯），或让大集合服从小零件（精神分裂-革命）。" },
  { from: "ch02:multiplicity", to: "ch09:molar_molecular", label: "分子多元体", note: "「整体只是摆在部分旁边的又一部分」，在第 9 章扩展为克分子大集合与分子欲望机器的尺度之别。" },
  { from: "ch00:subject_group", to: "ch03:subject_vs_subjugated", label: "两种群体", note: "导论提出群体主体与被支配群体之分；第 3 章说俄狄浦斯服务于被奴役群体。" },
  { from: "ch03:subject_vs_subjugated", to: "ch09:subject_group", label: "群体与投注", note: "第 9 章把两种群体对应到两极投注：一种把欲望交给上面，一种让欲望横向流通。" },
  { from: "ch09:subject_group", to: "ch10:subject_groups", label: "夺权≠解放", note: "第 10 章的警告：一个群体即使夺了权、口号革命，只要在欲望层面仍压制欲望，就还是被奴役群。" },
  { from: "ch00:deterritorialized_flows", to: "ch09:line_of_escape", label: "逃逸线", note: "导论里「正在溜走的欲望」在第 9 章成为逃逸线：从墙缝漏出，并带出更多逃逸。" },
  { from: "ch09:line_of_escape", to: "ch10:molecular_chain", label: "解码之链", note: "在欲望层面，符号链不给流编码，而是为它解码、让它穿墙：分子链就是逃逸线的链条。" },

  // —— 主线七：精神分裂分析的任务 ——
  { from: "ch00:schizoanalysis", to: "ch04:schizoanalysis_use", label: "不问意义问用法", note: "导论预告的方法在第 4 章有了第一条原则：去俄狄浦斯化，让三种综合回到内在用法。" },
  { from: "ch06:use_not_meaning", to: "ch10:schizo_mechanic", label: "分析师=机械师", note: "「象征是机器，问它怎么运转」在第 10 章成为第一积极任务：你的欲望机器放进什么、产出什么。" },
  { from: "ch09:destroy_task", to: "ch10:negative_task", label: "先拆后建", note: "第 9 章说分析无物可解释、只有阻抗要拆；第 10 章把它编为否定任务：清洗俄狄浦斯、自我与阉割。" },
  { from: "ch00:theory_toolbox", to: "ch10:no_program", label: "工具不是纲领", note: "理论是工具箱；所以全书最后不给政治纲领，只问一个社会给欲望生产留了多少位置。" },
];

const STEPS = [
  { claim: "起点：无意识是工厂，不是剧场", detail: "欲望不是匮乏，而是生产：欲望机器到处接线、截流。生产中冒出零强度的无器官身体，三种综合（连接、析取、合取）在它上面运转，主体只是边上的余料（第 1-2 章）。" },
  { claim: "欲望生产就是社会生产", detail: "没有「心理」与「经济」两套系统，只有一种流的经济。于是赖希之问变得尖锐：群众为什么会真的欲望法西斯（第 2 章）？" },
  { claim: "精神分析的殖民：俄狄浦斯帝国主义", detail: "精神分析发现了工厂，却把它改成私人剧场：上帝、战争、种族都被翻译成爸爸-妈妈-我；阉割与匮乏被注射进无意识（第 3 章）。" },
  { claim: "诊断：三种综合被非法使用", detail: "部分对象被归于完整的人（外推）、包含析取被改成排他的「要么…要么…」、游牧的主体被隔离成自我，再把社会场「应用」到家里——五个谬误合成俄狄浦斯（第 4 章）。" },
  { claim: "压抑的真相：俄狄浦斯是诱饵", detail: "社会压抑委托家庭执行心理压抑；被压抑的不是乱伦欲望，而是欲望的革命性。精神分裂首先是一个过程，「病」是过程被打断的产物（第 5 章）。" },
  { claim: "社会机器史 I：原始领土机器编码一切流", detail: "大地是第一个社会体；残酷在肉体上刻出记忆，联姻制造流动之债，乱伦只是禁令投射出的假像（第 6 章）。" },
  { claim: "社会机器史 II：专制机器超编码", detail: "原国家一下子降临，君主的身体成为新社会体：旧码之上加一层码，有限之债变无限之债，乱伦成为君主特权（第 7 章）。" },
  { claim: "社会机器史 III：资本主义解码又公理化", detail: "赤裸劳动者撞上游荡货币，一切码被拆；公理把流接回资本，墙被推开又在更远处重建。家庭被私人化，俄狄浦斯终于成为「情结」——资本主义的私密殖民地（第 8 章）。" },
  { claim: "欲望首先投注社会场：两极与两种群体", detail: "社会投注先于家庭投注；利益与欲望可以错位；投注有偏执-法西斯与精神分裂-革命两极；克分子大集合下面是分子的欲望机器（第 9 章）。" },
  { claim: "精神分裂分析：拆除，再当机械师", detail: "否定任务清洗俄狄浦斯；第一积极任务找出欲望机器如何运转；第二积极任务辨认欲望朝哪一极投注社会。不给纲领，只为欲望生产开路（第 10 章）。" },
];

const ROWS = [
  { aspect: "无意识是什么", left: "一座剧场：上演俄狄浦斯、哈姆雷特的家庭悲剧", right: "一座工厂：欲望机器接线、截流、生产现实" },
  { aspect: "欲望", left: "源于匮乏：缺了某个对象（母亲、阳具）才想要", right: "就是生产：不缺对象，缺的反倒是固定的主体" },
  { aspect: "家庭的位置", left: "组织者：一切欲望的源头与终点", right: "诱导者：触发反应的普通刺激，被历史地私人化" },
  { aspect: "俄狄浦斯", left: "普遍结构，人类文化的基石", right: "资本主义的产物：社会压抑放在欲望脸上的诱饵与私密殖民地" },
  { aspect: "三种综合", left: "全局、排他、隔离的超越使用（「要么…要么…」）", right: "部分、包含、游牧的内在使用（「或者…或者…或者」）" },
  { aspect: "精神分裂", left: "一种病，要被引回俄狄浦斯「现实」", right: "一个过程、资本主义的绝对极限；病是过程被打断的结果" },
  { aspect: "分析师做什么", left: "诠释：问「这意味着什么」，签订无尽的分析契约", right: "机械师：问「它怎么运转」，拆除俄狄浦斯，寻找欲望机器" },
  { aspect: "政治", left: "把社会问题翻译成私人家事，与压抑合谋", right: "辨认欲望投注社会的两极，支持主体群体与逃逸线" },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="How the chapters of Anti-Oedipus connect"
      lead="一条主线：欲望是一座工厂，可它的流被一代代社会机器编码、超编码、公理化，最后被俄狄浦斯关进家里——精神分裂分析要把它放出来。">
      <Block id="intro" toc="引言" kicker="先看全景" title="一部「欲望之流」的世界史">
        <Hook title="一本反精神分析的书，为什么要花三分之一篇幅讲部落、帝国与资本？">
          {"《反俄狄浦斯》乍看像三本书拼在一起：前面是关于欲望机器、无器官身体的奇怪本体论；中间是对弗洛伊德「爸爸-妈妈-我」的猛烈批判；后面突然转去讲非洲部落的礼物与刺青、东方帝国的税与文字、资本主义的货币与危机。\n\n其实全书只追踪一件事：同一股欲望之流的命运。它本来自由地接线、截断、生产；原始社会给它编码，君主给它超编码，资本主义把码拆光又用公理把它收回，最后在私人家庭里被命名为俄狄浦斯。所以批判俄狄浦斯，必须写一部社会机器史——因为俄狄浦斯不是人性，而是历史的终点站。"}
        </Hook>
        <Callout tone="key" title="读这页的方法">
          第一部分（第 1-2 章）打造工具：<C id="ch01:desiring_production" />、<C id="ch01:desiring_machine" />、<C id="ch01:body_without_organs" />、<C id="ch01:socius" />与三种综合（<C id="ch01:connective_synthesis" />、<C id="ch01:disjunctive_synthesis" />、<C id="ch01:conjunctive_synthesis" />）。
          第二部分（第 3-5 章）用它们拆<C id="ch03:oedipal_triangle">俄狄浦斯</C>：<C id="ch04:immanent_transcendent_use">三种综合的非法使用</C>、<C id="ch05:oedipus_bait">诱饵与假像</C>、<C id="ch05:process" />。
          第三部分（第 6-8 章）讲社会机器史：<C id="ch06:coding_flows" /> → <C id="ch07:overcoding" /> → <C id="ch08:axiomatic" />，直到<C id="ch08:oedipus_colony" />。
          第四部分（第 9-10 章）给出精神分裂分析：<C id="ch09:social_investment" />、<C id="ch09:molar_molecular" />、<C id="ch10:two_poles" />。点任何一个概念都能看解释。
        </Callout>
      </Block>

      <Block id="flow" toc="论证主线" kicker="十步走完全书" title="全书的论证主线" lead="从一种新的欲望理论，到对俄狄浦斯的诊断，到一部社会机器史，再到一门实践。">
        <ArgumentFlow steps={STEPS} />
      </Block>

      <Block id="fate" toc="欲望之流的命运" kicker="全书图解" title="欲望之流的命运"
        lead="同一批流（奶、精液、劳动、货币、语言）从左边进场，依次经过六种「管道」。点圆点换一站，看社会机器怎样处理它们，以及俄狄浦斯此时身在何处。">
        <FlowFate />
      </Block>

      <Block id="threads" toc="概念的旅程" kicker="同一个词，在多章出现" title="七个概念的跨章旅程">
        <Callout tone="key" title="⚙️ 三种综合：从定义到诊断到解放">
          <C id="ch01:connective_synthesis">第 1 章</C> 连接、<C id="ch01:disjunctive_synthesis">析取</C>、<C id="ch01:conjunctive_synthesis">合取</C>登场 → <C id="ch03:inclusive_disjunction">第 3 章</C> 指出排他用法 → <C id="ch04:immanent_transcendent_use">第 4 章</C> 区分内在/超越使用，逐一诊断<C id="ch04:global_specific_use">全局</C>、<C id="ch04:exclusive_disjunction">排他</C>、<C id="ch04:paralogism_application">隔离</C>之误 → <C id="ch10:schizo_mechanic">第 10 章</C> 让综合恢复内在用法。
        </Callout>
        <Callout tone="info" title="🥚 无器官身体 / 社会体：三个「满盈身体」">
          <C id="ch00:bwo_intensity">导论</C> 预告零强度 → <C id="ch01:body_without_organs">第 1 章</C> 反生产的光滑平面 → <C id="ch01:socius">社会体</C> → <C id="ch06:earth_full_body">第 6 章</C> 大地 → <C id="ch07:despot_full_body">第 7 章</C> 君主的身体 → <C id="ch08:capital_socius">第 8 章</C> 资本 → <C id="ch10:bwo_motor">第 10 章</C> 不动的马达。
        </Callout>
        <Callout tone="info" title="🔺 俄狄浦斯：从诱饵到情结的迁移史">
          <C id="ch00:oedipus">序言</C> 权力装置 → <C id="ch03:oedipal_triangle">第 3 章</C> 三角帝国 → <C id="ch05:oedipus_bait">第 5 章</C> 压抑的诱饵 → <C id="ch06:displaced_represented">第 6 章</C> 被移置的表象 → <C id="ch07:oedipal_migration">第 7 章</C> 属于君主的表象 → <C id="ch08:oedipus_colony">第 8 章</C> 每个家庭里的私密殖民地 → <C id="ch10:negative_task">第 10 章</C> 被拆除。
        </Callout>
        <Callout tone="info" title="🚶 过程：精神分裂不是病名">
          <C id="ch00:schizo_process">导论</C> → <C id="ch01:process">第 1 章</C> 生产=记录=消费 → <C id="ch05:process">第 5 章</C> 去领土化的旅程，<C id="ch05:breakthrough_breakdown">突破或崩溃</C> → <C id="ch08:absolute_limit">第 8 章</C> 资本主义的绝对极限 → <C id="ch10:process_breakthrough">第 10 章</C> 过程是突破。
        </Callout>
        <Callout tone="info" title="🧲 两极：偏执 vs 精神分裂">
          <C id="ch01:paranoiac_machine">第 1 章</C> 偏执机器的排斥 → <C id="ch02:schizo_limit">第 2 章</C> 资本主义的极限 → <C id="ch08:two_poles">第 8 章</C> 现代社会在两端摆动 → <C id="ch09:two_poles">第 9 章</C> 社会投注的两极 → <C id="ch10:two_poles">第 10 章</C> 偏执-法西斯 vs 精神分裂-革命。
        </Callout>
        <Callout tone="info" title="👥 主体群体：革命也会是被奴役的">
          <C id="ch00:subject_group">导论</C> → <C id="ch03:subject_vs_subjugated">第 3 章</C> 俄狄浦斯服务于被奴役群体 → <C id="ch09:subject_group">第 9 章</C> 两种群体对应两种投注 → <C id="ch10:subject_groups">第 10 章</C> 夺了权也可能还是被奴役群。
        </Callout>
        <Callout tone="info" title="🌍 社会投注：欲望先爱上的是世界">
          <C id="ch02:desiring_social_identity">第 2 章</C> 欲望=社会生产 → <C id="ch03:social_investment">第 3 章</C> 力比多直接投注社会 → <C id="ch04:unconscious_investment">第 4 章</C> 无意识投注 → <C id="ch09:social_investment">第 9 章</C> 社会先于家庭 → <C id="ch10:social_primacy">第 10 章</C> 分析的首要原则。
        </Callout>
      </Block>

      <Block id="map" toc="跨章关系图" kicker="全书概念网" title="跨章关系图" lead="颜色代表章节，点节点看概念卡。连线最密的地方——三种综合、俄狄浦斯、两极——就是全书反复回访的枢纽。">
        <ConceptMap edges={links} height={760} />
      </Block>

      <Block id="compare" toc="两种视角" kicker="全书对照" title="精神分析 / 俄狄浦斯 vs 精神分裂分析">
        <CompareTable left="精神分析（俄狄浦斯化）" right="德勒兹 & 加塔利的精神分裂分析" rows={ROWS} />
      </Block>

      <Block id="take" toc="带走什么" kicker="一句话记住全书" title="带走这几点">
        <Takeaways items={[
          "欲望不是匮乏而是生产；欲望生产与社会生产是同一种生产——这是全书的地基。",
          "俄狄浦斯不是人性，而是三种综合被非法使用的结果，也是历史的终点站：原始编码、专制超编码、资本主义公理化之后，欲望才被关进私人家庭。",
          "资本主义的矛盾在于：它比任何社会都更彻底地解码流，却必须不断再领土化；精神分裂是它的绝对极限，俄狄浦斯是它塞进家里的最后一块领土。",
          "欲望首先投注社会场，在偏执-法西斯与精神分裂-革命两极之间选择方向；利益与欲望可以错位，所以「革命」群体也可能是被奴役的。",
          "精神分裂分析不问「这意味着什么」，只问「它怎么运转」：先拆掉俄狄浦斯，再找出欲望机器，再看它朝哪一极投注。",
        ]} />
      </Block>
    </BookPage>);
}
