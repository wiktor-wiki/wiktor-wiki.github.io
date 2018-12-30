# External sources

Wiktor uses these resources:

| Resource     | Link                                     |
| ------------ | ---------------------------------------- |
| Showdown.js  | http://showdownjs.com/                   |
| Balalaika    | https://github.com/finom/balalaika       |
| Mark.js      | https://markjs.io/                       |
| Fira Code    | https://github.com/tonsky/FiraCode       |
| Montserrat   | https://github.com/JulietaUla/Montserrat |
| Font Awesome | https://fontawesome.com                  |

# The Meat and Potatoes

### Core

At the core of Wiktor there are a few required files, these are necessary for basic functionality.

| File                     | Purpose                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| index.html, 404.html     | Loads up Wiktor and frontend styles                                                                     |
| wiktor/wiktor.js         | The blank core of Wiktor, loads up extensions from list `extensions/register.json`                      |
| wiktor/theme.less        | Configurable less theme (will probably expand to plain css), either `light` or `dark` mode is available |
| wiktor/entries.json      | Plain array that stores full paths from within `entries/` subfolder. Can be updated with `update.sh`    |
| extensions/register.json | Extension registry                                                                                      |
| extensions/balalaika.js  | Balalaika (minimal DOM manipulator) extensions                                                          |
| extensions/core.js       | The core implementation of Wiktor. Since Wiktor is built to be mostly modular, it's its own extension   |


### Addons

These are things that are tacked on the engine and aren't required.

| File                     | Purpose                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| update.sh                | Generate `entries.json` from `entries/` file tree. Requires `bash`, `sed`, `awk`, `find` |
| extensions/processors.js | Filetype processors, html and markdown by default                                        |
| extensions/widgets.js    | Handy widget building blocks, more to come once I figure out how to do them properly     |
