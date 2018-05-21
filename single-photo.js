import {LitElement, html} from './assets/@polymer/lit-element/lit-element.js';
import {repeat} from './assets/lit-html/lib/repeat.js';

class FlitcieSinglePhoto extends LitElement {

  static get properties() {
    return {
      header: String,
      imagePath: String
    }
  }

  _render({header, imagePath}) {
    return html`
      <style>
      </style>
      <section>
        <h2>${header}</h2>
        <img width="100%" src="http://10.54.0.4:8080/${imagePath}">
      </section>
    `;
  }
}
customElements.define('single-photo', FlitcieSinglePhoto);
