/*
    2C = Two of Clubs
    2D = Two of Diamons
    2H = Two of Hearts
    2S = Two of Spades
*/

let deck = [];
const typesOfCards = ['C', 'D', 'H', 'S'];
const specialsCards = ['A', 'J', 'Q', 'K'];

//=================================================================================
//=================================================================================
//=================================================================================


//this function create a new unordered deck
const createDeck = () => {

    for( let i = 2; i <= 10; i++){
        for(let type of typesOfCards) {
            deck.push(i + type);
        }
    }

    for( let type of typesOfCards){
        for(let spe of specialsCards) {
            deck.push(spe + type);
        }
    }

    deck = _.shuffle( deck );
    console.log(deck);
    return deck;

};

createDeck();

//=================================================================================
//=================================================================================
//=================================================================================

//This function allow to ask a card
const askCard = () => {

    if(deck.length === 0) {
        throw 'There are no cards on deck';
    }

    const askedCard = deck.pop();
    console.log(askedCard);
    console.log(deck);
    return askedCard;

}

// deck = [];
askCard();


//value of asked card
const cardValue = card => {

    const value = card.substring(0, card.length - 1);

    return ( isNaN( value )) ?
            ( value === 'A') ? 11 : 10 
            : value * 1;
    
    // let points = 0;
    // if( isNaN( value )) {
    //     points = ( value === 'A') ? 11 : 10;
    // } else {
    //     points = parseInt(value);
    //     // points = value * 1;

    // }

    // console.log(points);

}

const value = cardValue( askCard() );
console.log( { value } );
