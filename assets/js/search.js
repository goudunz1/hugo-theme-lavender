(function () {
  "use strict";

  var input = document.getElementById("search-input");
  var statusEl = document.getElementById("search-status");
  var resultsEl = document.getElementById("search-results");
  var moreBtn = document.getElementById("search-more");

  // This script only runs on the search page; bail out if the markup is absent.
  if (!input || !resultsEl || !window.MiniSearch) return;

  var CJK_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/;
  var WORD_RE = /[A-Za-z0-9\u00c0-\u02af\u0370-\u04ff\u1e00-\u1eff]+/g;

  var pageSize = 6;
  var matches = [];
  var shown = 0;

  var initialText = statusEl ? statusEl.textContent : "";
  var i18nNone = resultsEl.getAttribute("data-i18n-none") || "No results";
  var i18nCount = resultsEl.getAttribute("data-i18n-count") || "%d results";
  var i18nOne = resultsEl.getAttribute("data-i18n-one") || "1 result";

  var index = new MiniSearch({
    idField: "url",
    fields: ["title", "content"],
    storeFields: ["title", "url", "date", "content"],
    tokenize: tokenize,
    searchOptions: {
      combineWith: "AND",
      prefix: true,
      fuzzy: 0.2,
      boost: { title: 3 },
    },
  });

  /*
    Unicode-friendly tokenizer: CJK characters (Han, kana, hangul) are emitted one by
    one so a query like "搜索" matches a doc containing "搜索功能"; every other run of
    letters/digits is lowercased and split on the default word boundary.
  */
  function tokenize(text) {
    var tokens = [];
    var parts = [];
    var buf = "";
    var i;
    var part;
    var m;

    for (i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (CJK_RE.test(ch)) {
        if (buf) {
          parts.push(buf);
          buf = "";
        }
        parts.push(ch);
      } else {
        buf += ch;
      }
    }
    if (buf) parts.push(buf);

    for (i = 0; i < parts.length; i++) {
      part = parts[i];
      if (CJK_RE.test(part)) {
        tokens.push(part);
      } else {
        WORD_RE.lastIndex = 0;
        while ((m = WORD_RE.exec(part))) tokens.push(m[0].toLowerCase());
      }
    }
    return tokens;
  }

  function format(tpl, n, q) {
    return tpl.replace("%d", String(n)).replace("%s", q);
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function snippetOf(doc) {
    var text = (doc.content || "").replace(/\s+/g, " ").trim();
    if (text.length > 140) text = text.slice(0, 140) + "…";
    return text || doc.title || "";
  }

  function render() {
    var html = "";
    var end = Math.min(shown, matches.length);

    for (var i = 0; i < end; i++) {
      var doc = matches[i];
      html +=
        '<div class="group">' +
        '<a class="card mobile:h-56 mobile:min-h-0 min-h-48 px-4 py-3.5 flex-col" href="' +
        escapeHtml(doc.url) +
        '">' +
        '<div class="flex-1">' +
        '<p class="meta-text mobile:line-clamp-5 line-clamp-4 wrap-break-word">' +
        escapeHtml(snippetOf(doc)) +
        "</p>" +
        "</div>" +
        '<hr class="bg-border my-2.5 h-px flex-none border-0" />' +
        '<h3 class="mb-1 text-base text-fg font-semibold truncate">' +
        escapeHtml(doc.title) +
        "</h3>" +
        '<div class="meta-info text-13 gap-2">' +
        '<span class="align gap-0.75 flex-none">' +
        escapeHtml(doc.date || "") +
        "</span>" +
        "</div>" +
        "</a>" +
        "</div>";
    }

    resultsEl.innerHTML = html;
    if (moreBtn) moreBtn.hidden = shown >= matches.length;
  }

  function onInput() {
    var q = input.value.trim();

    if (!q) {
      matches = [];
      shown = 0;
      if (statusEl) statusEl.textContent = initialText;
      render();
      return;
    }

    matches = index.search(q);
    shown = pageSize;
    if (statusEl) {
      statusEl.textContent =
        matches.length === 1 ? format(i18nOne, matches.length, q) : format(i18nCount, matches.length, q);
    }
    render();
  }

  input.addEventListener("input", onInput);

  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      shown += pageSize;
      render();
    });
  }

  // Load the pre-generated index and re-run the current query once it's ready.
  var xhr = new XMLHttpRequest();
  xhr.open("GET", resultsEl.getAttribute("data-index-url"));
  xhr.onload = function () {
    if (xhr.status !== 200 || !xhr.responseText) return;
    try {
      index.addAll(JSON.parse(xhr.responseText));
      if (input.value.trim()) onInput();
    } catch (e) {}
  };
  xhr.send();
})();
