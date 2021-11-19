import DOMElement from "./DomElement.js";

class Modal {
  constructor(id, title, content = "", buttons = "") {
    this.id = id;
    this.title = title;
    this.content = content;
    this.buttons = buttons;
  }

  render() {
    const modal = new DOMElement("div", "", "modal").render();
    const modalDialog = new DOMElement("div", "", "modal-dialog").render();
    const modalContent = new DOMElement("div", "", "modal-content").render();
    const modalHeader = new DOMElement("div", "", "modal-header").render();
    const modalBody = new DOMElement("div", "", "modal-body").render();
    const modalFooter = new DOMElement("div", "", "modal-footer").render();
    const modalTitle = new DOMElement("h5", "", "modal-title").render();
    const modalCloseBtn = new DOMElement("button", "", "btn-close").render();

    modal.id = this.id;
    modalTitle.textContent = `${this.title}`;
    if (typeof this.content === "string") {
      modalBody.innerHTML = this.content;
    } else {
      modalBody.append(this.content);
    }
    if (typeof this.buttons === "string") {
      modalFooter.innerHTML = this.buttons;
    } else {
      modalFooter.append(this.buttons);
    }
    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalHeader.append(modalTitle, modalCloseBtn);

    return modal;
  }
}
export default Modal;
