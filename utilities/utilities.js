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

  waitForBootstrap(($) => {

    // Initial pass (works if content is already on the page)
    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    $('[data-toggle="popover"]').popover({ container: 'body' });

    // Codio guides can swap/re-render DOM; use delegated init to stay stable.
    $(document).on('mouseenter focus', '[data-toggle="tooltip"]', function () {
      const $el = $(this);
      if (!$el.data('bs.tooltip')) {
        $el.tooltip({ container: 'body' });
      }
      $el.tooltip('show');
    });

    $(document).on('click', '[data-toggle="popover"]', function () {
      const $el = $(this);
      if (!$el.data('bs.popover')) {
        $el.popover({ container: 'body' });
      }
      $el.popover('toggle');
    });

  });
})(window, document);
