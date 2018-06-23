const parser = require('./parser');
const Audio = require('../Specimens/Audio');
const Color = require('../Specimens/Color');
const ColorPalette = require('../Specimens/ColorPalette');
const Download = require('../Specimens/Download');
const Example = require('../Specimens/Example');
const Hint = require('../Specimens/Hint');
const Typography = require('../Specimens/Typography');
const Video = require('../Specimens/Video');

module.exports = class Transformer {
  static transform(SpecimenName, SpecimenOption, node, classPrefix, index, parent) {
    // Set the width to 6 by default which means 100% width
    let _span = 6;
    const nodeValue = node.value;
    if (SpecimenName === 'audio') {
      const value = parser.standardParse(nodeValue);
      const { autoplay, loop, name, src } = value;
      if (value.span) {
        _span = value.span;
      }
      const Specimen = new Audio(autoplay, classPrefix, loop, name, src);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'color') {
      const value = parser.standardParse(nodeValue);
      const { color, name } = value;
      const Specimen = new Color(classPrefix, color, name);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'color-palette') {
      const value = parser.paletteParse(nodeValue);
      const Specimen = new ColorPalette(classPrefix, value);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'download') {
      const value = parser.standardParse(nodeValue);
      const { color, image, src, subtitle, title, width } = value;
      if (value.span) {
        _span = value.span;
      }
      const Specimen = new Download(classPrefix, color, image, src, subtitle, title, width);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'example') {
      const Specimen = new Example(classPrefix, node, index, parent);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'hint') {
      const Specimen = new Hint(classPrefix, nodeValue, SpecimenOption);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'typography') {
      const value = parser.typographyParse(nodeValue);
      const Specimen = new Typography(classPrefix, value);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    } else if (SpecimenName === 'video') {
      const value = parser.standardParse(nodeValue);
      const { autoplay, loop, muted, name, src } = value;
      if (value.span) {
        _span = value.span;
      }
      const Specimen = new Video(autoplay, classPrefix, loop, muted, name, src);
      return {
        SpecimenSpan: _span,
        SpecimenOutput: Specimen.output(),
      };
    }
    return {
      SpecimenSpan: _span,
      SpecimenOutput: null,
    };
  }
};
