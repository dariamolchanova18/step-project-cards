import DOMElement from "./DomElement.js";
import Visit from "./Visit.js";
import { renderCommonFields } from "./commonFields.js";

class VisitCardiologist extends Visit {
  render() {
    const form = super.render();
    const commonFieldsContainers = renderCommonFields.call(this);

    const handleInputChange = ({ target }) => {
      this.values[target.name] = target.value.trim();
    };

    const pressureInput = new DOMElement(
      "input",
      "",
      "form-control js-usual-pressure",
      {
        id: "pressure",
        name: "pressure",
        value: this.values.pressure || "",
        placeholder: "Enter your usual pressure",
      },
      { change: handleInputChange }
    ).render();

    const pressureLabel = new DOMElement("label", "Pressure", "form-label", {
      for: "pressure",
    }).render();
    const pressureContainer = new DOMElement(
      "div",
      [pressureLabel, pressureInput],
      "mb-3",
      {
        dataset: { name: "pressure" },
      }
    ).render();

    const massBodyIndexInput = new DOMElement(
      "input",
      "",
      "form-control js-mass-body-index",
      {
        id: "massBodyIndex",
        name: "massBodyIndex",
        value: this.values.massBodyIndex || "",
        placeholder: "Enter your MBI",
        type: "number",
        min: 10,
        max: 35,
      },
      { change: handleInputChange }
    ).render();

    const massBodyIndexLabel = new DOMElement(
      "label",
      "Mass Body Index",
      "form-label",
      {
        for: "massBodyIndex",
      }
    ).render();
    const massBodyIndexContainer = new DOMElement(
      "div",
      [massBodyIndexLabel, massBodyIndexInput],
      "mb-3",
      {
        dataset: { name: "massBodyIndex" },
      }
    ).render();

    const previousIllnessesInput = new DOMElement(
      "input",
      "",
      "form-control js-previous-illnesses",
      {
        id: "previousIllnesses",
        name: "previousIllnesses",
        value: this.values.previousIllnesses || "",
        placeholder: "Previous illnesses",
      },
      { change: handleInputChange }
    ).render();

    const previousIllnessesLabel = new DOMElement(
      "label",
      "Previous Illnesses",
      "form-label",
      {
        for: "previousIllnesses",
      }
    ).render();
    const previousIllnessesContainer = new DOMElement(
      "div",
      [previousIllnessesLabel, previousIllnessesInput],
      "mb-3",
      {
        dataset: { name: "previousIllnesses" },
      }
    ).render();

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
        value: this.values.age || "",
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
      "",
      "btn btn-secondary send-visit-btn"
    ).render();
    submitBtn.textContent = "Create Visit";

    this.elements = {
      ...this.elements,
      pressureInput,
      pressureLabel,
      pressureContainer,
      massBodyIndexInput,
      massBodyIndexLabel,
      massBodyIndexContainer,
      previousIllnessesInput,
      previousIllnessesLabel,
      previousIllnessesContainer,
      ageInput,
      ageLabel,
      ageContainer,
      submitBtn,
    };
    form.append(
      ...commonFieldsContainers,
      pressureContainer,
      massBodyIndexContainer,
      previousIllnessesContainer,
      ageContainer,
      submitBtn
    );
    return form;
  }
}

export default VisitCardiologist;
