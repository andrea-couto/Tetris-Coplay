import React from 'react';
import './Menu.css';

const Menu = ({ startGame, joinGame }) => {
  const sessionCodeStyle = {
    width: '400px'
  };

  const divStyling = {
    paddingTop:'50px'
  };

  return (
    <div className='Menu'>
        <button className='nes-btn' onClick={() => startGame(true)}>Single Player</button>
        <button className='nes-btn' onClick={() => startGame(false)}>Start Multiplayer</button>
        <div style={divStyling}>
        <input type="text" style={sessionCodeStyle} id="dark_field" class="nes-input is-dark" placeholder="session code"/>
        <button className='nes-btn' onClick={joinGame}>Join Multiplayer</button>
        </div>
    </div>
  )
}

export default Menu