import {html} from '../assets/@polymer/lit-element/lit-element.js';

export const ERROR_MESSAGE = 'Oops something went wrong!';

export function goToUrl(event) {
  let {target} = event;

  // Clicks are not always on the "a" element itself, but also on its children
  // Traverse up in the tree to reach the a element
  while (target.localName !== 'a') {
    target = target.parentNode;
  }

  const documentURI = `${window.location.protocol}//${window.location.host}`;

  if (!target.href.startsWith(documentURI)) {
    return;
  }
  event.preventDefault();

  const path = target.href.substring(documentURI.length);
  window.history.pushState({path}, '', path);
  window.dispatchEvent(new CustomEvent('page-change'));
}

export function createHeader(header) {
  let urlThusFar = '';
  let links = [];
  if (typeof header === 'string') {
    links = header;
  } else {
    for (const part of header) {
      if (urlThusFar) {
        links.push(html` &gt; `);
      }
      urlThusFar += `/${part}`;
      links.push(html`<a href="${urlThusFar}" on-click=${goToUrl}>${part}</a>`);
    }
  }
  return html`<h2>${links}</h2>`;
}
