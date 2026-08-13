/* ============ 英语音标教室 · 交互逻辑 ============ */

/* ---------- 语音合成 ---------- */
let VOICE = null;

function pickVoice() {
  const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  if (!vs.length) return;
  const prefer = [
    (v) => v.lang === "en-GB" && /Google/i.test(v.name),
    (v) => v.lang === "en-GB",
    (v) => v.lang === "en-US" && /Google/i.test(v.name),
    (v) => v.lang === "en-US",
    (v) => v.lang.startsWith("en"),
  ];
  for (const test of prefer) {
    const found = vs.find(test);
    if (found) { VOICE = found; return; }
  }
}
if (window.speechSynthesis) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}

let currentRow = null;
let currentCard = null;

function clearPlaying() {
  if (currentRow) currentRow.classList.remove("playing");
  if (currentCard) currentCard.classList.remove("speaking");
  currentRow = currentCard = null;
}

function speak(text, rate, rowEl, cardEl) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  clearPlaying();
  if (rowEl) { rowEl.classList.add("playing"); currentRow = rowEl; }
  if (cardEl) { cardEl.classList.add("speaking"); currentCard = cardEl; }
  const u = new SpeechSynthesisUtterance(text);
  if (VOICE) u.voice = VOICE;
  u.lang = (VOICE && VOICE.lang) || "en-GB";
  u.rate = rate;
  u.pitch = 1;
  u.onend = clearPlaying;
  u.onerror = clearPlaying;
  speechSynthesis.speak(u);
}

/* ---------- 键盘可达性辅助（Enter / 空格 触发点击） ---------- */
function makeKeyboardable(el, label) {
  el.tabIndex = 0;
  el.setAttribute("role", "button");
  if (label) el.setAttribute("aria-label", label);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      el.click();
    }
  });
}

/* ---------- 卡片模板 ---------- */
function wordRow(w) {
  const row = document.createElement("div");
  row.className = "word-row";
  row.innerHTML =
    `<span class="w">${w.w}</span>` +
    `<span class="wi">${w.ipa}</span>` +
    `<span class="zh">${w.zh}</span>` +
    `<span class="spk">▶</span>`;
  row.addEventListener("click", (e) => {
    e.stopPropagation();
    speak(w.w, 0.85, row, null);
  });
  makeKeyboardable(row, "播放单词 " + w.w);
  return row;
}

function phonemeCard(p, extraTag) {
  const card = document.createElement("div");
  card.className = "card tilt";

  const memo = document.createElement("div");
  memo.className = "memo-badge";
  memo.textContent = p.memo;
  card.appendChild(memo);

  const top = document.createElement("div");
  top.className = "card-top";

  const btn = document.createElement("button");
  btn.className = "phoneme";
  btn.textContent = p.sym;
  btn.title = "点击听示范单词（慢读）";
  btn.addEventListener("click", () => speak(p.words[0].w, 0.6, null, card));
  top.appendChild(btn);

  const tags = document.createElement("div");
  tags.className = "tags";
  [p.cat, p.len, extraTag || p.slide].filter(Boolean).forEach((t) => {
    const s = document.createElement("span");
    s.className = "tag";
    s.textContent = t;
    tags.appendChild(s);
  });
  top.appendChild(tags);
  card.appendChild(top);

  const words = document.createElement("div");
  words.className = "words";
  p.words.forEach((w) => words.appendChild(wordRow(w)));
  card.appendChild(words);

  const tip = document.createElement("p");
  tip.className = "tip";
  tip.innerHTML = `<span class="label">发音要点</span>${p.tip}`;
  card.appendChild(tip);

  return card;
}

/* ---------- 渲染：单元音 / 双元音 ---------- */
const monoGrid = document.getElementById("monoGrid");
MONOPHTHONGS.forEach((p) => monoGrid.appendChild(phonemeCard(p, p.pair ? "对比 /" + p.pair + "/" : null)));

const diGrid = document.getElementById("diGrid");
DIPHTHONGS.forEach((p) => diGrid.appendChild(phonemeCard(p)));

