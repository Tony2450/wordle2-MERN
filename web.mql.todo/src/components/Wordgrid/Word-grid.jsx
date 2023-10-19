import React from "react";
import WordRow from "./Word-row";

const WordGrid = (props) => {
    
    
    return (
        <div className="wordle-grid">
            <WordRow row={0} rowArray={props.board[0]}/>
            <WordRow row={1} rowArray={props.board[1]}/>
            <WordRow row={2} rowArray={props.board[2]}/>
            <WordRow row={3} rowArray={props.board[3]}/>
            <WordRow row={4} rowArray={props.board[4]}/>
            <WordRow row={5} rowArray={props.board[5]}/>
        </div>
    )
}

export default WordGrid;