import DOMElement from "./DomElement.js";

export function renderCommonFields() {
  const optionValues = {
    low: "usual",
    medium: "priority",
    high: "pressing",
  };
  const options = [
    {
      value: "",
      text: "Urgency",
      isDisabled: true,
    },
    {
      value: optionValues.low,
      text: "Usual",
    },
    {
      value: optionValues.medium,
      text: "Priority",
    },
    {
      value: optionValues.high,
      text: "Pressing",
    },
  ];

  const { values } = this;
  const handleInputChange = ({ target }) => {
    this.values[target.name] = target.value.trim();
  };

  const fullNameLabel = new DOMElement("label", "Full name", "form-label", {
    for: "fullName",
  }).render();
  const fullNameInput = new DOMElement(
    "input",
    null,
    "form-control",
    { id: "fullName", name: "fullName", value: values.fullName || "" },
    { change: handleInputChange }
  ).render();
  const fullNameContainer = new DOMElement(
    "div",
    [fullNameLabel, fullNameInput],
    "mb-3", {dataset:{name:'fullName'}}
  ).render();

  const visitAimLabel = new DOMElement("label", "Visit aim", "form-label", {
    for: "visitAim",
  }).render();
  const visitAimInput = new DOMElement(
    "input",
    null,
    "form-control",
    { id: "visitAim", name: "visitAim", value: values.visitAim || "" },
    { change: handleInputChange }
  ).render();
  const visitAimContainer = new DOMElement(
    "div",
    [visitAimLabel, visitAimInput],
    "mb-3",
    {dataset:{name:'visitAim'}}
  ).render();

  const shortDescrLabel = new DOMElement(
    "label",
    "Short description",
    "form-label",
    { for: "shortDescr" }
  ).render();
  const shortDescrInput = new DOMElement(
    "input",
    null,
    "form-control",
    { id: "shortDescr", name: "shortDescr", value: values.shortDescr || "" },
    { change: handleInputChange }
  ).render();
  const shortDescrContainer = new DOMElement(
    "div",
    [shortDescrLabel, shortDescrInput],
    "mb-3",
    {dataset:{name:'shortDescr'}}
  ).render();

  const { urgency } = values;
  const isUrgencyDefined =
    urgency === optionValues.low || urgency === optionValues.medium || urgency === optionValues.high;
  const urgencyOptions = options.map(({ text, value, isDisabled }) => {
    return new DOMElement("option", text, "", {
      value,
      selected: isUrgencyDefined && urgency === value,
      disabled: !!isDisabled,
    }).render();
  });

  const urgencyLabel = new DOMElement(
    "label",
    "Urgency",
    "form-label"
  ).render();
  const urgencySelect = new DOMElement(
    "select",
    urgencyOptions,
    "form-select",
    { value: this.values.urgency, name: "urgency" },
    { change: handleInputChange }
  ).render();
  const urgencyContainer = new DOMElement(
    "div",
    [urgencyLabel, urgencySelect],
    "mb-3",
    {dataset:{name:'urgency'}}

  ).render();

  this.elements = {
    ...this.elements,
    fullNameLabel,
    fullNameInput,
    fullNameContainer,
    visitAimLabel,
    visitAimInput,
    visitAimContainer,
    shortDescrLabel,
    shortDescrInput,
    shortDescrContainer,
    urgencyLabel,
    urgencySelect,
    urgencyContainer,
  };

  return [
    fullNameContainer,
    visitAimContainer,
    shortDescrContainer,
    urgencyContainer,
  ];
}
