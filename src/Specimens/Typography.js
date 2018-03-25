module.exports = class Typography {
  constructor(classPrefix, valueMap) {
    this.classPrefix = classPrefix;
    this.valueMap = valueMap;
  }

  typo() {
    return this.valueMap
      .map(
        t => `<div class="${this.classPrefix}-typo__item">
      <div class="${this.classPrefix}-typo__item__name" style="font-size: ${t.size}px; font-weight: ${t.weight}">
        ${t.name}
      </div>
      <div class="${this.classPrefix}-typo__item__info">
        <div class="${this.classPrefix}-typo__item__info__desc">
						<p>Metrics</p>
						<p>${t.metrics}</p>
					</div>
					<div class="${this.classPrefix}-typo__item__info__desc">
						<p>Weight</p>
						<p>${t.weightDesc}</p>
					</div>
					<div class="${this.classPrefix}-typo__item__info__desc">
            <p>Usage</p>
            <p>${t.usage}</p>
				</div>
      </div>
    </div>`
      )
      .join('');
  }

  output() {
    return `
      <div class="${this.classPrefix}-typo__container">
        ${this.typo()}
      </div>
    `;
  }
};
