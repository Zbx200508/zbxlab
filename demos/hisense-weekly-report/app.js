const pages = {
  workbench: document.querySelector("#page-workbench"),
  history: document.querySelector("#page-history")
};

const sideButtons = Array.from(document.querySelectorAll(".side-btn"));
const stepButtons = Array.from(document.querySelectorAll(".step-btn"));
const stepPanels = Array.from(document.querySelectorAll(".step-panel"));
const modal = document.querySelector("#modal");
const toast = document.querySelector("#toast");

const benchmarkOptions = {
  "海信电视": ["TCL电视", "索尼电视", "小米电视", "创维电视"],
  "海信冰箱": ["美的冰箱", "海尔冰箱", "西门子冰箱"],
  "海信空调": ["美的空调", "格力空调", "海尔空调"],
  "海信洗衣机": ["小天鹅洗衣机", "美的洗衣机", "海尔洗衣机"]
};

const lineOptions = ["海信电视", "海信激光电视", "Vidda", "东芝电视", "海信冰箱", "海信空调", "海信洗衣机", "海信厨卫", "ASKO", "gorenje"];

let currentStep = 0;
let running = false;

function showToast(title, body) {
  toast.querySelector("strong").textContent = title;
  toast.querySelector("span").textContent = body;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2500);
}

