import { CatProps } from './Cats';
;
export default function Cat({
  backgroundColor,
  color,
  className,
  name,
  srcName,
}: CatProps) {
  const styles = {
    backgroundColor,
    color: color,
  };

  return (
    <button
      className={className}
      name={name}
      style={styles}
    >
      <img
        src={`${srcName}.png`}
        alt={`A cat named ${name}.`}
        className={className}
      />
    </button>
  );
}
