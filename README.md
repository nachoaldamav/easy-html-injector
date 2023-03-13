# easy-html-injector

## Introduction

easy-html-injector is a simple Node module that allows you to inject HTML elements into an HTML string. The package exports a single function `inject(html: string, element: HtmlElement)` that takes an HTML string and an object representing an HTML element to be injected, and returns the modified HTML string with the new element inserted at the specified position.

### Installation
To install `easy-html-injector`, use pnpm, npm, or yarn:

```bash
pnpm add easy-html-injector
```

```bash
npm install easy-html-injector
```

```bash
yarn add easy-html-injector
```

#### Bonus: Using my package manager

I've made a package manager called [Ultra](https://ultrapkg.dev). If you want to try it out, you can install it with:

```bash
npm install -g @ultrapkg/core
```

```bash
u add easy-html-injector
```

### Usage
First, import the inject function:

```javascript
import { inject } from 'easy-html-injector';
```

The inject function takes two arguments:

- `html`: A string containing the HTML that you want to modify.

- `element`: An object representing the HTML element that you want to inject. The object has the following properties:

    - `parent`: A string representing the parent element into which the new element will be injected. This can be 'head', 'body', or any other valid HTML element tag name.
    - `position`: A string representing the position at which the new element will be inserted. This can be 'prepend' or 'append'.
    - `tag`: A string representing the tag name of the new element.
    - `content` (optional): A string representing the content to be inserted into the new element.
    - `attributes` (optional): An object representing the attributes to be added to the new element. The keys of the object represent attribute names, and the values represent attribute values.

Here is an example usage:

```javascript
const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>My page</title>
    </head>
    <body>
      <h1>Hello, world!</h1>
    </body>
  </html>
`;

const newElement = {
  parent: 'head',
  position: 'prepend',
  tag: 'meta',
  attributes: {
    charset: 'utf-8',
  },
};

const modifiedHtml = inject(html, newElement);
console.log(modifiedHtml);
```

This will output:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

## License
`easy-html-injector` is released under the MIT License. See the LICENSE file for more details.

## Benchmark

<!-- BENCHMARK RESULTS START -->
| Benchmark | Average | Min | Max | Median | Std Dev | Variance | Ops | Ops/sec |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| inject | 0.016 | 0.0030 | 0.11 | 0.0043 | 0.032 | 2.0 | 62631 | 62630905 |
| cheerio | 0.87 | 0.35 | 4.5 | 0.43 | 1.2 | 1.4 | 1147 | 1146707 |
<!-- BENCHMARK RESULTS END -->