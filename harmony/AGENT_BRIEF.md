# 《图解和声》章节制作说明（给每个章节 subagent）

把《图解和声》的**一章**做成「能看、能听、能玩」的 HTML 课本页面。读者是想真正学会和声的中文读者（有一点乐理基础，不一定会弹琴、不一定识五线谱）。
这本书的核心工具是 **Tonnetz 网格图**：调、和弦、功能、进行都在网格上表现为形状和移动。页面要让读者**听到**每一个和弦、每一段进行、每一个谱例。

## 先读（必须完整读完）
1. `/home/zijian/books/framework/spec/AUDIO.md` —— 发声组件 `@kit/audio`（Play、Tonnetz、Progression、Score、EarQuiz…）与 ABC 记谱速查
2. `/home/zijian/books/framework/spec/KIT.md` —— 页面骨架组件（ChapterPage、Block、ConceptGrid、Quiz…）与写作规范。**KIT.md 里的路径是另一本书的**，本书路径见下。
3. **范例章（对齐结构、风格、质量）**：`/home/zijian/books/harmony/chapters/ch01.jsx` 与 `_ch01_freq.jsx`；已完成的 ch02–ch05（`ch0N.jsx` 与 `_ch0N_*.jsx`）是更完整的教科书式范例（谱例转写、大量 Progression、专属图解）。线上效果：本机 `http://localhost:8848/harmony/ch02/` 等。
4. 组件源码（遇到疑问时看）：`/home/zijian/books/framework/app/src/kit/audio/`、`/home/zijian/books/framework/app/src/kit/`

## 材料
- 原文（GLM-OCR 识别，Markdown）：`/home/zijian/books/harmony/text/<id>.txt`。`<!-- p.N -->` 是原书页码；`![…](images/…)` 是插图裁片，实际文件在 `/home/zijian/ocr/harmony/images/`。
- 原书页面图（看谱例、网格图、表格时用 Read 打开）：`/home/zijian/ocr/harmony/src/pages/p-NNN.png`（NNN 三位数 = 原书页码，212 dpi）。
- OCR 已知问题：降号 ♭ 常被识别成字母 b（Eb、G7b9），破折号「—」有时识别成「一」；五线谱谱例只有图片没有文字——**谱例必须看页面图转写**。

## 产出
- 写：`/home/zijian/books/harmony/chapters/<id>.jsx`，可加辅助文件 `/home/zijian/books/harmony/chapters/_<id>_*.jsx`。
- **只写自己章节的文件**。不改 `framework/`（包括 `kit/audio`）、`book.js`、`library/`、其他章节。组件缺功能或有 bug：在自己的 `_<id>_*.jsx` 里写局部组件绕过，并在交付回复里说明（主 agent 会统一修框架）。

## 内容要求
- **这是教科书，不是导读**：原书每个小节（如 2-1、2-2…及其下属小标题）的知识点、规则、结论都要讲到，顺序可调整、可合并；**用自己的中文重新讲述**，不要整段照搬原文（版权）。例子保留原书的（调、和弦、进行），可以补充现代流行歌曲的说明性提及（只提歌名与和弦进行，不引歌词）。
- 结构参考 ch01：Hook（先听再看）→ SectionCards（原书小节）→ ArgumentFlow（本章主线）→ **按小节的教学区块**（每块：先听 → 讲结构 → 网格/谱例/进行 → 小结）→ EarQuiz → ConceptGrid / ConceptMap → Quiz → Takeaways + Bridge（衔接下一章）→ Glossary。每个教学 Block 放一个 `<Narrate/>`。
- `meta / groups / concepts / relations` 必须 export（格式见 KIT.md；concepts 8–14 个，section_id 对应 SectionCards 的 id）。
- **声音与互动（本书的灵魂）**：
  - 页面放一次 `<SoundBar/>`。
  - 每个新和弦、新概念第一次出现时给 `<Play>`。
  - 书中的网格图 → `<Tonnetz>`（highlight / notes / path）。
  - 书中的和弦进行、和声套路 → `<Progression>`（带 keyName 自动标级数，必要时 `tonnetz`）。
  - 书中的五线谱谱例 → `<Score>`（看页面图，用 ABC 逐音转写，必要时 `bass` 做大谱表）。重要谱例都要转写；转写后自己核对音高、时值、和弦记号。
  - 至少一个 `<EarQuiz>`（5–6 题，考听辨：功能、大小调、和弦性质等）。
  - 本章最核心的结构，再做 **1 个专属互动图解**（`_<id>_*.jsx`，可组合 Tonnetz/Progression/Play 或自写 SVG + `play()`）。