function switchPage(name) {
  Object.entries(pages).forEach(([key, page]) => page.classList.toggle("active", key === name));
  sideButtons.forEach(button => button.classList.toggle("active", button.dataset.page === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setStatus(selector, className, text) {
  const el = document.querySelector(selector);
  el.className = `status ${className}`;
  el.textContent = text;
}

function setStep(index) {
  currentStep = Math.max(0, Math.min(index, stepPanels.length - 1));
  stepButtons.forEach((button, i) => button.classList.toggle("active", i === currentStep));
  stepPanels.forEach((panel, i) => panel.classList.toggle("active", i === currentStep));
  const prevStep = document.querySelector("#prevStep");
  const nextStep = document.querySelector("#nextStep");
  if (prevStep) prevStep.disabled = currentStep === 0;
  if (nextStep) nextStep.disabled = currentStep === stepPanels.length - 1;
}

function markInvalid(element, invalid) {
  if (element) element.classList.toggle("is-invalid", invalid);
}

function selectedCount(selector) {
  return document.querySelectorAll(`${selector} input:not([data-select-all]):checked`).length;
}

function validateExpression(value) {
  return !value.includes("~") && value.length <= 5000;
}

function validateStep(index) {
  if (index === 0) {
    const nameInput = document.querySelector("#reportName");
    const startInput = document.querySelector("#startDate");
    const endInput = document.querySelector("#endDate");
    const includeWords = document.querySelector("#includeWords");
    const excludeWords = document.querySelector("#excludeWords");
    const nameInvalid = nameInput.value.trim().length < 2 || nameInput.value.trim().length > 60;
    const dateInvalid = !startInput.value || !endInput.value;
    const rangeInvalid = startInput.value && endInput.value && startInput.value > endInput.value;
    const includeInvalid = !validateExpression(includeWords.value);
    const excludeInvalid = !validateExpression(excludeWords.value);

    markInvalid(nameInput.closest(".form-item"), nameInvalid);
    markInvalid(startInput.closest(".form-item"), dateInvalid || rangeInvalid);
    markInvalid(endInput.closest(".form-item"), dateInvalid || rangeInvalid);
    markInvalid(includeWords.closest(".form-item"), includeInvalid);
    markInvalid(excludeWords.closest(".form-item"), excludeInvalid);

    if (nameInvalid) return "报告名称不能为空，且需要控制在 2-60 个字符。";
    if (dateInvalid) return "报告时间范围不能为空，请选择开始日期和结束日期。";
    if (rangeInvalid) return "开始日期不能晚于结束日期。";
    if (includeInvalid || excludeInvalid) return "关键词和过滤词不允许输入词距符号 ~，且长度不能超过 5000。";
  }

  if (index === 1) {
    const count = selectedCount("#competitorChoices");
    markInvalid(document.querySelector("#competitorBlock"), count === 0);
    if (count === 0) return "竞品品牌不能为空，请至少选择 1 个竞品品牌。";
  }

  if (index === 2) {
    const noPlatform = selectedCount('[data-platforms="benchmark"]') === 0;
    const emptyRow = hasEmptySelect("#benchmarkRows");
    const duplicated = hasDuplicateCombination("#benchmarkRows");
    markInvalid(document.querySelector("#benchmarkPlatformBlock"), noPlatform);
    if (noPlatform) return "各品线重点媒介表现-1 的分平台展示站点不能为空，请至少选择 1 个站点。";
    if (emptyRow) return "各品线重点媒介表现-1 的本品品牌和品牌控比对象不能为空。";
    if (duplicated) return "该本品与控比竞品组合已存在，请勿重复添加。";
  }

  if (index === 3) {
    const noPlatform = selectedCount('[data-platforms="media"]') === 0;
    const emptyRow = hasEmptySelect("#mediaRows");
    const duplicated = hasDuplicateValue("#mediaRows", 1);
    markInvalid(document.querySelector("#mediaPlatformBlock"), noPlatform);
    if (noPlatform) return "各品线重点媒介表现-2 的分平台展示站点不能为空，请至少选择 1 个站点。";
    if (emptyRow) return "各品线重点媒介表现-2 的品线不能为空。";
    if (duplicated) return "该品线已存在，请勿重复添加。";
  }

  if (index === 4) {
    const emptyRow = hasEmptySelect("#insightRows");
    const duplicated = hasDuplicateValue("#insightRows", 1);
    if (emptyRow) return "品线 AI 洞察中的本品品牌和竞品品牌不能为空。";
    if (duplicated) return "该品线已存在，请勿重复添加。";
  }

  return "";
}

function validateThrough(targetIndex) {
  for (let i = 0; i <= targetIndex; i += 1) {
    const error = validateStep(i);
    if (error) {
      setStep(i);
      showToast("配置校验未通过", error);
      return false;
    }
  }
  return true;
}

function hasEmptySelect(tbodySelector) {
  return Array.from(document.querySelectorAll(`${tbodySelector} select`)).some(select => !select.value);
}

function rowValues(row) {
  return Array.from(row.querySelectorAll("select")).map(select => select.value).join(" + ");
}

function hasDuplicateCombination(tbodySelector) {
  const values = Array.from(document.querySelectorAll(`${tbodySelector} tr`)).map(rowValues);
  return new Set(values).size !== values.length;
}

function hasDuplicateValue(tbodySelector, selectIndex) {
  const values = Array.from(document.querySelectorAll(`${tbodySelector} tr`)).map(row => row.querySelectorAll("select")[selectIndex - 1]?.value);
  return new Set(values).size !== values.length;
}

function renumber(tbodySelector) {
  Array.from(document.querySelectorAll(`${tbodySelector} tr`)).forEach((row, index) => {
    if (row.cells[0]) row.cells[0].textContent = index + 1;
  });
}

function optionHtml(options, placeholder = "") {
  return `${placeholder ? `<option value="">${placeholder}</option>` : ""}${options.map(option => `<option>${option}</option>`).join("")}`;
}

function addRow(type) {
  const rowTemplates = {
    benchmark: `<tr><td><select data-line-select>${optionHtml(lineOptions, "请选择本品品牌")}</select></td><td><select data-rival-select><option value="">请选择控比对象</option></select></td><td><button class="link-btn" type="button" data-delete-row>删除</button></td></tr>`,
    media: `<tr><td></td><td><select data-line-select>${optionHtml(lineOptions, "请选择品线")}</select></td><td><button class="link-btn" type="button" data-delete-row>删除</button></td></tr>`,
    insight: `<tr><td></td><td><select data-line-select>${optionHtml(["海信电视", "海信冰箱", "海信空调", "海信洗衣机"], "请选择本品品牌")}</select></td><td><select data-rival-select><option value="">请选择竞品品牌</option></select></td><td><button class="link-btn" type="button" data-delete-row>删除</button></td></tr>`
  };

  const tbodyMap = {
    benchmark: "#benchmarkRows",
    media: "#mediaRows",
    insight: "#insightRows"
  };

  document.querySelector(tbodyMap[type]).insertAdjacentHTML("beforeend", rowTemplates[type]);
  if (type !== "benchmark") renumber(tbodyMap[type]);
  showToast("已新增配置行", "新增行默认为空，需要补充后才能继续。");
}

function deleteRow(button) {
  const tbody = button.closest("tbody");
  if (tbody.rows.length <= 1) {
    showToast("至少保留一行", "该配置表需要至少保留一条配置。");
    return;
  }
  button.closest("tr").remove();
  if (tbody.id === "mediaRows") renumber("#mediaRows");
  if (tbody.id === "insightRows") renumber("#insightRows");
}

function updateRivalOptions(lineSelect) {
  const row = lineSelect.closest("tr");
  const rivalSelect = row?.querySelector("[data-rival-select]");
  if (!rivalSelect) return;
  const options = benchmarkOptions[lineSelect.value] || [];
  rivalSelect.innerHTML = optionHtml(options, "请选择控比对象");
}

function updateCompetitorCount(changedInput) {
  const checked = Array.from(document.querySelectorAll("#competitorChoices input:checked"));
  if (checked.length > 3) {
    changedInput.checked = false;
    showToast("竞品数量已达上限", "竞品品牌最多选择 3 个。");
  }
  document.querySelector("#competitorCount").textContent = `已选 ${selectedCount("#competitorChoices")}/3`;
}

function updateSelectAll(group) {
  const all = group.querySelector("[data-select-all]");
  const items = Array.from(group.querySelectorAll("input:not([data-select-all])"));
  all.checked = items.every(item => item.checked);
}

function handlePlatformChange(input) {
  const group = input.closest("[data-platforms]");
  const all = group.querySelector("[data-select-all]");
  const items = Array.from(group.querySelectorAll("input:not([data-select-all])"));
  if (input.dataset.selectAll !== undefined) {
    items.forEach(item => { item.checked = input.checked; });
  } else {
    all.checked = items.every(item => item.checked);
  }
}

function runReport() {
  if (running) return;
  if (!validateThrough(4)) return;

  running = true;
  document.querySelector("#runningRow").classList.remove("hidden");
  setStatus("#configStatus", "done", "已保存");
  showToast("生成任务已提交", "可前往历史报告页面查看进度。");
  running = false;
}

function saveDraft() {
  if (!validateThrough(currentStep)) return;
  setStatus("#configStatus", "draft", "草稿");
  document.querySelector("#draftRow").classList.remove("hidden");
  showToast("草稿已保存", "已在历史报告中生成待提交记录，并保留当前配置快照。");
}

function openPreview(mode) {
  document.querySelector("#modalTitle").textContent = mode === "template" ? "报告模板预览" : "查看报告";
  document.querySelector("#modalSub").textContent = mode === "template"
    ? "展示报告结构、指标字段和洞察模块，适合作为产品文档证据。"
    : "展示已生成报告内容，可作为作品集最终产物截图。";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closePreview() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function copyConfig() {
  switchPage("workbench");
  setStep(0);
  setStatus("#configStatus", "done", "已保存");
  showToast("配置已复制", "已按历史报告快照带入配置，可重新生成或继续调整。");
}

function regenerateReport() {
  document.querySelector("#runningRow").classList.remove("hidden");
  showToast("重新生成已提交", "历史报告中已展示生成中状态，便于说明失败重试逻辑。");
}

sideButtons.forEach(button => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});

document.querySelectorAll("[data-page-shortcut]").forEach(button => {
  button.addEventListener("click", () => {
    switchPage(button.dataset.pageShortcut);
    if (button.dataset.pageShortcut === "workbench") setStep(0);
  });
});

stepButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index <= currentStep || validateThrough(index - 1)) setStep(index);
  });
});

