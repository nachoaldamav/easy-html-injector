import { inject } from '../src';
import test from 'ava';

const basicHtml = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
`;

test('injects a script tag into the head', (t) => {
  const html = inject(basicHtml, {
    parent: 'head',
    position: 'append',
    tag: 'script',
    attributes: {
      src: 'main.js',
    },
  });

  t.snapshot(html);
});

test('injects a script tag into the body', (t) => {
  const html = inject(basicHtml, {
    parent: 'body',
    position: 'prepend',
    tag: 'script',
    attributes: {
      src: 'main.js',
    },
  });

  t.snapshot(html);
});

test('injects a script tag into the body with content', (t) => {
  const html = inject(basicHtml, {
    parent: 'body',
    position: 'prepend',
    tag: 'script',
    content: 'console.log("hello world")',
  });

  t.snapshot(html);
});

test('injects a script tag into the body with content and attributes', (t) => {
  const html = inject(basicHtml, {
    parent: 'body',
    position: 'prepend',
    tag: 'script',
    content: 'console.log("hello world")',
    attributes: {
      type: 'text/javascript',
    },
  });

  t.snapshot(html);
});

test('injects a style tag into the head', (t) => {
  const html = inject(basicHtml, {
    parent: 'head',
    position: 'append',
    tag: 'style',
    content: 'body { background: red; }',
  });

  t.snapshot(html);
});

test('injects a style tag into the body', (t) => {
  const html = inject(basicHtml, {
    parent: 'body',
    position: 'prepend',
    tag: 'style',
    content: 'body { background: red; }',
  });

  t.snapshot(html);
});

test('injects a style tag into the body with attributes', (t) => {
  const html = inject(basicHtml, {
    parent: 'body',
    position: 'prepend',
    tag: 'style',
    content: 'body { background: red; }',
    attributes: {
      type: 'text/css',
    },
  });

  t.snapshot(html);
});

test('injects tailwind cdn into the head with a custom config', (t) => {
  const a = inject(basicHtml, {
    parent: 'head',
    position: 'append',
    tag: 'script',
    attributes: {
      src: 'https://cdn.tailwindcss.com/',
    },
  });

  const b = inject(a, {
    parent: 'head',
    position: 'append',
    tag: 'script',
    content: `tailwind.config = {
            theme: {
              extend: {
                colors: {
                  clifford: '#da373d',
                }
              }
            }
          }`,
  });

  t.snapshot(b);
});

test('injects a custom element into the html parent', (t) => {
  const html = inject(basicHtml, {
    parent: 'html',
    position: 'append',
    tag: 'custom-element',
    content: 'hello world',
  });

  t.snapshot(html);
});
