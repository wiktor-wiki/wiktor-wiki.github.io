Wiktor.addWidget(function() {
   var self = this;
   var entries = self.storage.cache.entries;
   var results = $("<ul class='list'>");
   var markers = [];

   var search = Wiktor.Input("text", "search here", {
      input: function() {
         while (results[0].firstChild) {
            results[0].removeChild(results[0].firstChild);
         }

         markers.forEach(marker => marker.unmark());
         markers = [];

         if (this.value.length > 1) {
            var resultList = [];

            Object.keys(entries).forEach(entry => {
               var result = entries[entry].data.match(
                  new RegExp("(" + this.value + ")", "gim")
               );
               if (result) resultList.push([entry, result.length]);
            });

            resultList
               .sort((a, b) => b[1] - a[1])
               .forEach(result => {
                  results.append(
                     $(
                        "<li class='clickable'>" +
                           result[1] +
                           ": " +
                           $.trim(result[0], "/") +
                           "</li>"
                     ).on("click", () => {
                        self.openEntry(result[0]);
                        var marker = new Mark($("[id='" + result[0] + "']")[0]);
                        markers.push(marker);
                        marker.mark(this.value);
                     })
                  );
               });

            $("article").forEach(entry => {
               var marker = new Mark(entry);
               markers.push(marker);
               marker.mark(this.value);
            });
         }
      },
   });

   var button = $("<a class='clickable fas fa-search'>").on("click", () => {
      search.toggle();
      results.toggle();
      markers.forEach(marker => marker.unmark());
      markers = [];
   });

   this.popups.append($("<widget class=scrollable>").append(results.hide()));
   this.popups.append(search.hide());
   this.widgets.center.append(button);
});
