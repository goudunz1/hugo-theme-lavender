const sidebarBreakpoint = 900;
const backToTopThreshold = 400;

(function () {
  "use strict";

  // Theme toggle
  (function () {
    var root = document.documentElement;
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var isDark = root.classList.contains("dark");
        root.classList.toggle("dark", !isDark);
        // To keep chosen palette consistent across multiple pages
        try {
          localStorage.setItem("palette", !isDark ? "dark" : "light");
        } catch (e) {}
      });
    }
  })();

  // Sidebar
  (function () {
    var burger = document.getElementById("sidebar-burger");
    var burgerIcon = document.getElementById("sidebar-burger-icon");
    var sidebar = document.getElementById("sidebar");
    var scrim = document.getElementById("sidebar-scrim");
    var body = document.body;
    function toggleSidebar(open_or_close) {
      if (!sidebar) {
        return;
      }
      sidebar.classList.toggle("sidebar--open", open_or_close);
      body.classList.toggle("sidebar-open", open_or_close);
      if (burgerIcon) {
        if (open_or_close) {
          burgerIcon.setAttribute("class", "ti ti-x");
        } else {
          burgerIcon.setAttribute("class", "ti ti-list");
        }
      }
    }
    if (sidebar) {
      if (burger) {
        // Clicking on hamburger button toggles the sidebar.
        burger.addEventListener("click", function () {
          var isOpened = sidebar.classList.contains("sidebar--open");
          toggleSidebar(!isOpened);
        });
      }
      // Clicking on the scrim (backdrop) always hides the sidebar.
      if (scrim) {
        scrim.addEventListener("click", function () {
          toggleSidebar(false);
        });
      }
      // Clicking on a sidebar link hides the sidebar.
      sidebar.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          toggleSidebar(false);
        }
      });
      // Auto-close the sidebar when width > breakpoint.
      window.addEventListener("resize", function () {
        if (window.innerWidth > sidebarBreakpoint) {
          toggleSidebar(false);
        }
      });
    }
  })();

  // back-to-top button + table-of-content scroll-spy
  (function () {
    var toTop = document.getElementById("back-to-top");
    // ES5 compatible, to enable array functions like .forEach() for the NodeList
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll("nav#TableOfContents a"));
    var headingEls = [];
    var activeLink = null;
    var rafTicking = false;

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
          activeLink.classList.remove("toc-link--active");
        }
        activeLink = current;
        activeLink.classList.add("toc-link--active");
      }
    }

    // Throttling via requestAnimationFrame.
    // This guarantees at most one update per animation frame (~16ms at 60fps).
    function onScroll() {
      if (rafTicking) {
        return;
      }
      rafTicking = true;
      requestAnimationFrame(function () {
        if (toTop) {
          toTop.classList.toggle("back-to-top--show", window.scrollY > backToTopThreshold);
        }
        updateScrollSpy();
        rafTicking = false;
      });
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
      // passive: true: allows the browser to scroll immediately without waiting for our handler to finish.
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // Set the initial highlight
    }
  })();

  // Accordion (collapsible sections)
  (function () {
    var accordion = document.querySelectorAll(".accordion");
    if (accordion.length > 0) {
      Array.prototype.forEach.call(accordion, function (item) {
        var head = item.querySelector(".accordion-head");
        var body = item.querySelector(".accordion-body");
        if (!head || !body) {
          return;
        }
        head.addEventListener("click", function () {
          var open = item.classList.toggle("accordion--open");
          // scrollHeight is the FULL scrollable height of the content in pixels, regardless of how much is visible.
          body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
        });
      });
    }
  })();

  // Pagination jump-to-page
  (function () {
    var gotoForm = document.getElementById("pagination-goto");
    if (gotoForm) {
      var gotoInput = gotoForm.querySelector("input");
      var pageUrls = {};
      var maxPage = 1;
      var pageData = document.getElementById("pagination-data");
      if (pageData) {
        try {
          var data = JSON.parse(pageData.textContent) || {};
          pageUrls = data.pages || {};
          maxPage = data.total;
        } catch (e) {}
      }
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
        if (!page || page < 1 || page > maxPage) {
          gotoInput.value = "";
          gotoInput.focus();
          return;
        }
        var url = pageUrls[page];
        if (url) {
          window.location.href = url;
        }
      });
    }
  })();
})();
