/*
    2C = Two of Clubs
    2D = Two of Diamons
    2H = Two of Hearts
    2S = Two of Spades
*/

//Module Pattern
//This is an annonimus function autoinvocated, it creates a new scope
//Este se conoce como el patron modulo
const myModuleGame = (() => {
  "use strict";


  //Variables
  let deck = [];
  const typesOfCards = ["C", "D", "H", "S"],
        specialsCards = ["A", "J", "Q", "K"];
  // let userPoints = 0,
  //     cpuPoints = 0;
  let playersPoints = [];

  //HTML References

  const btnAsk = document.querySelector("#btnAsk"),
        btnStop = document.querySelector("#btnStop"),
        btnNew = document.querySelector("#btnNew");
  
  const smallsPoints = document.querySelectorAll("small");
  
  const divCardsPlayers = document.querySelectorAll(".divCards");


  //=================================================================================
  //this function initilize the game
  const initializeGame = ( numPlayers = 2 ) => {
    
    deck = createDeck();
    playersPoints = [];

    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    } 

    smallsPoints.forEach( val => val.innerText = 0 );
    divCardsPlayers.forEach( val => val.innerHTML = '');

    btnAsk.disabled = false;
    btnStop.disabled = false;

  }


  //=================================================================================
  //=================================================================================

  //this function create a new unordered deck
  const createDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
 
  };


  //=================================================================================
  //=================================================================================
  //=================================================================================

  //This function allow to ask a card
  const askCard = () => {
    if (deck.length === 0) {
      throw "There are no cards on deck";
    }
    return deck.pop();

  };

  // deck = [];
  // askCard();

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

  //Turn: 0 = first player and the last one would be CPU
  const accumulatePoints = ( card, turn ) => {

    playersPoints[turn] += cardValue( card );
    smallsPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];

  }

  const createCard = ( card, turn ) => {
    
    const imgCard = document.createElement("img");
    imgCard.src = `./assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divCardsPlayers[turn].append(imgCard);

  };

  const decideWinner = () => {
    
    const [ minimumPoints, cpuPoints] = playersPoints;
    
    setTimeout(() => {
      cpuPoints === minimumPoints
        ? alert("Nobody wins!")
        : minimumPoints > 21
        ? alert("You lose!")
        : minimumPoints > cpuPoints || cpuPoints > 21
        ? alert("You win!")
        : alert("You lose!");
    }, 400);
  };

  //CPU turn
  const cpuTurn = (minimumPoints) => {
    let cpuPoints = 0;
    do {
      const card = askCard();
      cpuPoints = accumulatePoints(card, playersPoints.length - 1 )
      createCard( card, playersPoints.length - 1);

    } while (cpuPoints < minimumPoints && minimumPoints <= 21);

    decideWinner();

  };

  //Events
  //==========================================================================
  btnAsk.addEventListener("click", () => {
    
    const card = askCard();
    const userPoints = accumulatePoints( card, 0);

    createCard( card, 0);

    if (userPoints > 21) {
      console.warn("You lose!");
      btnAsk.disabled = true;
      btnStop.disabled = true;
      cpuTurn(userPoints);

    } else if (userPoints === 21) {
      console.warn("21, great!");
      btnAsk.disabled = true;
      btnStop.disabled = true;
      cpuTurn(userPoints);
    }

  });

  btnStop.addEventListener("click", () => {
    btnAsk.disabled = true;
    btnStop.disabled = true;

    cpuTurn(playersPoints[0]);
  });

  btnNew.addEventListener("click", () => {
    
    initializeGame();

  });

  return {
    newGame: initializeGame
  };

})();
