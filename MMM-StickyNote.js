Module.register("MMM-StickyNote", {
    // Default configuration options
    defaults: {},
  
    // Start the module
    start: function () {
      Log.info("Starting module: " + this.name);
      this.noteVisible = false;
      this.noteContent = localStorage.getItem("stickyNoteContent") || "";
    },
  
    // Create the DOM elements for the module
    getDom: function () {
      var wrapper = document.createElement("div");
  
      // Create button or touch area to trigger the sticky note
      var touchArea = document.createElement("div");
      touchArea.className = "sticky-note-trigger";
      touchArea.innerHTML = "Open Sticky Note";
      touchArea.addEventListener("click", () => {
        this.toggleStickyNote();
      });
      wrapper.appendChild(touchArea);
  
      // Create sticky note area (initially hidden)
      if (this.noteVisible) {
        var stickyNote = document.createElement("textarea");
        stickyNote.className = "sticky-note";
        stickyNote.value = this.noteContent;
        stickyNote.addEventListener("input", (event) => {
          this.noteContent = event.target.value;
          localStorage.setItem("stickyNoteContent", this.noteContent);
        });
        wrapper.appendChild(stickyNote);
      }
  
      return wrapper;
    },
  
    // Toggle sticky note visibility
    toggleStickyNote: function () {
      this.noteVisible = !this.noteVisible;
      this.updateDom();
    },
  
    // Optional: Custom styles
    getStyles: function () {
      return ["MMM-StickyNote.css"];
    }
  });
  