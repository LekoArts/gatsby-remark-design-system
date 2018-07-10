const ty = require('tinycolor2');
const colors = require('../utils/colors');

module.exports = class ColorPalette {
  constructor(classPrefix, valueMap) {
    this.classPrefix = classPrefix;
    this.valueMap = valueMap;
  }

  colors() {
    return this.valueMap
      .map(c => {
        const tyColor = ty(c.color);
        const hex = tyColor.toHexString();
        const rgb = tyColor.toRgb();
        const cmyk = colors.RGBToCMYK(rgb.r, rgb.g, rgb.b);
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
              <span class="clippy" data-clipboard-text="${hex}">${hex}</span>
            </div>
            <div class="${this.classPrefix}-color-palette__item__color">
              <span>RGB</span>
              <span class="clippy" data-clipboard-text="${rgb.r}, ${rgb.g}, ${rgb.b}">${rgb.r}, ${rgb.g}, ${rgb.b}</span>
            </div>
            <div class="${this.classPrefix}-color-palette__item__color">
              <span>CMYK</span>
              <span class="clippy" data-clipboard-text="${cmyk.C}, ${cmyk.M}, ${cmyk.Y}, ${cmyk.K}">${cmyk.C}, ${cmyk.M}, ${cmyk.Y}, ${cmyk.K}</span>
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
