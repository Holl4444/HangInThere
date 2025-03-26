import { CatProps } from './Cats';
import styles from './Cat.module.css';

export default function Cat({
  backgroundColor,
  color,
  className,
  name,
  srcName,
}: CatProps) {
  const inlineStyles = {
    backgroundColor,
    color: color,
  };

   return (
    <button
      className={className}
      name={name}
      style={inlineStyles}
    >
      <img
        src={`${srcName}.png`}
        alt={`A cat named ${name}.`}
        className={className}
      />
       <p className='cat-name'>{name}</p>
    </button>
  );
}
