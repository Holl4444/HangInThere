import { words } from './words';

const MIN_WORD_LENGTH = 5;
const MAX_WORD_LENGTH = 9;

export async function getRandomApiWord(): Promise<
  string | null
> {
  const wordLength = Math.floor(
    Math.random() * (MAX_WORD_LENGTH - MIN_WORD_LENGTH + 1) +
      MIN_WORD_LENGTH
  );
  const url = `https://random-word-api.herokuapp.com/word?length=${wordLength}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error contacting API: ${response.status}`);
    }
    const wordArray = await response.json();
    const word = wordArray[0];
    // console.log(word);
    return word;
  } catch (err) {
    console.error(`Error: `, err);
    return null; // Helps make conditional logic easier for fallback word.
  }
}

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
