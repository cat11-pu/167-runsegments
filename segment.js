// segment.js：相邻同类字符合成一段（单次扫描，每字符只判一次类）
import { kindOf } from "./kind.js";

const MAX_TEXT_LENGTH = 50000;

export function segment(text) {
  if (text.trim().length === 0) {
    const error = new Error("文本去掉空白后为空");
    error.code = "E_EMPTY_TEXT";
    throw error;
  }
  if (text.length > MAX_TEXT_LENGTH) {
    const error = new Error("文本超过五万字符预算");
    error.code = "E_TEXT_TOO_LONG";
    throw error;
  }

  const kinds = [];
  const lengths = [];
  let longest = 0;
  let previousKind = null;
  let runLength = 0;

  for (let i = 0; i < text.length; i += 1) {
    const currentKind = kindOf(text[i]);
    if (currentKind === previousKind) {
      runLength += 1;
      lengths[lengths.length - 1] = runLength;
    } else {
      kinds.push(currentKind);
      lengths.push(1);
      runLength = 1;
      previousKind = currentKind;
    }
    if (runLength > longest) longest = runLength;
  }

  return { kinds, lengths, longest };
}
