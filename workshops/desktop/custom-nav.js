(function () {
  var parentId = "tut-persona-selection";
  var childIds = [
    "tut-lob-shadow-it-guy",
    "tut-ai-agent-database-developer",
    "tut-dba-vibe-coder",
    "tut-mongo-application-developer"
  ];

  function groupPersonaLabs() {
    if (document.querySelector("#leftNav-toc .persona-lab-subnav")) {
      return true;
    }

    var parentItem = document.getElementById(parentId);
    if (!parentItem) {
      return false;
    }

    var parentContent = parentItem.firstElementChild;
    if (!parentContent || !parentContent.querySelector(".arrow")) {
      return false;
    }

    var childItems = [];
    for (var i = 0; i < childIds.length; i += 1) {
      var childItem = document.getElementById(childIds[i]);

      if (!childItem || childItem === parentItem) {
        return false;
      }

      childItems.push(childItem);
    }

    var subnav = document.createElement("ul");
    subnav.className = "persona-lab-subnav";
    subnav.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    subnav.addEventListener("keydown", function (event) {
      event.stopPropagation();
    });

    for (var j = 0; j < childItems.length; j += 1) {
      childItems[j].classList.add("persona-lab-subnav-item");
      subnav.appendChild(childItems[j]);
    }

    parentItem.classList.add("has-persona-labs");
    parentContent.appendChild(subnav);

    return true;
  }

  function initPersonaNavGrouping() {
    if (groupPersonaLabs()) {
      return;
    }

    var leftNav = document.getElementById("leftNav");
    if (!leftNav) {
      return;
    }

    var observer = new MutationObserver(function () {
      if (groupPersonaLabs()) {
        observer.disconnect();
      }
    });

    observer.observe(leftNav, { childList: true, subtree: true });

    window.setTimeout(function () {
      observer.disconnect();
    }, 10000);
  }

  document.addEventListener("DOMContentLoaded", initPersonaNavGrouping);
})();
