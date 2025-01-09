import GameBox from "./components/GameBox";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";
import { winning_combinations } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  
  const [players , setPlayers ]= useState ({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameboard = [... initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  // This is the variable storing the Winner Player
  let winner;

  for (const combination of winning_combinations) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol ===thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer =>{
      return {
        ...prevPlayer,
        [symbol] : newName
      }
    })
  }

  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initialName="Player 1" 
          symbol="X" 
          isActive={activePlayer === "X"} 
          onChangeName = {handlePlayerNameChange}
          />
          <Player 
          initialName="Player 2" 
          symbol="O" 
          isActive={activePlayer === "O"} 
          onChangeName = {handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBox onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
    </>
    
  );
}

export default App;
