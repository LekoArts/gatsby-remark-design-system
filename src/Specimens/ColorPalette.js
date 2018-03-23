module.exports = class ColorPalette {
  constructor(valueMap, classPrefix) {
    this.valueMap = valueMap;
    this.classPrefix = classPrefix;
  }

  output() {
    return this.valueMap.map(c => `<div>${c.name} - ${c.color}</div>`).join('');
  }
};
