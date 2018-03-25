const svg = require('../utils/svg');
const kebabCase = require('lodash/kebabCase');

module.exports = class Download {
  constructor(classPrefix, color, src, subtitle = '', title = 'No title defined', width = '200px') {
    this.classPrefix = classPrefix;
    this.color = color;
    this.src = src;
    this.subtitle = subtitle;
    this.title = title;
    this.width = width;
    this.filename = kebabCase(this.title);
  }

  output() {
    return `
      <div class="${this.classPrefix}-download__container">
        <div class="${this.classPrefix}-download__info">
          <div class="${this.classPrefix}-download__info__left">
            ${svg.download()}${this.title}
          </div>
          <div class="${this.classPrefix}-download__info__right">
            ${this.subtitle}
          </div>
        </div>
        <a href=${this.src} download=${this.filename} class="${
      this.classPrefix
    }-download__preview" style="background: ${this.color};">
          <img src=${this.src} alt="${this.title}" style="width: ${this.width};" class="${
      this.classPrefix
    }-download__image">
        </a>
      </div>
    `;
  }
};
