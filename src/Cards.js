import React, { useState, useEffect } from "react";
import axios from "axios";

const DECK_CARD_BASE_URL = "https://deckofcardsapi.com/api/deck";

/** displays a random card from deck when user clicks a button */

function Cards() {
  const [deckId, setDeckId] = useState(
    {
      data: null,
      isLoading: true
    }
  );

  const [card, setCard] = useState("");

/** calls API to fetch initial deck of cards */
  useEffect(function fetchDeck() {
    async function getDeck() {
      const resp = await axios.get(`${DECK_CARD_BASE_URL}/new/shuffle`);
      setDeckId(
        {
          data: resp.data.deck_id,
          isLoading: false
        }
      );
    };

    getDeck();

  }, []);

  console.log("DECK ID", deckId);

  /** calls API to get card from initial deck of cards */
  async function getCard() {
    const resp = await axios.get(`${DECK_CARD_BASE_URL}/${deckId.data}/draw`);
    if (resp.data.cards[0].length === 0) alert("Error: no cards remaining!");
    else setCard(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
  }


  if (deckId.isLoading) {
    return <p> LOADING ... </p>;
  }

  return (
    <div>
      <button onClick={getCard}> get a card ! </button>
      <div>{card}</div>
    </div>
  );

}

export default Cards;