/*
 * Wiktor header and widgets ------------------------------------------------------------
 */

class Header extends Fragment {
    watch(title) {
        this.title = title;

        this.left = [];
        this.right = [];

        Header.widgets.left.forEach(widget => this.left.push(widget(this)));
        Header.widgets.right.forEach(widget => this.right.push(widget(this)));
    }

    static addWidgetL(widget) {
        this.widgets.left.push(widget);
    }

    static addWidgetR(widget) {
        this.widgets.right.push(widget);
    }

    get template() {
        return html`
            <header class="row py-2">
                <widgets class="col-12 col-lg my-auto d-flex flex-flow-row">
                    ${this.left.map(e => e())}
                </widgets>
                <widgets class="col-12 col-lg my-auto d-flex ">
                    <div class="ml-auto flex-flow-row d-flex">
                        ${this.right.map(e => e())}
                    </div>
                </widgets>
            </header>
        `;
    }
}

Header.widgets = { left: [], right: [] };

Wiktor.plug("onEntryLoad", function(orig, data) {
    orig(data);
    this.header = new Header(this, this.title);
});

Wiktor.plug("renderHeader", function() {
    return html`
        ${this.header()}
    `;
});

Wiktor.plug("_render", function(orig) {
    return html`
        ${this.renderHeader()} ${this.renderMain()}
    `;
});
