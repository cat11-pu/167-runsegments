// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let text = spec.text || "";
  parts.log.textContent = "文本长度 " + text.length + "，点分段看数字段与字母段。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { text: text }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.kinds.forEach(function (kind, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 段";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = kind === "digit" ? "数字段 " : (kind === "letter" ? "字母段 " : "其他段 ");
      row.appendChild(mark);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, view.lengths[spot] * 20) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "段数 " + view.count + "，最长段 " + view.longest;
    parts.log.textContent = "数字段 " + view.digit_segments + " 个，字母段 " + view.letter_segments + " 个";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "分段";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加字母";
  addButton.addEventListener("click", function () {
    text = text + "a";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个字符";
  dropButton.addEventListener("click", function () {
    text = text.slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "ab12cd";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 分成 " + view.count + " 段，最长 " + view.longest;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看段数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { text: text }));
    parts.out.textContent = "段数 " + view.count + "，数字段 " + view.digit_segments + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
