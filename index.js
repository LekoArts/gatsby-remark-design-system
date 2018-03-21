var visit = require('unist-util-visit');
var parser = require('./utils/parser');
var Audio = require('./Specimens/Audio');

module.exports = function (_ref) {
    var markdownAST = _ref.markdownAST;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$classPrefix = _ref2.classPrefix,
        classPrefix = _ref2$classPrefix === undefined ? 'grds' : _ref2$classPrefix;

    visit(markdownAST, 'code', function (node) {
        // Get the specimen name (required) and the options (optional)
        var spec = node.lang.split('|')[0];
        var specOpt = node.lang.split('|')[1];

        // Don't error out with a missing specimen name as other plugins like PrismJS need it
        var specimenName = 'none';
        var specimenOption = 'none';

        if (spec) {
            specimenName = spec.toLowerCase().trim();
        }

        if (specOpt) {
            specimenOption = specOpt.toLowerCase().trim();
        }

        // Set the outer class name
        var className = classPrefix + '-' + specimenName;
        var SpecimenOutput = void 0;
        // Set the width to 6 by default which means 100% width
        var SpecimenSpan = 6;

        if (specimenName === 'audio') {
            var value = parser.standardParse(node.value);
            var src = value.src,
                name = value.name,
                autoplay = value.autoplay,
                loop = value.loop,
                span = value.span;

            SpecimenSpan = span;
            var Specimen = new Audio(src, name, classPrefix, autoplay, loop);
            SpecimenOutput = Specimen.output();
        }

        // Display our specimen
        node.type = 'html';
        node.value = '<div class="' + className + '" style="box-sizing: border-box; display: flex; flex-wrap: wrap; margin: 24px 0 0 0; padding: 0; position: relative; flex-basis: calc(' + SpecimenSpan + ' / 6 * 100% - 10px); max-width: calc(' + SpecimenSpan + ' / 6 * 100% - 10px)">\n        ' + SpecimenOutput + '\n      </div>';
    });
};