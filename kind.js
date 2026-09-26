// kind.js：判类（数字 / 英文字母 / 其他）
export function kindOf(char) {
  if (char >= "0" && char <= "9") return "digit";
  if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) return "letter";
  return "other";
}
