```html
<!DOCTYPE html>
<html>
    <head>
        <!--
            Wiktor wiki engine
            Daniels Kursits (evolbug) 2018
            MIT license
         -->

        <meta charset="utf8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />

        <script src="//unpkg.com/lighterhtml@0.9.2/min"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/showdown/1.9.0/showdown.min.js"></script>
        <link
            href="https://fonts.googleapis.com/css?family=Share+Tech+Mono"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="//fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Montserrat"
        />
        <link
            rel="stylesheet"
            href="//gitcdn.link/cdn/tonsky/FiraCode/1.206/distr/fira_code.css"
        />
        <link
            rel="stylesheet"
            href="//use.fontawesome.com/releases/v5.8.1/css/fontawesome.css"
        />

        <link
            rel="stylesheet"
            href="//use.fontawesome.com/releases/v5.8.1/css/brands.css"
        />
        <link
            rel="stylesheet"
            href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap-reboot.min.css"
        />
        <link
            rel="stylesheet"
            href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap-grid.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>

        <link rel="stylesheet" href="wiktor/theme.css" />
        <script src="wiktor/lib/fragment.js"></script>
        <script src="wiktor/lib/balalaika.js"></script>
        <script src="wiktor/lib/balalaika-ext.js"></script>
        <script src="wiktor/lib/persistor.js"></script>
        <script src="wiktor/lib/util.js"></script>
        <script src="wiktor/lib/fetch.js"></script>
        <script src="wiktor/wiktor.js"></script>

        <script src="wiktor/lib/langue.js"></script>
        <script src="wiktor/lib/languages/html.js"></script>

        <!-- <script src="//unpkg.com/jquery"></script> -->
        <!-- <script src="//gitcdn.link/cdn/wiktor-wiki/langue/master/langue.js"></script> -->
    </head>

    <body id="wiktor" class="container d-flex flex-column">
        <noscript style="display:flex; flex-grow:1">
            <p style="margin:auto">
                Please enable Javascript or use
                <a href="/static/index.html">static pages</a>
            </p>
        </noscript>
        <script>
            var w = new Wiktor(document.body, {
                entryRoot: "root1/",
                title: "Wiktor",
                landing: "wiktor",
            });
        </script>
    </body>
</html>
```