/* ---------- 渲染：辅音分组 ---------- */
const consWrap = document.getElementById("consWrap");
CONSONANT_GROUPS.forEach((g) => {
  const group = document.createElement("div");
  group.className = "cons-group";

  const head = document.createElement("div");
  head.className = "cons-group-head";
  head.innerHTML = `<h3>${g.name}</h3><span class="en">${g.en}</span><p class="desc">${g.desc}</p>`;
  group.appendChild(head);

  g.pairs.forEach((pair) => {
    const block = document.createElement("div");
    block.className = "pair-block";

    if (pair.voiceless && pair.voiced) {
      const lbl = document.createElement("div");
      lbl.className = "pair-label";
      lbl.innerHTML =
        `<span class="qing">/${pair.voiceless}/</span><span class="vs">清浊一对 · 对比着学</span><span class="zhuo">/${pair.voiced}/</span>`;
      block.appendChild(lbl);
    }

    const grid = document.createElement("div");
    grid.className = "pair-grid";

    pair.items.forEach((item) => {
      const p = {
        sym: item.sym,
        words: item.words,
        tip: item.tip,
        memo: item.memo,
        cat: g.name,
      };
      const card = phonemeCard(p);
      card.classList.add("compact");
      const isVoiced = pair.voiced ? item.sym === pair.voiced : true;
      const chip = document.createElement("span");
      chip.className = "voice-chip " + (pair.voiceless && !isVoiced ? "qing" : "zhuo");
      chip.textContent = pair.voiceless ? (isVoiced ? "浊辅音 · 声带振动" : "清辅音 · 只有气流") : "浊音 · 声带振动";
      card.appendChild(chip);
      grid.appendChild(card);
    });

    block.appendChild(grid);
    group.appendChild(block);
  });

  consWrap.appendChild(group);
});

/* ---------- 渲染：最小对立对 ---------- */
const pairsGrid = document.getElementById("pairsGrid");
MINIMAL_PAIRS.forEach((mp) => {
  const card = document.createElement("div");
  card.className = "mp-card reveal";
  const focus = document.createElement("span");
  focus.className = "mp-focus";
  focus.textContent = "/" + mp.focus.replace(" vs ", "/ 对比 /") + "/";
  card.appendChild(focus);

  [mp.a, mp.b].forEach((side) => {
    const row = document.createElement("div");
    row.className = "mp-row";
    row.innerHTML =
      `<span class="w">${side.w}</span><span class="wi">${side.ipa}</span><span class="zh">${side.zh}</span><span>▶</span>`;
    row.addEventListener("click", () => speak(side.w, 0.8, row, null));
    makeKeyboardable(row, "播放单词 " + side.w);
    card.appendChild(row);
  });

  pairsGrid.appendChild(card);
});

/* ---------- 元音舌位图 ---------- */
const NS = "http://www.w3.org/2000/svg";
const dotsG = document.getElementById("vowelDots");
const detail = document.getElementById("chartDetail");

function showDetail(p, dotEl) {
  document.querySelectorAll(".vowel-dot").forEach((d) => d.classList.remove("active"));
  if (dotEl) dotEl.classList.add("active");
  detail.innerHTML = "";
  const big = document.createElement("div");
  big.className = "big";
  big.textContent = "/" + p.sym + "/";
  detail.appendChild(big);

  const meta = document.createElement("div");
  meta.className = "meta";
  [p.cat, p.len].forEach((t) => {
    const s = document.createElement("span");
    s.className = "tag";
    s.textContent = t;
    meta.appendChild(s);
  });
  detail.appendChild(meta);

  const words = document.createElement("div");
  words.className = "words";
  p.words.forEach((w) => words.appendChild(wordRow(w)));
  detail.appendChild(words);

  const tip = document.createElement("p");
  tip.className = "tip";
  tip.innerHTML = `<span class="label">发音要点</span>${p.tip}`;
  detail.appendChild(tip);

  const memo = document.createElement("div");
  memo.className = "memo-inline";
  memo.textContent = p.memo;
  detail.appendChild(memo);
}

