

export type BoardSquare = null | "X" | "O";

const initialGameBoard: BoardSquare[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  // activePlayerSymbol: BoardSquare;
}

export default function GameBoard({ onSelectSquare}: GameBoardProps) {
  
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex: number, colIndex: number) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare(rowIndex, colIndex);
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={onSelectSquare}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
