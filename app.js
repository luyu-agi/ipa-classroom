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
  memo.textContent = "💡 " + p.memo;
  detail.appendChild(memo);
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
  g.addEventListener("click", () => {
    showDetail(p, g);
    speak(p.words[0].w, 0.6, null, null);
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
        qFeedback.innerHTML = `答对了！<b>${q.word}</b>（${q.zh}）里就是 <span class="ans">/${q.answer}/</span> 这个音。`;
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
