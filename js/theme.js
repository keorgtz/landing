/* Apply the saved appearance before the first paint. Storage is optional. */
(function () {
  'use strict';
  let theme;
  try { theme = localStorage.getItem('keorsoft-theme'); } catch { /* Private browsing. */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.dataset.theme = theme;
})();
