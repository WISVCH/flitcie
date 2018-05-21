import {LitElement, html} from './assets/@polymer/lit-element/lit-element.js';
import {repeat} from './assets/lit-html/lib/repeat.js';

class FlitciePhotoGallery extends LitElement {

  static get properties() {
    return {
      header: String,
      albums: Array
    }
  }

  constructor() {
    super();

    this.albums = [];
  }

  _render({header, albums}) {
    return html`
      <style>
        .content {
          display: grid;
          grid-gap: var(--photo-gap);
          grid-template-columns: repeat(auto-fill, var(--photo-width));
          justify-content: center;
        }
        a {
          text-decoration: none;
          color: inherit;
          text-align: center;
        }
      </style>
      <section>
        <h2>${header}</h2>
        <div class="content">
        ${
          repeat(albums, ({title}) => title, (album) => {
            const {path, title} = album;
            // The api returns with `boards/` preprended. Strip that away
            const actualPath = path.slice(7);
            const imagePath = actualPath + (path.endsWith('.JPG') ? '' : '/.album.jpg');

            return html`
              <a href="${actualPath}" on-click=${event => this.goToUrl(event, actualPath)}>
                <h3>${title}</h3>
                <img src="https://flitcie.ch.tudelft.nl/var/thumbs/${imagePath}">
              </a>
            `;
          })
        }
        </div>
      </section>
    `;
  }

  async goToUrl(event, path) {
    let {target} = event;

    // Clicks are not always on the "a" element itself, but also on its children
    // Traverse up in the tree to reach the a element
    while (target.localName !== 'a') {
      target = target.parentNode;
    }

    if (!target.href.startsWith(document.baseURI)) {
      return;
    }
    event.preventDefault();

    window.history.pushState({path}, '', path);
    window.dispatchEvent(new CustomEvent('page-change'));
  }

  async fetchNewImagesForBaseUrl(newBaseUrl) {
    const request = await fetch(`http://10.54.0.4:8080/${newBaseUrl}`);

    if (request.ok) {
      this.albums = await request.json();
    } else {
      this.header = 'Oops something went wrong! Please refresh the page.';
      this.albums = [];
    }
  }
}
customElements.define('photo-gallery', FlitciePhotoGallery);
