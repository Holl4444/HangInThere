export default function Keyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  const upperKeys = alphabet
    .slice(0, -6)
    .split('')
    .map((char) => (
      <button key={char} className="keys">
        {char}
      </button>
    ));
  const lowerKeys = alphabet
    .slice(-6)
    .split('')
    .map((char) => (
      <button key={char} className="keys">
        {char}
      </button>
    ));

  return (
    <section className="keyboard">
      <div className="upper-keys">{upperKeys}</div>
      <div className="lower-keys">{lowerKeys}</div>
    </section>
  );
}
