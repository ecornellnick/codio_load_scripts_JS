(function (window, document) {

  // Try to find jQuery in this context OR in the first iframe (Codio preview often lives there)
  function getJQuery() {
    // Current context
    if (window.jQuery && window.jQuery.fn) return window.jQuery;
    if (window.$ && window.$.fn) return window.$;

    // Try any iframe (Codio often renders Guide preview in an iframe)
    const iframes = document.querySelectorAll('iframe');
    for (const frame of iframes) {
      try {
        const w = frame.contentWindow;
        if (w && w.jQuery && w.jQuery.fn) return w.jQuery;
        if (w && w.$ && w.$.fn) return w.$;
      } catch (e) {
        // Cross-origin iframe; ignore
      }
    }
    return null;
  }

  function waitForBootstrap(cb) {
    const jq = getJQuery();
    const ok =
      jq &&
      jq.fn &&
      typeof jq.fn.tooltip === "function" &&
      typeof jq.fn.popover === "function";

    if (!ok) return setTimeout(() => waitForBootstrap(cb), 100);
    cb(jq);
  }

  waitForBootstrap((jQuery) => {

    // ---------------------------
    // Tooltips + Popovers
    // ---------------------------
    jQuery('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    jQuery('[data-toggle="popover"]').popover({ container: 'body' });

    jQuery(document).on('mouseenter focus', '[data-toggle="tooltip"]', function () {
      const $el = jQuery(this);
      if (!$el.data('bs.tooltip')) $el.tooltip({ container: 'body' });
      $el.tooltip('show');
    });

    jQuery(document).on('click', '[data-toggle="popover"]', function () {
      const $el = jQuery(this);
      if (!$el.data('bs.popover')) $el.popover({ container: 'body' });
      $el.popover('toggle');
    });

    // ---------------------------
    // Toasts (auto-show)
    // ---------------------------
    function showToasts() {
      if (typeof jQuery.fn.toast !== "function") return;

      const $toasts = jQuery('.toast.show-on-load');
      if ($toasts.length === 0) return;

      $toasts.each(function () {
        const $t = jQuery(this);

        if (!$t.data('bs.toast')) {
          $t.toast({ autohide: true, delay: 6000 });
        }

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
