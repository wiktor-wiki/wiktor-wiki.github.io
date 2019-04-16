/**
 * Widget base
 */
class Widget extends Fragment {
    /**
     * @param {string} icon
     * @param {string} text
     * @param {{values:string[], persist:boolean}} menu
     */
    init(icon, text, menu) {
        this.icon = icon;
        this.text = text;
        this.menu = Array.isArray(menu) ? { values: menu } : menu;
        if (menu && menu.persist) {
            this.persist = new Persistor(this.constructor.name);
            this.persist.remember();
            if (this.persist.value !== undefined) {
                this.action(this.parent, this.persist.value);
            }
        }
        this.onload(this.parent);
    }

    /**
     * Prep after widget has been created on an instance
     * @param {Fragment} parent
     */
    onload(parent) {}

    /**
     * Onclick or menu selection callback
     * @param {Fragment} parent
     * @param {string[]} selection
     */
    action(parent, selection) {}

    get template() {
        let self = this;
        if (this.menu) {
            return html`
                <menu class="widget my-auto ml-2 px-0">
                    <i class="material-icons mt-auto">${this.icon}</i>
                    <select
                        onchange=${function() {
                            if (self.menu.persist)
                                self.persist.value = this.value;
                            self.action(self.parent, this.value);
                        }}
                    >
                        <option disabled selected>${this.text}</option>
                        ${this.menu.values.map(
                            item =>
                                html`
                                    <option
                                        selected=${this.menu.persist &&
                                            this.persist.value == item}
                                    >
                                        ${item}
                                    </option>
                                `
                        )}
                    </select>
                    <i class="material-icons arrow">arrow_drop_down</i>
                </menu>
            `;
        } else {
            return html`
                <button
                    class="widget my-auto ml-2 px-0"
                    onclick=${() => this.action(this.parent)}
                >
                    <i class="material-icons">${this.icon}</i>${this.text}
                </button>
            `;
        }
    }
}

/**
 * Wiktor core
 */
class Wiktor extends Fragment {
    static get version() {
        return "0.6.0";
    }

    /**
     * @param {{root:string, entryRoot:string, title:string, landing:string}} config
     */
    watch(config) {
        this.entries = [];
    }

    /**
     * @param {{root:string, entryRoot:string, title:string, landing:string}} config
     */
    init(config) {
        window.history.replaceState("", "", Url.normalizedLocation());

        this.title = config.title;
        this.landing = "?" + Url.trim(config.landing);

        this._entryRoot =
            Url.trim(config.entryRoot).length > 0
                ? Url.trim(config.entryRoot) + "/"
                : "";
        this.entriesOpen = {};
        this.cache = {
            entries: new Persistor("entry-cache"),
            extensions: new Persistor("ext-cache"),
            indexes: new Persistor("index-cache"),
        };

        if (this.cache.indexes.version != Wiktor.version) {
            this.cache.entries.forget();
            this.cache.extensions.forget();
            this.cache.indexes.forget();
            this.cache.indexes.version = Wiktor.version;
        }
        this.cache.indexes.remember("version");

        Fetch("wiktor/addon/registry.json", {
            cache: this.cache.indexes,
            done: data => {
                let extensions = JSON.parse(data);
                let promises = extensions.map(
                    extension =>
                        new Promise((resolve, reject) =>
                            this.loadExtension(extension, resolve, reject)
                        )
                );

                Promise.all(promises)
                    .then(result => {
                        result.forEach(extension => {
                            if (extension.src === undefined) {
                                console.warn(
                                    "extension not loaded: " + extension.name
                                );
                                return;
                            }
                            let script = document.createElement("script");
                            script.src =
                                "data:text/javascript;base64," +
                                btoa(extension.src);
                            script.async = false;
                            script.onload = function() {
                                console.info(
                                    "loaded extension: " + extension.name
                                );
                            };
                            document.head.appendChild(script);
                        });
                    })
                    .then(() =>
                        Fetch("entries/index.json", {
                            cache: this.cache.indexes,
                            done: data => {
                                let paths = JSON.parse(data)
                                    .map(path => Url.trim(path))
                                    .filter(
                                        path =>
                                            path.startsWith(this.entryRoot) &&
                                            path != this.entryRoot
                                    )
                                    .map(path =>
                                        path.substr(this.entryRoot.length)
                                    );

                                this.onEntryLoad(paths);
                                this.loadEntries(paths);
                                this.render();
                            },
                        })
                    );
            },
        });
    }

    get entryRoot() {
        return this._entryRoot;
    }

    get template() {
        return html`
            <main class="row flex-lg-nowrap h-min-0">
                <div class="nav col-12 col-lg-2 py-2 overflow-auto">
                    ${this.navigation()}
                </div>
                <div class="col-12 col-lg px-0 px-md-3 overflow-auto">
                    ${this.entries.map(e => e())}
                </div>
            </main>
        `;
    }

