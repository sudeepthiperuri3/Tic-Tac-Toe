import Player from "./assets/components/Player";
import GameBoard, { BoardSquare } from "./assets/components/GameBoard";
import { useState } from "react";
import Log from "./assets/components/Log";

interface Turn {
  square: { row: number; col: number };
  player: string;
}

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [activePlayer, setActivePlayer] = useState<BoardSquare>("X");

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((currActivePlayer) =>
     ( currActivePlayer === "X" ? "O" : "X"));

      setGameTurns((prevTurns) => {
        let currentPlayer = "X";

        if (prevTurns.length > 0 && prevTurns[0].player === "X") {
          currentPlayer = "O";
        }

        const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
        return updatedTurns;
      })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
