import React from 'react'

const Menu = ({ onClick }) => {
  return (
    <div>
        <button className='nes-btn' 
        onClick={onClick}
        >
            Start Game
        </button>
    </div>
  )
}

export default Menu