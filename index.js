(async function (codioIDE, window) {

  // Scripts are loaded in array order.
  // Order matters due to dependencies:
  // jQuery → Popper → Bootstrap → utilities
  const scripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
    "https://cdn.jsdelivr.net/gh/ecornellnick/codio_load_scripts_JS@main/utilities/utilities.js?v=toastfix1"
  ];

  scripts.forEach(src => {
    codioIDE.guides.addScript(src);
  });

})(window.codioIDE, window);
