# 《力比多经济》章节制作通用说明（给每个章节 subagent）

你负责用「图书讲透」框架把利奥塔《力比多经济》(Jean-François Lyotard, *Économie libidinale*, 1974；英译 Iain Hamilton Grant, 1993) 的**一章**做成生动易懂的 React 页面。

## 必读（先完整读）
1. `/home/zijian/books/framework/spec/KIT.md`（编写指南、组件、版权约束、自检流程）
2. 范例 `/home/zijian/books/oot/chapters/ch02.jsx` 和 `/home/zijian/books/oot/chapters/_ch02_similitudes.jsx`
3. 组件源码 `/home/zijian/books/framework/app/src/kit/`（index.js 列出导出）

## 路径（KIT.md 里的路径是《词与物》(oot) 的，换成下面这些）
- 书目录：`/home/zijian/books/libidinal`
- 原文：`/home/zijian/books/libidinal/text/<文件>.txt`；书末注释：`/home/zijian/books/libidinal/text/notes.txt`（按章分段，行号见你的任务说明）
- 输出：`/home/zijian/books/libidinal/chapters/<id>.jsx`，辅助文件 `/home/zijian/books/libidinal/chapters/_<id>_*.jsx`
- 只写你自己章节的文件；不要改 `framework/`、`oot/`、`mirror/`、`libidinal/book.js`、`libidinal/text/` 或其他章节。
- 自检：`/home/zijian/books/framework/spec/check.sh <id> /home/zijian/books/libidinal`，截图在 `/tmp/check-libidinal-<id>/`（shot.png、shot-modal.png，用 Read 看图）。专属图解单独截图方法见 KIT.md（把 `/tmp/check-<id>` 换成 `/tmp/check-libidinal-<id>`）。临时脚本放 /tmp，不要放进 framework。Node：`export PATH=$HOME/.local/node/bin:$PATH`。

## 原文格式
原文由 GLM-OCR 从扫描件识别而来，质量较好：每个自然段一行；`-- [53] --` 是**原书页码**标记；小节标题单独成行；`*` 开头的是译者注；上标注释号可能混在词尾（如 `King:14`）。偶有 OCR 小错，按语境理解即可，拿不准的列入交付回复。章节很长（1–2.6 万词），**必须分段完整读完**。

## 全书语境（替换 KIT.md 里福柯式的说法）
利奥塔自称这是他的「邪恶之书」。核心装置：
- **力比多带/巨大的短暂皮肤**（libidinal band/skin）：只有一面、无内外的表面，强度（intensities）在上面不可预测地奔流；
- **横杠**（the bar）：旋转的区分算子，转得快就是强度之带，慢下来就把带子折成有内外之分的**剧场体积**（theatrical volume）——表征、意义、「这/非这」的概念边界由此产生；
- **大零**（the great Zero）：剧场背后那个空的中心（上帝、柏拉图理念、真正的生产方式、菲勒斯……），把一切强度归到一个「别处」，所以一切意义理论都是**虚无主义**的；
- **张量符号**（tensor sign）：每个符号都是双重的（duplicity）——既是指向缺席意义的符号学符号，又是不可交换的单一强度；二者**互相掩饰**（dissimulation），无法分离；
- **装置**（dispositif）：力比多能量的投注/布置；一切政治经济学都是力比多经济；
- 政治立场：拒绝「批判」——批判总预设一个外部/真实/未异化的有机身体（马克思的「小女孩」欲望），而这正是宗教与虚无主义；没有颠覆性的区域，没有原始社会（直接攻击鲍德里亚的「象征交换」），要做的是让强度流动、在资本内部「快速漂移」。

CompareTable 选本书真正的对立面：通常是「表征/批判（剧场、意义、大零、外部）」vs「力比多经济（皮肤、强度、张量、无外部）」，或本章更贴切的对立（如「马克思主义批判 vs 力比多读法」「鲍德里亚象征交换 vs 利奥塔」）。KIT.md 里「知识型」等只是福柯语境的举例。
利奥塔文风狂野、色情、挑衅，例子常是身体与性（必要时以克制、学术的方式转述，不要回避论点，也不要渲染）。

## 版权
原文引用 ≤4 条，每条英文 ≤25 词；其余全部用自己的中文改写。不要大段转写。

## 交付回复（简短）
文件列表；概念 id 列表；专属图解做了什么；原文理解或 OCR 上拿不准的地方。确保 check.sh 构建成功、errors 为空，并亲自看过截图。
