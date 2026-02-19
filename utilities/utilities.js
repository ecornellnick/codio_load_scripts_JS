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

    // ------------------------------------
    // TOOLTIP + POPOVER INITIALIZATION
    // ------------------------------------

    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    $('[data-toggle="popover"]').popover({ container: 'body' });

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

    // ------------------------------------
    // TOAST AUTO-SHOW SUPPORT (CODIO SAFE)
    // ------------------------------------

    function showToasts() {
      if (typeof $.fn.toast !== "function") return;

      const $toasts = $('.toast.show-on-load');
      if ($toasts.length === 0) return;

      $toasts.each(function () {
        const $t = $(this);

        if (!$t.data('bs.toast')) {
          $t.toast({ autohide: true, delay: 6000 });
        }

        // Ask Bootstrap to show, then force visibility (Codio sometimes blocks transitions)
        $t.toast('show');
        $t.addClass('show');
        $t.css({ display: 'block', opacity: 1, visibility: 'visible' });
      });
    }

    showToasts();
    setTimeout(showToasts, 200);
    setTimeout(showToasts, 800);
    setTimeout(showToasts, 2000);

  });

})(window, document);
