import { useState } from 'react';
import { Cats } from './Cats.js';
import Cat from './Cat.jsx';
import Keyboard from './Keyboard.jsx';
import { clsx } from 'clsx';
import { getFarewellText, getRandomWord } from './utils.js';
import Confetti from 'react-confetti';

/*TODO
Transition cat disappearance
Enlarge and centre spider img on isLoss
Add sounds
*/

export default function App() {
  const [catArray, setCatArray] = useState(Cats);
  const [currentWord, setCurrentWord] = useState(() =>
    getRandomWord().toUpperCase()
  );
  const [chosenLetters, setChosenLetters] = useState([]);
  const wrongGuessCount = chosenLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isWin = currentWord
    .split('')
    .every((letter) => chosenLetters.includes(letter));
  const isLoss = wrongGuessCount > Cats.length - 2;
  const isGameOver = isWin || isLoss;

  const wordElement = currentWord.split('').map((char, index) => {
    const revealLetter =
      chosenLetters.includes(char.toUpperCase()) || isLoss;
    const letterClassName = clsx({
      'missed-letter': isLoss && !chosenLetters.includes(char),
    });
    return (
      <span key={index} className={letterClassName}>
        {revealLetter ? char.toUpperCase() : ''}
      </span>
    );
  });

  const lastChosenLetter = chosenLetters[chosenLetters.length - 1];
  const isInputWrong =
    lastChosenLetter && !currentWord.includes(lastChosenLetter);

  function addChosenLetter(e) {
    const letter = e.target.name;
    if (chosenLetters.includes(letter) || isGameOver) return;

    setChosenLetters((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      const remainingCats = catArray
        .map((cat, index) =>
          cat.className &&
          !cat.className.includes('lose') &&
          !cat.className.includes('spider')
            ? { cat, index }
            : null
        )
        .filter(Boolean);

      if (remainingCats.length > 0) {
        const randomCatIdx =
          remainingCats[
            Math.floor(Math.random() * remainingCats.length)
          ].index;

        setCatArray((prev) =>
          prev.map((cat, index) =>
            index === randomCatIdx
              ? {
                  ...cat,
                  className: `${cat.className} lose`,
                  lost: true,
                }
              : { ...cat, lost: false }
          )
        );
      }
    }
  }

  function resetGame() {
    setCurrentWord(getRandomWord().toUpperCase());
    setCatArray(Cats);
    setChosenLetters([]);
  }

  function renderMsg() {
    const lostCat = catArray.find((cat) => cat.lost);
    const farewellMsg = lostCat && getFarewellText(lostCat);

    if (!isGameOver) {
      if (isInputWrong) {
        return (
          <>
            <h2></h2>
            <p>{farewellMsg}</p>
          </>
        );
      } else {
        return null;
      }
    }
    if (isWin) {
      return (
        <>
          <h2>You Win!</h2>
          <p>Well Done! 🐟</p>
        </>
      );
    }
    if (isLoss) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Enjoy your pet spider! 🕷️🕸️</p>
        </>
      );
    }
  }

  return (
    <section className="gameBoard">
      {isWin && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1 className="lobster-regular">Hang In There</h1>
        <p>
          Guess the word in under 8 attempts to take home a kitty.
          After that you get a pet spider instead.
        </p>
      </header>
      <section
        className={clsx({
          'msg-container': true,
          hidden: !isGameOver && !isInputWrong,
          fail: isLoss,
          win: isWin,
        })}
        aria-live="polite"
        role="messages"
      >
        {renderMsg()}
      </section>
      <section className="cats">
        {catArray.map((cat) => (
          <Cat
            key={cat.name}
            name={cat.name}
            backgroundColor={cat.backgroundColor}
            color={cat.color}
            srcName={cat.srcName}
            lost={cat.lost}
            className={clsx({
              cat: true,
              lose: cat.className.includes('lose'),
            })}
          />
        ))}
      </section>
      <section className="word-div">{wordElement}</section>
      <section className="sr-only" aria-live="polite" role="messages">
        <p>
          {currentWord.includes(lastChosenLetter)
            ? `Correct! The letter ${lastChosenLetter} is in the word.`
            : `Sorry, ${lastChosenLetter} isn't in the word.`}
          You have {Cats.length - 1 - wrongGuessCount} attempts
          remaining.
        </p>
        <p>
          Current word:
          {currentWord
            .split('')
            .map((letter) =>
              chosenLetters.includes(letter) ? letter + '.' : 'blank.'
            )
            .join('')}
        </p>
      </section>
      <section className="keyboard">
        <Keyboard
          fn={addChosenLetter}
          chosen={chosenLetters}
          word={currentWord}
          isGameOver={isGameOver}
        />
      </section>
      <button
        className={clsx({
          'new-game': true,
          hidden: !isGameOver,
        })}
        onClick={resetGame}
      >
        New Game
      </button>
    </section>
  );
}
