interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
}

import { useState } from "react";

export default function Player({ initialName, symbol ,isActive}: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setisEditing] = useState(false);

  function handleEditClick(): void {
    //   setisEditing(isEditing ? false : true);
    //  setisEditing(!isEditing );
    setisEditing((editing) => !editing);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editiablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = "Edit";
  if (isEditing) {
    editiablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    //    let btnCaption = "Save";
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
