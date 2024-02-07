# Wordle! v2

## Video

Here is a [link](https://youtu.be/K8BLg-l89-Q) to a video demonstration of the app.

## Intro

Wordle is a popular online word guessing game where players attempt to guess a five-letter word by submitting guesses and receiving feedback on whether each letter is correct, incorrect, or in the correct position. This addictive game has gained a massive following due to its simple yet engaging gameplay and its ability to test and improve players' vocabulary and problem-solving skills.

This project is a React based implementation of the game Wordle. It also includes functional user authentication,
and allows users to track their stats.

The web app itself connects to Atlas App Services using [Remote MongoDB Queries](https://mongodb.com/docs/realm/web/mongodb/) from the Realm SDK.


## Set Up and Run the App


To run the app locally, install its dependencies and then call the run script:

### `npm install`

### `npm start`


## Metadata File

The client uses a metadata file, ``src/atlasConfig.json``, to configure
its connection to Atlas App Services.

## React Components

### App.jsx, RealmApp.jsx
The App.jsx component lays out the groundwork for the rest of the app to function.
It imports various app related functions from RealmApp.jsx, this jsx file contains the app provider for tracking the user and authenticating.

I decided to use React Router to create a clientside routing experience for the app.
There are a few reasons for this, firstly it allows for very fast and responsive page changes without having to communicate with a server for new files each time a page loads. This speeds up load times and improves the overall user experience. Secondly, given that this is a smaller scale app, I did not have the need for any major serverside functionalities. In fact, the main wordle game mostly runs clientside as well.

### Layout and Protected Layout

These are the layouts for when you first visit the page and when you are a logged in user.

### MoreInfo

This app was built on top of a template provided by MongoDb for React applications. However, a lot of the functions were modified to fit my use case and some of the custom hooks were unused. They remain in the codebase in case I need them in future updates.

### Wordle.jsx

This is the main app, the Wordle game. The main component is coded in Wordle.jsx and child components are contained in the folders: Gamestate, Keyboard, WordGrid, and Wordlebank (a word bank).

Most of the game logic is coded in this jsx as well. The game board is stored in state and updates as the user types in letters and submits words. When the state of the board is modified, the data is transferred to the children through props and app context. This allows the child components to modify relevant classes and in conjunction with CSS will display animations and color letters appropriately.

By far the largest function is the onEnter function, which checks the word that the user submits for its correctness. This function could have likely been split up into smaller functions, but I have decided to keep it as is for now.

It functions by first checking if a 5-letter word was submitted. Otherwise, it prompts the user to input a 5 letter word. It then checks if the word is real. This is done via an API call to a word API using RapidAPI. If the word is real, it then checks each letter for its correctness. If the letter is not in the wordle, it labels it a wrong guess in state. Otherwise, if the word is elsewhere or correct, it labels it as such in state. The game state is then updated to reflect the current attempt number and a Game Over check is made (the app checks if you correctly guessed the wordle or if you are out of attempts).

It uses the custom hook useStats that is in the hooks folder to communicate with the MongoDb database and update user data when the user wins or loses.

### useStats, useStats_mql.jsx, useCollection

This custom hook allows the app to communicate with the database and modify user data accordingly. the hook also includes a loading state for when the user switches to a page which needs to load information from the database. This ensures that when a user clicks on that page, the page only displays once the relevant data has successfully been loaded.

### Other pages: Rules, UserStatsPage, WelcomePage

Rules: this page is a summary of the rules of the game for new players, it is accessible whether the user is logged in or not.

UserStatsPage: this is a small page to display user stats. Future implementations of new stats can easily be added to this page using the useStats hook. There is not much actual business logic in this component since most of it is conveniently handled by the useStats hook, the logic is simply in the rendering of the component.

WelcomePage: this page is inherited from the template provided by MongoDb, it allows users to sign up and log in. It also addresses errors in signup or login directly on the page and displays error messages to the user so that they know what went wrong.

## Hosting

### Single Page App on GitHub Pages

The app is hosted on GitHub Pages, but gh pages does not natively support React apps that handle routing clientside. Therefore, I used a solution available at [this page](https://github.com/rafgraph/spa-github-pages#readme) on Github. For the way this solution works and why it is necessary read the README.md included on that page for reference.

To visit the hosted version of the app, click on [this link](https://tony2450.github.io/wordle2-MERN).

## Some issues, drawbacks and future plans

Some issues currently are that the actual word selection is done via an API call. This is the only part of the game that requires a stable internet connection. For players with a slow connection, this can slow down the game significantly. Given that the rest of the game is clientside, it would be interesting to set up a larger local word bank of 5 letter words for both the wordle selection process as well as the checking if the submitted word is real.

Of note, useWatch and the util-hooks in the hooks folder are unused in the actual app. As well, there is a createObjectId helper function in utils.js that is unused. This creates some clutter in the codebase and increases folder size. I have chosen to leave them in for now in case i need to use them in future updates. The createObjectId and user data document creation is actually handled directly in the MongoDb app management using some custom code that I wrote to activate on user creation.

Another drawback is that, as it stands, the user stats page is somewhat barebones and does not display much useful information for new users. This could be solved in future updates by adding dropdown menus and statistics that are queried from the entire user base to give the user an idea of their standing compared to other players as well as which words are considered most or least difficult.

Finally future plans include potentially adding options for other languages, fleshing out the user stats, as well as refactoring some of the code and adding clearer comments to the codebase.

Another addition could be more robust user authentication functionalities. Such as sending users a confirmation email. And allowing users to modify their password or resetting their password if it is forgotten.

