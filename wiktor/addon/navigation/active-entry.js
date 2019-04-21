Wiktor.plug("openEntry", function(orig, name, link) {
    this.navigation.hilight(
        Url.triml(Url.normalize(link.replace(/^\?/, "").split("#")[0]))
    );
    orig(name, link);
});

Wiktor.plug("closeEntry", function(orig, entry) {
    this.navigation.delight(entry.link);
    orig(entry);
});

Navigation.plug("hilight", function(link) {
    for (let item in this.navigation) {
        if (this.navigation[item].hilight(link)) {
            return true;
        }
    }
});

Navigation.plug("delight", function(link) {
    for (let item in this.navigation) {
        if (this.navigation[item].delight(link)) {
            return true;
        }
    }
});

NavFolder.plug("hilight", function(link) {
    for (let item in this.children) {
        if (this.children[item].hilight(link)) {
            $(`[id="${this.path}"]`)[0].open = true;
            return true;
        }
    }
});

NavFolder.plug("delight", function(link) {
    for (let item in this.children) {
        if (this.children[item].delight(link)) {
            return true;
        }
    }
});

NavItem.plug("hilight", function(link) {
    if (this.link == link) {
        this.lit = "lit";
        return true;
    }
});

NavItem.plug("delight", function(link) {
    if (this.link == link) {
        this.lit = "";
        return true;
    }
});

NavItem.plug("watch", function(orig, ...args) {
    orig(...args);
    this.lit = "";
});

NavItem.plug("_render", function(orig) {
    return html`
        <a
            href=${this.link}
            onclick=${e => this.openEntry(e)}
            class=${this.lit}
            title=${this.name}
        >
            <li class="nav-item">
                ${this.name}
            </li>
        </a>
    `;
});
