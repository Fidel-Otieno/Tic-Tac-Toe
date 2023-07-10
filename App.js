import {useState} from 'react'

function square({value, onsquareClick}) {
  return (
  <button className="square" onClick={onsquareClick}>
    {value}
  </button>
  );
}

functionBoard ({xIsNext, square, onPlay}); {
  function handleClick(i) {
    if (calculateWinner(square) || square[i]) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = 'x';
    } else {
       nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
    
   const winner = calculateWinner(square);
   let status;
    if (winner) {
      status = 'winner: ' + winner;
    } else {
      status ='Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
       <square value={squares[0]} onsquareClick={() =>handleClick(0)}/>
       <square value={squares[1]} onsquareClick={() =>handleClick(1)}/>
       <square value={squares[2]} onsquareClick={() =>handleClick(2)}/>
    </div>
    <div className="board-row">
       <square value={squares[3]} onsquareClick={() =>handleClick(3)}/>
       <square value={squares[4]} onsquareClick={() =>handleClick(4)}/>
       <square value={squares[5]} onsquareClick={() =>handleClick(5)}/>
    </div>
    <div className="board-row">
       <square value={squares[6]} onsquareClick={() =>handleClick(6)}/>
       <square value={squares[7]} onsquareClick={() =>handleClick(7)}/>
       <square value={squares[8]} onsquareClick={() =>handleClick(8)}/>
    </div>
    </>
  );
    }


export default function Game() {
  const [history, setHistory] = useState ([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 ===0;
  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
   setHistory (nextHistory);
   setCurrentMove(nextHistory.length - 1);
 }

  function jumpTo(nextMove) {
   setCurrentMove(nextMove); 
  }

   const moves = history.map((square, move) => {
   let description; 
   if (move > 0) { 
     description='Go to move #' + move;
  } else {
  description ='Go to game start'
 }
  return (
    <li key = {move}>
      <button onClick={() => jumpTo(move)} >{description}</button>
    </li>
  );
 });

 return (
  <div className="game">
    <div className="game-board">
      <Board xIsNext = {xIsNext} square={currentSquares} onPlay={handlePlay}/>
  </div>
  <div className="game-info">
    <ol>{moves}</ol>
  </div>
  </div>
 );
 

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
  if (squares[a] && squares[a] === squares[b] && squares[a]=== squares[c]) {
    return squares[a];
    }
  }
  return null;
}}