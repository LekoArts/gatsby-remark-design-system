/* eslint no-new: 0 */
const Clipboard = require('clipboard');

exports.onClientEntry = () => {
  const clipboard = new Clipboard('.clippy');

  function showTooltip(elem) {
    elem.setAttribute('class', 'clippy tooltipped tooltipped-n');
    elem.setAttribute('aria-label', 'Copied to clipboard');
    setTimeout(() => {
      elem.setAttribute('class', 'clippy');
      elem.removeAttribute('aria-label');
    }, 1500);
  }

  clipboard.on('success', e => {
    e.clearSelection();
    showTooltip(e.trigger);
  });
};