function activateDot(p, g) {
  showDetail(p, g);
  speak(p.words[0].w, 0.6, null, null);
}

MONOPHTHONGS.forEach((p) => {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("class", "vowel-dot");
  const halo = document.createElementNS(NS, "circle");
  halo.setAttribute("class", "halo");
  halo.setAttribute("cx", p.q.x);
  halo.setAttribute("cy", p.q.y);
  halo.setAttribute("r", 24);
  const core = document.createElementNS(NS, "circle");
  core.setAttribute("class", "core");
  core.setAttribute("cx", p.q.x);
  core.setAttribute("cy", p.q.y);
  core.setAttribute("r", 15);
  const label = document.createElementNS(NS, "text");
  label.setAttribute("x", p.q.x);
  label.setAttribute("y", p.q.y + 1);
  label.textContent = p.sym;
  g.appendChild(halo);
  g.appendChild(core);
  g.appendChild(label);
  g.addEventListener("click", () => activateDot(p, g));
  g.setAttribute("tabindex", "0");
  g.setAttribute("role", "button");
  g.setAttribute("aria-label", "聆听 /" + p.sym + "/ 的示范单词");
  g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateDot(p, g);
    }
  });
  dotsG.appendChild(g);
});
showDetail(MONOPHTHONGS[0], null); // 默认展示 /iː/

/* ---------- 小测验 ---------- */
const quizPool = [...QUIZ_POOL].sort(() => Math.random() - 0.5);
let quizIdx = 0, quizRight = 0, quizTotal = 0, answered = false;

const qPlay = document.getElementById("quizPlay");
const qOptions = document.getElementById("quizOptions");
const qFeedback = document.getElementById("quizFeedback");
const qScore = document.getElementById("quizScore");
const qCount = document.getElementById("quizCount");
const qNext = document.getElementById("quizNext");

function currentQuiz() { return quizPool[quizIdx % quizPool.length]; }

function renderQuiz() {
  const q = currentQuiz();
  answered = false;
  qFeedback.textContent = "";
  qCount.textContent = "第 " + (quizIdx + 1) + " 题";
  qOptions.innerHTML = "";
  [...q.options].sort(() => Math.random() - 0.5).forEach((opt) => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.textContent = "/" + opt + "/";
    b.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      quizTotal++;
      if (opt === q.answer) {
        quizRight++;
        b.classList.add("correct");
        qFeedback.innerHTML = `答对了。<b>${q.word}</b>（${q.zh}）里就是 <span class="ans">/${q.answer}/</span> 这个音。`;
      } else {
        b.classList.add("wrong");
        [...qOptions.children].forEach((c) => {
          if (c.textContent === "/" + q.answer + "/") c.classList.add("correct");
        });
        qFeedback.innerHTML = `再听听——<b>${q.word}</b>（${q.zh}）的正确答案是 <span class="ans">/${q.answer}/</span>。`;
        speak(q.word, 0.6, null, null);
      }
      qScore.textContent = `得分 ${quizRight} / ${quizTotal}`;
    });
    qOptions.appendChild(b);
  });
}

qPlay.addEventListener("click", () => speak(currentQuiz().word, 0.8, null, null));
qNext.addEventListener("click", () => {
  quizIdx++;
  if (quizIdx % quizPool.length === 0) quizPool.sort(() => Math.random() - 0.5);
  renderQuiz();
});
renderQuiz();

