import {html} from './assets/@polymer/lit-element/lit-element.js';

export const ERROR_MESSAGE = 'Oops something went wrong! Please refresh the page.';

export function createHeader(header) {
  let urlThusFar = '';
  let links = [];
  if (header === ERROR_MESSAGE) {
    links = header;
  } else {
    for (const part of header) {
      if (urlThusFar) {
        links.push(html` &gt; `);
      }
      urlThusFar += `/${part}`;
      links.push(html`<a href="${urlThusFar}">${part}</a>`);
    }
  }
  return html`<h2>${links}</h2>`;
}
