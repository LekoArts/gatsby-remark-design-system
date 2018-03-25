const fromPairs = require('lodash/fromPairs');

module.exports.standardParse = function standardParse(input) {
  return fromPairs(input.split('\n').map(e => e.split(/:(?!\/\/|\d)/).map(x => x.trim()))); // Keep our forward slashes in URLs
};

module.exports.paletteParse = function paletteParse(input) {
  return input
    .split('\n')
    .map(x => x.split(','))
    .map(p => ({ name: p[0].trim(), color: p[1].trim() }));
};

module.exports.typographyParse = function typographyParse(input) {
  return input
    .split('\n')
    .map(x => x.split('|'))
    .map(p => ({
      size: p[0].trim(),
      weight: p[1].trim(),
      name: p[2].trim(),
      metrics: p[3].trim(),
      weightDesc: p[4].trim(),
      usage: p[5].trim(),
    }));
};
