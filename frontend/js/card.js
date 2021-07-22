class Card {
  static allCards = [];
  constructor(attrs) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.description = attrs.description;
    this.column_id = attrs.column_id;
    Card.allCards.push(this);
  }

  static all = () => {
    return Card.allCards;
  }

  createCard() {
  let cardColumn = document.getElementById("column" + this.column_id).firstChild;
  let columnForm = document.getElementById("form" + this.column_id);

  let cardName = document.createElement('h4');
  cardName.innerText = this.name;

  let cardDescription = document.createElement('p');
  cardDescription.innerText = this.description;

  let columnCard = document.createElement('div');
  columnCard.setAttribute('class', 'box has-background-white-bis');
  columnCard.setAttribute('id', 'card' + this.id);
  columnCard.append(cardName, cardDescription);
  cardColumn.insertBefore(columnCard, columnForm);
}

postCard(event) {
  const columnID = parseInt(event.target.parentElement.parentElement.parentElement.id.slice(-1));
  const cardName = event.target.value;
  const data = {
    name: cardName,
    column_id: columnID
  }
  fetch('http://localhost:3000/cards', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(card => {
    if (card.id) {
    let newCard = new Card(card);
    newCard.createCard();
    }
  });
}

}