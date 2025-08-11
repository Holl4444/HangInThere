import { useState, useEffect } from 'react';
import { Cats, CatProps } from './data/Cats.ts';
import Cat from './components/Cat';
import Keyboard from './components/Keyboard.tsx';
import { clsx } from 'clsx'; //Helps with conditional CSS classes
import getWord from './services/wordFlow.ts';
import { getRandomDbWord } from './services/wordsBackup';
import { getFarewellText, getLoadingText } from './utils';
import Confetti from 'react-confetti';

type Letter = string; // Just makes code more readable

interface RemainingCat {
  cat: CatProps;
  index: number;
}

// create (and export) a type for handling button click events
export type HandleLetterClick = (
  e: React.MouseEvent<HTMLButtonElement>
) => void; //Doesn't return anything

export default function App() {
  const [catArray, setCatArray] = useState<CatProps[]>(Cats);
  // Show local word immediately for better UX
  const [currentWord, setCurrentWord] = useState('');
  const [chosenLetters, setChosenLetters] = useState<Letter[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);

  // useEffect handles side-effects (outside normal rendering flow)
  useEffect(() => {
    let isMounted = true;

    async function loadInitialWord() {
      try {
        const word = await getWord();

        if (isMounted) {
          setCurrentWord(word);
        }
      } catch (err) {
        console.error('Failed to load word: ', err);

        // if (isMounted) {
        setCurrentWord(getRandomDbWord().toUpperCase());
        // }
      }
    }

    loadInitialWord(); // dependency array

    //Cleanup
    return () => {
      isMounted = false;
    };
  }, []); // Just on first render (new game handled in resetGame())

  const wrongGuessCount = chosenLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isWin =
    currentWord.length > 3 &&
    currentWord
      .split('')
      .every((letter: Letter) => chosenLetters.includes(letter));
  const isLoss = wrongGuessCount > Cats.length - 2; // As the spider is there too
  const isGameOver = isWin || isLoss; // Keeps it clean instead of repeating isWin || isLoss. One prop to pass

  // reveal a letter or show blank
  const wordElement = currentWord
    .split('')
    .map((char: Letter, index: number) => {
      const revealLetter =
        chosenLetters.includes(char.toUpperCase()) || isLoss;
      const letterClassName = clsx({
        //styling all
        'missed-letter': isLoss && !chosenLetters.includes(char), //on game loss any unguessed letters become red in word elemenet
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

  const addChosenLetter: HandleLetterClick = (e) => {
    const button = e.target as HTMLButtonElement;
    const letter = button.name as Letter;
    if (chosenLetters.includes(letter) || isGameOver) return;

    setChosenLetters((prev) => [...prev, letter]);

    /*Look at all cats and find those that: haven't lost yet + aren't the spider.
      Track their position and make a list of only these available cats*/
    if (!currentWord.includes(letter)) {
      const remainingCats = catArray
        .map((cat, index) =>
          cat.className &&
          !cat.className.includes('lose') &&
          !cat.className.includes('spider')
            ? { cat, index }
            : null
        )
        .filter(Boolean) as RemainingCat[]; // removes all null cats and tells TS these are all RemainingCat types now.

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
  };

  async function resetGame() {
    setCatArray(Cats);
    setChosenLetters([]);
    setCurrentWord('Loading');

    try {
      const word = await getWord();
      setCurrentWord(word);
    } catch (err) {
      console.error('Failed to load word on reset: ', err);
      setCurrentWord(getRandomDbWord().toUpperCase());
    }
  }

  function renderMsg() {
    const loadingMsg = getLoadingText();
    if (currentWord === 'Loading' || currentWord === '') {
      return (
        <>
          <h2>Loading</h2>
          <p>{loadingMsg}</p>
        </>
      );
    }

    const lostCat = catArray.find((cat) => cat.lost);
    const farewellMsg = lostCat && getFarewellText(lostCat.name);

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

  function showPopUp() {
    setIsPopup(true);
  }

  function hidePopUp() {
    setIsPopup(false);
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
        <details>
          <summary>How to Play</summary>
          <p>
            Guess the word in under 8 attempts to take home a kitty.
            After that you get a pet spider instead.
          </p>
        </details>
      </header>
      <section
        className={clsx({
          'msg-container': true,
          hidden:
            !isGameOver &&
            !isInputWrong &&
            currentWord !== 'Loading' &&
            currentWord !== '',
          fail: isLoss,
          win: isWin,
        })}
        aria-live="polite"
        role="messages"
      >
        {renderMsg()}
      </section>
      <section className="popupCovered">
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
        <section
          className="sr-only"
          aria-live="polite"
          role="messages"
        >
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
              .map(
                (letter: Letter) =>
                  chosenLetters.includes(letter)
                    ? letter + '.'
                    : 'blank.' // The dot helps screen readers read letters (or 'blank.'s) aloud separately
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

        <button className="testBtn" onClick={showPopUp}>Test Me</button>

        <section className={clsx({
            'popUp': true,
            hidden: !isPopup,
          })}>
          <label htmlFor="spellingList">
            Add the words you would like to practice...
          </label>
          <textarea
            className="open-sans-reg"
            name="spellingList"
            id="spellingList"
            placeholder={`• Hirsute\n• Fluffy\n• Arachnid`}
            defaultValue={`• eg. Arachnid\n• \n• \n• \n• \n• \n• \n• \n• \n• `}
          ></textarea>
          <div className="popupBtnDiv">
            <button className="popupBtn">Test</button>
            <button className="popupBtn" onClick={hidePopUp}>Back</button>
          </div>
        </section>
      </section>
    </section>
  );
}
