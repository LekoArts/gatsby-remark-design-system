module.exports = class Hint {
  constructor(classPrefix, nodeValue, SpecimenOption = 'neutral') {
    this.classPrefix = classPrefix;
    this.nodeValue = nodeValue;
    this.SpecimenOption = SpecimenOption;
  }

  option() {
    if (this.SpecimenOption === 'directive') {
      return `${this.classPrefix}-hint__directive`;
    } else if (this.SpecimenOption === 'warning') {
      return `${this.classPrefix}-hint__warning`;
    }
    return '';
  }

  output() {
    return `
    <div class="${this.classPrefix}-hint ${this.option()}">
      ${this.nodeValue}
    </div>
    `;
  }
};
