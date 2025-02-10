import { clsx } from 'clsx';

export default function Cat(props) {
  const styles = {
    backgroundColor: props.backgroundColor,
    color: props.color,
  };

  return (
    <button name={props.name} style={styles}>
      <img
        src={`${props.srcName}.png`}
        alt={`A cat named ${props.name}.`}
        className={props.className}
      />
    </button>
  );
}
