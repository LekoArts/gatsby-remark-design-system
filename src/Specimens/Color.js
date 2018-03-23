module.exports = class Color {
  constructor(name = 'No name defined', color, classPrefix) {
    this.name = name;
    this.color = color;
    this.classPrefix = classPrefix;
  }

  output() {
    return `
    <div class="${this.classPrefix}-color__container">
        <div class="${this.classPrefix}-color__value" style="background: ${this.color};"></div>
        <div class="${this.classPrefix}-color__text">
            ${this.name} <div class="${this.classPrefix}-color__text--value">${this.color}</div>
        </div>
    </div>
    `;
  }
};
