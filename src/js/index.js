import DOMElement from "./DomElement.js";
import Modal from "./Modal.js";
import API from "./API.js";
import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
import { generateCardElements } from "./generateCardElements.js";
import { filter } from "./filter.js";

export const container = document.querySelector("#card-container");
const headerBtn = document.querySelector("#header-btn");
const header = document.querySelector(".header");
const mainTitle = document.querySelector("#main-title");

async function main() {
  filter();
  const onLoginBtnClick = () => {
    loginForm.classList.add("show-modal");
  };
  headerBtn.addEventListener("click", onLoginBtnClick);
  if (sessionStorage.getItem("token")) {
    headerBtn.textContent = "Create Visit";
    headerBtn.removeEventListener("click", onLoginBtnClick);
    setCreateVisit();

    API.getCards().then((cards) => {
      if (cards.length > 0) {
        mainTitle.classList.add("hide");
      }
      const cardElements = generateCardElements(cards);
      container.append(...cardElements);
    });
  }

  const form = `
  <form id="loginForm" class="modal-form login-form">
    <label class="login-label email-label" for="email">Email</label>
    <input type="email" class="login-input js-email-input" id="login-email-input" placeholder="example@gmail.com">
    <label class="login-label password-label" for="password">Password</label>
    <input type="password" class="login-input js-password-input" id="login-password-input" placeholder="Enter Password">
    <button id="send-login-btn" type="submit" class="btn btn-secondary send-login-btn" data-bs-dismiss="modal">Log In</button>
  </form>`;

  const loginModal = new Modal("login-modal", "Log in", form).render();
  header.append(loginModal);

  const loginForm = document.querySelector("#login-modal");

  const closeLoginFormBtn = document.querySelector(".btn-close");
  closeLoginFormBtn.addEventListener("click", () => {
    loginForm.classList.remove("show-modal");
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email-input");
    const password = document.getElementById("login-password-input");

    loginForm.classList.remove("show-modal");

    const values = {
      email: email.value,
      password: password.value,
    };

    API.login(values.email, values.password).then(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      if (typeof token !== "string" && token.length <= 5) {
        return;
      }
      headerBtn.textContent = "Create visit";
      headerBtn.removeEventListener("click", onLoginBtnClick);
      setCreateVisit();

      API.getCards().then((cards) => {
        if (cards.length > 0) {
          mainTitle.classList.add("hide");
        }
        const cardElements = generateCardElements(cards);
        container.append(...cardElements);
      });
    });
  });

  const age = "25";
  const person = {
    name: "Vania",
    age: "22",
  };
  person.age = age;
}

main();

function setCreateVisit() {
  headerBtn.classList.remove("login-btn");
  headerBtn.classList.add("create-visit-btn");
  const choseDoctor = new DOMElement(
    "select",
    "",
    "visit-modal-select js-doctor-select"
  ).render();
  choseDoctor.innerHTML = `
      <option class="option js-doctor-value doctor-select" selected disabled>Choose doctor</option>
      <option value="cardiologist" class="option js-doctor-value cardiologist">Cardiologist</option>
      <option value="dentist" class="option js-doctor-value dentist">Dentist</option>
      <option value="therapist" class="option js-doctor-value therapist">Therapist</option>`;

  const createVisitModal = new Modal(
    "create-visit-modal",
    "Create visit",
    choseDoctor
  ).render();
  header.append(createVisitModal);

  choseDoctor.addEventListener("change", (e) => {
    const doctor = e.target.value;
    const onSubmit = (event, values) => {
      API.createCard({ ...values, doctor: doctor }).then((card) => {
        createVisitForm.classList.remove("show-modal");
        if (!mainTitle.classList.contains("hide")) {
          mainTitle.classList.add("hide");
        }
        const cardElement = generateCardElements(card);
        container.append(cardElement);
      });
    };
    const modalBody = document.querySelector("#create-visit-modal .modal-body");

    const isEmpty = !modalBody.children[1];

    if (doctor === "cardiologist") {
      !isEmpty && modalBody.children[1].remove();
      const formVisitCardiologist = new VisitCardiologist(
        "",
        onSubmit
      ).render();
      modalBody.append(formVisitCardiologist);
    } else if (doctor === "dentist") {
      !isEmpty && modalBody.children[1].remove();
      const formVisitDentist = new VisitDentist("", onSubmit).render();
      modalBody.append(formVisitDentist);
    } else if (doctor === "therapist") {
      !isEmpty && modalBody.children[1].remove();
      const formVisitTherapist = new VisitTherapist("", onSubmit).render();
      modalBody.append(formVisitTherapist);
    }
  });

  const createVisitForm = document.querySelector("#create-visit-modal");
  headerBtn.addEventListener("click", () => {
    createVisitForm.classList.add("show-modal");
  });
  const closeVisitFormBtn = document.querySelector(
    "#create-visit-modal .btn-close"
  );
  closeVisitFormBtn.addEventListener("click", () => {
    createVisitForm.classList.remove("show-modal");
  });
}
