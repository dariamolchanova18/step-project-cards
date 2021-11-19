import API from "./API.js";
import DOMElement from "./DomElement.js";
import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
import { createDoctorField } from "./createDoctorField.js";

class Card {
  constructor(id, values) {
    this.id = id;
    this.values = values;
    this.elements = {};
    this.fieldsToShow = ["fullName", "doctor"];
    this.isExtended = false;
    this.isEditing = false;
  }

  render() {
    const onDeleteBtnClick = () => {
      const isSure = confirm("Are you sure?");
      if (isSure) {
        this.delete();
      }
    };

    const onExtendBtnClick = (event) => {
      if (this.isExtended) {
        hideFields();
        event.target.textContent = "See more";
        this.isExtended = false;
      } else {
        showFields();
        event.target.textContent = "See less";
        this.isExtended = true;
      }
    };

    const deleteBtn = new DOMElement(
      "button",
      "Delete",
      "btn btn-danger",
      null,
      {
        click: onDeleteBtnClick,
      }
    ).render();

    const extendBtn = new DOMElement(
      "button",
      "See more",
      "btn btn-primary",
      null,
      {
        click: onExtendBtnClick,
      }
    ).render();

    let form = {};
    const doctor = this.values.doctor?.toLowerCase()?.trim();
    const onSubmit = () => null;
    if (doctor === "dentist") {
      form = new VisitDentist(`${this.id}-form`, onSubmit, this.values);
    } else if (doctor === "cardiologist") {
      form = new VisitCardiologist(`${this.id}-form`, onSubmit, this.values);
    } else if (doctor === "therapist") {
      form = new VisitTherapist(`${this.id}-form`, onSubmit, this.values);
    }

    const doctorContainer = createDoctorField.call(this);

    let formElement = "";

    if (form.render) {
      formElement = form.render();
      formElement.prepend(doctorContainer);
      form.elements = {
        ...form.elements,
        doctorContainer,
        doctorSelect: this.elements.doctorSelect,
      };
    }
    if (form.elements.submitBtn) {
      form.elements.submitBtn.remove();
    }

    form.disableFields();

    const onEditBtnClick = (event) => {
      if (this.isEditing) {
        this.edit();
        this.isEditing = false;
        event.target.textContent = "Edit";
        form.disableFields();
      } else {
        this.isEditing = true;
        event.target.textContent = "Save";
        form.enableFields();
      }
    };

    const containers = Object.values(form.elements).filter((item) => {
      return item.tagName.toLowerCase() === "div";
    });
    const hideFields = () => {
      containers.forEach((item) => {
        const itemName = item.dataset.name;

        if (
          itemName !== this.fieldsToShow[0] &&
          itemName !== this.fieldsToShow[1]
        ) {
          item.style.display = "none";
        }
      });
    };

    hideFields();

    const showFields = () => {
      containers.forEach((item) => {
        item.style.display = "";
      });
    };

    const editBtn = new DOMElement("button", "edit", "btn btn-primary", null, {
      click: onEditBtnClick,
    }).render();
    const cardBody = new DOMElement(
      "div",
      [deleteBtn, editBtn, formElement, extendBtn],
      "card-body"
    ).render();
    const card = new DOMElement("div", cardBody, "card").render();
    this.card = card;
    return card;
  }
  delete() {
    API.deleteCard(this.id).then(() => {
      this.card.remove();
    });
  }
  edit() {
    API.updateCard(this.id, this.values).then(() => {
      console.log("The card is updated");
    });
  }

  edit() {
    API.updateCard(this.id, this.values).then(() => {
      console.log("updateCard");
    });
  }
}

export default Card;