    /**
     * Entry index load callback
     * @param {string[]} paths
     */
    onEntryLoad(paths) {
        this.navigation = new Navigation(this);
        this.navigation.build(paths);
    }

    /**
     * Load an extension from url
     * @param {string} extension
     * @param {function} resolve
     * @param {function} reject
     */
    loadExtension(extension, resolve, reject) {
        Fetch(
            extension.startsWith("//")
                ? extension + ".js"
                : `wiktor/addon/${extension}.js`,
            {
                cache: this.cache.extensions,
                done: (data, xhr) => {
                    if (xhr.status == 200) {
                        this.cache.entries.forget();
                    }
                    resolve({ src: data, name: extension });
                },
                fail: () => {
                    resolve({ name: extension });
                },
            }
        );
    }

    /**
     * Format path from entry root
     * @param {string} filename
     */
    realPath(filename) {
        return decodeURI(`entries/${this.entryRoot}${Url.triml(filename)}`);
    }

    /**
     * Entry path
     */
    entryPath(full) {
        full = decodeURI(full);

        let path = full.split("#")[0];
        let hash = full.split("#")[1];
        hash = hash ? "/#" + hash : "/";

        path = path.replace(/(\/|\?)*/, "");
        full = Url.trimr(path) + hash;

        return full;
    }

    entryName(path) {
        return decodeURI(path)
            .split("#")[0]
            .split(/\/|\?/)
            .filter(e => e)
            .slice(-1)[0];
    }

    /**
     * Add entry content processor (Markdown, etc)
     * @param {string} extension
     * @param {function(string)} processor
     */
    static addProcessor(extension, processor) {
        this.processors[extension] = processor;
    }

    /**
     * Postprocess generated text
     * @param {function(object)} processor
     */
    static addPostProcessor(processor) {
        this.postProcessors.push(processor);
    }

    /**
     * Process entry content based on given extension
     * @param {string} content
     * @param {string} extension
     */
    process(content, extension) {
        return Wiktor.processors[extension]
            ? Wiktor.processors[extension](content)
            : content;
    }

    /**
     * Run a postprocessor after main conversion by process()
     * @param {string} content
     */
    postProcess(content) {
        content = $("<div>" + content + "</div>");
        Wiktor.postProcessors.forEach(process => process(content));
        // console.log(content[0].innerHTML);
        return content[0].innerHTML;
    }

    /**
     * Load entries from downloaded entry index
     * @param {string[]} paths
     */
    loadEntries(paths) {
        let entryName = false;
        let landing = false;

        if (window.location.search != "") {
            landing = this.entryPath(
                window.location.search + window.location.hash
            );

            entryName = this.entryName(window.location.search);
        } else if (this.landing) {
            landing = this.entryPath(this.landing);
            entryName = this.entryName(this.landing);
        }

        paths = paths.filter(path => path.match(/\.\w+$/));

        paths.forEach(path => {
            this.loadEntry(path, landing, entryName);
        });
    }

    /**
     * Load a single entry by path
     * @param {string} path
     */
    loadEntry(path, landing = null, entryName = null) {
        path = Url.triml(path);
        let alias = path.replace(/\.\w+$/, "/");

        Fetch(this.realPath(path), {
            cache: this.cache.entries,
            alias: alias,
            done: (content, xhr) => {
                if (xhr.status == 200) {
                    this.cache.entries[alias].data = this.postProcess(
                        this.process(content, path.match(/\.\w+$/)[0].substr(1))
                    );
                    this.cache.entries[alias].url = path;
                } else {
                    this.cache.entries.remember(alias);
                }

                if (entryName && decodeURI(landing.split("#")[0]) == alias) {
                    this.openEntry(entryName, landing);
                }
            },
        });
    }

    /**
     * Open `link` entry with `name`
     * @param {string} name
     * @param {string} link
     */
    openEntry(name, link) {
        name = this.entryName(name);
        link = this.entryPath(link);

        let path = link.split("#")[0];
        let hash = link.split("#")[1];
        hash = hash ? "#" + hash : "";

        window.history.replaceState(
            "",
            "",
            window.location.pathname + "?" + path
        );

        if (!this.entriesOpen[path]) {
            this.entriesOpen[path] = true;

            if (this.cache.entries[path]) {
                document.title = name;

                this.entries.push(
                    new Entry(
                        this,
                        name,
                        this.cache.entries[path].data,
                        path,
                        this.cache.entries[path].url
                    )
                );
            } else {
                document.title = "404";
                this.entries.push(
                    new Entry(
                        this,
                        "404",
                        `<p>${path} was not found</p>`,
                        path,
                        path
                    )
                );
            }

            this.render();
            this.entries[this.entries.length - 1].renderEntry();
        }

        window.document.getElementById(path).scrollIntoView();
        if (hash.length > 0) {
            window.location.hash = hash;
        }
    }

