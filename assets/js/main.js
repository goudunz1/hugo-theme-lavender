// main.js: ES5 compatible

const root = document.documentElement;
// Same breakpoint as Tailwind's `lg:` variant: read it from CSS instead of hardcoding.
// A media query's `rem` resolves against the browser's initial font size, exactly like Tailwind's generated query,
// so this stays in sync with the stylesheet.
const sidebarBreakpoint = getComputedStyle(root).getPropertyValue("--breakpoint-lg").trim() || "64rem";
const sidebarMQ = window.matchMedia("(min-width: " + sidebarBreakpoint + ")");
const scrollThreshold = 400;

(function () {
  "use strict";

  // Throttling via requestAnimationFrame.
  // This guarantees at most one update per animation frame (~16ms at 60fps).
  function rAF(func) {
    var rafTicking = false;
    return function () {
      if (rafTicking) {
        return;
      }
      rafTicking = true;
      requestAnimationFrame(function () {
        func();
        rafTicking = false;
      });
    };
  }

  // Theme toggle
  (function () {
    var toggle = document.getElementById("theme-toggle");

    if (toggle) {
      function toggleTheme() {
        var isDark = root.classList.toggle("dark");
        // To keep chosen palette consistent across multiple pages
        try {
          localStorage.setItem("palette", isDark ? "dark" : "light");
        } catch (e) {}
      }

      toggle.addEventListener("click", function () {
        toggleTheme();
      });
    }
  })();

  // Sidebar
  (function () {
    var viewport = document.getElementById("sidebar-viewport");
    var sidebar = document.getElementById("sidebar");
    var burger = document.getElementById("sidebar-burger");

    if (viewport && sidebar && burger) {
      function toggleSidebar(force) {
        viewport.toggleAttribute("data-toggled", force);
        sidebar.toggleAttribute("data-toggled", force);
        burger.toggleAttribute("data-toggled", force);
      }
      function onViewportClick(e) {
        if (!sidebar.contains(e.target)) {
          // Clicking on the scrim always hides the sidebar.
          toggleSidebar(false);
        }
      }
      function onBurgerClick() {
        toggleSidebar();
      }

      // The sidebar interactions only make sense below the `lg:` breakpoint.
      // `status` makes this idempotent: it only touches the DOM when the side actually changes, so repeated calls
      // never re-toggle anything.
      var status = null;
      function syncSidebar() {
        var wide = sidebarMQ.matches;
        if (wide === status) {
          return;
        }
        status = wide;
        if (wide) {
          if (viewport.hasAttribute("data-toggled")) {
            toggleSidebar(false);
          }
          viewport.removeEventListener("click", onViewportClick);
          burger.removeEventListener("click", onBurgerClick);
        } else {
          viewport.addEventListener("click", onViewportClick);
          burger.addEventListener("click", onBurgerClick);
        }
      }
      syncSidebar();
      sidebarMQ.addEventListener("change", rAF(syncSidebar));
    }
  })();

  // back-to-top button + table-of-content scroll-spy
  (function () {
    var toTop = document.getElementById("back-to-top");
    // ES5 compatible, to enable array functions like .forEach() for the NodeList
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll("#TableOfContents a"));
    var headingEls = [];
    var activeLink = null;

    // Maps each TOC link to the DOM heading it anchors to.
    function buildHeadingList() {
      headingEls = [];
      tocLinks.forEach(function (link) {
        // <a href="#my-heading"> -> my-heading
        var anchor = decodeURIComponent((link.getAttribute("href") || "").replace(/^#/, ""));
        var el = anchor ? document.getElementById(anchor) : null;
        if (el) {
          headingEls.push({ link: link, el: el });
        }
      });
    }

    // Find the last heading whose top edge is above the scroll position.
    function updateScrollSpy() {
      if (!headingEls.length) {
        return;
      }
      // scrollPos = vert threshold that triggers active status
      var scrollPos = window.scrollY + 1;
      var current = headingEls[0].link;
      for (var i = 0; i < headingEls.length; i++) {
        if (headingEls[i].el && headingEls[i].el.offsetTop <= scrollPos) {
          current = headingEls[i].link;
        } else {
          break;
        }
      }
      if (activeLink === null || activeLink !== current) {
        if (activeLink) {
          activeLink.toggleAttribute("data-toggled", false);
        }
        activeLink = current;
        activeLink.toggleAttribute("data-toggled", true);
      }
    }

    function syncScroll() {
      if (toTop) {
        // Show once scrolled more than one viewport height; hide again above it.
        toTop.toggleAttribute("data-toggled", window.scrollY > scrollThreshold); 
      }
      updateScrollSpy();
    }

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    if (tocLinks.length > 0) {
      buildHeadingList();
      // Also rebuild after ALL resources (images, fonts, etc.) are loaded, in case layout shifted.
      window.addEventListener("load", buildHeadingList);
    }
    if (toTop || tocLinks.length > 0) {
      var throttled = rAF(syncScroll);
      // passive: true: allows the browser to scroll immediately without waiting for our handler to finish.
      window.addEventListener("scroll", throttled, { passive: true });
      window.addEventListener("resize", throttled);
      syncScroll(); // Set the initial highlight
    }
  })();

  // Accordion (collapsible sections)
  (function () {
    var accordion = document.getElementById("accordion");
    if (accordion) {
      var items = accordion.children;
      if (items.length > 0) {
        Array.prototype.forEach.call(items, function (item) {
          var head = item.firstElementChild;
          if (head) {
            head.addEventListener("click", function () {
              item.toggleAttribute("data-toggled");
            });
          }
        });
      }
    }
  })();

  // Pagination jump-to-page
  (function () {
    var gotoForm = document.getElementById("pagination-goto");
    if (gotoForm) {
      var gotoInput = gotoForm.querySelector("input");
      var pageUrls = {};
      var pageData = gotoForm.getAttribute("data-pages") || "{}";
      var currPage = gotoForm.getAttribute("data-curr-page") || "1";
      currPage = parseInt(currPage, 10) || 1;
      try {
        pageUrls = JSON.parse(pageData) || {};
      } catch (e) {}
      // Only digits are allowed; anything else is stripped as you type.
      gotoInput.addEventListener("input", function () {
        var clean = gotoInput.value.replace(/[^0-9]/g, "");
        if (clean !== gotoInput.value) {
          gotoInput.value = clean;
        }
      });
      gotoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var page = parseInt(gotoInput.value, 10);
        if (page == currPage) {
          return;
        }
        var url = pageUrls[page];
        if (!url) {
          gotoInput.value = "";
          gotoInput.focus();
          return;
        }
        window.location.href = url;
      });
    }
  })();
})();
