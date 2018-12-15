# External sources

Wiktor uses these resources:

| Resource     | Link                                     |
| ------------ | ---------------------------------------- |
| Marked.js    | https://marked.js.org                    |
| jQuery 3.3.1 | https://jquery.org                       |
| Fira Code    | https://github.com/tonsky/FiraCode       |
| Montserrat   | https://github.com/JulietaUla/Montserrat |
| Font Awesome | https://fontawesome.com                  |

# The Meat and Potatoes

### Core

At the core of Wiktor there are 4 mandatory files:

| File                | Purpose                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| index.html          | Loads up necessary scripts, fonts and theme                                                    |
| wiktor/entries.json | Plain array that stores all paths within `entries/` subfolder. Can be updated with `update.sh` |
| wiktor/wiktor.js    | Loads up `entries.json`, generates a navtree from it and handles entry rendering               |
| wiktor/theme.css    | Configurable css theme, either `light` or `dark` mode is available                             |

### Addons

These are things that are tacked on the engine and aren't required.

| File               | Purpose                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| wiktor/controls.js | Adds buttons and menus to `#controls` in the navbar. Implements theme switcher on `master` branch and concept locale menu on `gh-pages` |
| update.sh          | Generate `entries.json` from `entries/` file tree. Requires `bash`, `sed`, `awk`, `find`                                                |