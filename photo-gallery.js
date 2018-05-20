import {LitElement, html} from './assets/@polymer/lit-element/lit-element.js';
import {repeat} from './assets/lit-html/lib/repeat.js';

function sanitize(text) {
  return text.replace(/ /g, '-');
}

class FlitciePhotoGallery extends LitElement {

  static get properties() {
    return {
      header: String,
      albums: Array,
      baseUrl: String
    }
  }

  constructor() {
    super();

    this.baseUrl = '/';
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

  _render({header, albums, baseUrl}) {
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
          repeat(albums, ({title}) => title, ({title}) => {
            const albumUrl = sanitize(title);

            return html`
              <a href="${baseUrl}${headerUrl}/${albumUrl}">
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
}
customElements.define('photo-gallery', FlitciePhotoGallery);
