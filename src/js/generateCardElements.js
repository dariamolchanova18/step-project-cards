import Card from "./Card.js";

/**
 *
 * @param { Object | Array }  cards
 * @returns { Object | Array }
 */

export const generateCardElements = (cards) => {
  if (typeof cards !== "object") {
    return;
  }
  const isArray = Array.isArray(cards);
  if (isArray) {
    const cardElements = cards.map((item) => {
      const { id } = item;
      const element = new Card(id, item).render();
      return element;
    });
    return cardElements;
  } else {
    const { id } = cards;
    const element = new Card(id, cards).render();
    return element;
  }
};
