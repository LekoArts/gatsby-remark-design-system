const visit = require('unist-util-visit');
const Transformer = require('./utils/Transformer');

module.exports = ({ markdownAST }, { classPrefix = `grds` } = {}) => {
  visit(markdownAST, 'code', node => {
    // Get the specimen name (required) and the options (optional)
    let spec = false;
    let specOpt = false;
    if (node.lang) {
      spec = node.lang.split('|')[0];
      specOpt = node.lang.split('|')[1];
    }

    let SpecimenName = 'none';
    let SpecimenOption = 'none';
    if (spec) {
      SpecimenName = spec.toLowerCase().trim();
    }
    if (specOpt) {
      SpecimenOption = specOpt.toLowerCase().trim();
    }

    // Set the outer class name
    const className = `${classPrefix}-${SpecimenName}`;

    const TransformedSpecimen = Transformer.transform(SpecimenName, SpecimenOption, node.value, classPrefix);
    const Span = TransformedSpecimen.SpecimenSpan;
    const Output = TransformedSpecimen.SpecimenOutput;

    // Keep other code blocks which are not a specimen untouched
    if (Output === null) {
      return false;
    }

    // Output our specimen
    node.type = `html`;
    node.value = `<div class="${className} ${classPrefix}-wrapper" style="box-sizing: border-box; display: flex; flex-wrap: wrap; padding: 0; position: relative; flex-basis: calc(${Span} / 6 * 100% - 10px); max-width: calc(${Span} / 6 * 100% - 10px)">
        ${Output}
      </div>`;
  });
};
