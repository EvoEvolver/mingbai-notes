# 图书讲透（books）

把书做成交互式 HTML 学习站点的框架与书目。

## 目录
- `framework/` —— 框架
  - `app/`：React + Vite 应用；`app/src/kit/` 为组件库（`@kit`），`kit/math/` 为数理/定理组件
  - `spec/`：编写规范（`KIT.md` 人文导读、`TEXTBOOK.md` 数理教科书、`PROOF.md` 定理–证明类、`NEW_BOOK.md` 新书接入、`DEPLOY.md` 路由与部署）与自检脚本（`check.sh`、`tb_check.py`、`unicode_math.py`）
  - `tools/`：PDF 插图裁剪 `pdf_figures.py`、缩略图核查、Playwright 截图（`pw/`）
  - `extract.py`（epub 章节 → 文本）、`serve.py`（静态服务）、`build-all.sh`（全部重建）
- 每本书一个目录：`book.js`（书目清单、分部、可选 katexMacros / statements）、`chapters/*.jsx`（章节；`_` 开头为辅助文件）、`text/`（原文文字层，本地，不入库）、`public/`（静态资源；原书插图本地，不入库）

| 目录 | 书 | 类型 | 书库路径 |
|---|---|---|---|
| oot | 福柯《词与物》 | 人文导读 | `oot/` |
| mirror | 鲍德里亚《生产之镜》 | 人文导读 | `mirror/` |
| grammatology | 德里达《论文字学》 | 人文导读 | `grammatology/` |
| cosmo | Dodelson & Schmidt《Modern Cosmology》 | 数理教科书 | `cosmo/` |
| antioedipus | 德勒兹–瓜塔里《反俄狄浦斯》 | 人文导读 | `antioedipus/` |
| libidinal | 利奥塔《力比多经济》 | 人文导读 | `libidinal/` |
| eth | "ETH is false" 论文讲解 | 定理–证明 | `eth/` |

## 常用命令
```bash
export PATH=$HOME/.local/node/bin:$PATH
cd framework/app && npm install                       # 首次
BOOK=$PWD/../../cosmo npx vite build                  # 构建一本书 → cosmo/dist
ONLY=ch02,ch03 BOOK=… npx vite build                  # 只打包部分章节
framework/build-all.sh                                # 全部重建
framework/spec/check.sh <章节id> <书目录>              # 单章构建 + 截图自检
python3 -I framework/spec/tb_check.py <书目录> <章节id> # 教科书完整性检查
```
构建产物是多页静态站点（书架 `index.html`，每章 `<id>/index.html`，全部相对路径），可直接部署到 GitHub Pages，见 `framework/spec/DEPLOY.md`。
所有书汇总在一个书库站点里发布：`framework/build-library.sh --build` 生成 `library/dist/`（书库首页 + 各书子目录），由 treer app `book-library` 提供服务（`/usr/bin/python3 -I framework/serve.py library 8848`）。书目与顺序见 `library/books.txt`。

## 不在仓库中（可重新生成）
`node_modules/`、`*/dist/`、`tools/`（Python 环境）、`*/src/`（epub 解包、PDF 页面图）、原书 PDF/EPUB。

**原书内容不进仓库（版权）**：各书 `text/`（原文文字层）与 `public/figures/`（原书插图及图注）只保留在本地磁盘，由导入脚本生成（epub：`framework/extract.py`；PDF：`pdftotext` + `framework/tools/pdf_figures.py`）。
