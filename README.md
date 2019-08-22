[![GitHub license](https://img.shields.io/github/license/LeKoArts/gatsby-remark-design-system.svg?style=flat-square)](https://github.com/LeKoArts/gatsby-remark-design-system/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/gatsby-remark-design-system.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-remark-design-system)
[![LekoArts Homepage](https://img.shields.io/badge/lekoarts-homepage-blue.svg?style=flat-square)](https://www.lekoarts.de)

# gatsby-remark-design-system
🎨 Create your design system with Gatsby in Markdown

See it [live in action](https://gatsby-remark-design-system.netlify.com/)!
You can also have a look at the [example repo](https://github.com/LeKoArts/gatsby-remark-design-system-example).

# Important note!

This plugin will no longer be maintained (except critical security fixes) as all the functionality was ported to MDX and [`@lekoarts/gatsby-theme-specimens`](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-specimens). Building design systems with MDX is superior to Markdown and hence the new theme is way more powerful than the _remark_ version here. Please give the theme a try!

# Scope of this plugin

**gatsby-remark-design-system** (inspired by [Catalog](https://www.catalog.style/)) is a plugin that sits on top of Gatsby's remark transformer. You'll need to setup a Gatsby project and install *at least* the plugins `gatsby-source-filesystem`, `gatsby-transformer-remark` and `gatsby-plugin-sass`. You then can use the so called **Specimens** in your markdown files to create your design system or styleguide.

Writing content in markdown is easy and so should be creating a design system. Including this plugin into your project will help you create a design system from scratch in no time - and you can also include other plugins, e.g. `gatsby-remark-prismjs` to have syntax highlighted code.

# Install

```bash
npm install gatsby-remark-design-system
```

# How to use

**Note:** If you're unsure about the instructions take a look at the implementation of the [example repo](https://github.com/LeKoArts/gatsby-remark-design-system-example)!

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
            // This prefix also needs to be set on wrapper components in your Gatsby project
            // Default value is 'grds' - so if you want you can leave out this option entirely
            classPrefix: 'grds',
          }
        }
      ],
    },
  },
],
```

## Include CSS

The plugin ships with a theme that you can easily include in your Gatsby project, or you can build your own theme by copying and modyfing the example.
To load the theme, just require its SCSS, e.g.

```js
// layouts/index.js
require('gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss');
```

If you just want to change the `classPrefix` or other SCSS variables (but otherwise want to use the preconfigured theme) you should overwrite the variables like so:

```scss
// Create a empty scss file that gets imported into your project (e.g. base.scss)

$prefix: cool;
$primary: #c93a3c;

// Import your other scss files if necessary
// .......

// Import the theme
@import '~gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss';
```

# Specimens

You can use the specimens by using three backticks followed by the name. The content of the specimen then gets defined in the code block.

````
```name|option
content
```
````

## Audio

**Options**

`autoplay: boolean` Default: false
`loop: boolean` Default: false
`name: string`
`span: number[1-6]` Width of the specimen
`src: string` The path/url to the file. Needs to be in quotes

**Example**

````
```audio
autoplay: false
loop: false
name: Sound File #1
src: "/sound.mp3"
span: 3
```
````

## Color

**Options**

`color: string` Define the color (in HEX, e.g. #b0f6ff)
`name: string`

**Example**

````
```color
name: Smaragd
color: #939d7b
```
````

## Color-Palette

**Options**

`name: string, color: string`
Each line represents a color. First define the name then after a comma the HEX value

**Example**

````
```color-palette
T400 - Shabby, #448c6c
T300 - Legendary, #dca114
T200 - Smoke, #6c3b0b
```
````

## Download

**Options**

`color: string` Define the background color (in HEX, e.g. white) of the preview box
`image: boolean` If true the image will be shown below
`span: number[1-6]` Width of the specimen
`src: string` The path/url to the file. Needs to be in quotes
`subtitle: string` The filesize or other information
`title: string`
`width: string` The width of the preview image (default: 200px)

**Example**

````
```download
color: white
image: true
span: 3
src: "/logo.png"
subtitle: 8KB
title: Avatar Social
width: 250px
```
````

## Example

**Options**

None

**Example**

````
```example
<button>You can insert your HTML here</button>
```
````

## Hint

**Options**

`directive` Green, positive note for showing Dos
`warning` Red, warning note for showing Don'ts
`neutral` Neutral note (Default)

**Example**

````
```hint|directive
Make it so!
```

```hint
Neutral Hint
```

```hint|warning
nooooooooo, not this way
```
````

## Typography

**Options**

`size: number|weight: number|metrics: string|weightDesc: string|usage: string`
Each line represents a type. You have to define the values in the mentioned order and seperate with `|`

**Example**

````
```typography
42|700|Display|42, line height is 1.1x|Bold, 700|Display type is used for visual impact and emphasis
32|400|Page title|32, line height is 1.1x|Normal, 400|Page title is used to provide hiearchy
```
````

## Video

**Options**

`autoplay: boolean` Default: false
`loop: boolean` Default: false
`muted: boolean` Default: false
`name: string`
`src: string` The path/url to the file. Needs to be in quotes

**Example**

````
```video
autoplay: false
loop: false
muted: false
name: Animation Video
src: "https://www.w3schools.com/html/mov_bbb.mp4"
span: 3
```
````