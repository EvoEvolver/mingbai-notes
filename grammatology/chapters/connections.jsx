// 全书脉络：《论文字学》各章如何连成一条论证
import { BookPage, Block, C, ArgumentFlow, ConceptMap, CompareTable, Takeaways, Callout, Hook } from "@kit";
import SupplementThread from "./_connections_supplement.jsx";

export const links = [
  // —— 主线一：逻各斯中心主义 / 语音中心主义 ——
  { from: "ch00:logocentrism", to: "ch01:logocentrism", label: "序言预告靶子", note: "斯皮瓦克先替读者指出全书的批判对象；第 1 章正式把它定义为一个贯穿西方历史的「时代」。" },
  { from: "ch01:logocentrism", to: "ch02:logocentrism", label: "从哲学到语言学", note: "第 1 章的宏观诊断，在第 2 章落到一个具体文本上：索绪尔的现代语言学也逃不出逻各斯中心。" },
  { from: "ch01:phonocentrism", to: "ch02:phonocentrism", label: "索绪尔的继承", note: "「声音离意义最近」不只是古代信念，结构语言学把它写进了学科的定义：语言学只研究口语。" },
  { from: "ch02:phonocentrism", to: "ch04:phonologism", label: "结构主义版本", note: "列维-斯特劳斯把音位学奉为人文科学的模范，语音中心主义随之扩散到人类学。" },
  { from: "ch01:hearing_oneself_speak", to: "ch04:hearing_oneself_speak", label: "在场的原型", note: "「听见自己说话」是在场形而上学最核心的体验；第 4 章把它定为整个「卢梭时代」的底层模型。" },
  { from: "ch04:hearing_oneself_speak", to: "ch06:auto_affection", label: "变成自我感发", note: "第 6 章把这种体验改称自我感发：声音仿佛不经外物就回到自身，而德里达要显示这里已有间隔。" },
  { from: "ch05:auto_affection", to: "ch06:auto_affection", label: "从身体到声音", note: "第 5 章的自我感发是「危险的增补」（想象中的触碰），第 6 章把同一结构移到说话与歌唱上。" },
  { from: "ch01:metaphysics_of_presence", to: "ch08:living_present", label: "在场的终点站", note: "全书起点诊断的「在场形而上学」，在最后一章化身为卢梭反复回到的「活的当下」。" },
  // —— 主线二：文字作为「符号的符号」 ——
  { from: "ch01:signifier_of_signifier", to: "ch02:sign_of_sign", label: "二手的二手", note: "传统把文字贬为「能指的能指」；索绪尔的再现论原样继承了这条公式。" },
  { from: "ch02:sign_of_sign", to: "ch08:absolute_representation", label: "字母=表征之表征", note: "到卢梭这里，字母被推到离在场最远的位置——也因此最善于让自己隐身。" },
  { from: "ch02:usurpation", to: "ch05:dangerous_supplement", label: "危险的外来者", note: "索绪尔痛斥文字「篡夺」，卢梭称之为「危险的增补」：同一种道德化的恐惧。" },
  // —— 第一部分建立的概念工具 ——
  { from: "ch00:sous_rature", to: "ch01:sous_rature", label: "划掉仍保留", note: "序言解释了这一笔法；第 1 章起德里达用它对待「存在」「符号」「文字」这些不得不用又不够用的旧词。" },
  { from: "ch01:arche_writing", to: "ch02:arche_writing", label: "正式建立", note: "第 1 章提出扩展的文字概念，第 2 章从索绪尔的任意性与差异中把它推导出来。" },
  { from: "ch02:arche_writing", to: "ch03:complicity_origins", label: "原文字的历史面", note: "第 3 章把原文字放进文字史：文字与宗教、政治、经济同根同生。" },
  { from: "ch02:arche_writing", to: "ch04:arche_violence", label: "铭写即暴力", note: "把差异铭刻下来，就是把独一无二的东西分类、命名——原文字的另一个名字就是原暴力。" },
  { from: "ch01:trace", to: "ch02:trace", label: "踪迹深化", note: "第 1 章引入踪迹，第 2 章说明它为何比言语和字迹都更原初：每个元素都带着缺席者的印记。" },
  { from: "ch02:trace", to: "ch05:chain_of_supplements", label: "踪迹链=增补链", note: "向后追溯踪迹找不到纯粹起点；第 5 章的替代链（泰蕾兹→妈妈→母亲→？）是同一结构的传记版。" },
  { from: "ch01:differance", to: "ch02:differance", label: "差异+延迟", note: "延异在第 2 章获得语言学基础：意义靠区分产生，又总被推迟到下一个符号。" },
  { from: "ch02:differance", to: "ch05:differance", label: "延异即增补运动", note: "第 5 章把延异与增补并列：正是这一运动让在场与缺席的对立成为可能。" },
  { from: "ch05:differance", to: "ch07:writing_differance", label: "南北之差即延异", note: "第 7 章：南北之差、欲望与快乐之间的延迟就是延异，「文字」不过是它的另一个名字。" },
  { from: "ch02:spacing", to: "ch06:spacing", label: "间隔进入音乐", note: "第 2 章抽象地提出间隔；第 6 章在卢梭的歌里找到它：被当作外来之恶的音程，其实是歌的条件。" },
  { from: "ch02:difference", to: "ch04:proper_name", label: "专名已入差异", note: "既然意义来自差异，就没有纯粹专有的名字——「专名的抹除」是差异原则在人类学中的后果。" },
  // —— 第 3 章：文字史与民族中心主义 ——
  { from: "ch03:ethnocentrism", to: "ch04:anti_ethnocentrism", label: "以谦卑之名再犯", note: "第 3 章说言语优先是西方视角；第 4 章发现，连批判民族中心的列维-斯特劳斯也在用这一视角裁定他者。" },
  { from: "ch03:phoneticization", to: "ch08:three_scripts", label: "无纯表音文字", note: "第 3 章说没有纯表音文字；第 8 章拆解卢梭「图画→符号→字母」的进步阶梯。" },
  { from: "ch03:origin_question", to: "ch08:originary_supplement", label: "起源被增补", note: "第 3 章质疑「文字何时开始」的提问方式；第 8 章给出答案：起源本身靠增补才成立。" },
  // —— 第二部分：增补逻辑 ——
  { from: "ch00:supplement", to: "ch05:supplement", label: "核心预告", note: "序言提前点出「增补」是全书最关键的概念；第 5 章以卢梭的「危险的增补」正式展开它。" },
  { from: "ch05:supplement", to: "ch06:supplement_logic", label: "逻辑铺开", note: "从传记（《忏悔录》）推进到理论文本（《语言起源论》）：怜悯、想象、模仿都按增补逻辑运转。" },
  { from: "ch05:two_senses", to: "ch08:originary_supplement", label: "补缺即源头", note: "「添加」与「填补」两义赶不走彼此，最终推出：增补不是补在完整起源上，而是在起源处。" },
  { from: "ch04:writing_lesson", to: "ch06:political_evil", label: "文字=奴役？", note: "列维-斯特劳斯说文字为剥削服务；卢梭说语言变哑等于人民失去自由。两者都把恶归给外来的文字。" },
  { from: "ch04:nature_culture", to: "ch07:incest_prohibition", label: "自然/文化铰链", note: "乱伦禁忌在第 4 章是自然/文化之分的「丑闻」，在第 7 章是节庆之后社会的第一条约定。" },
  { from: "ch06:melody_harmony", to: "ch07:articulation", label: "间隔→分节", note: "旋律/和声的对立在第 7 章变成语调/分节：同样是活的连续 vs 冷的切分，同样被拆解。" },
  { from: "ch06:accent", to: "ch07:accent_marks", label: "活调与符号", note: "活的语调失去后，文字用重音符号冒充它——增补顶替了自己声称要保存的东西。" },
  { from: "ch07:articulation", to: "ch08:articulation", label: "堕落亦起源", note: "分节被卢梭视为堕落，却也是语言之所以为语言的起点；第 8 章把它与原初隐喻、文字史接上。" },
  { from: "ch07:north_south", to: "ch08:three_scripts", label: "地理变谱系", note: "南北语言的空间对立，被卢梭转写成三种文字×三种社会的历史阶梯。" },
  { from: "ch07:supplementarity_nonorigin", to: "ch08:originary_supplement", label: "非起源的起源", note: "第 7 章说人的「特性」是替代的能力；第 8 章把这一点推到底：起源处已有增补。" },
  { from: "ch05:double_reading", to: "ch07:description_declaration", label: "双重阅读实践", note: "第 5 章宣布读法：先读作者想说的，再读他没能掌控的；第 7 章用「声明 vs 描述」把它做出来。" },
  { from: "ch07:description_declaration", to: "ch08:describe_not_declare", label: "说出不想说的", note: "卢梭的文本描述了增补的真相，他的意图却宣告相反之事——全书以此收束。" },
  { from: "ch04:authenticity", to: "ch08:sovereignty_representation", label: "声音共同体", note: "「人人在彼此声音所及之处」的理想社会，与卢梭的「主权不可代表」是同一个在场政治学。" },
  { from: "ch07:festival", to: "ch08:theater_festival", label: "无代表的节庆", note: "水井边的节庆是卢梭的社会起源；第 8 章说明他为何反剧场：理想节庆里没有演员、没有代表。" },
  { from: "ch00:deconstruction", to: "ch01:deconstruction", label: "方法的名字", note: "序言把解构讲成「颠倒再移位」；第 1 章强调它不是拆毁，而是从内部松动一个结构。" },
];