/* ---------- 3D 微倾卡片（仅指针设备） ---------- */
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest && e.target.closest(".tilt");
    document.querySelectorAll(".tilt").forEach((c) => {
      if (c !== card) c.style.transform = "";
    });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -1;
    const ry = (e.clientX - r.left) / r.width - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${(rx * 100) / 40}deg) rotateY(${(ry * 100) / 40}deg)`;
  });
  document.addEventListener("mouseleave", () => {
    document.querySelectorAll(".tilt").forEach((c) => (c.style.transform = ""));
  });
}

/* ---------- Service Worker 注册 ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      /* 本地 file:// 或无 HTTPS 时静默跳过 */
    });
  });
}

/* ---------- 大字号模式（记忆选择） ---------- */
const fontToggle = document.getElementById("fontToggle");
if (localStorage.getItem("ipa-big-text") === "1") {
  document.documentElement.classList.add("big-text");
  fontToggle.classList.add("on");
}
fontToggle.addEventListener("click", () => {
  const on = document.documentElement.classList.toggle("big-text");
  fontToggle.classList.toggle("on", on);
  localStorage.setItem("ipa-big-text", on ? "1" : "0");
});

/* ---------- 滚动进入 ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        setTimeout(() => en.target.classList.add("in"), (i % 4) * 80);
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal, .card").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

/* ---------- 安装到主屏幕 · 引导 ---------- */
const installBtn = document.getElementById("installBtn");
const installModal = document.getElementById("installModal");
const installSteps = document.getElementById("installSteps");
const installClose = document.getElementById("installClose");
let deferredInstallPrompt = null;

const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;
const ua = navigator.userAgent.toLowerCase();
const isIOS = /iphone|ipad|ipod/.test(ua);
// iPadOS 13+ 默认把 UA 伪装成 Mac，用触屏点数补充判断
const isIPadOS = !isIOS && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

const SHARE_SVG =
  '<svg class="ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11"/><path d="M7.5 7L12 2.8 16.5 7"/><path d="M5.5 11v8.2A1.8 1.8 0 0 0 7.3 21h9.4a1.8 1.8 0 0 0 1.8-1.8V11"/></svg>';
const PLUS_SVG =
  '<svg class="ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M12 8.2v7.6M8.2 12h7.6"/></svg>';

function iosStepsHTML() {
  return (
    step(1, `在 <b>Safari</b> 中打开本页，点底部（或顶部地址栏旁）的「分享」按钮 ${SHARE_SVG}`) +
    step(2, `在弹出的菜单里<b>向下滑</b>，找到「添加到主屏幕」 ${PLUS_SVG} ，点它`) +
    step(3, `点右上角的「添加」——桌面上就出现「音标教室」图标了。`) +
    `<div class="install-tip">小提示：必须用 <b>Safari</b> 打开才有「添加到主屏幕」；如果是在微信或其他浏览器里看到的本页，请复制网址到 Safari 再打开。</div>`
  );
}

function genericStepsHTML() {
  return (
    step(1, `点浏览器右上角的菜单（Chrome / Edge 一般是 <b>⋮</b> 或 <b>…</b>）`) +
    step(2, `选择「安装应用」或「添加到主屏幕」 ${PLUS_SVG}`) +
    step(3, `确认「安装」，图标就会出现在桌面 / 应用列表里`) +
    `<div class="install-tip">如果菜单里没有「安装应用」，可以换个浏览器试试：iPhone / iPad 请用 <b>Safari</b>，安卓推荐 <b>Chrome</b>，电脑推荐 <b>Edge</b> 或 <b>Chrome</b>。</div>`
  );
}

function step(no, html) {
  return `<div class="install-step"><span class="no">${no}</span><p>${html}</p></div>`;
}

function openInstallModal() {
  installSteps.innerHTML = isIOS || isIPadOS ? iosStepsHTML() : genericStepsHTML();
  installModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeInstallModal() {
  installModal.hidden = true;
  document.body.style.overflow = "";
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

window.addEventListener("appinstalled", () => {
  installBtn.style.display = "none";
  closeInstallModal();
});

if (isStandalone) {
  // 已经是安装态：不再需要引导按钮
  installBtn.style.display = "none";
} else {
  installBtn.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      // 浏览器支持一键安装（Edge / Chrome / 安卓）：直接弹系统安装框
      deferredInstallPrompt.prompt();
      try {
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === "accepted") installBtn.style.display = "none";
      } catch (_) { /* 用户关闭提示，忽略 */ }
      deferredInstallPrompt = null;
    } else {
      openInstallModal();
    }
  });
}

installClose.addEventListener("click", closeInstallModal);
installModal.addEventListener("click", (e) => {
  if (e.target === installModal) closeInstallModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !installModal.hidden) closeInstallModal();
});
