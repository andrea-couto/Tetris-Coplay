import React from 'react'
import BoardCell from '../BoardCell/BoardCell';
import './Board.css';

const Board = ({ board }) => {
    // css grid with evenly sized cells dynamically based on cells
    const boardStyle = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

  return (
    <div className='Board' style={boardStyle}>
        {board.rows.map((row, y) => 
            row.map((cell, x)=> {
                return <BoardCell 
                key={x * board.size.columns + x}
                cell={cell}
                />
            })
        )}
    </div>
  )
}

export default Board