import { useState } from "react";

export default function Player({initialName, symbol , isActive}) {
  // ?In order to change the player name in the input field we will use another useState 
  const [playerName , setPlayerName] = useState(initialName);

  const[isEditing, setIsEditing] = useState(false);
  function handleEditClick(){
    // Why not use this method
    // setIsEditing(!isEditing);
    //* Instead use this to get the latest state value
    setIsEditing(editing => !editing)
  }
  //! Another function when the user changes its name
function handleChange(e){
  console.log(e);
  setPlayerName(e.target.value)
}
  let player = <span className="player-name">{playerName}</span>

  if(isEditing){
    player = <input type="text" required value={playerName} onChange={handleChange}></input>

  }
  return (
    <li className={isActive ? "active" : undefined}>
        <span className="player">
            {player}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