const STEPS = [
  { claim: "诊断：西方思想有一个隐秘的等级", detail: "从柏拉图到黑格尔、到索绪尔，言语被当作意义的亲身在场，文字只是记录声音的二手工具——这就是逻各斯中心主义 / 语音中心主义（序言、第 1 章）。" },
  { claim: "「文字」被扩展为原文字", detail: "如果每个符号都只靠与其他符号的差异才有意义，那么言语本身也是一种铭写。文字不再是纸上的字，而是一切差异与踪迹的结构（第 1-2 章）。" },
  { claim: "一组新工具：踪迹、延异、间隔、抹除", detail: "踪迹＝缺席者的印记；延异＝既区分又推迟；间隔＝空白与停顿生产意义；抹除＝不得不用旧词又把它划掉（第 2 章）。" },
  { claim: "文字史被重写：没有纯表音的文字", detail: "「文字一路进化到字母」的故事是一种偏见；汉字、象形文字的理想化与贬低都是西方的投射（第 3 章）。" },
  { claim: "检验一：列维-斯特劳斯与「文字的暴力」", detail: "所谓纯真的无文字社会早已有命名与分类的原暴力；把暴力归给外来的文字，正是语音中心主义的人类学版本（第 4 章）。" },
  { claim: "关键词登场：增补", detail: "卢梭用「增补」形容文字、教育、自慰：既是「额外加上」，又是「填补缺口」。第二义暴露了原物本就不完整，而替代链没有第一环（第 5 章）。" },
  { claim: "检验二：音乐、怜悯、模仿", detail: "旋律被说成活的激情，和声是外来的计算；可没有间隔就没有旋律。怜悯与想象、素描与色彩，都循同一逻辑（第 6 章）。" },
  { claim: "检验三：南方与北方、语调与分节", detail: "南方之歌与北方之言、节庆与禁忌——卢梭想划出纯粹起源，描述出来的却是彼此寄居的两极，即延异（第 7 章）。" },
  { claim: "收束：起源处的增补", detail: "字母、货币、议会代表、剧场演员，都是卢梭眼中让人缺席于自身的「代表」。但在场本身就要靠重复与标记成立：增补不在起源之后，而在起源处（第 8 章）。" },
];

