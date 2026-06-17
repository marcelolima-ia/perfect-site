/* Perfect Cirurgia Plástica — interações */
/* Marca que o JS está ativo (habilita as animações de revelação) */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {

  /* Segurança: se algo falhar, garante que tudo fique visível após 2s */
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { el.classList.add("in"); });
  }, 2000);

  /* Header scroll state */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  if (header) { onScroll(); window.addEventListener("scroll", onScroll); }

  /* Mobile menu */
  const burger = document.querySelector(".burger");
  const panel = document.querySelector(".mobile-panel");
  const closeBtn = document.querySelector(".mobile-close");
  if (burger && panel) {
    burger.addEventListener("click", () => panel.classList.add("open"));
    if (closeBtn) closeBtn.addEventListener("click", () => panel.classList.remove("open"));
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => panel.classList.remove("open")));
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add("in"));
  }

  /* Counter animation */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          cur += step;
          if (cur >= target) { el.textContent = target + suffix; }
          else { el.textContent = cur + suffix; requestAnimationFrame(tick); }
        };
        tick();
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  }

  /* Procedure filters */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const procCards = document.querySelectorAll(".proc-card");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      procCards.forEach(card => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      const ans = q.nextElementSibling;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  /* Contact form (front-end demo + WhatsApp handoff) */
  const form = document.querySelector("#agendamento");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = data.get("nome") || "";
      const proc = data.get("procedimento") || "";
      const msg = data.get("mensagem") || "";
      const texto = `Olá! Meu nome é ${nome}. Gostaria de agendar uma avaliação${proc ? " para " + proc : ""}.${msg ? " " + msg : ""}`;
      const success = form.querySelector(".form-success");
      if (success) success.classList.add("show");
      form.reset();
      setTimeout(() => {
        window.open("https://wa.me/5511955208223?text=" + encodeURIComponent(texto), "_blank");
      }, 600);
    });
  }

  /* Footer year */
  const yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
});
