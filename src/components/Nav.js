import {React} from 'react';
import waldo from '../assets/waldoChar.png';
import odlaw from '../assets/odlawChar.png';
import wizard from '../assets/wizardChar.png';

export default function Nav({game,setGame}){
  return(
    <div className='nav'>
      <div className='nav-title'>Where's Waldo?</div>
      <div className='nav-button-container'>
        <button onClick={()=>{setLevel(game.level-1,game,setGame)}}>Prev Level</button>
        <div>{game.level}</div>
        <button onClick={()=>{setLevel(game.level+1,game,setGame)}}>Next Level</button>
      </div>
      <button className='restart' onClick={()=>{newGame(game,setGame)}}>Restart Game!</button>
      <div className='img-container'>
        <div id='waldo' className='img-frame'>
          <img src={waldo} alt='waldo' />
          <div>Waldo</div>
        </div>
        <div id='odlaw' className='img-frame'>
          <img src={odlaw} alt='odlaw' /> 
          <div>Odlaw</div>
        </div>
        <div id='wizard' className='img-frame'>
          <img src={wizard} alt='wizard' />
          <div>Wizard</div>
        </div>
      </div>
    </div>
  )
}

let setLevel = function(newLevel,game,setGame){
  if (newLevel<1||newLevel>3){
    return 1;
  }else{
    setGame({
      gameOver: false,
      waldoFound: false,
      odlawFound: false,
      wizardFound: false,
      level: newLevel,
    })
    resetStyles();
  };
}

let resetStyles = function(){
  document.querySelector('#waldo').style.border='10px solid red';
  document.querySelector('#odlaw').style.border='10px solid red';
  document.querySelector('#wizard').style.border='10px solid red';
  document.querySelector('.target').style.border='4px solid red';
}

let newGame = function(game,setGame){
  setGame({
    gameOver: false,
    waldoFound: false,
    odlawFound: false,
    wizardFound: false,
    level: game.level,
  })
  resetStyles();
}