// segment.js：分段（基线：一律给空表）
import { kindOf } from "./kind.js";

export function segment(text) {
  return { kinds: [], lengths: [], longest: 0 };
}
