const { load } = require('cheerio');

module.exports = function ({html}) {
  const $ = load(html);
  $('head').append('<style>body { background-color: red; }</style>');
  return $.html();
};