const ROWS = [
  { aspect: "意义的源头", left: "活的声音、内心的「道」，完全在场的意识", right: "差异与踪迹的运动（延异），没有不经中介的源头" },
  { aspect: "文字的地位", left: "符号的符号，外在、次要、危险的记录工具", right: "原文字：言语本身已是一种铭写，文字只是它最显眼的形态" },
  { aspect: "起源", left: "有一个纯粹、自足的起点，后来才被败坏", right: "起源处已有增补；「纯粹起点」是替代链事后制造的幻影" },
  { aspect: "暴力", left: "暴力随文字从外面闯入纯真的口语社会", right: "命名与分类本身就是原暴力，经验暴力建立在它之上" },
  { aspect: "间隔 / 分节", left: "和声、分节、北方是冷漠的堕落", right: "没有间隔就没有旋律，没有分节就没有语言" },
  { aspect: "政治", left: "人民必须亲身在场，代表即异化", right: "在场本身就需要重复与标记，代表并非可以彻底清除的外物" },
  { aspect: "怎么读文本", left: "找出作者的本意，作者掌控文本", right: "双重阅读：读作者「声明」的，也读文本「描述」出来的" },
];

export default function Connections() {
  return (
    <BookPage title="全书脉络" subtitle="How the chapters of Of Grammatology connect"
      lead="一条主线：被当作「外来补充」的文字，原来早就住在言语、自然与起源的内部。">
      <Block id="intro" toc="引言" kicker="先看全景" title="一本书，一个结构，九次出现">
        <Hook title="为什么一本讲「文字」的书要读卢梭的音乐理论？">
          {"《论文字学》看起来很散：前半本谈索绪尔、莱布尼茨、汉字与象形文字，后半本细读列维-斯特劳斯在亚马孙的田野笔记，以及卢梭关于音乐、南北语言、节庆和议会的论述。\n\n其实全书只在反复做一件事：找到一个被当作「原本完整」的东西 Y（言语、自然、旋律、南方、人民的亲身在场），再找到那个被说成「从外面加上去、只会败坏 Y」的东西 X（文字、文化、和声、分节、代表），然后显示——Y 自己就需要 X 才能成立。这个结构，德里达称之为增补。"}
        </Hook>
        <Callout tone="key" title="读这页的方法">
          第一部分（第 1-3 章）打造工具：<C id="ch01:logocentrism" />、<C id="ch02:arche_writing" />、<C id="ch02:trace" />、<C id="ch02:differance" />、<C id="ch02:spacing" />、<C id="ch01:sous_rature" />。
          第二部分（第 4-8 章）把工具用在两位作者身上：列维-斯特劳斯的<C id="ch04:arche_violence">文字暴力</C>，卢梭的<C id="ch05:supplement" />、<C id="ch05:chain_of_supplements" />、<C id="ch06:auto_affection" />、<C id="ch06:melody_harmony" />、<C id="ch07:north_south" />、<C id="ch08:originary_supplement" />与<C id="ch08:sovereignty_representation" />。点任何一个概念都能看解释。
        </Callout>
      </Block>

      <Block id="flow" toc="论证主线" kicker="九步走完全书" title="全书的论证主线" lead="从诊断，到造工具，到在两位作者的文本里逐一检验。">
        <ArgumentFlow steps={STEPS} />
      </Block>

      <Block id="thread" toc="增补贯穿全书" kicker="全书图解" title="增补逻辑贯穿全书"
        lead="每一站都有一对：被当作源头的 Y，与被当作外来补充的 X。先看传统怎么说，再切到解构读法，看 X 如何移进 Y 的缺口。">
        <SupplementThread />
      </Block>

      <Block id="threads" toc="概念的旅程" kicker="同一个词，在多章出现" title="五个概念的跨章旅程">
        <Callout tone="info" title="🗣️ 逻各斯中心主义：从诊断到靶心">
          <C id="ch00:logocentrism">序言</C> 预告 → <C id="ch01:logocentrism">第 1 章</C> 定义为一个时代 → <C id="ch02:logocentrism">第 2 章</C> 在索绪尔身上发现它 → <C id="ch04:phonologism">第 4 章</C> 扩散为结构主义的音位学模范 → <C id="ch08:living_present">第 8 章</C> 最终露出底牌：对「活的当下」的渴望。
        </Callout>
        <Callout tone="info" title="✍️ 原文字：从概念到历史与暴力">
          <C id="ch00:arche_writing">序言</C> → <C id="ch01:arche_writing">第 1 章</C> 扩展「文字」 → <C id="ch02:arche_writing">第 2 章</C> 从差异原则推出 → <C id="ch03:complicity_origins">第 3 章</C> 与宗教、政治同根 → <C id="ch04:arche_violence">第 4 章</C> 原文字即原暴力。
        </Callout>
        <Callout tone="info" title="👣 踪迹：没有第一环的链">
          <C id="ch00:trace">序言</C> → <C id="ch01:trace">第 1 章</C> → <C id="ch02:trace">第 2 章</C> 每个在场者都带着缺席者的印记 → <C id="ch05:chain_of_supplements">第 5 章</C> 在卢梭的生平里变成替代链。
        </Callout>
        <Callout tone="info" title="⏳ 延异：从语言学到地理">
          <C id="ch00:differance">序言</C> → <C id="ch01:differance">第 1 章</C> → <C id="ch02:differance">第 2 章</C> 差异 + 延迟 → <C id="ch05:differance">第 5 章</C> 与增补并列 → <C id="ch07:writing_differance">第 7 章</C> 南北之差就是延异，「文字」是它的另一个名字。
        </Callout>
        <Callout tone="key" title="➕ 增补：全书的轴心">
          <C id="ch00:supplement">序言</C> 预告 → <C id="ch05:supplement">第 5 章</C> 登场，<C id="ch05:two_senses">两义</C>纠缠 → <C id="ch06:supplement_logic">第 6 章</C> 成为一种逻辑 → <C id="ch07:supplementarity_nonorigin">第 7 章</C> 非起源的起源 → <C id="ch08:originary_supplement">第 8 章</C> 起源处的增补。
        </Callout>
      </Block>

      <Block id="map" toc="跨章关系图" kicker="全书概念网" title="跨章关系图" lead="颜色代表章节，点节点看概念卡。连线越密的地方，就是全书反复回访的枢纽。">
        <ConceptMap edges={links} height={720} />
      </Block>

      <Block id="compare" toc="两种视角" kicker="全书对照" title="在场形而上学 vs 解构视角">
        <CompareTable left="形而上学 / 语音中心传统" right="德里达的解构视角" rows={ROWS} />
      </Block>

      <Block id="take" toc="带走什么" kicker="一句话记住全书" title="带走这几点">
        <Takeaways items={[
          "全书的敌人不是「说话」，而是把说话当成意义亲身在场、把文字当成次等补充的那套等级——逻各斯中心主义。",
          "原文字不是「文字比言语更早」的历史论断，而是说：一切意义都由差异、踪迹和延迟构成，言语也不例外。",
          "增补是全书的万能钥匙：凡被说成「外来补充」的东西（文字、和声、分节、代表），细读之下都在填补源头本来的缺口。",
          "第二部分不是换了话题，而是同一结构的九次检验：列维-斯特劳斯与卢梭越想守住纯粹起源，文本越把增补描述出来。",
          "解构不是拆毁，而是双重阅读：既读作者声明的，也读他的文本不由自主地说出的。",
        ]} />
      </Block>
    </BookPage>);
}
