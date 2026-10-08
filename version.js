// Shows the live version from GitHub Releases. If this fails (offline, rate-limited), the
// version written in index.html stays as it is, and the download button works either way.
(function () {
  var el = document.getElementById('ver');
  if (!el || !window.fetch) return;
  fetch('https://api.github.com/repos/oddsocketgames/salvage-arena-releases/releases/latest', {
    headers: { 'Accept': 'application/vnd.github+json' },
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (rel) {
      var tag = String(rel.tag_name || '').replace(/^v/i, '');
      if (!/^[0-9][0-9A-Za-z.\-]*$/.test(tag)) return;
      el.textContent = tag;
      if (rel.published_at) {
        var d = new Date(rel.published_at);
        if (!isNaN(d)) {
          document.getElementById('ver-date').textContent =
            '(' + d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) + ')';
        }
      }
      var link = document.getElementById('ver-link');
      if (link && /^https:\/\/github\.com\//.test(rel.html_url || '')) link.href = rel.html_url;
    })
    .catch(function () { /* keep the fallback text */ });
})();
