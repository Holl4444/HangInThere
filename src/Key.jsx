import { clsx } from 'clsx';

export default function Key(props) {
  const chosenLetters = props.chosen;
  const isChosen = chosenLetters.includes(props.name);
  const isCorrect = isChosen && props.word.includes(props.name);
  const isWrong = isChosen && !props.word.includes(props.name);
  //Toggle classes for key colour css
  const className = clsx({
    keys: true,
    'letter-right': isCorrect,
    'letter-wrong': isWrong,
  });

  return (
    <button
      key={props.name}
      name={props.name}
      className={className}
      onClick={props.fn}
    >
      {props.name}
    </button>
  );
}
