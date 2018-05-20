import {LitElement, html} from './assets/@polymer/lit-element/lit-element.js';
import {repeat} from './assets/lit-html/lib/repeat.js';

function sanitize(text) {
  return text.replace(/ /g, '-');
}

class FlitciePhotoGallery extends LitElement {

  static get properties() {
    return {
      header: String,
      albums: Array
    }
  }

  constructor() {
    super();

    this.albums = [
      {
        title:"iCom Inhouseday"
      },
      {
        title:"WiFi Rally"
      },
      {
        title:"AkCieviteit"
      },
      {
        title:"T.U.E.S.Day Lecture by Topicus"
      },
      {
        title:"Dies - Rollerskating"
      },
      {
        title:"Dies - Ledenlunch"
      },
      {
        title:"Graduation Panel"
      },
      {
        title:"Business Tour"
      },
      {
        title:"Dies - CHeerleading"
      }
    ];
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
      </style>
      <section>
        <h2>${header}</h2>
        <div class="content">
        ${
          repeat(albums, (album) => album.title, (album) =>
            html`
              <div>
                <img src="https://flitcie.ch.tudelft.nl/var/thumbs/${sanitize(header)}/${sanitize(album.title)}/.album.jpg">
              </div>
            `
          )
        }
        </div>
      </section>
    `;
  }
}
customElements.define('photo-gallery', FlitciePhotoGallery);
