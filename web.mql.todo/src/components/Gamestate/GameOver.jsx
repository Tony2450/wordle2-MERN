import React from "react";

const GameOver = (props) => {

    const handleClick = () => {
        window.location.reload(true)
    }

    return (
        <div className="endgame">
            <h3>
                {props.win ? "You Win! 🎉" : ""}{props.lose ? `Game over, you lose! The correct word was: ${props.wordle.toUpperCase()}!` : ""}
            </h3>
            <button className="play-again" onClick={handleClick}>Play Again?</button>
        </div>
    )
}

export default GameOver;