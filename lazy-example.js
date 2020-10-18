/* global lozad */
/* eslint-env browser */
(function (useNative, selector) {
  // Lazy Loading supported
  if (useNative && 'loading' in HTMLImageElement.prototype) {
    const lazyEls = document.querySelectorAll(`.${selector}`);

    lazyEls.forEach((lazyEl) => {
      lazyEl.setAttribute('src', lazyEl.getAttribute('data-src'));
    });
  } else {
    const observer = lozad(`.${selector}`);
    observer.observe();
  }
}(true, 'lazy'));