const prevStepButton = document.querySelector("#prevStep");
const nextStepButton = document.querySelector("#nextStep");
if (prevStepButton) prevStepButton.addEventListener("click", () => setStep(currentStep - 1));
if (nextStepButton) {
  nextStepButton.addEventListener("click", () => {
    const error = validateStep(currentStep);
    if (error) {
      showToast("配置校验未通过", error);
      return;
    }
    setStep(currentStep + 1);
  });
}

document.querySelector("#saveDraft").addEventListener("click", saveDraft);
document.querySelector("#runReport").addEventListener("click", runReport);
document.querySelector("#closeModal").addEventListener("click", closePreview);

document.querySelectorAll(".segmented button").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  });
});

document.querySelectorAll("#competitorChoices input").forEach(input => {
  input.addEventListener("change", () => updateCompetitorCount(input));
});

document.querySelectorAll("[data-platforms] input").forEach(input => {
  input.addEventListener("change", () => handlePlatformChange(input));
});

modal.addEventListener("click", event => {
  if (event.target === modal) closePreview();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closePreview();
});

document.addEventListener("change", event => {
  if (event.target.matches("[data-line-select]")) {
    updateRivalOptions(event.target);
    if (event.target.closest("#mediaRows")) renumber("#mediaRows");
    if (event.target.closest("#insightRows")) renumber("#insightRows");
  }
  if (event.target.matches("[data-rival-select]")) {
    const row = event.target.closest("tr");
    const tbody = event.target.closest("tbody");
    if (tbody?.id === "benchmarkRows" && hasDuplicateCombination("#benchmarkRows")) {
      showToast("配置重复", "该本品与控比竞品组合已存在，请勿重复添加。");
      event.target.value = "";
    }
    if (tbody?.id === "insightRows" && hasDuplicateValue("#insightRows", 1)) {
      showToast("品线重复", "该品线已存在，请勿重复添加。");
      row.querySelector("[data-line-select]").value = "";
    }
  }
});

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.addRow) addRow(target.dataset.addRow);
  if (target.dataset.deleteRow !== undefined) deleteRow(target);
  if (target.dataset.openPreview) openPreview(target.dataset.openPreview);
  if (target.dataset.copyConfig !== undefined) copyConfig();
  if (target.dataset.regenerate !== undefined) regenerateReport();
  if (target.dataset.editDraft !== undefined) {
    switchPage("workbench");
    setStep(0);
    showToast("已进入草稿编辑", "页面已带入此前保存的报告配置，可继续修改后生成。");
  }
});

setStep(0);
