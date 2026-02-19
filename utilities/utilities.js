(function (window, document) {
  function waitForBootstrap(cb) {
    const ok =
      window.jQuery &&
      window.jQuery.fn &&
      typeof window.jQuery.fn.tooltip === "function" &&
      typeof window.jQuery.fn.popover === "function";

    if (!ok) return setTimeout(() => waitForBootstrap(cb), 50);
    cb(window.jQuery);
  }

  function initBootstrapHints($, root) {
    const $root = root ? $(root) : $(document);

    // Only init elements that aren't already initialized
    $root.find('[data-toggle="tooltip"]').each(function () {
      if (!$(this).data('bs.tooltip')) {
        $(this).tooltip({ container: 'body' });
      }
    });

    $root.find('[data-toggle="popover"]').each(function () {
      if (!$(this).data('bs.popover')) {
        $(this).popover({ container: 'body' });
      }
    });
  }

  waitForBootstrap(($) => {
    // Initial init
    initBootstrapHints($);

    // Re-init when guide content changes (Codio often swaps DOM without reload)
    // 1) Generic approach: observe DOM changes
    const obs = new MutationObserver(() => initBootstrapHints($));
    obs.observe(document.body, { childList: true, subtree: true });

    // 2) Also try on hash changes (some guides navigate via hash)
    window.addEventListener('hashchange', () => initBootstrapHints($));
  });

})(window, document);
