import {LitElement, html} from '../assets/@polymer/lit-element/lit-element.js';
import {repeat} from '../assets/lit-html/lib/repeat.js';

import {createHeader} from './utils.js';

class FlitcieSinglePhoto extends LitElement {

  static get properties() {
    return {
      header: Array,
      imagePath: String
    }
  }

  constructor() {
    super();

    this.header = [];
  }

  _render({header, imagePath}) {
    return html`
      <style>
      </style>
      <section>
        <h2>${createHeader(header)}</h2>
        <a target="_blank" href="http://10.54.0.4:8080/${imagePath}">
          <img width="100%" src="http://10.54.0.4:8080/${imagePath}" alt="Inspect the full image">
        </a>
      </section>
    `;
  }
}
customElements.define('single-photo', FlitcieSinglePhoto);
