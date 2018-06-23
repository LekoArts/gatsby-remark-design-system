module.exports = class Example {
  constructor(classPrefix, node, index, parent) {
    this.classPrefix = classPrefix;
    this.node = node;
    this.index = index;
    this._index = this.index + 1;
    this.parent = parent;
  }

  output() {
    this.parent.children.splice(this._index, 0, {
      ...this.node,
      type: 'code',
      lang: 'html',
    });

    return `
    <div class="${this.classPrefix}-example__container">
      ${this.node.value}
    </div>
    `;
  }
};
