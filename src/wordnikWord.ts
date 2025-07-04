import { getIndex } from './utils';
import { MIN_WORD_LENGTH, MAX_WORD_LENGTH } from './wordsBackup';

export interface WordnikResponse {
  word: string;
  id: number;
  dictionaryEntries: number;
}

let wordnikCache: WordnikResponse[] = []; // Don't need state as this is a module not a component

//MinCorpusCount controls how common the words are. Higher is more common.

const wordnikUrl = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minLength=${MIN_WORD_LENGTH}&maxLength=${MAX_WORD_LENGTH}&limit=10&minCorpusCount=5000&excludePartOfSpeech=given-name,family-name,proper-noun&api_key=${
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
      return wordnikWord;
    }

    //fetch from api;
    const response = await fetch(wordnikUrl);
    const wordnikArray: WordnikResponse[] = await response.json();
    if (!wordnikArray || wordnikArray.length === 0) return null;
    const regex = /^[a-zA-Z]+$/;
    const romanNumeralRegex = /^[IVXLCDM]+$/; // Unbelievably needed :)

    const cleanWordnikArray: WordnikResponse[] = wordnikArray
      .map(word => ({ ...word, word: word.word.toUpperCase() }))
      .filter(word => regex.test(word.word) &&!romanNumeralRegex.test(word.word));
    
    if (cleanWordnikArray.length > 1) {
      console.log(cleanWordnikArray);
      wordnikCache = cleanWordnikArray.slice(1); // stash remaining words
    }
    return cleanWordnikArray[0].word.toUpperCase(); // return the first one
  } catch (err) {
    console.error(`Wordnik API Error: `, err);
    return null;
  }
}
