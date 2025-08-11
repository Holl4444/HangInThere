import fetchWordnik from './wordnikWord';
import { getDmuseWord, getRandomDbWord } from './wordsBackup';

export default async function getWord(): Promise<string> {
  // Try Wordnik API
  try {
    console.log('Attempting Wordnik fetch');
    const wordnikWord = await fetchWordnik();
    if (wordnikWord) {
      console.log('Retrieved Wordnik word: ', wordnikWord);
      // Already uppercase
      return wordnikWord;
    }
  } catch (err) {
    console.error('Wordnik API failed: ', err);
  }

  try {
    console.log('Attempting Datamuse fetch');
    const datamuseWord = await getDmuseWord();
    if (datamuseWord) {
      console.log('Retrieved Datamuse word: ', datamuseWord);
      //Already uppercase
      return datamuseWord;
    }
  } catch (err) {
    console.error('Datamuse API failed: ', err);
  }

  console.log('Using local word list');
  return getRandomDbWord().toUpperCase();
}
