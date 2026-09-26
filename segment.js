// segment.js：一次扫描把相邻同类字符合成一段
import { kindOf } from "./kind.js";

const MAX_LENGTH = 50000;

export function segment(text) {
  if (text.trim() === "") {
    const error = new Error("text is empty after removing whitespace");
    error.code = "E_EMPTY_TEXT";
    throw error;
  }

  const kinds = [];
  const lengths = [];
  let longest = 0;

  // 单遍扫描：每个字符只调一次 kindOf；按下标遍历保证长度之和 === text.length
  const limit = Math.min(text.length, MAX_LENGTH);
  for (let index = 0; index < limit; index += 1) {
    const kind = kindOf(text[index]);
    const last = kinds.length - 1;
    if (last >= 0 && kinds[last] === kind) {
      lengths[last] += 1;
    } else {
      kinds.push(kind);
      lengths.push(1);
    }
    if (lengths[lengths.length - 1] > longest) longest = lengths[lengths.length - 1];
  }

  return { kinds: kinds, lengths: lengths, longest: longest };
}
