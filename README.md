# Codio AI Extension – Centralized JavaScript Loader

## Overview

This AI Extension centrally loads a predefined set of JavaScript files into Codio units at runtime.

Instead of adding JavaScript files individually in each Codio unit’s settings, the extension injects them automatically when the unit loads.

Any Codio unit with this AI Extension enabled will receive the shared JavaScript set.

---

## Why We’re Using This

Previously, JavaScript dependencies (e.g., jQuery, Popper, Bootstrap, custom scripts) had to be configured separately in every Codio unit.

This caused:
- Duplicate configuration
- Version inconsistencies
- Manual updates across many units
- Increased maintenance overhead

With this extension:
- Scripts are defined in one location
- Updates happen once
- All enabled units inherit changes automatically

---

## How It Works

The extension defines scripts in an ordered array and loads them sequentially to respect dependencies.

Example:

```javascript
(async function (codioIDE, window) {

  // Load scripts in dependency order
  const scripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
    "js/popper.js"
  ];

  for (const src of scripts) {
    await codioIDE.guides.addScript(src);
  }

})(window.codioIDE, window);
```

## Result

- Centralized JavaScript management
- No per-unit configuration required
- Organization-wide scalability
- Faster updates and easier maintenance

If the AI Extension is enabled, the scripts load automatically.
