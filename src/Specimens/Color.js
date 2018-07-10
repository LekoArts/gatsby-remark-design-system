const ty = require('tinycolor2');
const colors = require('../utils/colors');

module.exports = class Color {
  constructor(classPrefix, color, name = 'No name defined') {
    this.classPrefix = classPrefix;
    this.color = color;
    this.name = name;
    this.tyColor = ty(this.color);
    this.hex = this.tyColor.toHexString();
    this.rgb = this.tyColor.toRgb();
    this.cmyk = colors.RGBToCMYK(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  blackSmall() {
    return ty.isReadable('black', this.color, { level: 'AA', size: 'small' });
  }

  blackLarge() {
    return ty.isReadable('black', this.color, { level: 'AA', size: 'large' });
  }

  whiteSmall() {
    return ty.isReadable('white', this.color, { level: 'AA', size: 'small' });
  }

  whiteLarge() {
    return ty.isReadable('white', this.color, { level: 'AA', size: 'large' });
  }

  output() {
    return `
    <div class="${this.classPrefix}-color__container">
      <div class="${this.classPrefix}-color__swatch" style="background: ${this.color};">
        <div class="${this.classPrefix}-color__swatch__a11y">
          <div class="${this.classPrefix}-color__swatch__a11y__char" style="font-size: 0.8rem; color: black;">
						A
					</div>
					<div class="${this.classPrefix}-color__swatch__a11y__status">
						${this.blackSmall() ? 'Pass' : 'Fail'}
					</div>
        </div>
        <div class="${this.classPrefix}-color__swatch__a11y">
          <div class="${this.classPrefix}-color__swatch__a11y__char" style="color: black;">
						A
					</div>
					<div class="${this.classPrefix}-color__swatch__a11y__status">
						${this.blackLarge() ? 'Pass' : 'Fail'}
					</div>
        </div>
        <div class="${this.classPrefix}-color__swatch__a11y">
          <div class="${this.classPrefix}-color__swatch__a11y__char" style="font-size: 0.8rem;">
						A
					</div>
					<div class="${this.classPrefix}-color__swatch__a11y__status">
						${this.whiteSmall() ? 'Pass' : 'Fail'}
					</div>
        </div>
        <div class="${this.classPrefix}-color__swatch__a11y">
          <div class="${this.classPrefix}-color__swatch__a11y__char">
						A
					</div>
					<div class="${this.classPrefix}-color__swatch__a11y__status">
						${this.whiteLarge() ? 'Pass' : 'Fail'}
					</div>
        </div>
      </div>
      <div class="${this.classPrefix}-color__info">
        <div class="${this.classPrefix}-color__info__item">
					<p>Name</p>
					<p>${this.name}</p>
				</div>
				<div class="${this.classPrefix}-color__info__item">
					<p>Hex</p>
					<p class="clippy" data-clipboard-text="${this.hex}">${this.hex}</p>
				</div>
				<div class="${this.classPrefix}-color__info__item">
					<p>RGB</p>
					<p class="clippy" data-clipboard-text="${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}">${this.rgb.r}, ${this.rgb.g}, ${
      this.rgb.b
    }</p>
				</div>
				<div class="${this.classPrefix}-color__info__item">
					<p>CMYK</p>
					<p class="clippy" data-clipboard-text="${this.cmyk.C}, ${this.cmyk.M}, ${this.cmyk.Y}, ${this.cmyk.K}">${this.cmyk.C}, ${this.cmyk.M}, ${this.cmyk.Y}, ${this.cmyk.K}</p>
				</div>
      </div>
    </div>
    `;
  }
};
