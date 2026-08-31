(function () {
  "use strict";

  var input = document.getElementById("search-input");
  var statusEl = document.getElementById("search-status");
  var resultsEl = document.getElementById("search-results");
  var moreBtn = document.getElementById("search-more");
  var lessBtn = document.getElementById("search-less");
  var tpl = document.getElementById("search-card-template");

  // This script only runs on the search page; bail out if the markup is absent.
  if (!input || !resultsEl || !tpl || !window.MiniSearch) return;

  var CJK_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/;
  var WORD_RE = /[A-Za-z0-9\u00c0-\u02af\u0370-\u04ff\u1e00-\u1eff]+/g;

  var pageSize = 6;
  var matches = [];
  var shown = 0;

  var initialText = statusEl ? statusEl.textContent : "";
  var i18nNone = statusEl.getAttribute("data-i18n-none") || "";
  var i18nOne = statusEl.getAttribute("data-i18n-one") || "";
  var i18nCount = statusEl.getAttribute("data-i18n-count") || "";

  var index = new MiniSearch({
    idField: "url",
    fields: ["title", "content", "author"],
    storeFields: ["title", "url", "date", "content", "author"],
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

  /*
    MiniSearch reports which document terms matched per field as:
      result.match = { matchedTerm: [field, field, ...] }
  */
  function termsIn(doc, field) {
    var out = [];
    if (doc && doc.match) {
      Object.keys(doc.match).forEach(function (term) {
        if (doc.match[term].indexOf(field) !== -1) out.push(term);
      });
    }
    return out;
  }

  function buildRegex(terms) {
    if (!terms || !terms.length) return null;
    var escaped = terms.map(function (t) {
      return String(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    escaped.sort(function (a, b) {
      return b.length - a.length;
    });
    return new RegExp(escaped.join("|"), "gi");
  }

  // Escape the text, then wrap every (case-insensitive) occurrence of the given
  // terms in a highlighted <mark>.
  function highlightText(text, terms) {
    var escaped = escapeHtml(text);
    var re = buildRegex(terms);
    if (!re) return escaped;
    return escaped.replace(re, function (m) {
      return '<mark class="search-mark">' + m + "</mark>";
    });
  }

  /*
    Build the excerpt shown in the card. When the query hit the content field, take a
    short window centred on the first match and prepend a leading "…" if there is
    earlier content we cut off (and a trailing "…" if content follows). Otherwise fall
    back to the head of the content (or the title if the post has no content).
  */
  function snippetOf(doc) {
    var text = (doc.content || "").replace(/\s+/g, " ").trim();
    var cTerms = termsIn(doc, "content");

    if (!text) return highlightText(doc.title || "", termsIn(doc, "title"));

    var head = function () {
      var s = text.slice(0, 160);
      if (text.length > 160) s += "…";
      return s;
    };

    if (cTerms.length === 0) {
      // The match lives in title/author, not in the body: no context window needed.
      return highlightText(head(), cTerms);
    }

    var low = text.toLowerCase();
    var earliest = -1;
    var earliestLen = 0;
    for (var i = 0; i < cTerms.length; i++) {
      var idx = low.indexOf(cTerms[i].toLowerCase());
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx;
        earliestLen = cTerms[i].length;
      }
    }
    if (earliest < 0) return highlightText(head(), cTerms);

    var winStart = Math.max(0, earliest - 45);
    var winEnd = Math.min(text.length, earliest + earliestLen + 95);
    var win = text.slice(winStart, winEnd);
    var prefix = winStart > 0 ? "…" : "";
    var suffix = winEnd < text.length ? "…" : "";
    return prefix + highlightText(win, cTerms) + suffix;
  }

  function cardNode(doc) {
    var node = tpl.content.cloneNode(true);
    var a = node.querySelector("[data-url]");
    a.href = doc.url || "#";

    var titleEl = node.querySelector("[data-title]");
    titleEl.innerHTML = highlightText(doc.title || "", termsIn(doc, "title"));

    var snippetEl = node.querySelector("[data-snippet]");
    snippetEl.innerHTML = snippetOf(doc);

    var authorEl = node.querySelector("[data-author]");
    authorEl.innerHTML = highlightText(doc.author || "", termsIn(doc, "author"));

    var dateEl = node.querySelector("[data-date]");
    dateEl.textContent = doc.date || "";

    return node;
  }

  function render() {
    var end = Math.min(shown, matches.length);
    var cardGridEl = resultsEl.querySelector("&>div:first-child");
    cardGridEl.innerHTML = "";
    var frag = document.createDocumentFragment();
    for (var i = 0; i < end; i++) {
      frag.appendChild(cardNode(matches[i]));
    }
    cardGridEl.appendChild(frag);
    if (moreBtn) moreBtn.hidden = shown >= matches.length;
    if (lessBtn) lessBtn.hidden = shown <= pageSize;
  }

  function onInput() {
    var q = input.value.trim();

    if (!q) {
      matches = [];
      shown = 0;
      if (statusEl) statusEl.textContent = initialText;
      render();
      resultsEl.toggleAttribute("hidden", true);
      return;
    }

    matches = index.search(q);
    shown = pageSize;
    if (statusEl) {
      statusEl.textContent =
        matches.length === 0
          ? format(i18nNone, matches.length, q)
          : matches.length === 1
            ? format(i18nOne, matches.length, q)
            : format(i18nCount, matches.length, q);
    }
    render();
    resultsEl.toggleAttribute("hidden", false);
  }

  input.addEventListener("input", onInput);

  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      shown += pageSize;
      render();
    });
  }
  if (lessBtn) {
    lessBtn.addEventListener("click", function () {
      shown -= pageSize;
      render();
    });
  }

  // Load the pre-generated index and re-run the current query once it's ready.
  var xhr = new XMLHttpRequest();
  xhr.open("GET", input.getAttribute("data-index-url"));
  xhr.onload = function () {
    if (xhr.status !== 200 || !xhr.responseText) return;
    try {
      index.addAll(JSON.parse(xhr.responseText));
      if (input.value.trim()) onInput();
    } catch (e) {}
  };
  xhr.send();
})();
