import { CatProps } from '../data/Cats';

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
    <button className={className} name={name} style={inlineStyles}>
      {/* Using the picture tag to specify more than one image source. The browser will then pick the first supported image source or fallback to the img tag */}
      <picture>
        <source srcSet={`${srcName}.webp`} type="image/webp" />
        <img
          src={`${srcName}.png`}
          alt={`A cat named ${name}.`}
          className={className}
        />
      </picture>
      <p className="cat-name">{name}</p>
    </button>
  );
}
