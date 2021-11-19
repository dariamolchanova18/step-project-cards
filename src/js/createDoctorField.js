import DOMElement from "./DomElement.js";

export function createDoctorField() {
    const handleInputChange = ( {target} ) => {
        this.values[target.name] = target.value.trim();
    };
    
    const doctors = {
        dentist: "dentist",
        therapist: "therapist",
        cardiologist: "cardiologist",
    };
    
    const options = [
        {
            value: "",
            title: "Choose Doctor",
            isDisabled: true
        },
        {
            value: doctors.dentist,
            title: "Dentist"
        },
        {
            value: doctors.cardiologist,
            title: "Cardiologist"
        },
        {
            value: doctors.therapist,
            title: "Therapist"
        }
    ];
    
    const isDoctorDefined = options.some(opt => {
        if ( opt.value ) {
            return opt.value === this.values.doctor;
        }
    });
    
    const doctorOptions = options.map(( {title, value, isDisabled} ) => {
        return new DOMElement(
            "option",
            title,
            "",
            {
                value,
                selected: isDoctorDefined && value === this.values.doctor,
                disabled: !!isDisabled
            }
        ).render();
    });
    
    const doctorLabel = new DOMElement(
        "label",
        "Doctor",
        "form-label",
        {
            for: "doctor",
        }
    ).render();
    
    const doctorSelect = new DOMElement(
        "select",
        doctorOptions,
        "form-select",
        {
            value: this.values.doctor,
            name: "doctor",
            id: `${ this.id }-doctor`
        },
        {
            change: handleInputChange
        }
    ).render();
    
    const doctorContainer = new DOMElement(
        "div",
        [doctorLabel, doctorSelect],
        "mb-3",
        {dataset: {name: "doctor"}}
    ).render();
    
    this.elements = {
        ...this.elements,
        doctorContainer,
        doctorSelect,
        doctorLabel
    };
    
    return doctorContainer;
}
