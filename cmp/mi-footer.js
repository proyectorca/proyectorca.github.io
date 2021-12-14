class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Alcala Ornelas Carlos Alberto.
      </p>`;
  }
}

customElements.define("mi-footer", MiFooter);
