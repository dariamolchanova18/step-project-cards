class Form {
    constructor( id, onSubmit, values = {} ) {
        this.id = id;
        this.onSubmit = onSubmit;
        this.values = values;
        this.elements = {};
    }

    enableInputs() {
        Object.values(this.elements).forEach(( value ) => {
            if ( value.tagName.toLowerCase() === "input" ) {
                value.disabled = false;
            }
        });
    }

    disableInputs() {
        Object.values(this.elements).forEach(( value ) => {
            if ( value.tagName.toLowerCase() === "input" ) {
                value.disabled = true;
            }
        });
    }

    render() {
        const form = document.createElement("form");
        form.id = this.id;

        form.addEventListener("submit", ( event ) => {
            event.preventDefault();
            this.onSubmit(event, this.values);
        });

        return form;
    }
}

export default Form;
