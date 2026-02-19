(function (window, document) {

  /**
   * Wait until jQuery + Bootstrap tooltip/popover plugins are loaded.
   * Bootstrap attaches plugins to $.fn.
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

    // Initial pass (if content already exists)
    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    $('[data-toggle="popover"]').popover({ container: 'body' });

    // Delegated init (Codio may swap DOM dynamically)
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
    // TOAST AUTO-SHOW SUPPORT
    // ------------------------------------
    // Only show toasts explicitly marked with class="show-on-load"
    // Prevents accidental popups across other guides.

    $('.toast.show-on-load').each(function () {
      const $t = $(this);

      if (!$t.data('bs.toast')) {
        $t.toast({
          autohide: true,   // change to false if you want manual close only
          delay: 6000       // 6 seconds display
        });
      }

      $t.toast('show');
    });

  });

})(window, document);
