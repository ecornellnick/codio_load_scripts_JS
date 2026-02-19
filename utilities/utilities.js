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

  function initBootstrapHints($, root) {
    const $root = root ? $(root) : $(document);

    // Tooltips
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

    // Tabs: ensure links are wired
    // (Bootstrap stores tab instance under bs.tab in v4)
    $root.find('[data-toggle="tab"], [data-toggle="pill"]').each(function () {
      if (!$(this).data('bs.tab')) {
        $(this).tab();
      }
    });
  }

  waitForBootstrap(($) => {
    initBootstrapHints($);

    const obs = new MutationObserver(() => initBootstrapHints($));
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('hashchange', () => initBootstrapHints($));
  });

})(window, document);
