class Themer {
    static get theme() {
        return this.currentTheme;
    }

    static set theme(theme = "light") {
        if (!this.theme) {
            $("#wiktor").addClass(theme);
        } else {
            $("#wiktor").swapClass(this.theme, theme);
        }
        this.currentTheme = theme;
    }
}

Themer.themes = ["light"];
Themer.currentTheme = null;

class WidgetThemeSwitch extends Widget {
    onload(parent, theme) {
        Themer.theme = theme;
    }

    action(parent, theme) {
        Themer.theme = theme;
    }
}

if (Header != undefined) {
    Header.addWidgetR(
        parent =>
            new WidgetThemeSwitch(parent, "", "Theme", {
                values: Themer.themes,
                persist: true,
            })
    );
}
