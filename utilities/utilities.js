(function (window, document) {

  // Return a list of contexts (window + accessible iframe windows)
  function getContexts() {
    const ctxs = [{ win: window, doc: document }];

    const iframes = document.querySelectorAll('iframe');
    for (const frame of iframes) {
      try {
        const w = frame.contentWindow;
        const d = frame.contentDocument || (w && w.document);
        if (w && d) ctxs.push({ win: w, doc: d });
      } catch (e) {
        // cross-origin iframe; ignore
      }
    }
    return ctxs;
  }

  function bootstrapReady(jq) {
    return !!(
      jq &&
      jq.fn &&
      typeof jq.fn.tooltip === "function" &&
      typeof jq.fn.popover === "function" &&
      typeof jq.fn.toast === "function"
    );
  }

  function initInContext(ctx) {
    const jq = ctx.win.jQuery || ctx.win.$;
    if (!bootstrapReady(jq)) return false;

    const $ = jq;
    const doc = ctx.doc;

    // Tooltips & Popovers
    $('[data-toggle="tooltip"]', doc).tooltip({ container: 'body' });
    $('[data-toggle="popover"]', doc).popover({ container: 'body' });

    // Delegated tooltip/popover init inside THIS document
    $(doc).off('mouseenter.bootstrapHints focus.bootstrapHints')
          .on('mouseenter.bootstrapHints focus.bootstrapHints', '[data-toggle="tooltip"]', function () {
            const $el = $(this);
            if (!$el.data('bs.tooltip')) $el.tooltip({ container: 'body' });
            $el.tooltip('show');
          });

    $(doc).off('click.bootstrapHints')
          .on('click.bootstrapHints', '[data-toggle="popover"]', function () {
            const $el = $(this);
            if (!$el.data('bs.popover')) $el.popover({ container: 'body' });
            $el.popover('toggle');
          });

    // Toasts (auto-show callouts) inside THIS document
    $('.toast.show-on-load', doc).each(function () {
      const $t = $(this);

      if (!$t.data('bs.toast')) {
        $t.toast({ autohide: true, delay: 6000 });
      }

      $t.toast('show');

      // Force visibility in case transitions get weird in embedded contexts
      $t.addClass('show');
      $t.css({ display: 'block', opacity: 1, visibility: 'visible' });
    });

    return true;
  }

  function runAll() {
    const ctxs = getContexts();
    let any = false;

    for (const ctx of ctxs) {
      try {
        const did = initInContext(ctx);
        if (did) any = true;
      } catch (e) {
        // ignore context errors
      }
    }

    return any;
  }

  // Retry for a bit because Codio can render late / swap preview frames
  let attempts = 0;
  const maxAttempts = 40;   // ~10s
  const intervalMs = 250;

  const timer = setInterval(() => {
    attempts++;
    const any = runAll();
    if (any || attempts >= maxAttempts) clearInterval(timer);
  }, intervalMs);

  // Try immediately as well
  runAll();

})(window, document);
