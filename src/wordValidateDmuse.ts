import { getIndex } from './utils';
import { MIN_WORD_LENGTH, MAX_WORD_LENGTH } from './wordsBackup';

export interface WordObject {
  word: string;
  score: number;
}

export function validateWords(words: WordObject[]): string[] | null {
  const validWords: string[] = [];
  const SCORE_THRESHOLD = 80000;

  for (const obj of words) {
    const word = obj.word.toUpperCase();
    if (
      /^[A-Z]+$/.test(word) &&
      !validWords.includes(word) &&
      obj.score > SCORE_THRESHOLD &&
      word.length >= MIN_WORD_LENGTH &&
      word.length <= MAX_WORD_LENGTH
    ) {
      validWords.push(word);
    }
  }

  return validWords.length > 0 ? validWords : null;
}

export function selectFinalWord(validWords: string[]): string | null {
  if (!validWords || validWords.length === 0) return null;

  const randomIndex = getIndex(validWords.length);
  const chosenWord = validWords[randomIndex];

  return chosenWord;
}
