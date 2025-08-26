
// Smooth anchor scroll with fixed-header offset + Safari fallback
(function () {
  // avoid double-binding
  if (window.__smoothAnchorBound) return;
  window.__smoothAnchorBound = true;

  document.addEventListener("click", function (e) {
    // delegate to nearest anchor with href starting "#"
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return; // ignore empty hash

    // find target by id or selector
    const id = decodeURIComponent(href.slice(1));
    const target = document.getElementById(id) || document.querySelector(href);
    if (!target) return; // no target -> let default happen

    e.preventDefault(); // stop instant jump

    // detect a fixed header (adjust selectors to your theme if needed)
    const header =
      document.querySelector("[data-fixed-header]") ||
      document.querySelector(".shopify-section-header-sticky") ||
      document.querySelector("header.sticky") ||
      document.querySelector(".site-header--sticky") ||
      null;

    const offset = header ? header.offsetHeight : 0;

    const top =
      window.pageYOffset + target.getBoundingClientRect().top - offset;

    // native smooth if supported; otherwise rAF polyfill
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      // easeInOutQuad polyfill (~500ms)
      const start = window.pageYOffset;
      const diff = top - start;
      const duration = 500;
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const t = Math.min((ts - startTime) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scrollTo(0, start + diff * ease);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // update URL hash without default snap
    if (history.pushState) history.pushState(null, "", href);
    else location.hash = href;
  }, { passive: false });
})();
