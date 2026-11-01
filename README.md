<div align="center">

# 明白.js

**把难读的书，讲明白。**

用交互式网页读哲学、推公式、看三维模型、听和声。

[在线阅读](https://evoevolver.github.io/mingbai-notes/) · [接入一本书](framework/spec/NEW_BOOK.md) · [组件指南](framework/spec/KIT.md)

[![GitHub Pages](https://github.com/EvoEvolver/mingbai-notes/actions/workflows/pages.yml/badge.svg)](https://github.com/EvoEvolver/mingbai-notes/actions/workflows/pages.yml)
![React](https://img.shields.io/badge/React-19-149eca)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![书目](https://img.shields.io/badge/书目-12-b8862b)

</div>

明白.js 是一个把书和论文做成交互式学习站点的框架。这里也有用它制作的「图书讲明白」书库：从福柯、德里达到量子力学、芯片制造和音乐和声。

## 不只是把文字搬到网页

- **概念可以串起来。** 人文导读配核心概念、类比、论证主线与关系图。
- **公式可以点开看。** 数理章节支持公式放大、符号解释与跨章引用。
- **模型可以动手调。** 用交互图表、自绘插图和 Three.js 模型解释抽象过程。
- **和声可以直接听。** 音乐章节配可播放的谱例与和声演示。
- **读完可以直接分享。** 输出静态网页，每章有独立地址，可部署到 GitHub Pages。

## 书架

| 书目 | 作者 | 内容 |
| --- | --- | --- |
| [词与物](https://evoevolver.github.io/mingbai-notes/oot/) | 米歇尔·福柯 | 人文科学考古学 |
| [论文字学](https://evoevolver.github.io/mingbai-notes/grammatology/) | 雅克·德里达 | 文字、语言与解构 |
| [生产之镜](https://evoevolver.github.io/mingbai-notes/mirror/) | 让·鲍德里亚 | 生产主义批判 |
| [反俄狄浦斯](https://evoevolver.github.io/mingbai-notes/antioedipus/) | 德勒兹、加塔利 | 欲望、资本与精神分析 |
| [力比多经济](https://evoevolver.github.io/mingbai-notes/libidinal/) | 让-弗朗索瓦·利奥塔 | 欲望、符号与资本 |
| [大分流](https://evoevolver.github.io/mingbai-notes/divergence/) | 彭慕兰 | 中国、欧洲与世界经济 |
| [集成电路制造：科学与技术](https://evoevolver.github.io/mingbai-notes/icfab/) | James D. Plummer、Peter B. Griffin | 从硅晶圆到芯片 |
| [现代宇宙学](https://evoevolver.github.io/mingbai-notes/cosmo/) | Scott Dodelson、Fabian Schmidt | 宇宙膨胀、扰动与结构形成 |
| [几何、拓扑与物理](https://evoevolver.github.io/mingbai-notes/nakahara/) | Mikio Nakahara | 用几何与拓扑理解物理 |
| [ETH 为假：稀疏积和式讲明白](https://evoevolver.github.io/mingbai-notes/eth/) | 论文讲解 | 算法与复杂性证明 |
| [图解和声](https://evoevolver.github.io/mingbai-notes/harmony/) | 叶小胖 | 用网格图听懂和声 |
| [量子力学（卷 I）](https://evoevolver.github.io/mingbai-notes/cohen/) | Cohen-Tannoudji、Diu、Laloë | 量子概念、数学工具与模型 |

## 本地运行

需要 Node.js 24 和 Python 3。

```bash
npm ci --prefix framework/app
framework/build-library.sh --build
python3 -I framework/serve.py library 8848
```

打开 `http://localhost:8848` 阅读书库。首次构建会生成全部书籍页面。

## 做一本你想读懂的书

每本书由 `book.js` 书目配置和 `chapters/*.jsx` 章节组成，共用 React 组件库。先看[新书接入指南](framework/spec/NEW_BOOK.md)，数理类内容另见[教科书规范](framework/spec/TEXTBOOK.md)。

欢迎通过 [Issue](https://github.com/EvoEvolver/mingbai-notes/issues) 提出勘误、想读的书或交互点子，也欢迎提交改进。
