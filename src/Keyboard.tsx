import Key from './Key';
import { HandleLetterClick } from './App';

export interface KeyboardProps{    
  fn: HandleLetterClick
  chosen: string[],
  word: string;
  isGameOver: boolean,
}

export default function Keyboard({fn, chosen, word, isGameOver}: KeyboardProps) { 
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  const upperKeys = alphabet
    .slice(0, -6)
    .split('')
    .map((char) => (
      <Key
        fn={fn}
        key={char}
        name={char}
        chosen={chosen}
        word={word}
        disabled={isGameOver}
      />
    ));
  const lowerKeys = alphabet
    .slice(-6)
    .split('')
    .map((char) => (
      <Key
        fn={fn}
        key={char}
        name={char}
        chosen={chosen}
        word={word}
        disabled={isGameOver}
      />
    ));

  return (
    <section className="keyboard">
      <div className="upper-keys">{upperKeys}</div>
      <div className="lower-keys">{lowerKeys}</div>
    </section>
  );
}
