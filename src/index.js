const visit = require('unist-util-visit');
const Transformer = require('./utils/Transformer');

module.exports = ({ markdownAST }, { classPrefix = `grds` } = {}) => {
  visit(markdownAST, 'code', node => {
    // Get the specimen name (required) and the options (optional)
    const spec = node.lang.split('|')[0];
    const specOpt = node.lang.split('|')[1];

    // Don't error out with a missing specimen name as other plugins like PrismJS need it
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

    // Display our specimen
    node.type = `html`;
    node.value = `<div class="${className}" style="box-sizing: border-box; display: flex; flex-wrap: wrap; margin: 24px 0 0 0; padding: 0; position: relative; flex-basis: calc(${Span} / 6 * 100% - 10px); max-width: calc(${Span} / 6 * 100% - 10px)">
        ${Output}
      </div>`;
  });
};
