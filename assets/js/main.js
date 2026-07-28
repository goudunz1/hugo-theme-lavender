(function () {
  "use strict";
  var root = document.documentElement;

  // Theme palette switch
  var toggle = document.getElementById("theme-toggle");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.classList.contains("dark");
      root.classList.toggle("dark", !isDark);

      /*
        Hugo blogs are multi-page sites, so every time the user navigates to a new page the browser reloads the
        document. To keep the chosen palette consistent across page loads, we save the preference in `localStorage`.
      */
      try {
        localStorage.setItem("theme-palette", !isDark ? "dark" : "light");
      } catch (e) {}
    });
  }

  // Sidebar rail
  var burger = document.getElementById("sidebar-burger");
  var burgerIcon = document.getElementById("sidebar-burger-icon");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("sidebar-scrim");

  function toggleSidebar(open_or_close) {
    if (!sidebar) return;

    sidebar.classList.toggle("sidebar--open", open_or_close);
    document.body.classList.toggle("sidebar-open", open_or_close);

    if (burger) {
      if (open_or_close) {
        burgerIcon.setAttribute("class", "bi bi-x-lg");
      } else {
        burgerIcon.setAttribute("class", "bi bi-list");
      }
    }
  }

  if (sidebar) {
    if (burger) {
      // Click on hamburger button: toggle the sidebar.
      burger.addEventListener("click", function () {
        toggleSidebar(!sidebar.classList.contains("sidebar--open"));
      });
    }

    // Click on scrim (backdrop): always hide the sidebar.
    if (scrim) {
      scrim.addEventListener("click", function () {
        toggleSidebar(false);
      });
    }

    // Click inside the sidebar: if the user clicked a link, hide the sidebar.
    if (sidebar) {
      sidebar.addEventListener("click", function (e) {
        if (e.target.closest("a")) toggleSidebar(false);
      });
    }

    // Auto-close the sidebar when width > 900px.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) toggleSidebar(false);
    });
  }

  // back-to-top button + table-of-content scroll-spy
  var toTop = document.getElementById("back-to-top");

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ES5 compatible, to enable array functions like .forEach() for the NodeList
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".post-toc a"));

  var headingEls = [];

  // Maps each TOC link to the DOM heading it anchors to.
  function buildHeadingList() {
    headingEls = [];
    tocLinks.forEach(function (link) {
      var id = decodeURIComponent(
        // <a href="#my-heading"> -> my-heading
        (link.getAttribute("href") || "").replace(/^#/, ""),
      );

      var el = id ? document.getElementById(id) : null;

      if (el) headingEls.push({ link: link, el: el });
    });
  }

  if (tocLinks.length > 0) {
    buildHeadingList();
    // Also rebuild after ALL resources (images, fonts, etc.) are loaded, in case layout shifted.
    window.addEventListener("load", buildHeadingList);
  }

  var activeLink = null;

  // Find the last heading whose top edge is above the scroll position.
  function updateScrollSpy() {
    if (!headingEls.length) {
      return;
    }

    // scrollPos = vert threshold that triggers active status
    var scrollPos = window.scrollY + window.innerHeight * 0.25;

    // We need the last <a> above scroll position.
    var current = headingEls[0].link;

    for (var i = 0; i < headingEls.length; i++) {
      if (headingEls[i].el.offsetTop <= scrollPos) {
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

  // Throttling via requestAnimationFrame. This guarantees at most one update per animation frame (~16ms at 60fps).
  var ticking = false;
  function onScroll() {
    if (ticking) {
      return;
    }
    ticking = true;
    requestAnimationFrame(function () {
      if (toTop) {
        toTop.classList.toggle("back-to-top--show", window.scrollY > 400);
      }

      updateScrollSpy();

      ticking = false;
    });
  }

  if (toTop || tocLinks.length > 0) {
    // passive: true: allows the browser to scroll immediately without waiting for our handler to finish.
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Set the initial highlight
  }

  // Accordion (collapsible sections)
  var items = document.querySelectorAll(".accordion");

  if (items.length > 0) {
    Array.prototype.forEach.call(items, function (item) {
      var head = item.querySelector(".accordion-head");
      var body = item.querySelector(".accordion-body");

      if (!head || !body) return;

      head.addEventListener("click", function () {
        var open = item.classList.toggle("accordion--open");

        /*
          body.scrollHeight is the FULL scrollable height of the body's content in pixels, regardless of how much is
          visible.
        */
        body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
      });
    });
  }
})();
