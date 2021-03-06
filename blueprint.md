<h1 align="center">web-component-analyzer</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/web-component-analyzer?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/web-component-analyzer.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/web-component-analyzer"><img alt="NPM Version" src="https://img.shields.io/npm/v/web-component-analyzer.svg" height="20"/></a>
	<a href="https://david-dm.org/runem/web-component-analyzer"><img alt="Dependencies" src="https://img.shields.io/david/runem/web-component-analyzer.svg" height="20"/></a>
	<a href="https://github.com/runem/web-component-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/runem/web-component-analyzer.svg" height="20"/></a>
	<a href="https://circleci.com/gh/runem/web-component-analyzer"><img src="https://circleci.com/gh/runem/web-component-analyzer.svg?style=svg"></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/5372940/54428684-88ba1c00-471e-11e9-8e68-2c6575b32f4e.gif" alt="Web component analyzer GIF"/>

</p>

`web-component-analyzer` is a CLI that makes it possible to easily analyze web components. It analyzes your code and jsdoc in order to extract `properties`, `attributes`, `methods`, `events`, `slots` and `css custom properties`. Works with both javascript and typescript.

In addition to [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) this tool supports web components built with the following libraries:

-   [lit-element](https://github.com/Polymer/lit-element)
-   [polymer](https://github.com/Polymer/polymer)
-   [stencil](https://github.com/ionic-team/stencil) (partial)
-   [skatejs](https://github.com/skatejs/skatejs) (coming soon)
-   [open an issue for library requests](https://github.com/runem/web-component-analyzer/issues)

## Installation

<!-- prettier-ignore -->
```bash
$ npm install -g web-component-analyer
```

## Usage

### Analyze

The analyze command analyses an optional `input glob` and emits the output to the console as default. When the `input glob` is omitted it will find all components excluding `node_modules`. The default format is `markdown`.

<img src="https://user-images.githubusercontent.com/5372940/54445420-02fd9700-4745-11e9-9305-47d6ec3c6307.gif" />

<!-- prettier-ignore -->
```bash
$ wca analyze
$ wca analyze src --format markdown
$ wca analyze "src/**/*.{js,ts}" --outDir components
$ wca analyze my-element.js --outFile my-element.json
```

#### Options

{{ usage_analyze_options }}

### Diagnose

The diagnose command analyses components and emits diagnostics. Right now it only emits diagnostics for LitElement's. When the optional `input glob` is omitted it analyzes all components excluding `node_modules`. If any diagnostics are emitted this command exits with a non zero exit code.

<img src="https://user-images.githubusercontent.com/5372940/54445382-efeac700-4744-11e9-9a7b-92c5d251e124.gif" />

<!-- prettier-ignore -->
```bash
$ wca diagnose
$ wca diagnose src
$ wca diagnose "./src/**/*.{js,ts}"
$ wca diagnose my-element.js
```

## API

You can also use the underlying functionality of this tool if you don't want to use the CLI. More documentation coming soon.

<!-- prettier-ignore -->
```typescript
import { analyzeComponents } from "web-component-analyzer";

analyzeComponents(sourceFile, { checker });
```

## How does this tool analyze my components?

This tool extract information about your components by looking at your code directly and by looking at your JSDoc comments.

**Code**: In addition to `custom elements` this tool supports `lit-element`, `stencil`, `polymer` and `skatejs` web components. [Click here](https://github.com/runem/web-component-analyzer/blob/master/ANALYZE.md) for an overview of how each web component type is analyzed.

**JSDoc**: Read next section to learn more about how JSDoc is analyzed.

## How to document your components using JSDoc

In addition to analyzing properties on your components this library also use JSDoc to construct the documentation. It's especially a good idea to use JSDoc for documenting `slots`, `events` and `cssprops` as these are under no circumstances analyzed statically by this tool as of now.

Here's an example including all supported JSDoc tags. All tags are on the the form `@tag {type} name - comment`.

<!-- prettier-ignore -->
```javascript
/**
 * Here is a description of my web component.
 * 
 * @element my-element
 * 
 * @fires change - This jsdoc tag makes it possible to document events.
 * @fires submit
 * 
 * @attr {Boolean} disabled - This jsdoc tag documents an attribute.
 * @attr {on|off} switch - Here is an attribute with either the "on" or "off" value.
 * @attr my-attr
 * 
 * @prop {String} myProp - You can use this jsdoc tag to document properties.
 * @prop value
 * 
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 * 
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop --main-color
 */
class MyElement extends HTMLElement {

 /**
  * This is a description of a property with an attribute with exactly the same name: "color".
  * @type {"red"|"green"|"blue"}
  * @attr
  */
  color = "red";

  /**
   * This is a description of a property with an attribute called "my-prop".
   * @type {number}
   * @deprecated
   * @attr my-prop
   */
  myProp = 10

}
```

### Overview of supported JSDoc tags

{{ supported_jsdocs }}

{{ template:contributors }}

{{ template:license }}
