import './App.css'
import React, { useEffect } from 'react';
import { useState } from 'react';
import WordGrid from './Wordgrid/Word-grid';
import Keyboard from './Keyboard/keyboard';
import { createContext } from 'react';
import GameOver from './Gamestate/GameOver';
import wordBank from './Wordlebank/wordle-bank.txt';
import { useStats } from "../hooks/useStats";

export const WordleContext = createContext()

function Wordle() {
  const { stats, ...statsActions } = useStats();

  const message = document.querySelector(".message")

  const [wordle, setWordle] = useState("")

  const getWord = async function () {
    const data = await fetch(wordBank);
    const words = await data.text();
    let tempArray = words.split("\n");
    let randomIndex = Math.floor(Math.random() * tempArray.length);
    let randomWord = tempArray[randomIndex].trim();
    const word = randomWord.toString();
    setWordle(word);
  };

  useEffect(() => {
    getWord()
  }, []);

  const [correctLetters, setCorrect] = useState([])
  const [elsewhereLetters, setElsewhere] = useState([])
  const [wrongLetters, setWrong] = useState([])

  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]])

  // Array of arrays depicting wrong/elsewhere/correct status of letter guesses
  const [status, setStatus] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]])

  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState(0);

  const [gameOver, setGameOver] = useState({
    win: false,
    lose: false,
    gameOver: false,
  })

  const [gameMessage, setGameMessage] = useState(true);

  const onKeyPress = (key) => {
    if (position < 5 && (key.match(/[a-zA-Z]/) && key.length === 1)) {
      const currentBoard = board;
      currentBoard[attempt][position] = key.toUpperCase();
      let newPosition = position + 1;
      setBoard(currentBoard)
      setPosition(newPosition)
    }
  };

  const checkWord = async (string) => {
    const url = `https://wordsapiv1.p.rapidapi.com/words/${string}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '71c81357b4mshbe23852db3df61ap197ac2jsnb43ac5840847',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };

    let result;

    try {
      const response = await fetch(url, options);
      result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      if (result.word !== undefined) {
        return true
      } else {
        return false
      }
    }
  }

  const onEnter = async () => {
    const guessed = board[attempt].join("");
    const guessedWord = guessed.toLowerCase();

    const checkGameOver = () => {
      if (guessedWord === wordle) {
        statsActions.addWin();
        statsActions.addWinWord(wordle)
        setGameOver({ win: true, lose: false, gameOver: true })
      } else if (attempt === 5) {
        statsActions.addLoss()
        statsActions.addLoseWord(wordle)
        setGameOver({ win: false, lose: true, gameOver: true })
      }
    }

    //Are we at 5 letters?
    if (position === 5) {
      //Is the word acceptable?
      if (await checkWord(guessedWord)) {
        const wordleUpperCase = wordle.toUpperCase();
        const wordleArray = wordleUpperCase.split("");
        const currentStatus = status;
        let correctGuesses = [...correctLetters];
        let elsewhereGuesses = [...elsewhereLetters];
        let wrongGuesses = [...wrongLetters];

        board[attempt].forEach(function (letter, index) {

          //If letter is correct
          if (letter === wordleArray[index]) {
            currentStatus[attempt][index] = "correct";
            correctGuesses = [...correctGuesses, letter]
          } else if (wordleArray.includes(letter)) {
            //When the letter is elsewhere there are a few things to check

            //1. Positions where the letter occurs in the actual wordle
            const indices = [];
            let correctIndices = wordleArray.indexOf(letter);
            //The indexOf() method returns -1 if the value is not found.
            while (correctIndices !== -1) {
              //Push into an array the correct indices of the letter
              indices.push(correctIndices);
              correctIndices = wordleArray.indexOf(letter, correctIndices + 1);
            }

            //2. If the letter has already occured previously in the guessed word
            let elsewhereGuessed = 0;
            for (let i = 0; i < index; i++) {
              if (board[attempt][i] === letter) {
                elsewhereGuessed += 1;
              }
            }

            //3. There can be up to 3 times the same letter in a 5 letter word, so we have a defined if/else statement for each possibility (letter occurs once, twice or three times in the actual wordle)
            if (indices.length === 1) {
              if (board[attempt][indices[0]] === letter) {
                // The letter is already in the correct position(s) in the guess, thus this letter's status is "wrong"
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else if (elsewhereGuessed >= indices.length) {
                // The letter has already been guessed a sufficient amount of times previously in the guessed word, this this letter's status is "wrong"
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else {
                // The letter's status is indeed "elsewhere" if the above conditions are not fulfilled
                currentStatus[attempt][index] = "elsewhere";
                elsewhereGuesses = [...elsewhereGuesses, letter]
              }
            } else if (indices.length === 2) {
              if (board[attempt][indices[0]] === letter && board[attempt][indices[1]] === letter) {
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else if (elsewhereGuessed >= indices.length) {
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else {
                currentStatus[attempt][index] = "elsewhere";
                elsewhereGuesses = [...elsewhereGuesses, letter]
              }
            } else if (indices.length === 3) {
              if (board[attempt][indices[0]] === letter && (board[attempt][indices[1]] === letter && board[attempt][indices[2]] === letter)) {
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else if (elsewhereGuessed >= indices.length) {
                currentStatus[attempt][index] = "wrong";
                wrongGuesses = [...wrongGuesses, letter]
              } else {
                currentStatus[attempt][index] = "elsewhere";
                elsewhereGuesses = [...elsewhereGuesses, letter]
              }
            }
          } else {
            //Else the letter is not in the wordle
            currentStatus[attempt][index] = "wrong";
            wrongGuesses = [...wrongGuesses, letter]
          }
        });
        setGameMessage(false)
        setCorrect(correctGuesses)
        setElsewhere(elsewhereGuesses)
        setWrong(wrongGuesses)
        setStatus(currentStatus);
        if (attempt < 5) {
          checkGameOver()
          let newAttempt = attempt + 1;
          setAttempt(newAttempt);
          setPosition(0);
        } else {
          checkGameOver()
        };
      } else {
        setGameMessage(true)
        message.innerText = `This is not a word, try again!`;
      }
    } else {
      setGameMessage(true)
      message.innerText = `Too short, you need ${5 - position} more letter(s)`;
    }
  };

  const onDelete = () => {
    if (position >= 1) {
      const currentBoard = board;
      let newPosition = position - 1;
      currentBoard[attempt][newPosition] = "";
      setBoard(currentBoard)
      setPosition(newPosition)
    }
  };

  return (
    <WordleContext.Provider value={{ board, setBoard, attempt, setAttempt, position, setPosition, onDelete, onEnter, onKeyPress, status, wrongLetters, elsewhereLetters, correctLetters }}>
      {<div className={`message ${gameMessage ? "" : "hide"}`}>Write a 5 letter word and press ENTER to submit!</div>}
      <WordGrid board={board} />
      {gameOver.gameOver ? <GameOver win={gameOver.win} lose={gameOver.lose} wordle={wordle} /> : <Keyboard />}
    </WordleContext.Provider>
  );

}

export default Wordle;
