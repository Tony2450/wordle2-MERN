import React from "react";

export default function Rules() {
    return (
        <div className="rules">
            <h2>
                The Rules
            </h2>
            <p>
                The rules are simple: you have 6 attempts to guess a random 5 letter word that has been selected from a word bank.
            </p>
            <p>
                Correct letters will be highlighted in <span className="green">GREEN</span>.
            </p>
            <p>
                Letters that appear elsewhere in the word will be highlighted in <span className="yellow">YELLOW</span>.
            </p>
            <p>
                Incorrect letters will become <span className="gray">GRAYED</span> out.
            </p>
        </div>
    );
}