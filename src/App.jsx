import { useState } from 'react';
import { Cats } from './Cats.js';
import Cat from './Cat.jsx';
import Keyboard from './Keyboard.jsx';

export default function App() {
  const [catArray, setCatArray] = useState(Cats);
  const [currentWord, setCurrentWord] = useState('react');

  const renderWord = currentWord
    .split('')
    .map((char, index) => (
      <span key={index}>{char.toUpperCase()}</span>
    ));

  const currentCats = catArray.map((cat) => (
    <Cat
      key={cat.name}
      name={cat.name}
      backgroundColor={cat.backgroundColor}
      color={cat.color}
      srcName={cat.srcName}
    />
  ));

  return (
    <main>
      <section className="gameBoard">
        <header>
          <h1 className="lobster-regular">Hang In There</h1>
          <p>
            Guess the word in under 8 attempts to keep the kitties
            safe.
          </p>
        </header>
        <article className="msg-container">
          <h2>You Win!</h2>
          <p> Well Done! 🐟</p>
        </article>
        <div className="cats">{currentCats}</div>
        <div className="word-div">{renderWord}</div>
        <div className="keyboard">
          <Keyboard />
        </div>
        <button className="reset">New Game</button>
      </section>
    </main>
  );
}

/**
 * Project planning:
 *
 * Questions to ask yourself before writing any code:
 *
 * - What are the main containers of elements I need
 *   in this app?
 * Board
 *  - Intro
 *      - Title
 *      - Instruction
 *  - Message container
 *      - Message
 *  - Victim Container
 *      - Victims
 *  - Word
 *      - Letters
 *  - Alphabet
 *      - Letters
 *  - Reset
 *
 *
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 *
 *      State of the word
 *      State of the victims
 *
 * - How will the user interact with the app? What
 *   events do I need to handle?
 *
 *      New Game Button
 *      Letter Choice
 *      Victim status indicator
 *      Letter checked status indicator
 *      Win / Loss Message
 *
 */
