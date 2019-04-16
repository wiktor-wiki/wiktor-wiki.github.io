class Url {
    static normalizedLocation() {
        let pathname = this.trim(window.location.pathname);
        pathname = pathname != "" ? `/${pathname}/` : "/";
        let search = this.trim(window.location.search.replace(/^(\?|\/)*/, ""));
        let hash = this.trim(window.location.hash.replace(/^(\#|\/)*/, ""));

        search = search ? "?" + search + "/" : "";
        hash = hash ? "#" + hash : "";

        return `${pathname}${search}${hash}`;
    }

    static normalize(url) {
        return "/" + this.trim(url) + "/";
    }

    static trim(url) {
        return this.triml(this.trimr(url));
    }

    static triml(url) {
        return url.replace(/^\/+/, "");
    }

    static trimr(url) {
        return url.replace(/\/+$/, "");
    }

    static stripHost(link) {
        if (link.startsWith("http") || link.startsWith("//")) {
            let no_prot = link.replace(/(https?\:)\/\//, "");
            if (no_prot.startsWith(document.location.hostname)) {
                link = no_prot.replace(document.location.hostname, "");
            }
        }
        return link;
    }
}
