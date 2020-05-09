class RadialPlayer extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute("stroke");
    const radius = this.getAttribute("radius");
    const normalizedRadius = radius - stroke / 2;
    this._circumference = normalizedRadius * 2 * Math.PI;
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        type="text/css"
        media="all"
      />
      <svg
        height="${radius * 2}"
        width="${radius * 2}"
       >
         <circle
           stroke="white"
           stroke-dasharray="${this._circumference} ${this._circumference}"
           style="stroke-dashoffset:${this._circumference}"
           stroke-width="${stroke}"
           fill="transparent"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
      </svg>
      <button><i class='fas fa-play'></i></button>

      <style>
        svg {
          vertical-align: top;
        }

        circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        button {
          z-index: 1;
          position: absolute;
          color: #fff;
          background: transparent;
          font-size: 3rem;
          margin: 0;
          padding: 0;
          border: 0;
        }

        button:focus {
          outline: 0;
        }
      </style>
    `;
  }

  setProgress(percent) {
    const offset = this._circumference - (percent / 100) * this._circumference;
    const circle = this._root.querySelector("circle");
    circle.style.strokeDashoffset = offset;
  }

  updateIcon(string) {
    const icon = this._root.querySelector("button");
    icon.innerHTML = string;
  }

  static get observedAttributes() {
    return ["progress", "icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "progress") {
      this.setProgress(newValue);
    }
    if (name === "icon") {
      this.updateIcon(newValue);
    }
  }
}

window.customElements.define("radial-player", RadialPlayer);
