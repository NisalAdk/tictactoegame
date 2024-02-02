import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Board component
export function Board({player1, player2, setWinner}) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isDialogOpen, setDialogOpen] = useState(false);
 

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
       setWinner(squares[a]);
      
        return squares[a];
        
      }
    }
    return null;
  }

  function restartGame() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function confirmRestartGame() {
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setDialogOpen(false);
    setWinner(null);
  }

  const winner = calculateWinner(squares);
  let status;
 
  if (winner) {
    status = `Congratulations!! Winner is ${winner === 'X' ? player1 : player2}`;
  } else {
    status = `Next player: ${xIsNext ? player1 : player2} `;
  }


  return (
    <>
      <div className='status'>{status}</div>

      <Grid container spacing={5} alignItems='center' size='large'>
        <Grid item>
          <Button variant='contained' color='primary' onClick={restartGame} display='flex'>
            Play again
          </Button>
        </Grid>
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Restart</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={confirmRestartGame} color='primary'>
            Let's play
          </Button>
        </DialogActions>
      </Dialog>

      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//Game component
export default function Game() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
 const[winner, setWinner] = useState(null);

  const handlePlayer1Change = (event) => {
    setPlayer1(event.target.value);
  };
  const handlePlayer2Change = (event) => {
    setPlayer2(event.target.value);
  };

  return (
    <div className='game'>
      <div>
        <TextField variant="filled" label="player1" value={player1} onChange={handlePlayer1Change} />
        <TextField variant="filled" label="player2" value={player2} onChange={handlePlayer2Change} />

      </div>
      <div className='game-board'>
      <Board player1={player1} player2={player2} setWinner={setWinner} />
      
      </div>
      <div className='game-info'>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
