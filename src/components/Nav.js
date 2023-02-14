import {React} from 'react';
import waldo from '../assets/waldoChar.png';
import odlaw from '../assets/odlawChar.png';
import wizard from '../assets/wizardChar.png';

export default function Nav({setGame}){
  return(
    <div className='nav'>
      <div className='nav-title'>Find Waldo and Friends!</div>
      <button className='restart' onClick={()=>{newGame(setGame)}}>Restart Game!</button>
      <div className='img-container'>
        <div id='waldo' className='img-frame'>
          <img src={waldo} alt='waldo' />
        </div>
        <div id='odlaw' className='img-frame'>
          <img src={odlaw} alt='odlaw' /> 
        </div>
        <div id='wizard' className='img-frame'>
          <img src={wizard} alt='wizard' />
        </div>
      </div>
    </div>
  )
}

let newGame = function(setGame){
  setGame({
    gameOver: false,
    waldoFound: false,
    odlawFound: false,
    wizardFound: false,
  })
  document.querySelector('#waldo').style.border='10px solid red';
  document.querySelector('#odlaw').style.border='10px solid red';
  document.querySelector('#wizard').style.border='10px solid red';
}