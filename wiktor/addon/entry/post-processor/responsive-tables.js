Wiktor.addPostProcessor(function(html) {
    $("table", html).forEach(table => {
        var titles = $("th", table).map(e => e.textContent);
        $("tr", table).forEach(tr => {
            $("td", tr).forEach((td, i) => {
                $(td).prepend($("<div class='rd-th'>" + titles[i] + "</div>"));
            });
        });
    });
});
