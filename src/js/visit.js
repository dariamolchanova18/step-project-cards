import DOMElement from "./DomElement.js";

class Visit {
  constructor(id, onSubmit, values) {
    this.id = id;
    this.onSubmit = onSubmit;
    this.values = values || {};
    this.elements = {};
  }

  enableFields() {
    Object.values(this.elements).forEach((value) => {
      const tag = value.tagName.toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") {
        value.disabled = false;
      }
    });
  }

  disableFields() {
    Object.values(this.elements).forEach((value) => {
      const tag = value.tagName.toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") {
        value.disabled = true;
      }
    });
  }

  render() {
    const form = new DOMElement("form", "", "form modal-form", {
      id: this.id,
    }).render();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(event, this.values);
    });

    return form;
  }
}

export default Visit;
