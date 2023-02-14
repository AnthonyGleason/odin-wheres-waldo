import {React} from 'react';
import waldoGame from '../assets/waldo.jpg';

export default function Content({game,setGame}){
  return(
    <div className='frame' onClick={(e)=>{handleClick(e)}}>
      <div className='target' />
      <div className='button-container' >
        <button onClick={()=>{handleTurn('waldo',game,setGame)}}>Waldo</button>
        <button onClick={()=>{handleTurn('odlaw',game,setGame)}}>Odlaw</button>
        <button onClick={()=>{handleTurn('wizard',game,setGame)}}>Wizard</button>
      </div>
      <img src={waldoGame} className='content' alt='waldo game'/>
    </div>
  )
};

let handleTurn = function(choice,game,setGame){
  let found=false;
  let tempGameOver = game.gameOver;
  let tempWaldoFound = game.waldoFound;
  let tempOdlawFound = game.odlawFound;
  let tempWizardFound = game.wizardFound;

  found = true;
  
  if (found===true){
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
    });
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