export class MMRLAnchor extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["class", "href", "page", "noicon", "onclick"];
  }
}
