import React from "react";
import "./instructions.css";

function instructions() {
  return (
    <div className="instructions">
      <h1 className="head">Instructions</h1>
      {/* line here to divide them  */}
      <h3 className="intro">The Basics:</h3>
      <ul className="lists">
        <li className="title1">Press tiles as phrases come up.</li>
        <li className="title2">
          You should aim to get a row, column or diagonal in order to win..Good luck!
        </li>
      </ul>

      {/* House Rules */}
      <h3 className="intro">House Rules:</h3>
      <ul className="lists">
        <li className="title1">Blank tiles are bingo app bugs, but you can count them as long or awkward silences.</li>
        <li className="title2">
        If you start a new board, only check off phrases that come up <strong>after</strong> you started that board.
        </li>
      </ul>

      {/* Got Bingo? */}
      <h3 className="intro">Got Bingo???</h3>
      <p className="congrats">Congrats! Feel free to.........</p>
      <ul className="lists">
        <li className="title1">Continue filling in your board</li>
        <li className="title2">
        Start a new board!
        </li>
      </ul>


      <p className="author">Created by <strong>Karim :)</strong></p>


    </div>
  );
}

export default instructions;
