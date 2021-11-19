import Form from "./Form.js";
import DOMElement from "./DOMElement.js";

class DentistForm extends Form {
    options = [
        {
            value: "",
            text: "Emergency",
            isDisabled: true,
        },
        {
            value: "low",
            text: "Low"
        },
        {
            value: "medium",
            text: "Medium"
        },
        {
            value: "high",
            text: "High"
        }
    ];


    render() {
        const {values} = this;
        const form = super.render();
        const handleInputChange = ( {target} ) => {
            this.values[target.name] = target.value.trim();
        };

        const fullNameLabel = new DOMElement(
            "label",
            "Full name",
            "form-label",
            {for: "fullName"}
        ).render();
        const fullNameInput = new DOMElement(
            "input",
            null,
            "form-control",
            {id: "fullName", name: "fullName", value: values.fullName},
            {change: handleInputChange}
        ).render();
        const fullNameContainer = new DOMElement(
            "div",
            [fullNameLabel, fullNameInput],
            "mb-3"
        ).render();

        const doctorLabel = new DOMElement(
            "label",
            "Doctor",
            "form-label",
            {for: "doctor"}
        ).render();
        const doctorInput = new DOMElement(
            "input",
            null,
            "form-control",
            {id: "doctor", name: "doctor", value: values.doctor},
            {change: handleInputChange}
        ).render();
        const doctorContainer = new DOMElement(
            "div",
            [doctorLabel, doctorInput],
            "mb-3"
        ).render();

        const {emergency} = values;
        const isEmergencyDefined = emergency === "low" || emergency === "medium" || emergency === "high";

        const emergencyOptions = this.options.map(( {
                                                        text,
                                                        value,
                                                        isDisabled
                                                    } ) => {
            return new DOMElement(
                "option",
                text,
                "",
                {
                    value,
                    selected: isEmergencyDefined && emergency === value,
                    disabled: !!isDisabled
                }
            ).render();
        });

        const emergencyLabel = new DOMElement(
            "label",
            "Emergency",
            "form-label"
        ).render();
        const emergencySelect = new DOMElement(
            "select",
            emergencyOptions,
            "form-select",
            {value: this.values.emergency, name: "emergency"},
            {change: handleInputChange}
        ).render();
        const emergencyContainer = new DOMElement(
            "div",
            [emergencyLabel, emergencySelect],
            "mb-3"
        ).render();

        this.elements = {
            fullNameLabel,
            fullNameInput,
            fullNameContainer,
            doctorLabel,
            doctorInput,
            doctorContainer,
            emergencyLabel,
            emergencySelect,
            emergencyContainer
        };

        form.append(fullNameContainer, doctorContainer, emergencyContainer);
        return form;
    }
}

export default DentistForm;