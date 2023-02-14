import {React} from 'react';
import waldo from '../assets/waldoChar.png';
import odlaw from '../assets/odlawChar.png';
import wizard from '../assets/wizardChar.png';

export default function Nav({setGame}){
  return(
    <div className='nav'>
      <div className='nav-title'>Where's Waldo?</div>
      <button className='restart' onClick={()=>{newGame(setGame)}}>Restart Game!</button>
      <div className='img-container'>
        <div id='waldo' className='img-frame'>
          <img src={waldo} alt='waldo' />
          <span>Waldo</span>
        </div>
        <div id='odlaw' className='img-frame'>
          <img src={odlaw} alt='odlaw' /> 
          <span>Odlaw</span>
        </div>
        <div id='wizard' className='img-frame'>
          <img src={wizard} alt='wizard' />
          <span>Wizard</span>
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
  document.querySelector('.target').style.border='4px solid red';
}