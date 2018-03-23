const parser = require('./parser');
const Audio = require('../Specimens/Audio');
const Color = require('../Specimens/Color');
const ColorPalette = require('../Specimens/ColorPalette');

module.exports = class Transformer {
  static transform(SpecimenName, SpecimenOption, nodeValue, classPrefix) {
    // Set the width to 6 by default which means 100% width
    let _span = 6;
    if (SpecimenName === 'audio') {
      const value = parser.standardParse(nodeValue);
      const { src, name, autoplay, loop } = value;
      if (value.span) {
        _span = value.span;
      }
      const Specimen = new Audio(src, name, classPrefix, autoplay, loop);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    }
    if (SpecimenName === 'color') {
      const value = parser.standardParse(nodeValue);
      const { name, color } = value;
      if (value.span) {
        _span = value.span;
      }
      const Specimen = new Color(name, color, classPrefix);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    }
    if (SpecimenName === 'color-palette') {
      const value = parser.paletteParse(nodeValue);
      if (SpecimenOption) {
        _span = SpecimenOption;
      }
      const Specimen = new ColorPalette(value, classPrefix);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    }
  }
};
