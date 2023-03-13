type HtmlElement = {
  parent: 'head' | 'body' | string;
  position: 'prepend' | 'append';
  tag: string;
  content?: string;
  attributes?: { [key: string]: string };
};

export function inject(html: string, element: HtmlElement) {
  const { tag, content, attributes, parent, position } = element;
  const attributesString = attributes
    ? Object.keys(attributes || {})
        .map((key) => `${key}="${attributes[key]}"`)
        .join(' ')
    : '';

  const elementString = `<${tag} ${attributesString}>${content || ''}</${tag}>`;

  if (!parent) {
    return `${html}
  ${elementString}`;
  }

  const startParentRegex = new RegExp(`<${parent}[^>]*>`);
  const endParentRegex = new RegExp(`</${parent}>`);

  if (position === 'prepend') {
    return html.replace(
      startParentRegex,
      `<${parent}>
\n${elementString}`
    );
  }
  return html.replace(
    endParentRegex,
    `\n${elementString}
</${parent}>`
  );
}
