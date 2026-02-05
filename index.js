(async function (codioIDE, window) {

  // Scripts are loaded in array order.
  // Order matters due to dependencies:
  // jQuery → Popper → Bootstrap → local overrides
  const scripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
    "js/popper.js"
  ];

  scripts.forEach(src => {
    codioIDE.guides.addScript(src);
  });

})(window.codioIDE, window);
