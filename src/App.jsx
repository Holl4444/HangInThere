import React from 'react';

export default function Hangman() {
  return (
    <main>
      <section className="gameBoard">
        <header>
          <h1>Hang In There</h1>
          <p>Guess the word in under 8 attempts to keep the kitties safe.</p>
        </header>
        <article className="msg-container"></article>
        <div className="cat-basket">
          [cats]
        </div>
        <div className="word-div">
          [letters]
        </div>
        <div className="alphabet">
          [letters]
        </div>
        <button className="reset">New Game</button>
      </section>
    </main>
  );
}

/**
 * Project planning:
 *
 * Questions to ask yourself before writing any code:
 *
 * - What are the main containers of elements I need
 *   in this app?
 * Board
 *  - Intro
 *      - Title
 *      - Instruction
 *  - Message container
 *      - Message
 *  - Victim Container
 *      - Victims
 *  - Word
 *      - Letters
 *  - Alphabet
 *      - Letters
 *  - Reset
 *
 *
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 *
 *      State of the word
 *      State of the victims
 *
 * - How will the user interact with the app? What
 *   events do I need to handle?
 *
 *      New Game Button
 *      Letter Choice
 *      Victim status indicator
 *      Letter checked status indicator
 *      Win / Loss Message
 *
 */
