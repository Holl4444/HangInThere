import { clsx } from 'clsx';

export default function Key(props) {
  const isChosen = props.chosen.includes(props.name);
  const isCorrect = isChosen && props.word.includes(props.name);
  const isWrong = isChosen && !props.word.includes(props.name);

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
      disabled={props.disabled || isChosen}
    >
      {props.name}
    </button>
  );
}
