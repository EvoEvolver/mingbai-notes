// 本书的行内记号：\mlink{锚点|文字} 链接到 method 页的某个锚点；\plink{锚点|文字} 链接到 paper 页。
// 在模块加载时注册（paper.jsx、method 各节文件都会 import 本文件）。
import { extendInline, pageUrl } from "@kit";

const mk = page => arg => { const [a, t] = arg.split("|"); return <a href={pageUrl(page, a)}>{t || a}</a>; };
extendInline("mlink", mk("method"));
extendInline("plink", mk("paper"));
export const PAPER_KIT = true;
