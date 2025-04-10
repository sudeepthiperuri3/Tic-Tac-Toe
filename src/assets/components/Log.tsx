interface Turn {
  player: string; // The player who made the move
  square: { row: number; col: number }; // The coordinates of the selected square
}

interface LogProps {
  turns: Turn[];
}

export default function Log({ turns }: LogProps) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
