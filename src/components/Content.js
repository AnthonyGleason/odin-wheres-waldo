import {React, useEffect} from 'react';
import waldoGame from '../assets/waldo.jpg';

export default function Content({game,setGame}){
  useEffect(()=>{
    checkWin(game);
  },[game])

  return(
    <div className='content'>
      <div className='frame' onClick={(e)=>{handleClick(e)}}>
        <div className='target' />
        <div className='button-container' >
          <button className='waldo-button' onClick={(e)=>{handleTurn('waldo',game,setGame,e)}}>Waldo</button>
          <button className='odlaw-button' onClick={(e)=>{handleTurn('odlaw',game,setGame,e)}}>Odlaw</button>
          <button className='wizard-button' onClick={(e)=>{handleTurn('wizard',game,setGame,e)}}>Wizard</button>
        </div>
        <img src={waldoGame} className='content' alt='waldo game'/>
      </div>
    </div>
  )
};

//send a request to firebase to see if there is a character there
let charAtCoords = function (selectedX,selectedY){
  let waldo = [992,384];
  let odlaw = [713,422];
  let wizard = [1105,463];

  //remove px from end of selected coords and parseInt it
  selectedX=parseInt(selectedX.slice(0,selectedX.length-2));
  selectedY=parseInt(selectedY.slice(0,selectedY.length-2));

  let waldoDiff = [Math.abs(selectedX-waldo[0]),Math.abs(selectedY-waldo[1])];
  let odlawDiff = [Math.abs(selectedX-odlaw[0]),Math.abs(selectedY-odlaw[1])];
  let wizardDiff = [Math.abs(selectedX-wizard[0]),Math.abs(selectedY-wizard[1])];
  if (waldoDiff[0]>0 && waldoDiff[0]<50 && waldoDiff[1]>0 && waldoDiff[1]<50){
    return 'waldo';
  }else if (odlawDiff[0]>0 && odlawDiff[0]<50 && odlawDiff[1]>0 && odlawDiff[1]<50){
    return 'odlaw';
  }else if (wizardDiff[0]>0 && wizardDiff[0]<50 && wizardDiff[1]>0 && wizardDiff[1]<50){
    return 'wizard';
  }
};

let checkWin = function (game){
  if (game.waldoFound===true && game.odlawFound===true && game.wizardFound===true){
    console.log('win!');
    //color portraits
    document.querySelector('.target').style.border='7px solid palegreen';
    document.querySelector('.waldo-button').style.backgroundColor='palegreen';
    document.querySelector('.odlaw-button').style.backgroundColor='palegreen';
    document.querySelector('.wizard-button').style.backgroundColor='palegreen';
    document.querySelector('#waldo').style.border='10px solid palegreen';
    document.querySelector('#odlaw').style.border='10px solid palegreen';
    document.querySelector('#wizard').style.border='10px solid palegreen';
  }
}

let handleTurn = function(choice,game,setGame,e){
  let found=false;
  let tempGameOver = game.gameOver;
  let tempWaldoFound = game.waldoFound;
  let tempOdlawFound = game.odlawFound;
  let tempWizardFound = game.wizardFound;
  let target = document.querySelector('.target');
  let selectedX=(e.pageX-25)+'px';
  let selectedY=(e.pageY-25)+'px';
  //find character at location and compare it to the chosen character
  if (choice===charAtCoords(selectedX,selectedY)) found=true;
  
  if (found===true){
    target.style.border='4px solid green';
    switch(choice){
      case 'waldo':
        tempWaldoFound=true;
        document.querySelector('#waldo').style.border='10px solid green';
        document.querySelector('.waldo-button').style.backgroundColor='green';
        break;
      case 'odlaw':
        tempOdlawFound=true;
        document.querySelector('#odlaw').style.border='10px solid green';
        document.querySelector('.odlaw-button').style.backgroundColor='green';
        break;
      case 'wizard':
        tempWizardFound=true;
        document.querySelector('#wizard').style.border='10px solid green';
        document.querySelector('.wizard-button').style.backgroundColor='green';
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