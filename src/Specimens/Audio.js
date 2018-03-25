const svg = require('../utils/svg');

module.exports = class Audio {
  constructor(autoplay = 'false', classPrefix, loop = 'false', name = 'No name defined', src) {
    this.autoplay = autoplay;
    this.classPrefix = classPrefix;
    this.loop = loop;
    this.name = name;
    this.src = src;
  }

  output() {
    return `
    <div class="${this.classPrefix}-audio__container">
      <div class="${this.classPrefix}-audio__title">${svg.audio()}${this.name}</div>
      <audio class="${this.classPrefix}-audio__audiofile" src=${this.src} ${
      this.autoplay === 'true' ? 'autoplay' : ''
    } ${this.loop === 'true' ? 'loop' : ''} controls />
    </div>
    `;
  }
};
