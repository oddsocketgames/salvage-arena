/* Screenshot viewer: opens in-page so there is always a close button. Click anywhere, press Esc or
   use the phone's back gesture to close. Without JS the links still open the plain image. */
(function () {
  var d = document.getElementById('viewer');
  if (!d || !d.showModal) return;
  var img = d.querySelector('img');
  function close() { if (d.open) d.close(); }
  document.querySelectorAll('.shots a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      img.src = a.getAttribute('href');
      img.alt = a.querySelector('img').alt;
      d.showModal();
      history.pushState({ viewer: 1 }, '');
    });
  });
  d.addEventListener('click', close);
  d.addEventListener('close', function () { if (history.state && history.state.viewer) history.back(); });
  window.addEventListener('popstate', close);
})();
