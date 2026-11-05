// 本书库的读者反馈收件地址（各书 book.js 的 feedbackEmail 都引用它）。
// 不以明文出现在源码与构建产物中（防爬虫抓取），运行时解码。生成方法：enc[i] = (charCode ^ 0x5a) + 3*i。
const ENC = [62, 56, 59, 64, 53, 57, 81, 78, 50, 80, 77, 79, 90, 92, 95, 94, 164, 108, 107, 112];
export const FEEDBACK_EMAIL = ENC.map((v, i) => String.fromCharCode((v - 3 * i) ^ 0x5a)).join("");
