export interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
  onChangeName:(symbol: string, name: string) => void;
}

import { useState } from "react";

export default function Player({ initialName, symbol ,isActive,onChangeName}: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setisEditing] = useState(false);

  function handleEditClick(): void {
  
    setisEditing((editing) => !editing);

    if (isEditing)
      onChangeName(symbol, playerName);
  }
  

  function handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
    setPlayerName(event.target.value);
  }

  let editiablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editiablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editiablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
