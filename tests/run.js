import assert from "node:assert";
import { kindOf } from "../kind.js";
import { segment } from "../segment.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("kindOf returns text", () => {
  assert.strictEqual(typeof kindOf("a"), "string");
});

check("segment returns kinds", () => {
  assert.ok(Array.isArray(segment("ab").kinds));
});

check("segment returns lengths", () => {
  assert.ok(Array.isArray(segment("ab").lengths));
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ text: "ab" }).count, "number");
});

check("render counts digit segments", () => {
  assert.strictEqual(typeof render({ text: "ab" }).digit_segments, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
