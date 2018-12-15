function rawControl(icon, name) {
   return $("<i id='" + name + "' class='control " + icon + "'>");
}

function addButton(icon, callback) {
   $(() =>
      rawControl(icon, callback.name)
         .on("click", callback)
         .prependTo("#controls")
   );
}

function addMenu(icon, callback, options, selected) {
   $(() => {
      var menu = rawControl(icon, callback.name);
      menu.addClass("menu");

      var relative = $("<div style='position:relative'>");
      var items = $("<div class='options' style='display:none'>");

      options.forEach(option => {
         $(
            "<div class='option'><input type='radio' " +
               (selected == option ? "checked='checked'" : "") +
               " id='" +
               option +
               "' name='" +
               callback.name +
               "'><label for='" +
               option +
               "'>" +
               option +
               "</label></input></div>"
         )
            .on("click", e => {
               if (e.target.id == option) {
                  callback(option);
                  $(e.target.parent).addClass("hidden");
               }
            })
            .appendTo(items);
      });

      items.appendTo(relative);
      relative.appendTo(menu);

      menu.on("click", e => {
         if (e.target.id == "" || e.target.id == callback.name) {
            var items = $(".options", menu);
            items.toggle();
         }
      });

      menu.prependTo("#controls");
   });
}

/* Controls (in reverse order of appearance) ----------------------------------------- */
var languages = ["en"];

localStorage.setItem(
   "entry_root",
   localStorage.getItem("entry_root") || languages[0]
);
function localize(lang) {
   localStorage.setItem("entry_root", lang);
   location.reload();
}

addMenu(
   "fa fa-language",
   localize,
   languages,
   localStorage.getItem("entry_root")
);

$(() => $("body").attr("class", localStorage.getItem("theme") || "dark"));
function theme() {
   localStorage.setItem(
      "theme",
      localStorage.getItem("theme") == "dark" ? "light" : "dark"
   );
   $("body").attr("class", localStorage.getItem("theme"));
}

addButton("fa fa-palette", theme);