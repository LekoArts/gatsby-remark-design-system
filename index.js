var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var visit = require('unist-util-visit');
var kebabCase = require('lodash/kebabCase');

// Utils functions

// Parse the input from the specimen and give out a object
var parse = function parse(value) {
  return value.split('\n').map(function (e) {
    return e.split(':');
  }).reduce(function (o, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return o[k] = v.trim(), o;
  }, {});
};

var parsePalette = function parsePalette(value) {
  return value.split('\n').map(function (x) {
    return x.split(',');
  }).map(function (p) {
    return { name: p[0], value: p[1].trim() };
  });
};

module.exports = function (_ref3) {
  var markdownAST = _ref3.markdownAST;

  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$classPrefix = _ref4.classPrefix,
      classPrefix = _ref4$classPrefix === undefined ? 'design-system-' : _ref4$classPrefix;

  visit(markdownAST, 'code', function (node) {
    // The keyword behind the three backticks
    var specimen = node.lang.split('|')[0];
    // The options of the specimen
    var specOptions = node.lang.split('|')[1];

    // You can then target the specimen with .design-system-X
    var specimenName = 'none';
    if (specimen) {
      specimen = specimen.toLowerCase();
      specimenName = specimen;
    }

    var specimenOption = 'none';
    if (specOptions) {
      specOptions = specOptions.toLowerCase();
      specimenOption = specOptions;
    }

    var className = '' + classPrefix + specimenName;

    var output = void 0;
    if (specimen === 'color') {
      var parsedInput = parse(node.value);
      var span = parsedInput.span,
          name = parsedInput.name,
          value = parsedInput.value;

      output = '<div style="background: ' + value + '"></div>\n      <div>\n        ' + name + ' <div>' + value + '</div>\n      </div>';
    }

    if (specimen === 'color-palette') {
      var parsedPalette = parsePalette(node.value);
      output = parsedPalette.map(function (o) {
        return '<div>\n          ' + o.name + ' - ' + o.value + '\n        </div>';
      }).join('');
    }

    if (specimen === 'audio') {
      var _parsedInput = parse(node.value);
      var _span = _parsedInput.span,
          src = _parsedInput.src,
          _name = _parsedInput.name;

      output = '\n        <div>' + _name + '</div>\n        <audio src=' + src + ' controls />\n      ';
    }

    if (specimen === 'download') {
      var _parsedInput2 = parse(node.value);
      var _span2 = _parsedInput2.span,
          title = _parsedInput2.title,
          subtitle = _parsedInput2.subtitle,
          _src = _parsedInput2.src;

      var betterTitle = kebabCase(title);
      output = '\n        <a href=' + _src + ' download=' + betterTitle + '>\n          <svg style="width: 50px;" viewBox=\'0 0 120 120\'>\n            <g fill=\'none\' fillRule=\'evenodd\'>\n              <rect width=\'120\' height=\'120\' fill=\'#EEEEEE\' rx=\'2\'/>\n              <g fill="#003B5C">\n                <path d=\'M72.647 53.353c-.468-.47-1.226-.47-1.697 0L61 63.303V36.2c0-.662-.538-1.2-1.2-1.2-.662 0-1.2.538-1.2 1.2v27.103l-9.95-9.95c-.47-.47-1.23-.47-1.7 0-.468.468-.468 1.226 0 1.697l12 12c.236.232.543.35.85.35.307 0 .614-.118.85-.353l12-12c.468-.468.468-1.226-.003-1.694z\'/>\n                <path d=\'M79 75.8H40.6c-1.985 0-3.6-1.615-3.6-3.6v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 .662.538 1.2 1.2 1.2H79c.662 0 1.2-.538 1.2-1.2v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 1.985-1.615 3.6-3.6 3.6z\'/>\n              </g>\n            </g>\n          </svg>\n          <div>\n          <p>' + title + '</p>\n          <p>' + subtitle + '</p>\n          </div>\n        </a>\n      ';
    }

    if (specimen === 'hint') {
      output = '\n        <div class=' + specimenOption + '>\n          ' + node.value + '\n        </div>\n      ';
    }

    if (specimen === 'image') {
      var _parsedInput3 = parse(node.value);
      var _span3 = _parsedInput3.span,
          light = _parsedInput3.light,
          dark = _parsedInput3.dark,
          plain = _parsedInput3.plain,
          _src2 = _parsedInput3.src,
          _title = _parsedInput3.title,
          overlay = _parsedInput3.overlay;

      output = '\n        <div style="background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=\'); padding: 20px;">\n          <img src=' + _src2 + ' />\n        </div>\n      ';
    }

    // Display our specimen
    node.type = 'html';
    node.value = '<div class="gatsby-remark-design-system">\n      <div class="' + className + '">\n        ' + output + '\n      </div>\n      </div>';
  });
};