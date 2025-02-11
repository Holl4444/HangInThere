import Key from './Key';

export default function Keyboard(props) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  const upperKeys = alphabet
    .slice(0, -6)
    .split('')
    .map((char) => (
      <Key
        fn={props.fn}
        key={char}
        name={char}
        chosen={props.chosen}
        word={props.word}
        disabled={props.isGameOver}
      />
    ));
  const lowerKeys = alphabet
    .slice(-6)
    .split('')
    .map((char) => (
      <Key
        fn={props.fn}
        key={char}
        name={char}
        chosen={props.chosen}
        word={props.word}
        disabled={props.isGameOver}
      />
    ));

  return (
    <section className="keyboard">
      <div className="upper-keys">{upperKeys}</div>
      <div className="lower-keys">{lowerKeys}</div>
    </section>
  );
}
