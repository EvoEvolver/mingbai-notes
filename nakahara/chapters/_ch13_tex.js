// 第 13 章公式中反复出现的记号（用 \sym 强制指向本章符号词典的条目）。纯字符串常量，可在 R`…` 中用 ${…} 插入。
const R = String.raw;
export const DN = R`\sym{Dsl}{{\nabla\hspace{-0.667em}/}}`;          // Dirac 算子中的 ∇̸（i∇̸ = iγ^μ∇_μ）
export const PD = R`\sym{psl}{{\partial\hspace{-0.5em}/}}`;        // 自由 Dirac 算子中的 ∂̸
export const D4 = R`\sym{D4}{{D\hspace{-0.639em}/}}`;                // §13.6.2 的四维 Dirac 算子 D̸_4
export const ASL = R`\sym{Asl}{{\mathcal{A}\hspace{-0.611em}/}}`;    // 𝒜̸ = γ^μ 𝒜_μ
export const TR = R`\sym{tr}{\Tr}`;                    // 迹 tr
export const STR = R`\sym{str}{\mathrm{str}}`;         // 对称化迹 str
export const CH = R`\sym{ch}{\mathrm{ch}}`;            // 陈特征 ch
export const IND = R`\sym{ind}{\ind}`;                 // 指标 ind
export const AN = R`\sym{anom}{\boldsymbol{A}}`;       // 反常密度 A(x)（13.24），区别于 §13.4 的规范势 A
export const MR = R`\sym{Mreg}{M}`;                    // 正规化质量 M（区别于流形 M）
export const SP = R`\sym{spin}{\omega}`;               // 自旋联络 ω_μ（区别于 FP 鬼场 ω）
export const GA = R`\sym{Ganom}{G}`;                   // 反常泛函 G[ω,A]（区别于规范群 G）
export const FA = R`\sym{frakA}{\mathfrak{A}}`;        // 规范势空间 𝔄
export const FG = R`\sym{frakG}{\mathfrak{G}}`;        // 规范变换群 𝔊
export const PV = R`\sym{pv}{\chi}`;                   // Pauli–Villars 正规化场 χ
export const CHI = R`\sym{chir}{\chi}`;                // (m+2) 维手征 χ
