import { useState } from 'react'
import Menu from '../Menu/Menu';
import { useGameOver } from '../../hooks/useGameOver';
import Tetris from '../Tetris/Tetris';
import './Game.css';

const Game = ({ rows, columns }) => {
    const [gameOver, setGameOver, resetGameOver ] = useGameOver();
    let [numberOfPlayers, setNumberOfPlayers] = useState(1); 
    const start = (isSinglePlayer) => {
        setNumberOfPlayers(isSinglePlayer ? 1 : 2);
        resetGameOver();
    };
    const joinGame = () => {
        // TODO: - open a websocket connection
        console.log("join game clicked");
    }

  return (
    <div className='Game'>
        {
            gameOver ? (
                <Menu startGame={start} joinGame={joinGame}/>
            ) : (
                numberOfPlayers === 1 ? (
                    // TODO: - hide the player game stat in single player mode
                    <Tetris rows={rows} columns={columns} setGameOver={setGameOver} playerNumber={1}/>
                ) : (
                    // TODO: - add count down timer if player initiated the multiplayer session
                    // TODO: - remove the mocked player numbers, instead base on order of joining connection
                    <div className='GameContainer'>
                        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} playerNumber={1}/>
                        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} playerNumber={2}/>
                    </div>
                )
            )
        }
    </div>
  )
}

export default Game