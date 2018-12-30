Wiktor.addStep({
   before: "loadEntrylist",
   changeRoot: function() {
      this.setRoot(this.storage.restore("root") || "root1");
   },
});

Wiktor.addWidget(function() {
   var switcher = Wiktor.Menu(
      ["root1", "root2"],
      $.trim(this.storage.root, "/"),
      option => {
         this.setRoot(option);
         window.location.reload();
      }
   ).hide();

   var button = $("<a class='clickable fas fa-folder'>").on("click", () =>
      switcher.toggle()
   );

   this.popups.append(switcher);
   this.widgets.left.append(button);
});
