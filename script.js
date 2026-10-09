/* =========================================================
   BIRTHDAY SURPRISE — SCRIPT
   (reads content from memories.js — see that file to customise)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Fill in text from siteText ---------- */
  document.getElementById("greeting-title").textContent = siteText.greetingTitle;
  document.getElementById("greeting-message").textContent = siteText.greetingMessage;
  document.getElementById("cake-hint-text").textContent = siteText.cakeHint;
  document.getElementById("timeline-title").textContent = siteText.timelineTitle;
  document.getElementById("final-title").textContent = siteText.finalTitle;
  document.getElementById("final-message").textContent = siteText.finalMessage;
  document.title = siteText.greetingTitle.replace(/[^\w\s,!]/g, "").trim() || "Happy Birthday!";

  /* ---------- 1b. Hero photo (mum's photo on the first screen) ---------- */
  const heroWrap = document.querySelector(".hero-photo-wrap");
  const heroImg = document.getElementById("hero-photo");
  if (siteText.heroPhoto) {
    heroImg.src = siteText.heroPhoto;
    heroImg.onerror = () => {
      heroWrap.classList.add("is-placeholder");
      const fallback = document.createElement("div");
      fallback.className = "hero-photo-fallback";
      fallback.textContent = "Add " + siteText.heroPhoto.split("/").pop() + " to images/";
      heroWrap.appendChild(fallback);
    };
  } else {
    heroWrap.hidden = true;
  }

  /* ---------- 2. Build the photo timeline from `memories` ---------- */
  const timelineEl = document.getElementById("timeline");
  memories.forEach((m) => {
    const card = document.createElement("article");
    card.className = "memory-card";

    const photoWrap = document.createElement("div");
    photoWrap.className = "memory-photo-wrap";
    const img = document.createElement("img");
    img.src = m.image;
    img.alt = m.caption || "A memory together";
    img.loading = "lazy";
    img.onerror = () => {
      // Friendly placeholder if the photo hasn't been added yet
      photoWrap.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;background:#ffe0ea;color:#ec6f96;font-weight:700;font-family:Quicksand,sans-serif;text-align:center;padding:16px;">Add ' +
        m.image.split("/").pop() +
        " to the images folder</div>";
    };
    photoWrap.appendChild(img);

    const meta = document.createElement("div");
    meta.className = "memory-meta";
    if (m.date) {
      const dateEl = document.createElement("p");
      dateEl.className = "memory-date";
      dateEl.textContent = m.date;
      meta.appendChild(dateEl);
    }
    const captionEl = document.createElement("p");
    captionEl.className = "memory-caption";
    captionEl.textContent = m.caption;
    meta.appendChild(captionEl);

    card.appendChild(photoWrap);
    card.appendChild(meta);
    timelineEl.appendChild(card);
  });

  /* ---------- 3. Reveal timeline cards as they scroll into view ---------- */
  const cards = document.querySelectorAll(".memory-card");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((c) => observer.observe(c));
  } else {
    cards.forEach((c) => c.classList.add("in-view"));
  }

  /* ---------- 4. Ambient floating decorations on the greeting scene ---------- */
  const decorLayer = document.getElementById("decor-layer");
  if (!prefersReducedMotion) {
    const floatEmojis = ["🎈", "🎈", "✨", "🌸", "💗", "⭐"];
    const FLOATIE_COUNT = 10;
    for (let i = 0; i < FLOATIE_COUNT; i++) {
      const el = document.createElement("span");
      el.className = "floatie";
      el.textContent = floatEmojis[i % floatEmojis.length];
      const leftPct = Math.random() * 94;
      const duration = 9 + Math.random() * 8;
      const delay = Math.random() * 10;
      const drift = (Math.random() * 80 - 40) + "px";
      el.style.left = leftPct + "vw";
      el.style.setProperty("--drift", drift);
      el.style.animationDuration = duration + "s";
      el.style.animationDelay = delay + "s";
      el.style.fontSize = 1.1 + Math.random() * 1 + "rem";
      decorLayer.appendChild(el);
    }

    // gentle sparkles scattered near the greeting
    const sparkleChars = ["✨", "⭐", "・"];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = sparkleChars[i % sparkleChars.length];
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = Math.random() * 70 + "vh";
      s.style.animationDelay = Math.random() * 3 + "s";
      s.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      decorLayer.appendChild(s);
    }
  }

  /* ---------- 4b. Swipe hint (hides itself after the first scroll/tap) ---------- */
  const swipeHint = document.getElementById("swipe-hint");
  let swipeHintDismissed = false;
  function dismissSwipeHint() {
    if (swipeHintDismissed) return;
    swipeHintDismissed = true;
    swipeHint.classList.add("is-hidden");
  }
  window.addEventListener("scroll", dismissSwipeHint, { passive: true, once: true });
  document.getElementById("scene-greeting").addEventListener(
    "click",
    dismissSwipeHint,
    { once: true }
  );
  // auto-hide after a while even if she doesn't scroll, so it doesn't linger forever
  setTimeout(dismissSwipeHint, 6000);

  /* ---------- 5. Music control ---------- */
  const bgm = document.getElementById("bgm");
  const musicBtn = document.getElementById("music-btn");
  let musicStarted = false;

  function setMusicLabel(playing) {
    musicBtn.querySelector(".music-label").textContent = playing ? "Pause Music" : "Birthday Music";
    musicBtn.setAttribute("aria-pressed", playing ? "true" : "false");
  }

  function playMusic() {
    bgm.play().then(() => {
      musicStarted = true;
      setMusicLabel(true);
    }).catch(() => {
      // Autoplay blocked or file missing — stays paused, no crash.
      setMusicLabel(false);
    });
  }

  musicBtn.addEventListener("click", () => {
    if (bgm.paused) {
      playMusic();
    } else {
      bgm.pause();
      setMusicLabel(false);
    }
  });

  /* ---------- 6. Cake tap: confetti + balloon burst, then reveal timeline ---------- */
  const cakeBtn = document.getElementById("cake-btn");
  const burstLayer = document.getElementById("burst-layer");
  const timelineSection = document.getElementById("scene-timeline");
  const finalSection = document.getElementById("scene-final");
  const chime = document.getElementById("chime");
  let cakeTapped = false;

  function playChime() {
    try {
      chime.currentTime = 0;
      chime.volume = 0.55;
      chime.play().catch(() => {});
    } catch (e) {}
  }

  function launchConfetti() {
    const colors = ["#ff9bb8", "#ffd36e", "#9bd8ff", "#c9a6ff", "#ec6f96", "#f6dcb0"];
    const count = prefersReducedMotion ? 0 : 60;
    for (let i = 0; i < count; i++) {
      const bit = document.createElement("span");
      bit.className = "confetti-bit";
      bit.style.left = Math.random() * 100 + "vw";
      bit.style.background = colors[i % colors.length];
      bit.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
      bit.style.animationDelay = Math.random() * 0.4 + "s";
      bit.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      burstLayer.appendChild(bit);
      setTimeout(() => bit.remove(), 4200);
    }
  }

  function launchBalloons() {
    const balloonEmojis = ["🎈", "🎈", "🎈"];
    const count = prefersReducedMotion ? 0 : 7;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("span");
      b.className = "burst-balloon";
      b.textContent = balloonEmojis[i % balloonEmojis.length];
      b.style.left = 10 + Math.random() * 80 + "vw";
      b.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
      b.style.animationDuration = 3.6 + Math.random() * 1.6 + "s";
      b.style.animationDelay = Math.random() * 0.5 + "s";
      b.style.fontSize = 1.8 + Math.random() * 0.8 + "rem";
      burstLayer.appendChild(b);
      setTimeout(() => b.remove(), 5500);
    }
  }

  function revealTimeline() {
    timelineSection.hidden = false;
    finalSection.hidden = false;
    requestAnimationFrame(() => {
      timelineSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  }

  cakeBtn.addEventListener("click", () => {
    if (cakeTapped) {
      // already revealed — just scroll back down to the memories
      timelineSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    cakeTapped = true;
    dismissSwipeHint();

    cakeBtn.classList.add("popped");
    playChime();
    launchConfetti();
    launchBalloons();

    // start music on this first real interaction if it hasn't started yet
    if (!musicStarted && bgm.paused) {
      playMusic();
    }

    setTimeout(revealTimeline, prefersReducedMotion ? 150 : 650);
  });
});
