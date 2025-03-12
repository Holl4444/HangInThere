import { words } from './words';

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function getFarewellText(cat) {
  const options = [
    `Farewell, ${cat.name}`,
    `Adios, ${cat.name}`,
    `R.I.P, ${cat.name}`,
    `We'll miss you, ${cat.name}`,
    `Oh no, not ${cat.name}!`,
    `${cat.name} bites the dust`,
    `Gone but not forgotten, ${cat.name}`,
    `The end of ${cat.name} as we know it`,
    `Off into the sunset, ${cat.name}`,
    `${cat.name}, it's been real`,
    `${cat.name}, your watch has ended`,
    `${cat.name} has left the building`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
