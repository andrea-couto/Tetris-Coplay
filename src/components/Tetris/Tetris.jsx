import { useBoard } from '../../hooks/useBoard';
import Board from '../Board/Board';
import GameStats from '../GameStats/GameStats';
import { useGameStats } from '../../hooks/useGameStats';
import Previews from '../Previews/Previews';
import { usePlayer } from '../../hooks/usePlayer';
import './Tetris.css';
import GameController from '../GameController/GameController';

const Tetris = ({ rows, columns, setGameOver}) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer ] = usePlayer();
    const [board, setBoard] = useBoard({ 
        rows, 
        columns,
        player,
        resetPlayer,
        addLinesCleared
     });
  return (
      <div className='Tetris'>
          <Board board={board}/>
          <div className='Info-Column'>
          <Previews tetrominoes={player.tetrominoes}/>
          <GameStats gameStats={gameStats}/>
          </div>
          <GameController
            board={board}
            gameStats={gameStats}
            player={player}
            setGameOver={setGameOver}
            setPlayer={setPlayer}
          />
      </div>
  )
}

export default Tetris