// app.js：渲染结果
import { kindOf } from "./kind.js";
import { segment } from "./segment.js";

export function render(spec) {
  const text = spec.text || "";
  const view = segment(text);
  const kinds = view.kinds || [];
  return { kinds: kinds, lengths: view.lengths || [], count: kinds.length,
           longest: view.longest || 0,
           digit_segments: kinds.filter((item) => item === "digit").length,
           letter_segments: kinds.filter((item) => item === "letter").length,
           length: text.length };
}
