import React, { useState, useEffect } from "react";
import axios from "axios";
import DrawnCards from "./DrawnCards"

const DECK_CARD_BASE_URL = "https://deckofcardsapi.com/api/deck";

/** displays a random card from deck when user clicks a button */

function Cards() {
  const [deckId, setDeckId] = useState(
    {
      data: null,
      isLoading: true
    }
  );

  const [drawnCards, setDrawnCards] = useState([]);

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

  /** calls API to get card from initial deck of cards */
  async function getDrawnCard() {
    const resp = await axios.get(`${DECK_CARD_BASE_URL}/${deckId.data}/draw`);
    if (resp.data.cards[0].length === 0) alert("Error: no cards remaining!");
    else setDrawnCards(drawnCards => [...drawnCards,
    resp.data.cards[0].image]);
  }
  
  async function shuffleDeck() {
    document.querySelector(".draw-card").disabled = true;
    await axios.post(`${DECK_CARD_BASE_URL}/${deckId.data}/shuffle`);
    setDrawnCards([]);
    document.querySelector(".draw-card").disabled = false;
  }

  if (deckId.isLoading) {
    return <p> LOADING ... </p>;
  }

  return (
    <div>
      <button className="shuffle-deck" onClick={shuffleDeck}> SHUFFLE DECK ! </button>
      <button className="draw-card" onClick={getDrawnCard}> get a card ! </button>
      <ul>
        {drawnCards.slice().reverse().map(card => <DrawnCards cardImg={card} key={card} />)}
      </ul>
    </div>
  );

}

export default Cards;