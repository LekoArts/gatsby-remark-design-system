const ty = require('tinycolor2');

module.exports = class ColorPalette {
  constructor(classPrefix, valueMap) {
    this.classPrefix = classPrefix;
    this.valueMap = valueMap;
  }

  colors() {
    return this.valueMap
      .map(c => {
        const tyColor = ty(c.color);
        const hex = tyColor.toHex8String();
        const rgb = tyColor.toRgb();
        return `
        <div class="${this.classPrefix}-color-palette__item">
          <div class="${this.classPrefix}-color-palette__left">
            <div class="${this.classPrefix}-color-palette__item__swatch" style="background: ${c.color}"></div>
            <div class="${this.classPrefix}-color-palette__item__name">
              ${c.name}
            </div>
          </div>
          <div class="${this.classPrefix}-color-palette__right">
            <div class="${this.classPrefix}-color-palette__item__color">
              <span>HEX</span>
              <span>${hex}</span>
            </div>
            <div class="${this.classPrefix}-color-palette__item__color">
              <span>RGB</span>
              <span>${rgb.r}, ${rgb.g}, ${rgb.b}</span>
            </div>
          </div>
        </div>
        `;
      })
      .join('');
  }

  output() {
    return `
      <div class="${this.classPrefix}-color-palette__container">
        ${this.colors()}
      </div>
    `;
  }
};
