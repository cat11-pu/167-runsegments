// kind.js：判类（数字 0-9 / 英文字母 A-Z a-z / 其他）
export function kindOf(char) {
  const code = char.charCodeAt(0);
  if (code >= 48 && code <= 57) return "digit";
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return "letter";
  return "other";
}
