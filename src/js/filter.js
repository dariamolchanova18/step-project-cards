import API from "./API.js";
import { generateCardElements } from "./generateCardElements.js";
import { container } from "./index.js";

const filterForm = document.getElementById("filter");
const mainTitleAbsent = document.getElementById("main-title-absent");

export function filter() {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const search = document.querySelector("#search");
    const doctor = document.querySelector("#doctor");
    const urgency = document.querySelector("#urgency");

    const values = {
      search: search.value,
      doctor: doctor.value,
      urgency: urgency.value,
    };

    API.getCards().then((cards) => {
      const result = cards
        .filter((item) => {
          if (!search.value) {
            return true;
          } else {
            const searchValue = search.value.toLowerCase().trim();

            const hasMatched = Object.values(item).some((value) => {
              const currentValue = value.toString().toLowerCase().trim();
              return currentValue.includes(searchValue);
            });
            return hasMatched;
          }
        })
        .filter((item) => {
          if (!values.doctor || !item.doctor) {
            return true;
          } else {
            const searchValue = values.doctor.toLowerCase().trim();
            const currentValue = item.doctor.toLowerCase().trim();
            return searchValue === currentValue;
          }
        })
        .filter((item) => {
          if (!values.urgency || !item.urgency) {
            return true;
          } else {
            const searchValue = values.urgency.toLowerCase().trim();
            const currentValue = item.urgency.toLowerCase().trim();
            return searchValue === currentValue;
          }
        });
      container.innerHTML = "";
      if (result.length === 0) {
        mainTitleAbsent.classList.add("show");
      } else {
        const cardElements = generateCardElements(result);
        mainTitleAbsent.classList.remove("show");
        container.append(...cardElements);
      }
    });
  });
  filterForm.addEventListener("reset", (event) => {
    API.getCards().then((cards) => {
      const cardElements = generateCardElements(cards);
      container.innerHTML = "";
      mainTitleAbsent.classList.remove("show");
      container.append(...cardElements);
    });
  });
}
