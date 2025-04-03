import { getIndex } from './utils';
import { MIN_WORD_LENGTH, MAX_WORD_LENGTH } from './words';

export interface WordnikResponse {
  word: string;
  id: number;
  dictionaryEntries: number;
}

let wordnikCache: WordnikResponse[] = []; // Don't need state as this is a module not a component

//TODO: Check API responses and add more controls to wordnik random words!!!

const wordnikUrl = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minLength=${MIN_WORD_LENGTH}&maxLength=${MAX_WORD_LENGTH}&limit=10&api_key=${
  import.meta.env.VITE_WORDNIK_API_KEY
    }`;

export default async function fetchWordnik(): Promise<string | null> {
    try {
        // Any stored words?
      if (wordnikCache.length > 0) {
        const randomIndex = getIndex(wordnikCache.length);
        const wordnikWord = wordnikCache[randomIndex].word;
        wordnikCache = [
          ...wordnikCache.slice(0, randomIndex),
          ...wordnikCache.slice(randomIndex + 1),
        ];
        return wordnikWord.toUpperCase();
        }
        
      //fetch from api
      const response = await fetch(wordnikUrl);
      const wordnikArray = await response.json();
        if (!wordnikArray || wordnikArray.length === 0) return null;
        if (wordnikArray.length > 1) {
            wordnikCache = wordnikArray.slice(1); // stash remaining words
        }
        return wordnikArray[0].word.toUpperCase(); // return the first one

    } catch (err) {
        console.error(`Wordnik API Error: `, err);
        return null;
    }
}