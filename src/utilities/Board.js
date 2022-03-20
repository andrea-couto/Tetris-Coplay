import { DefaultCell } from "./DefaultCell";
import { transferToBoard } from "./Tetrominoes";
import { movePlayer } from "./PlayerController";

export const buildBoard = ({ rows, columns }) => {
    const buildRows = Array.from({ length: rows}, () => 
    Array.from({length: columns}, () => ({ ...DefaultCell })))

    return {
        rows: buildRows,
        size: { rows, columns}
    }
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
    const { tetromino, position } = player;
  
    // clear cells of moving tetromino as it moves down the board
    let rows = board.rows.map((row) =>
      row.map((cell) => (cell.occupied ? cell : { ...DefaultCell }))
    );
  
    const dropPosition = findDropPosition({
      board,
      position,
      shape: tetromino.shape
    });
  
    rows = placeGhost(tetromino, player, rows, dropPosition);
  
    if (!player.isFastDropping) {
      rows = transferToBoard({
        className: tetromino.className,
        isOccupied: player.collided,
        position,
        rows,
        shape: tetromino.shape
      });
    }
  
    rows = checkForClearedLines(rows, addLinesCleared);
  
    if (player.collided || player.isFastDropping) {
      resetPlayer();
    }
  
    return {
      rows,
      size: { ...board.size }
    };
  };

function checkForClearedLines(rows, addLinesCleared) {
    const blankRow = rows[0].map((_) => ({ ...DefaultCell }));
    let linesCleared = 0;
    rows = rows.reduce((acc, row) => {
        if (row.every((column) => column.occupied)) {
            linesCleared++;
            acc.unshift([...blankRow]);
        } else {
            acc.push(row);
        }

        return acc;
    }, []);

    if (linesCleared > 0) {
        addLinesCleared(linesCleared);
    }
    return rows;
}

function placeGhost(tetromino, player, rows, dropPosition) {
    const className = `${tetromino.className} ${player.isFastDropping ? "" : "ghost"}`;
    return transferToBoard({
        className,
        isOccupied: player.isFastDropping,
        position: dropPosition,
        rows,
        shape: tetromino.shape
    })
}

const findDropPosition = ({ board, position, shape }) => {
    let max = board.size.rows - position.row + 1;
    let row = 0;
  
    for (let i = 0; i < max; i++) {
      const delta = { row: i, column: 0 };
      const result = movePlayer({ delta, position, shape, board });
      const { collided } = result;
  
      if (collided) {
        break;
      }
  
      row = position.row + i;
    }
  
    return { ...position, row };
  };

  export const hasCollision = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
      const row = y + position.row;
  
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const column = x + position.column;
  
          if (
            board.rows[row] &&
            board.rows[row][column] &&
            board.rows[row][column].occupied
          ) {
            return true;
          }
        }
      }
    }
  
    return false;
  };

  export const isWithinBoard = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
      const row = y + position.row;
  
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const column = x + position.column;
          const isValidPosition = board.rows[row] && board.rows[row][column];
  
          if (!isValidPosition) return false;
        }
      }
    }
  
    return true;
  };
