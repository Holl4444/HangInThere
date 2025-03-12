import { words } from './words';

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function getFarewellText(catName: string) {
  const options = [
    `Farewell, ${catName}`,
    `Adios, ${catName}`,
    `R.I.P, ${catName}`,
    `We'll miss you, ${catName}`,
    `Oh no, not ${catName}!`,
    `${catName} bites the dust`,
    `Gone but not forgotten, ${catName}`,
    `The end of ${catName} as we know it`,
    `Off into the sunset, ${catName}`,
    `${catName}, it's been real`,
    `${catName}, your watch has ended`,
    `${catName} has left the building`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
