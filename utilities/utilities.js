(function (window, document) {
  function waitForBootstrap(cb) {
    const ok =
      window.jQuery &&
      window.jQuery.fn &&
      typeof window.jQuery.fn.tooltip === "function" &&
      typeof window.jQuery.fn.popover === "function" &&
      typeof window.jQuery.fn.tab === "function";

    if (!ok) return setTimeout(() => waitForBootstrap(cb), 50);
    cb(window.jQuery);
  }

  function initAll($, root) {
    const $root = root ? $(root) : $(document);

    // Tooltips (only if not already initialized)
    $root.find('[data-toggle="tooltip"]').each(function () {
      if (!$(this).data('bs.tooltip')) {
        $(this).tooltip({ container: 'body' });
      }
    });

    // Popovers
    $root.find('[data-toggle="popover"]').each(function () {
      if (!$(this).data('bs.popover')) {
        $(this).popover({ container: 'body' });
      }
    });

    // Tabs/Pills (do NOT call .tab() repeatedly)
    // Bootstrap wires click handlers via delegated events; we only need to
    // prevent Codio hash interference (handled below) and optionally call tab() once.
    $root.find('[data-toggle="tab"], [data-toggle="pill"]').each(function () {
      if (!$(this).data('bs.tab')) {
        $(this).tab();
      }
    });
  }

  waitForBootstrap(($) => {
    // 1) One-time init
    initAll($);

    // 2) Prevent Codio/hash navigation from hijacking tab clicks.
    // Use this ONLY for tab/pill links that point to a hash.
    $(document).on('click', 'a[data-toggle="tab"][href^="#"], a[data-toggle="pill"][href^="#"]', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).tab('show');
    });

    // 3) Safe, debounced re-init for when Codio swaps guide content.
    // Ignore mutations caused by Bootstrap itself (tooltips/popovers inject DOM).
    let timer = null;

    const obs = new MutationObserver((mutations) => {
      // If mutation is from bootstrap tooltip/popover DOM, ignore it
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1) {
            const el = /** @type {HTMLElement} */ (n);
            if (el.classList &&
               (el.classList.contains('tooltip') ||
                el.classList.contains('popover'))) {
              return; // ignore bootstrap overlay injection
            }
          }
        }
      }

      clearTimeout(timer);
      timer = setTimeout(() => initAll($), 150);
    });

    obs.observe(document.body, { childList: true, subtree: true });
  });

})(window, document);
