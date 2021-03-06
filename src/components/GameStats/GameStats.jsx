import React from 'react'
import './GameStats.css';

const GameStats = ({ gameStats, playerNumber }) => {
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className='GameStats'>
        <li>Player</li>
        <li className='value'>{playerNumber}</li>        

        <li>Level</li>
        <li className='value'>{level}</li>

        <li>Lines to Level</li>
        <li className='value'>{linesToLevel}</li>

        <li>Points</li>
        <li className='value'>{points}</li>
    </ul>
  )
}

// only renders when gameStats changes
export default React.memo(GameStats);