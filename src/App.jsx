import { useState, useEffect, useCallback, useRef } from 'react';
import { Cats } from './Cats.js';
import Cat from './Cat.jsx';
import Keyboard from './Keyboard.jsx';
import { clsx } from 'clsx';

export default function App() {
  const [catArray, setCatArray] = useState(Cats);
  const [currentWord, setCurrentWord] = useState('react'.toUpperCase());
  const [chosenLetters, setChosenLetters] = useState([]);
  const wrongGuessRef = useRef(0);

  const wordElement = currentWord
    .split('')
    .map((char, index) => (
      <span key={index}>
        {chosenLetters.includes(char.toUpperCase())
          ? char.toUpperCase()
          : ''}
      </span>
    ));

  const wrongGuessCount = chosenLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  wrongGuessCount > 7 && console.log('Game Over')

  //Make an array of cats we arent already hiding, including their index in original array
  //Choose one of these cats at random and and the lose class to hide it
  const loseCat = useCallback(() => {
    const remainingCats = catArray
      .map((cat, index) =>
        cat.className &&
        !cat.className.includes('lose') &&
        !cat.className.includes('spider')
          ? { cat, index: index }
          : null
      )
      .filter(Boolean);

    if (remainingCats.length === 0) {
      return; // Ensure there are remaining cats
    }

    const randomCatIndx =
      remainingCats[Math.floor(Math.random() * remainingCats.length)]
        .index;

    setCatArray(
      catArray.map((prev, index) =>
        index === randomCatIndx
          ? { ...prev, className: `${prev.className} lose` }
          : prev
      )
    );
  }, [catArray]);

  useEffect(() => {
    if (wrongGuessCount > wrongGuessRef.current) {
      loseCat();
    }
    wrongGuessRef.current = wrongGuessCount;
  }, [wrongGuessCount, loseCat]);

  const currentCats = catArray.map((cat) => (
    <Cat
      key={cat.name}
      name={cat.name}
      backgroundColor={cat.backgroundColor}
      color={cat.color}
      srcName={cat.srcName}
      className={clsx({
        cat: true,
        lose: cat.className.includes('lose'),
      })}
    />
  ));

  function addChosenLetter(e) {
    const letter = e.target.name;
    if (!chosenLetters.includes(letter)) {
      setChosenLetters((chosenLetters) => [...chosenLetters, letter]);
    }
  }

  return (
    <main>
      <section className="gameBoard">
        <header>
          <h1 className="lobster-regular">Hang In There</h1>
          <p>
            Guess the word in under 8 attempts to take home a kitty. After that you get a pet spider instead.
          </p>
        </header>
        <article
          className={clsx({
            'msg-container': true,
            fail: wrongGuessCount > 7,
          })}
        >
          {wrongGuessCount > 7 ? (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better luck next time 🐕‍🦺</p>
            </>
          ) : (
            <>
              <h2>You Win!</h2>
              <p> Well Done! 🐟</p>
            </>
          )}
        </article>
        <div className="cats">{currentCats}</div>
        <div className="word-div">{wordElement}</div>
        <div className="keyboard">
          <Keyboard
            fn={addChosenLetter}
            chosen={chosenLetters}
            word={currentWord}
          />
        </div>
        <button className="new-game">New Game</button>
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
 *  - Keyboard
 *      - Keys A-Z
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
 * setCatArray:
 *  On wrongGuess, of the cats without the class lose
 * (cat, index) add the class lose to a random index
 *
 *
 */
