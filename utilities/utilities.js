(function (window, document) {

  /**
   * Wait until jQuery and Bootstrap plugins are fully registered.
   * Bootstrap attaches plugins to $.fn (tooltip, popover, tab).
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

  /**
   * Initialize Bootstrap interactive components safely.
   * Only initializes elements that haven't already been initialized.
   */
  function initAll($, root) {
    const $root = root ? $(root) : $(document);

    // ---- Tooltips ----
    $root.find('[data-toggle="tooltip"]').each(function () {
      if (!$(this).data('bs.tooltip')) {
        $(this).tooltip({ container: 'body' });
      }
    });

    // ---- Popovers ----
    $root.find('[data-toggle="popover"]').each(function () {
      if (!$(this).data('bs.popover')) {
        $(this).popover({ container: 'body' });
      }
    });
  }

  
  // Manual tab handler.

  function enableManualTabs() {
    document.addEventListener('click', function (e) {

      const link = e.target.closest('a[data-toggle="tab"], a[data-toggle="pill"]');
      if (!link) return;

      const targetSelector = link.getAttribute('href');
      if (!targetSelector || !targetSelector.startsWith('#')) return;

      // Stop Codio or other handlers from hijacking the click
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();

      // Activate clicked tab
      const nav = link.closest('.nav');
      if (nav) {
        nav.querySelectorAll('.nav-link').forEach(tab => {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        });
      }

      link.classList.add('active');
      link.setAttribute('aria-selected', 'true');

      // Find tab content container
      let tabContent = null;

      if (nav && nav.parentElement) {
        tabContent = nav.parentElement.querySelector('.tab-content');
      }

      if (!tabContent) {
        tabContent = document.querySelector('.tab-content');
      }

      if (!tabContent) return;

      // Hide all panes
      tabContent.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('show', 'active');
      });

      // Show selected pane
      const targetPane = document.querySelector(targetSelector);
      if (targetPane) {
        targetPane.classList.add('active', 'show');
      }

    }, true); // <-- capture phase is critical
  }

  // ---- Bootstrap Ready ----
  waitForBootstrap(($) => {

    // Initial component initialization
    initAll($);

    // Enable manual tab behavior
    enableManualTabs();

    /**
     * Observe DOM mutations.
     *
     * Codio Guides sometimes swap content without reloading the page.
     * We re-run initialization when new content appears.
     *
     * We ignore tooltip/popover injected nodes to avoid infinite loops.
     */
    let timer = null;

    const observer = new MutationObserver((mutations) => {

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const el = node;
            if (
              el.classList &&
              (el.classList.contains('tooltip') ||
               el.classList.contains('popover'))
            ) {
              return; // Ignore Bootstrap overlay injections
            }
          }
        }
      }

      clearTimeout(timer);
      timer = setTimeout(() => initAll($), 150);

    });

    observer.observe(document.body, { childList: true, subtree: true });

  });

})(window, document);
