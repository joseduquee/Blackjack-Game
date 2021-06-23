/*
    2C = Two of Clubs
    2D = Two of Diamons
    2H = Two of Hearts
    2S = Two of Spades
*/
//Variables
let deck = [];
const typesOfCards = ["C", "D", "H", "S"];
const specialsCards = ["A", "J", "Q", "K"];
let playerPoints = 0,
  cpuPoints = 0;

//HTML References

const btnAsk = document.querySelector("#btnAsk");
const btnStop = document.querySelector("#btnStop");
const btnNew = document.querySelector("#btnNew");

const smallsPoints = document.querySelectorAll("small");

const divCardsPlayer = document.querySelector("#player-cards");
const divCardsCpu = document.querySelector("#cpu-cards");

//=================================================================================
//=================================================================================
//=================================================================================

//this function create a new unordered deck
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of typesOfCards) {
      deck.push(i + type);
    }
  }

  for (let type of typesOfCards) {
    for (let spe of specialsCards) {
      deck.push(spe + type);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

createDeck();

//=================================================================================
//=================================================================================
//=================================================================================

//This function allow to ask a card
const askCard = () => {
  if (deck.length === 0) {
    throw "There are no cards on deck";
  }

  const askedCard = deck.pop();
  return askedCard;
};

// deck = [];
askCard();

//value of asked card
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);

  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;

  // let points = 0;
  // if( isNaN( value )) {
  //     points = ( value === 'A') ? 11 : 10;
  // } else {
  //     points = parseInt(value);
  //     // points = value * 1;

  // }

  // console.log(points);
};

//CPU turn
const cpuTurn = (minimumPoints) => {
  do {
    const card = askCard();
    cpuPoints += cardValue(card);
    smallsPoints[1].innerText = cpuPoints;

    // <img class="cards" src="./assets/cartas/10H.png" alt=""></img>
    const imgCard = document.createElement("img");
    imgCard.classList.add("cards");
    imgCard.src = `./assets/cartas/${card}.png`;
    divCardsCpu.append(imgCard);

    if (minimumPoints > 21) {
      break;
    }
  } while (cpuPoints < minimumPoints && minimumPoints <= 21);

  setTimeout(() => {
    cpuPoints === minimumPoints
      ? alert("Nobody wins!")
      : minimumPoints > 21
      ? alert("You lose!")
      : minimumPoints > cpuPoints || cpuPoints > 21
      ? alert('You win!')
      : alert("You lose!")
  }, 400 );
};

//Events
//==========================================================================
btnAsk.addEventListener("click", () => {
  const card = askCard();
  playerPoints += cardValue(card);
  smallsPoints[0].innerText = playerPoints;

  // <img class="cards" src="./assets/cartas/10H.png" alt=""></img>
  const imgCard = document.createElement("img");
  imgCard.classList.add("cards");
  imgCard.src = `./assets/cartas/${card}.png`;
  divCardsPlayer.append(imgCard);

  if (playerPoints > 21) {
    console.warn("You lose!");
    btnAsk.disabled = true;
    cpuTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn("21, great!");
    btnAsk.disabled = true;
    btnStop.disabled = true;
    cpuTurn(playerPoints);
  }
});

btnStop.addEventListener("click", () => {
  btnAsk.disabled = true;
  btnStop.disabled = true;
  cpuTurn(playerPoints);
});

btnNew.addEventListener('click', () => {
    
    console.clear();

    deck = [];
    createDeck();
    
    playerPoints = 0;
    cpuPoints = 0;
    
    smallsPoints[0].innerText = 0;
    smallsPoints[1].innerText = 0;

    divCardsCpu.innerHTML = '';
    divCardsPlayer.innerHTML = '';

    btnAsk.disabled = false;
    btnStop.disabled = false;

})
