import DOMElement from "./DomElement.js";
import Visit from "./Visit.js";
import { renderCommonFields } from "./commonFields.js";

class VisitTherapist extends Visit {
  render() {
    const form = super.render();
    const commonFieldsContainers = renderCommonFields.call(this);
    const handleInputChange = ({ target }) => {
      this.values[target.name] = target.value.trim();
    };

    const lastVisitDate = new DOMElement(
      "input",
      "",
      "form-control js-last-visit-date",
      {
        type: "date",
        placeholder: `Enter last visit date 'dd.mm.yyyy'`,
        value: this.values.lastVisitDate,
        name: "lastVisitDate",
        id: "lastVisitDate",
      },
      { change: handleInputChange }
    ).render();
    const lastVisitLabel = new DOMElement(
      "label",
      "Last visit date",
      "form-label",
      { for: "lastVisitDate" }
    ).render();

    const lastVisitContainer = new DOMElement(
      "div",
      [lastVisitLabel, lastVisitDate],
      "mb-3",
      { dataset: { name: "lastVisitDate" } }
    ).render();
    const submitBtn = new DOMElement(
      "button",
      "Create Visit",
      "btn btn-secondary send-visit-btn"
    ).render();

    this.elements = {
      ...this.elements,
      lastVisitLabel,
      lastVisitDate,
      lastVisitContainer,
      submitBtn,
    };
    form.append(...commonFieldsContainers, lastVisitContainer, submitBtn);
    return form;
  }
}

export default VisitTherapist;
