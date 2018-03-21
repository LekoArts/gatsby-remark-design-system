const visit = require('unist-util-visit');
const parser = require('./utils/parser');
const Audio = require('./Specimens/Audio');

module.exports = ({ markdownAST }, { classPrefix = `grds` } = {}) => {
  visit(markdownAST, 'code', node => {
    // Get the specimen name (required) and the options (optional)
    const spec = node.lang.split('|')[0];
    const specOpt = node.lang.split('|')[1];

    // Don't error out with a missing specimen name as other plugins like PrismJS need it
    let specimenName = 'none';
    let specimenOption = 'none';

    if (spec) {
      specimenName = spec.toLowerCase().trim();
    }

    if (specOpt) {
      specimenOption = specOpt.toLowerCase().trim();
    }

    // Set the outer class name
    const className = `${classPrefix}-${specimenName}`;
    let SpecimenOutput;
    // Set the width to 6 by default which means 100% width
    let SpecimenSpan = 6;

    if (specimenName === 'audio') {
      const value = parser.standardParse(node.value);
      const { src, name, autoplay, loop, span } = value;
      SpecimenSpan = span;
      const Specimen = new Audio(src, name, classPrefix, autoplay, loop);
      SpecimenOutput = Specimen.output();
    }

    // Display our specimen
    node.type = `html`;
    node.value = `<div class="${className}" style="box-sizing: border-box; display: flex; flex-wrap: wrap; margin: 24px 0 0 0; padding: 0; position: relative; flex-basis: calc(${SpecimenSpan} / 6 * 100% - 10px); max-width: calc(${SpecimenSpan} / 6 * 100% - 10px)">
        ${SpecimenOutput}
      </div>`;
  });
};
