import {LitElement, html} from '../assets/@polymer/lit-element/lit-element.js';
import {repeat} from '../assets/lit-html/lib/repeat.js';

import {ERROR_MESSAGE, createHeader, goToUrl} from './utils.js';

const observer = Symbol.for('observer');

class FlitciePhotoGallery extends LitElement {

  static get properties() {
    return {
      header: Array,
      albums: Array
    };
  }

  constructor() {
    super();

    this.albums = [];
    this.header = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this[observer] = new IntersectionObserver(this.__showImages.bind(this), {
      rootMargin: '300px'
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this[observer].disconnect();
  }

  _render({header, albums}) {
    this[observer] && this[observer].disconnect();

    return html`
      <style>
        .content {
          display: grid;
          grid-gap: var(--photo-gap);
          grid-template-columns: repeat(auto-fill, var(--photo-width));
          justify-content: center;
        }
        .content a {
          text-decoration: none;
          color: inherit;
          text-align: center;
          display: flex;
          flex-direction: column;
          margin: 0 auto 16px auto;
          max-width: 90vw;
          min-height: 300px;
        }
        h3 {
          margin-bottom: 4px;
        }
      </style>
      <section>
        ${createHeader(header)}
        <div class="content">
        ${
          repeat(albums, ({title}) => title, (album) => {
            const {path, title} = album;
            // The api returns with `boards/` preprended. Strip that away
            const actualPath = `/${path.slice(7)}`;
            const imagePath = actualPath + (path.endsWith('.JPG') ? '' : '/.album.jpg');

            return html`
              <a href="${actualPath}" on-click=${goToUrl}>
                <h3>${title}</h3>
                <img data-src$=${"https://flitcie.ch.tudelft.nl/var/thumbs" + imagePath}>
               </a>
            `;
          })
        }
        </div>
      </section>
    `;
  }

  _didRender() {
    for (const img of this.shadowRoot.querySelectorAll('img[data-src]')) {
      this[observer].observe(img);
    }
  }

  __showImages(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;

        img.removeAttribute('data-src');
        img.setAttribute('src', src);

        this[observer].unobserve(img);
      }
    }
  }

  async fetchNewImagesForBaseUrl(newBaseUrl) {
    try {
      const request = await fetch(`http://10.54.0.4:8080/${newBaseUrl}`);
      if (request.ok) {
        this.albums = await request.json();
        return;
      }
    } catch (e) {

    }

    const additionalInfo = navigator.onLine ? 'Please refresh the page.' : 'You appear to have no working network connection.';

    this.header = `${ERROR_MESSAGE} ${additionalInfo}`;
    this.albums = [];
  }
}
customElements.define('photo-gallery', FlitciePhotoGallery);
