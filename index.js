(async function (codioIDE, window) {

  // Scripts are loaded in array order.
  // Order matters due to dependencies:
  // jQuery → Popper → Bootstrap → local overrides
  const scripts = [
    "https://code.jquery.com/jquery-3.7.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/js/bootstrap.min.js",
    "https://cdn.jsdelivr.net/gh/ecornellnick/codio_load_scripts_JS@main/utilities/utilities.js"
  ];

  scripts.forEach(src => {
    codioIDE.guides.addScript(src);
  });

})(window.codioIDE, window);
