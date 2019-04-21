Entry.plug("renderEntry", function(orig, ...args) {
    let entry = orig(...args);

    let links = Array.from(entry.getElementsByTagName("a"));

    let articleLinks = links.filter(
        link =>
            link.attributes.href.value.startsWith("/") &&
            !link.attributes.href.value.startsWith("//")
    );

    let externalLinks = links.filter(
        link =>
            link.attributes.href.value.startsWith("//") ||
            link.attributes.href.value.startsWith("http")
    );

    externalLinks.forEach(link => link.classList.add("external-link"));

    articleLinks.forEach(link => {
        let href = link.attributes.href;

        link.classList.add("article-link");

        href.value = "?" + Url.triml(href.value);

        link.onclick = e => {
            e.preventDefault();
            this.parent.openEntry(href.value, href.value);
        };
    });

    return entry;
});
