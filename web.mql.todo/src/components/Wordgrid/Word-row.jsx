import React from "react";
import LetterBox from "./Letter-box";
import { useContext } from "react";
import { WordleContext } from "../Wordle";

const WordRow = (props) => {
    const {status} = useContext(WordleContext);

    return(
        <div className="word-row">
            <LetterBox letter={props.rowArray[0]} letterStatus={status[props.row][0]}/>
            <LetterBox letter={props.rowArray[1]} letterStatus={status[props.row][1]}/>
            <LetterBox letter={props.rowArray[2]} letterStatus={status[props.row][2]}/>
            <LetterBox letter={props.rowArray[3]} letterStatus={status[props.row][3]}/>
            <LetterBox letter={props.rowArray[4]} letterStatus={status[props.row][4]}/>
        </div>
    )
}

export default WordRow;