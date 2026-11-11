/* Abraham Raphael portfolio. Progressive enhancement only: every page works without this file. */
(function () {
  "use strict";
  var root = document.documentElement;

  function store(key, value) {
    try {
      if (value === null) { localStorage.removeItem(key); } else { localStorage.setItem(key, value); }
    } catch (e) { /* private mode or blocked storage: the theme still works for this visit */ }
  }

  /* Colour theme: system, then light, then dark. */
  var order = ["system", "light", "dark"];
  var themeBtn = document.querySelector(".theme-toggle");
  function currentTheme() { return root.getAttribute("data-theme") || "system"; }
  function applyTheme(mode) {
    if (mode === "system") { root.removeAttribute("data-theme"); } else { root.setAttribute("data-theme", mode); }
    store("theme", mode === "system" ? null : mode);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", "Colour theme: " + mode + ". Activate to change.");
      var label = themeBtn.querySelector(".mode");
      if (label) { label.textContent = mode; }
    }
  }
  if (themeBtn) {
    themeBtn.hidden = false;
    applyTheme(currentTheme());
    themeBtn.addEventListener("click", function () {
      applyTheme(order[(order.indexOf(currentTheme()) + 1) % order.length]);
    });
  }

  /* Mobile menu. */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function closeMenu() {
    if (!nav || !toggle) { return; }
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") { closeMenu(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { closeMenu(); toggle.focus(); }
    });
  }

  /* Highlight the section in view (home page only: links that start with #). */
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var hit = byId[entry.target.id];
        if (hit) { hit.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) { spy.observe(section); }
    });
  }

  /* Copy-to-clipboard buttons. */
  Array.prototype.slice.call(document.querySelectorAll("[data-copy]")).forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var original = btn.textContent;
      function report(ok) {
        btn.textContent = ok ? "Copied" : "Copy failed";
        setTimeout(function () { btn.textContent = original; }, 1600);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { report(true); }, function () { report(false); });
        return;
      }
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      report(ok);
    });
  });

  /* Gentle reveal on scroll, skipped for people who ask for reduced motion. */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); reveal.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    Array.prototype.slice.call(document.querySelectorAll(".card, .readings li")).forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) { return; } /* already on screen: no animation */
      el.classList.add("reveal");
      reveal.observe(el);
    });
  }

  /* Back-to-top button. */
  var up = document.querySelector(".to-top");
  if (up) {
    up.hidden = false;
    var onScroll = function () { up.classList.toggle("show", window.scrollY > 700); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* The current year in the footer. */
  Array.prototype.slice.call(document.querySelectorAll("[data-year]")).forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
