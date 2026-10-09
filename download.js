// Points the download button at the current release.
//
// Asked of the GitHub API rather than written into the page, so publishing a release is the
// only step — there is no second place to remember to edit, and therefore no way for the
// button to go stale pointing at an old build.
(function () {
  var REPO = 'parleer/quill';
  var button = document.getElementById('download');
  var meta = document.getElementById('meta');
  if (!button) return;

  button.href = button.dataset.fallback;

  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (release) {
      var dmg = (release.assets || []).filter(function (a) {
        return /\.dmg$/i.test(a.name);
      })[0];
      if (dmg) button.href = dmg.browser_download_url;
      if (meta && release.tag_name) {
        meta.textContent = release.tag_name + ' · Requires macOS 26 or later · Apple silicon';
      }
    })
    .catch(function () {
      // Leave the fallback link to the releases page. A button that always works beats one
      // that depends on an API call succeeding.
    });
})();
