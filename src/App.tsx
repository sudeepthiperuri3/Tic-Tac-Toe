import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import { useState } from "react";
import Log from "./assets/components/Log";
import { WINNING_COMBINATIONS } from "./assets/Winning-Combinations";
import GameOver from "./assets/components/GameOver";

type PlayerSymbol = "X" | "O"

interface Turn {
  square: { row: number; col: number };
  player: PlayerSymbol;
}

type GameTurn = Turn[];

export type BoardSquare = null | PlayerSymbol;

const initialGameBoard: BoardSquare[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: GameTurn): PlayerSymbol {
  let currentPlayer: PlayerSymbol = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns:GameTurn) {
  const gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard: BoardSquare[][], players: GamePlayers) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secongSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secongSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

interface GamePlayers {
  X: string;
  O: string;
}

function App() {
  const [players, setPlayers] = useState<GamePlayers>({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState<GameTurn>([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart(): void {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol:string,newName:string) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      }
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
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
             onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
