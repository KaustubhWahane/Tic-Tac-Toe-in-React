import React from 'react';

export default function GameBox({onSelectSquare , board}) {
  
  // Method 1 of changing state
  // const [gameboard, setGameboard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex,colIndex){
  //   setGameboard((prevGameBoard) => {
  //     const updateGameBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
  //     updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateGameBoard;
  //   });
  //   onSelectSquare();

  return (
    <ol id="game-board">
       {board.map((row,rowIndex)=>
       <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex)=>
          <li key={colIndex}>
            <button onClick={()=>onSelectSquare(rowIndex, colIndex)}
            disabled ={playerSymbol !== null}
            >
            {playerSymbol}
            </button>
       </li>)}
        </ol>
       </li>)}
    </ol>
    );
}
