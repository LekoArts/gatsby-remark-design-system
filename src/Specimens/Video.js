const svg = require('../utils/svg');

module.exports = class Video {
  constructor(autoplay = 'false', classPrefix, loop = 'false', muted = 'false', name = 'No name defined', src) {
    this.autoplay = autoplay;
    this.classPrefix = classPrefix;
    this.loop = loop;
    this.muted = muted;
    this.name = name;
    this.src = src;
  }

  output() {
    return `
    <div class="${this.classPrefix}-video__container">
      <div class="${this.classPrefix}-video__title">${svg.video()}${this.name}</div>
      <video class="${this.classPrefix}-video__videofile" src=${this.src} controls ${
      this.muted === 'true' ? 'muted' : ''
    } ${this.autoplay === 'true' ? 'autoplay' : ''} ${this.loop === 'true' ? 'loop' : ''} />
    </div>
    `;
  }
};
