# My Wordle Clone v2


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

It uses the custom hook useStats that is in the hooks folder to communicate with the MongoDb database and update user data when the user wins or loses.

### useStats, useStats_mql.jsx, useCollection

This custom hook allows the app to communicate with the database and modify user data accordingly. the hook also includes a loading state for when the user switches to a page which needs to load information from the database. This ensures that when a user clicks on that page, the page only displays once the relevant data has successfully been loaded.

### Other pages: Rules, UserStatsPage, WelcomePage

Rules: this page is a summary of the rules of the game for new players, it is accessible whether the user is logged in or not.

UserStatsPage: this is a small page to display user stats. Future implementations of new stats can easily be added to this page using the useStats hook. There is not much actual business logic in this component since most of it is conveniently handled by the useStats hook, the logic is simply in the rendering of the component.

WelcomePage: this page is inherited in full from the template provided by MongoDb, it allows users to sign up and log in. It also addresses errors in signup or login directly on the page and displays error messages to the user so that they know what went wrong.

## Hosting

### Single Page App on GitHub Pages

The app is hosted on GitHub Pages, but gh pages does not natively support React apps that handle routing clientside. Therefore, I used a solution available at [this page](https://github.com/rafgraph/spa-github-pages#readme) on Github. For the way this solution works and why it is necessary read the README.md included on that page for reference.

To visit the hosted version of the app, click on [this link](https://tony2450.github.io/wordle2-MERN).

