[![GitHub license](https://img.shields.io/github/license/LeKoArts/gatsby-remark-design-system.svg?style=flat-square)](https://github.com/LeKoArts/gatsby-remark-design-system/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/gatsby-remark-design-system.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-remark-design-system)
[![Twitter Follow](https://img.shields.io/twitter/follow/lekoarts_de.svg?style=flat-square)](https://twitter.com/lekoarts_de)

# gatsby-remark-design-system
🎨 Create your design system with Gatsby in Markdown

See it [live in action](https://gatsby-remark-design-system.netlify.com/)!

## Scope of this plugin

**gatsby-remark-design-system** is a plugin that sits on top of Gatsby's remark transformer. You'll need to setup a Gatsby project and install *at least* the plugins `gatsby-source-filesystem`, `gatsby-transformer-remark` and `gatsby-plugin-sass`. You then can use the so called **Specimens** in your markdown files to create your design system or styleguide.

## Install

```bash
npm install gatsby-remark-design-system
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-design-system',
          options: {
            // Class prefix for all elements of the design system specimens
            // This prefix also needs to be set to some wrapper components in your Gatsby project
            // Default value is 'grds' - so if you want you can leave out this option entirely
            classPrefix: 'grds',
          }
        }
      ],
    },
  },
],
```

### Include CSS

The plugin ships with a theme that you can easily include in your Gatsby project, or you can build your own theme by copying and modyfing an example.

If you change the `classPrefix` you'll need to create your own SCSS file (but you could just copy the file)!

To load the theme, just require its SCSS (you'll need to a plugin to use this SCSS file), e.g.

```js
// layouts/index.js
require('gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss');
```

### Changes to your template

You'll need to add a `className` to your `div` that holds the content of your markdown output. The prefix in your `className` needs to be the same as in your other options. The container gets a special styling without the plugin won't work - so don't forget that step!

```jsx
// templates/index.js
<div className="grds-page" dangerouslySetInnerHTML={{ __html: postNode.html }} />
```

You can use the specimens by using three backticks followed by the name. The content of the specimen then gets defined in the code block.

````
```name|option
content
```
````

## Specimens

To be continued