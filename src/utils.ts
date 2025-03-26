import { WordObject } from './wordsDatamuse';

const THEMES = [
  'cat',
  'kitten',
  'feline',
  'mog',
  'moggy',
  'spider',
  'web',
  'arachnid',
];

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

export function getIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

export function getTheme(): string {
  return THEMES[getIndex(THEMES.length)];
}

export function handleErrorsDatamuse(response: Response, data: WordObject[]): boolean {
  if (response.status !== 200) {
    console.error(`Error ${response.status}: ${response.statusText}`);
    return false;
  }

  if (!data || data.length === 0) {
    console.error('No words received from API');
    return false;
  }

  if (
    !Array.isArray(data) ||
    !data.every(
      (item) =>
        typeof item === 'object' && 'word' in item && 'score' in item
    )
  ) {
    console.error('Malformed data received');
    return false;
  }

  return true;
}

// Possible later use
// import { MIN_WORD_LENGTH, MAX_WORD_LENGTH } from "./words";

// export function getRandomWordLength(): number {
//   return Math.floor(
//     Math.random() * (MAX_WORD_LENGTH - MIN_WORD_LENGTH + 1) +
//       MIN_WORD_LENGTH
//   );
// }