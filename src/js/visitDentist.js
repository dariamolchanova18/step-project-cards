import DOMElement from "./DomElement.js";
import Visit from "./Visit.js";
import { renderCommonFields } from "./commonFields.js";

class VisitDentist extends Visit {
  render() {
    const form = super.render();
    const commonFieldsContainers = renderCommonFields.call(this);

    const handleInputChange = ({ target }) => {
      this.values[target.name] = target.value.trim();
    };

    const ageInput = new DOMElement(
      "input",
      "",
      "form-control",
      {
        type: "number",
        min: 1,
        max: 150,
        id: "age",
        name: "age",
        value: this.values.age,
        placeholder: "Enter your age",
      },
      { change: handleInputChange }
    ).render();
    const ageLabel = new DOMElement("label", "Age", "form-label", {
      for: "age",
    }).render();
    const ageContainer = new DOMElement("div", [ageLabel, ageInput], "mb-3", {
      dataset: { name: "age" },
    }).render();
    const submitBtn = new DOMElement(
      "button",
      "Create Visit",
      "btn btn-secondary send-visit-btn"
    ).render();

    this.elements = {
        ...this.elements,
        ageLabel,
        ageInput,
        ageContainer,
        submitBtn,
      };

    form.append(...commonFieldsContainers, ageContainer, submitBtn);
    return form;
  }
}

export default VisitDentist;