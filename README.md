[![GitHub license](https://img.shields.io/github/license/LeKoArts/gatsby-remark-design-system.svg?style=flat-square)](https://github.com/LeKoArts/gatsby-remark-design-system/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/gatsby-remark-design-system.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-remark-design-system)
[![LekoArts Homepage](https://img.shields.io/badge/lekoarts-homepage-blue.svg)](https://www.lekoarts.de)

# gatsby-remark-design-system
🎨 Create your design system with Gatsby in Markdown

See it [live in action](https://gatsby-remark-design-system.netlify.com/)!

# Scope of this plugin

**gatsby-remark-design-system** is a plugin that sits on top of Gatsby's remark transformer. You'll need to setup a Gatsby project and install *at least* the plugins `gatsby-source-filesystem`, `gatsby-transformer-remark` and `gatsby-plugin-sass`. You then can use the so called **Specimens** in your markdown files to create your design system or styleguide.

# Install

```bash
npm install gatsby-remark-design-system
```

# How to use

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

## Include CSS

The plugin ships with a theme that you can easily include in your Gatsby project, or you can build your own theme by copying and modyfing an example.

If you change the `classPrefix` you'll need to create your own SCSS file (but you could just copy the file)!

To load the theme, just require its SCSS (you'll need to a plugin to use this SCSS file), e.g.

```js
// layouts/index.js
require('gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss');
```

## Changes to your template

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

# Specimens

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