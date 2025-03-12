import { clsx } from 'clsx'; // Allows conditional classNaming
import { HandleLetterClick } from './App';
interface KeyProps {
  fn: HandleLetterClick;
  name: string;
  chosen: string[];
  word: string;
  disabled: boolean;
}

export default function Key({ fn, name, chosen, word, disabled }: KeyProps) {
  const isChosen = chosen.includes(name);
  const isCorrect = isChosen && word.includes(name);
  const isWrong = isChosen && !word.includes(name);

  const className = clsx({
    keys: true,
    'letter-right': isCorrect,
    'letter-wrong': isWrong,
  });

   // Already has a key prop. This button inside every key is a single element not a list.
  return (
    <button
      name={name}
      className={className}
      onClick={fn}
      disabled={disabled || isChosen}
    >
      {name}
    </button>
  );
}
