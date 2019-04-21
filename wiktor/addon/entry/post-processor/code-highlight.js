Wiktor.addPostProcessor(function(html) {
    $("code", html).forEach(e => langue.auto(e));
});
