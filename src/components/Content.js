import {React} from 'react';
import levelOne from '../assets/waldo.jpg';
import levelTwo from '../assets/waldo2.jpg';
import levelThree from '../assets/waldo3.jpg';

export default function Content({game,setGame}){
  return(
    <div className='content'>
      <div className='frame' onClick={(e)=>{handleClick(e)}}>
        <div className='target' />
        <div className='button-container' >
          <button onClick={()=>{handleTurn('waldo',game,setGame)}}>Waldo</button>
          <button onClick={()=>{handleTurn('odlaw',game,setGame)}}>Odlaw</button>
          <button onClick={()=>{handleTurn('wizard',game,setGame)}}>Wizard</button>
        </div>
        <img src={setPicture(game)} className='content' alt='waldo game'/>
      </div>
    </div>
  )
};

let setPicture = function(game){
  switch(game.level){
    case 1:
      return levelOne;
    case 2:
      return levelTwo;
    case 3:
      return levelThree;
    default:
      return levelOne;
  }
};

let handleTurn = function(choice,game,setGame){
  let found=false;
  let tempGameOver = game.gameOver;
  let tempWaldoFound = game.waldoFound;
  let tempOdlawFound = game.odlawFound;
  let tempWizardFound = game.wizardFound;
  let target = document.querySelector('.target');

  found = true;
  
  if (found===true){
    target.style.border='4px solid green';
    switch(choice){
      case 'waldo':
        tempWaldoFound=true;
        document.querySelector('#waldo').style.border='10px solid green';
        break;
      case 'odlaw':
        tempOdlawFound=true;
        document.querySelector('#odlaw').style.border='10px solid green';
        break;
      case 'wizard':
        tempWizardFound=true;
        document.querySelector('#wizard').style.border='10px solid green';
        break;
      default:
        break;
    };
    setGame({
      gameOver: tempGameOver,
      waldoFound: tempWaldoFound,
      odlawFound: tempOdlawFound,
      wizardFound: tempWizardFound,
      level: game.level,
    });
  }else{
    target.style.border='4px solid red';
  };
}

let handleClick = function(e){
  let target = document.querySelector('.target');
  let buttonContainer = document.querySelector('.button-container');
  target.style.left=(e.pageX-25)+'px';
  target.style.top=(e.pageY-25)+'px';
  target.style.display='block';
  buttonContainer.style.left=(e.pageX+25)+'px';
  buttonContainer.style.top=(e.pageY-25)+'px';
  buttonContainer.style.display='flex';
};