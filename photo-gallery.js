import {LitElement, html} from './assets/@polymer/lit-element/lit-element.js';
import {repeat} from './assets/lit-html/lib/repeat.js';

function sanitize(text) {
  return text && text.replace(/ /g, '-') || '';
}

const baseurlSymbol = Symbol.for('baseurl');

class FlitciePhotoGallery extends LitElement {

  static get properties() {
    return {
      header: String,
      albums: Array,
      baseurl: String
    }
  }

  constructor() {
    super();

    this.albums = [];
  }

  _render({header, albums, baseurl}) {
    const headerUrl = sanitize(header);

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
            const {title} = album;
            const albumUrl = sanitize(title);

            return html`
              <a href="${baseurl}${headerUrl}/${albumUrl}" on-click=${event => this.goToUrl(event, album)}>
                <h3>${title}</h3>
                <img src="https://flitcie.ch.tudelft.nl/var/thumbs/${headerUrl}/${albumUrl}/.album.jpg">
              </a>
            `;
          })
        }
        </div>
      </section>
    `;
  }

  async goToUrl(event, album) {
    // Clicks are not always on the "a" element itself, but also on its children
    // Traverse up in the tree to reach the a element
    let {target} = event;

    while (target.localName !== 'a') {
      target = target.parentNode;
    }

    if (!target.href.startsWith(document.baseURI)) {
      return;
    }
    event.preventDefault();

    this.header = album.title;

    const newBaseUrl = `${this.baseurl}${sanitize(this.header)}/${sanitize(album.title)}/`;
    this.baseurl = newBaseUrl;

    window.history.pushState({newBaseUrl, header: album.title}, '', newBaseUrl);
  }

  set baseurl(newBaseUrl) {
    this[baseurlSymbol] = newBaseUrl;
    this.fetchNewImagesForBaseUrl(newBaseUrl);
  }

  get baseurl() {
    return this[baseurlSymbol] || '/';
  }

  async fetchNewImagesForBaseUrl(newBaseUrl) {
    const request = await fetch(`${newBaseUrl}images.json`);

    if (this.baseurl !== newBaseUrl) {
      return;
    }

    if (request.ok) {
      this.albums = await request.json();
    } else {
      this.header = 'Oops something went wrong! Please refresh the page.';
      this.albums = [];
    }
  }
}
customElements.define('photo-gallery', FlitciePhotoGallery);