    /**
     * Close entry using given entry proxy
     * @param {Proxy} entry
     */
    closeEntry(entry) {
        this.entries.splice(this.entries.indexOf(entry), 1);
        delete this.entriesOpen[entry.link];

        this.render();
        this.entries.forEach(entry => entry.renderEntry());
    }
}

Wiktor.processors = {};
Wiktor.postProcessors = [];

/**
 * Navigation ---------------------------------------------------------------------------
 */
class Navigation extends Fragment {
    init() {
        this.navtree = [{}];
    }

    watch() {
        this.navigation = [];
    }

    get template() {
        return html`
            <nav>${this.navigation.map(e => e())}</nav>
        `;
    }

    /**
     * Build navigation tree based on downloaded entry index
     * @param {string[]} paths
     */
    build(paths) {
        // build navtree
        paths.sort().forEach(path => {
            var segments = path.split("/");
            var level = this.navtree;

            segments.forEach(seg => {
                var existingPath = level[0][seg];

                if (existingPath) {
                    level = existingPath;
                } else if (seg.match(/\.\w+$/)) {
                    level.push(seg.replace(/\.\w+$/, ""));
                } else {
                    level[0][seg] = [{}];
                    level = level[0][seg];
                }
            });
        });

        // build navigation
        this.navtree.forEach(item => {
            if (typeof item == "object") {
                for (let name in item) {
                    this.navigation.push(
                        new NavFolder(this.parent, name, name, item[name])
                    );
                }
            } else {
                this.navigation.push(
                    new NavItem(this.parent, item, item + "/")
                );
            }
        });
    }
}

class NavFolder extends Fragment {
    /**
     * @param {string} path
     * @param {string} name
     * @param {string[]} children
     */
    init(path, name, children) {
        this.path = path;
        this.name = name;
        this.children = [];

        children.forEach(item => {
            if (typeof item == "object") {
                for (let name in item) {
                    this.children.push(
                        new NavFolder(
                            this.parent,
                            path + "/" + name,
                            name,
                            item[name]
                        )
                    );
                }
            } else {
                this.children.push(
                    new NavItem(this.parent, item, path + "/" + item + "/")
                );
            }
        });
    }

    get template() {
        return html`
            <details id=${this.path} class="nav-folder">
                <summary>${this.name}</summary>
                <ul class="pl-3">
                    ${this.children.map(e => e())}
                </ul>
            </details>
        `;
    }
}

class NavItem extends Fragment {
    /**
     * @param {string} name
     * @param {string} link
     */
    init(name, link = "") {
        this.name = name;
        this.link = link;
    }

    get template() {
        return html`
            <a href=${this.link} onclick=${e => this.openEntry(e)}>
                <li class="nav-item">
                    ${this.name}
                </li>
            </a>
        `;
    }

    /**
     * Open linked entry
     * @param {Event} e
     */
    openEntry(e) {
        e.preventDefault();
        this.parent.openEntry(this.name, this.link);
    }
}

/*
 * Entries ------------------------------------------------------------------------------
 */

class Entry extends Fragment {
    /**
     * @param {string} title
     * @param {string} content
     * @param {string} link
     */
    init(title, content, link) {
        this.link = link;
        this.title = title;
        this.content = content;

        this.widgets = [];

        Entry.widgets.forEach(widget => this.widgets.unshift(widget(this)));
    }

    get template() {
        return html`
            <article id=${this.link} class="mb-3 pb-1">
                <div class="article__title col-12 d-flex py-2">
                    <h1 class="mr-auto my-auto">${this.title}</h1>
                    <widgets class="my-auto">
                        ${this.widgets.map(e => e())}
                    </widgets>
                    <button
                        class="widget my-auto ml-2 px-0 material-icons"
                        onclick=${() => this.closeEntry()}
                    >
                        close
                    </button>
                </div>
                <div class="article__content col-12"></div>
            </article>
        `;
    }

    getContent() {
        return this.content;
    }

    renderEntry() {
        let entry = window.document
            .getElementById(this.link)
            .getElementsByClassName("article__content")[0];

        entry.innerHTML = this.getContent();

        return entry;
    }

    /**
     * Attach a widget to entry
     * @param {Widget|function(parent)} widget
     */
    static addWidget(widget) {
        this.widgets.push(widget);
    }

    /**
     * Close this entry
     */
    closeEntry() {
        this.parent.closeEntry(this._proxy);
    }
}
Entry.widgets = [];
