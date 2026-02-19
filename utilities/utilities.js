(function (window, document) {

  /**
   * Wait until jQuery + Bootstrap tooltip/popover plugins are loaded.
   */
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
    // TOAST AUTO-SHOW SUPPORT (TIMING SAFE)
    // ------------------------------------

    function showToasts() {
      if (typeof $.fn.toast !== "function") return;

      $('.toast.show-on-load').each(function () {
        const $t = $(this);

        if (!$t.data('bs.toast')) {
          $t.toast({
            autohide: true,
            delay: 6000
          });
        }

        $t.toast('show');
      });
    }

    // Run immediately
    showToasts();

    // Retry briefly in case Codio renders content late
    setTimeout(showToasts, 200);
    setTimeout(showToasts, 800);
    setTimeout(showToasts, 2000);

  });

})(window, document);