- 配色沿用原书：大三和弦红、小三和弦蓝（Tonnetz 已内置）；原书若用其他颜色标功能组等，说明里写清楚。
- 拿不准的乐理或 OCR 内容，以页面图为准；仍不确定的列入交付回复。

## 自检（必须做）
```bash
/home/zijian/books/framework/spec/check.sh <id> /home/zijian/books/harmony     # 构建 + 截图，errors 必须为空
```
- 用 Read 看 `/tmp/check-harmony-<id>/shot.png`（长图）与 `shot-modal.png`。
- **听不到声音，也要验证发声**：写一个 Playwright 脚本（放 /tmp，参考 `/tmp/aucheck/click.mjs`、`/tmp/aucheck/score.mjs`）在 `/tmp/check-harmony-<id>/site` 上逐个点击 Play / Score / Progression / EarQuiz，统计振荡器数量、无控制台错误；Score 要检查播放出的频率与谱面一致。
- 单个区块截图：`python3 -m http.server <端口> -d /tmp/check-harmony-<id>/site &`，再 `/home/zijian/books/framework/tools/heavy.sh node /home/zijian/books/framework/tools/pw/el.mjs "http://localhost:<端口>/<id>/" "#b-<blockid>" /tmp/x.png`；用完关掉服务器（`fuser -k <端口>/tcp`，**不要用 pkill -f**）。
- **内存纪律**：构建、Playwright 一律经 `/home/zijian/books/framework/tools/heavy.sh` 运行（check.sh 已内置）；不要并行起多个浏览器；**不要再派生子 agent**。

## 交付回复（简短）
文件列表；小节覆盖情况；转写了哪些谱例（Score）、做了哪些进行（Progression）与网格图；专属图解做了什么；自检结果（errors、发声验证）；组件问题/需求；拿不准的地方（乐理、OCR、谱例转写）。

## 第二轮补充（来自 ch02–ch05 的经验，2026-10-31）
- 组件已更新（详见 AUDIO.md）：和弦类型大幅扩充（9/11/13、7♭9、alt、增六 `AbGer+6`、`no5`、斜线和弦 `C/E`、类型中可写 ♭♯）；`romanOf` 按字母算级数；`Score accomp` 可按和弦记号自动伴奏；Tonnetz 的 `highlight` 支持减/增和弦、路线中的七和弦画成四音形状；`onStop(fn)` 供自写组件在「停止」时复位。
- 已知框架小问题（绕开即可）：同一 `<Tabs>` 内多个 `<Progression>` 请各给不同 `key`；`<Callout>` 里的 `<b>` 会独占一行，正文加粗改用 `<strong>`。
- 页面图文件编号 = 原文中的 `<!-- p.N -->`（= PDF 页序），比书上印的页码小 1；在页面里引用原书页码/图号时以书上印的为准。
- 版权：有版权的流行歌曲/影视配乐只给和弦进行与歌名，不转写旋律、不引歌词；古典/民歌/已进入公有领域的作品可以转写。原书自己的示范谱例可以转写。
- 现成的发声验证脚本：`/tmp/aucheck/all.mjs`（用法：`/home/zijian/books/framework/tools/heavy.sh node /tmp/aucheck/all.mjs http://localhost:<端口> <id>`，端口指向 `/tmp/check-harmony-<id>/site` 的临时服务器），可在此基础上扩展。
