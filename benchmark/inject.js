const { inject } = require('../dist');

module.exports = function ({html}) {
  return inject(html, {
    parent: 'head',
    position: 'append',
    tag: 'style',
    content: 'body { background-color: red; }',
  });
};
