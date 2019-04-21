class EntryReload extends Widget {
    action(entry) {
        entry.parent.closeEntry(entry._proxy);
        entry.parent.loadEntry(
            entry.parent.cache.entries[entry.link].url,
            entry.link,
            entry.title
        );
    }
}

Entry.addWidget(entry => new EntryReload(entry, "refresh", ""));
