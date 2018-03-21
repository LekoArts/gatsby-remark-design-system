module.exports = class Audio {
  constructor(src, name = 'No name defined', classPrefix, autoplay = 'false', loop = 'false') {
    this.src = src;
    this.name = name;
    this.classPrefix = classPrefix;
    this.autoplay = autoplay;
    this.loop = loop;
  }

  output() {
    return `
    <div class="${this.classPrefix}-audio__container">
      <div class="${this.classPrefix}-audio__title">${this.name}</div>
      <audio class="${this.classPrefix}-audio__audiofile" src=${this.src} ${
      this.autoplay === 'true' ? 'autoplay' : ''
    } ${this.loop === 'true' ? 'loop' : ''} controls />
    </div>
    `;
  }
};
