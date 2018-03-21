const fromPairs = require('lodash/fromPairs');

module.exports.standardParse = function standardParse(input) {
  return fromPairs(input.split('\n').map(e => e.split(':').map(x => x.trim())));
};

module.exports.paletteParse = function paletteParse(input) {
  return input
    .split('\n')
    .map(x => x.split(','))
    .map(p => ({ name: p[0], value: p[1].trim() }));
};
