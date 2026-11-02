// 方法深读页：Pauli 噪声与本征值 → 电路本征值 → 对数线性回归 → 采样与协方差 → 性能指标 → 实验设计优化 → 表面码设定。
// 正文在 _method_s1.jsx（一至三节）、_method_s2.jsx（四至五节）、_method_s3.jsx（六至七节与自测）；
// 交互图在 _method_plots.jsx（数值核心 _method_aces.js，node 验证见该文件头注释）；符号词典 _method_notation.js（与 paper 页共用）。
import { PaperPage } from "@kit";
import { NOTATION } from "./_method_notation.js";
import { S1, S2, S3 } from "./_method_s1.jsx";
import { S4, S5 } from "./_method_s2.jsx";
import { S6, S7, S8 } from "./_method_s3.jsx";

const R = String.raw;

export const meta = {
  id: "method", no: 0, label: "方法深读", title_zh: "方法深读：ACES、性能指标与实验设计", title_en: "Method in depth",
  tldr: R`把「门本征值之积 = 电路本征值」取对数变成线性回归；从 shot 统计一路传播出估计误差的分布，得到能在实验前算出的性能指标 $\mathcal F$；再用它挑 tuple、分 shot。`,
  overview: R`这一页按讲课的顺序把方法拆开：先说清楚为什么要用 **Pauli 本征值** 而不是错误概率来描述噪声（§一）；再看一条重排过的电路如何把一串门本征值**乘**在一起（§二），取对数后就是一个**线性回归**（§三）；电路本征值靠「制备 Pauli 本征态 → 跑电路 → 测量」的 $\pm1$ 读数来估计，同时测多个本征值会让估计相关（§四）；把这些统计误差一路传到门本征值上，就得到在做实验之前就能算的**性能指标** $\mathcal F$（§五）；最后用 $\mathcal F$ 去优化 shot 分配与 tuple 集（§六），并交代原文在表面码上的具体设定（§七）。每一节都配了一个在浏览器里真算的小实验。`,
  prereq: [
    { what: R`Pauli 矩阵、Clifford 门把 Pauli 映成 Pauli（Heisenberg 图像）` },
    { what: R`量子信道的 Kraus/超算符表述；概率分布、方差与协方差` },
    { what: R`线性最小二乘：正规方程、加权最小二乘、估计量的协方差 $(A^\intercal WA)^{-1}$` },
  ],
};
export const notation = NOTATION;

export default function Method() {
  return (
    <PaperPage meta={meta} notation={notation}>
      <S1 />
      <S2 />
      <S3 />
      <S4 />
      <S5 />
      <S6 />
      <S7 />
      <S8 />
    </PaperPage>);
}
