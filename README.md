# $${\color{orange}Hang}$$ $${\color{orange}In}$$ $${\color{orange}There}$$

![image](https://github.com/user-attachments/assets/aaa0c2d9-a5c7-466c-bf8b-7616f6d76c45)

## A Hangman Game - with cats.

[Overview](#overview)\
[Screenshots](#screenshots)\
[Requirements](#requirements)\
[The Process](#the-process)\
[Built With](#built-with)\
[Key Skills](#key-skills-employed)\
[Continued Development](#continued-development)


## Overview
The aim is to solve the word puzzle and make your choice from the remaining cats, before the only pet remaining is a spider (8 moves).
With unlimited resources I'd like to have the cats hanging as in the notorious posters and falling when you guess incorrectly - in case anyone was wondering about the name!
Based on the final Capstone project in Scrimba's Learn React Course.

## Screenshots

Start Screen\
![startScreen](https://github.com/user-attachments/assets/0b22ac49-0a7a-4b89-9e8b-ed0363666e23)

Farewell message and key styling on negative guess.\
![farewell](https://github.com/user-attachments/assets/d7301775-bbfc-42fc-bb16-f69ce08a0613)

Green successful guess buttons.\
![successfulGuess](https://github.com/user-attachments/assets/09c6e08a-7b57-462c-a93f-d85454ba24d6)

Loss\
![lose](https://github.com/user-attachments/assets/fa55c7fc-ca7d-4527-9ca8-1354e14a2d35)

Win\
![win](https://github.com/user-attachments/assets/6b5445ff-7d1e-4c70-9f65-6c5431b0afe8)

## Requirements

The app fetches words from an API so is best when connected to the internet but it does have a fallback wordlist for offline use.

- Node,js
- Npm
- A modern browser (I'm using Chrome)

To install dependencies:
```
npm install
```

To start the development server:
```
npm run dev
```

When ready to build for production:
```
npm run build
```
N.B
The app uses React Strict Mode so effects run twice in development.

## The Process
I tried to keep the file structure simple with this project to grow my understanding of the React/Vite set up.\
I really struggled to find a free API with sufficient parameters like flexible length, british english spelling and reading level. The API results are currently more suited to a young hearted adult player rather than the younger age range I had initially envisioned.\
Revisiting the project ocassionally after learning a new skill - for example I switched from JS to TS and added Sentry for practice!\
I've updated to include a more responsive design for mobile devices.

## Built With

REACT - VITE - TS - TSX - HTML - CSS

API: random-word-api.herokuapp.com

## Key Skills Employed

- Iteratively planning before coding.
- Prop Drilling and controlling state.
- Understanding file structure.
- It was fascinating to learn a little more about accessibility (aria-labels, aria-live, and "sr-only" sections). I'll have to look more into this, as well as learning about contrasting colours.

## Continued Development

- Linking to an API to pull word lists in. ✔️
- Add new word option while mid game.
- Counter to track turns left before spider.
- Making the app more engaging: adding a transition to make losing a cat more obvious, enlarging and centering the spider on loss and adding sounds.
- If the app gets any larger, to try createContext.
- Improved styling for different devices. 
- To organise the folder structure.

  ## Author
  @Holl4444\
  Based on Scrimba's final Capstone project in the Learn React Course. 
