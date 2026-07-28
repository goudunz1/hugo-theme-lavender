---
title: "048: Edge — HTML-Heavy Content"
date: 2021-09-01
draft: false
tags: ["fuzz", "popular", "edge"]
categories: ["Big"]
---

<div class="custom-wrapper" style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">

<h3 style="color: #333;">HTML Section Title</h3>

<p>This entire section uses raw HTML tags instead of Markdown.</p>

<table border="1" cellpadding="5" cellspacing="0">
  <thead>
    <tr><th>Name</th><th>Value</th></tr>
  </thead>
  <tbody>
    <tr><td>Alpha</td><td>1</td></tr>
    <tr><td>Beta</td><td>2</td></tr>
    <tr><td>Gamma</td><td>3</td></tr>
  </tbody>
</table>

<pre><code>
# Raw HTML code block
def test():
    pass
</code></pre>

<blockquote style="border-left: 3px solid blue; padding-left: 8px;">
  This is an HTML-styled blockquote, not a Markdown one.
</blockquote>

</div>

Back to Markdown: this sentence is in normal Markdown after the HTML section.
