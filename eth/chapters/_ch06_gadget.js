// §6 度数约简（路径小工具）的纯函数实现：在二部图上把度 ≥ thr 的顶点换成 2k−1 个顶点的路径，并用稀疏 DP 精确求积和式。
// 边：{l, r, w}（w 为 BigInt）。左顶点 0..nl-1，右顶点 0..nr-1。
export function fromMatrix(A) {
  const E = []; A.forEach((row, i) => row.forEach((x, j) => { if (x) E.push({ l: i, r: j, w: BigInt(x) }); }));
  return { nl: A.length, nr: A[0].length, E, origin: { l: A.map((_, i) => `r${i + 1}`), r: A[0].map((_, j) => `c${j + 1}`) } };
}
// side="l"：替换左顶点；side="r"：替换右顶点
export function expand(G, side, thr) {
  let { nl, nr, E } = G; E = E.map(e => ({ ...e }));
  const ol = G.origin.l.slice(), or = G.origin.r.slice();
  const N = side === "l" ? nl : nr;
  let added = 0;
  for (let x = 0; x < N; x++) {
    const inc = E.filter(e => e[side] === x); const k = inc.length; if (k < thr || k < 2) continue;
    // 奇数位置：x 本身（位置 1）+ 新的同侧顶点 k−1 个；偶数位置：对侧新顶点 k−1 个
    const same = [x], other = [];
    for (let t = 1; t < k; t++) {
      if (side === "l") { same.push(nl++); ol.push(`${G.origin.l[x]}·${2 * t + 1}`); other.push(nr++); or.push(`${G.origin.l[x]}·${2 * t}`); }
      else { same.push(nr++); or.push(`${G.origin.r[x]}·${2 * t + 1}`); other.push(nl++); ol.push(`${G.origin.r[x]}·${2 * t}`); }
    }
    inc.forEach((e, t) => { e[side] = same[t]; });                       // 原边接到第 t 个奇数位置
    for (let t = 0; t < k - 1; t++) {                                     // 路径边，权 1
      if (side === "l") { E.push({ l: same[t], r: other[t], w: 1n, path: true }); E.push({ l: same[t + 1], r: other[t], w: 1n, path: true }); }
      else { E.push({ l: other[t], r: same[t], w: 1n, path: true }); E.push({ l: other[t], r: same[t + 1], w: 1n, path: true }); }
    }
    added += 2 * (k - 1);
  }
  return { nl, nr, E, origin: { l: ol, r: or }, added };
}
export const maxDeg = G => Math.max(...[...Array(G.nl).keys()].map(i => G.E.filter(e => e.l === i).length), ...[...Array(G.nr).keys()].map(j => G.E.filter(e => e.r === j).length));
// 稀疏 DP：逐行处理，状态 = 已用列集合（BigInt 位掩码），只保留可达状态
export function perSparse(G) {
  if (G.nl !== G.nr) return { value: 0n, states: 0 };
  const rows = [...Array(G.nl)].map((_, i) => G.E.filter(e => e.l === i));
  let f = new Map([[0n, 1n]]), peak = 1;
  for (const row of rows) {
    const g = new Map();
    for (const [m, v] of f) for (const e of row) { const b = 1n << BigInt(e.r); if (m & b) continue; const k = m | b; g.set(k, (g.get(k) ?? 0n) + v * e.w); }
    f = g; peak = Math.max(peak, f.size);
    if (!f.size) break;
  }
  let tot = 0n; for (const v of f.values()) tot += v;
  return { value: tot, states: peak };
}
