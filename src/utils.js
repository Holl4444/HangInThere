const words = [
  'REACT',
  'JAVASCRIPT',
  'DEVELOPER',
  'PROGRAMMING',
  'COMPUTER',
];

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function getFarewellText(cat) {
  return `Goodbye ${cat.name}! We'll miss you!`;
}
