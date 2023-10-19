import React from "react";

const LetterBox = (props) => {
    
    return (
        <div className={`letter-box ${props.letterStatus === "wrong"? "wrong" :""} ${props.letterStatus === "elsewhere"? "elsewhere" :""} ${props.letterStatus === "correct"? "correct" :""}`}>{props.letter}</div>
    )
}

export default LetterBox;