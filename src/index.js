const visit = require(`unist-util-visit`);
const kebabCase = require(`lodash/kebabCase`);

// Utils functions

// Parse the input from the specimen and give out a object
const parse = value =>
  value
    .split('\n')
    .map(e => e.split(':'))
    .reduce((o, [k, v]) => ((o[k] = v.trim()), o), {});

const parsePalette = value =>
  value
    .split('\n')
    .map(x => x.split(','))
    .map(p => ({ name: p[0], value: p[1].trim() }));

module.exports = ({ markdownAST }, { classPrefix = `design-system-` } = {}) => {
  visit(markdownAST, `code`, node => {
    // The keyword behind the three backticks
    let specimen = node.lang.split('|')[0];
    // The options of the specimen
    let specOptions = node.lang.split('|')[1];

    // You can then target the specimen with .design-system-X
    let specimenName = `none`;
    if (specimen) {
      specimen = specimen.toLowerCase();
      specimenName = specimen;
    }

    let specimenOption = `none`;
    if (specOptions) {
      specOptions = specOptions.toLowerCase();
      specimenOption = specOptions;
    }

    const className = `${classPrefix}${specimenName}`;

    let output;
    if (specimen === 'color') {
      const parsedInput = parse(node.value);
      const { span, name, value } = parsedInput;
      output = `<div style="background: ${value}"></div>
      <div>
        ${name} <div>${value}</div>
      </div>`;
    }

    if (specimen === 'color-palette') {
      const parsedPalette = parsePalette(node.value);
      output = parsedPalette
        .map(
          o =>
            `<div>
          ${o.name} - ${o.value}
        </div>`
        )
        .join('');
    }

    if (specimen === 'audio') {
      const parsedInput = parse(node.value);
      const { span, src, name } = parsedInput;
      output = `
        <div>${name}</div>
        <audio src=${src} controls />
      `;
    }

    if (specimen === 'download') {
      const parsedInput = parse(node.value);
      const { span, title, subtitle, src } = parsedInput;
      const betterTitle = kebabCase(title);
      output = `
        <a href=${src} download=${betterTitle}>
          <svg style="width: 50px;" viewBox='0 0 120 120'>
            <g fill='none' fillRule='evenodd'>
              <rect width='120' height='120' fill='#EEEEEE' rx='2'/>
              <g fill="#003B5C">
                <path d='M72.647 53.353c-.468-.47-1.226-.47-1.697 0L61 63.303V36.2c0-.662-.538-1.2-1.2-1.2-.662 0-1.2.538-1.2 1.2v27.103l-9.95-9.95c-.47-.47-1.23-.47-1.7 0-.468.468-.468 1.226 0 1.697l12 12c.236.232.543.35.85.35.307 0 .614-.118.85-.353l12-12c.468-.468.468-1.226-.003-1.694z'/>
                <path d='M79 75.8H40.6c-1.985 0-3.6-1.615-3.6-3.6v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 .662.538 1.2 1.2 1.2H79c.662 0 1.2-.538 1.2-1.2v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 1.985-1.615 3.6-3.6 3.6z'/>
              </g>
            </g>
          </svg>
          <div>
          <p>${title}</p>
          <p>${subtitle}</p>
          </div>
        </a>
      `;
    }

    if (specimen === 'hint') {
      output = `
        <div class=${specimenOption}>
          ${node.value}
        </div>
      `;
    }

    if (specimen === 'image') {
      const parsedInput = parse(node.value);
      const { span, light, dark, plain, src, title, overlay } = parsedInput;
      output = `
        <div style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII='); padding: 20px;">
          <img src=${src} />
        </div>
      `;
    }

    // Display our specimen
    node.type = `html`;
    node.value = `<div class="gatsby-remark-design-system">
      <div class="${className}">
        ${output}
      </div>
      </div>`;
  });
};
