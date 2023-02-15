import {React, useEffect} from 'react';
import waldoGame from '../assets/waldo.jpg';
import { collection, getDocs } from 'firebase/firestore/lite';

export default function Content({game,setGame,db}){
  useEffect(()=>{
    checkWin(game);
  },[game])

  return(
    <div className='content'>
      <div className='frame' onClick={(e)=>{handleClick(e)}}>
        <div className='target' />
        <div className='button-container' >
          <button className='waldo-button' onClick={(e)=>{handleTurn('waldo',game,setGame,e,db)}}>Waldo</button>
          <button className='odlaw-button' onClick={(e)=>{handleTurn('odlaw',game,setGame,e,db)}}>Odlaw</button>
          <button className='wizard-button' onClick={(e)=>{handleTurn('wizard',game,setGame,e,db)}}>Wizard</button>
        </div>
        <img src={waldoGame} className='content' alt='waldo game'/>
      </div>
    </div>
  )
};

//send a request to firebase to see if there is a character there
let charAtCoords = async function (selectedX,selectedY,choice,db){
  const snapshot = await getDocs(collection(db,"locations"));
  let waldo = [parseInt(snapshot.docs[1]._document.data.value.mapValue.fields.x.integerValue),parseInt(snapshot.docs[1]._document.data.value.mapValue.fields.y.integerValue)];
  let odlaw = [parseInt(snapshot.docs[0]._document.data.value.mapValue.fields.x.integerValue),parseInt(snapshot.docs[0]._document.data.value.mapValue.fields.y.integerValue)];
  let wizard=[parseInt(snapshot.docs[2]._document.data.value.mapValue.fields.x.integerValue),parseInt(snapshot.docs[2]._document.data.value.mapValue.fields.y.integerValue)];
  let difficulty = 150;
  console.log(Math.abs(odlaw[0]-selectedX),Math.abs(odlaw[1]-selectedY));
  switch (choice){
    case 'waldo':
      if (Math.abs(waldo[0]-selectedX)<difficulty && Math.abs(waldo[1]-selectedY)<difficulty){
        return true;
      }else{
        return false;
      };
    case 'odlaw':
      if (Math.abs(odlaw[0]-selectedX)<difficulty && Math.abs(odlaw[1]-selectedY)<difficulty){
        return true;
      }else{
        return false;
      };
    case 'wizard':
      if (Math.abs(wizard[0]-selectedX)<difficulty && Math.abs(wizard[1]-selectedY)<difficulty){
        return true;
      }else{
        return false;
      };
    default:
      return false;
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

let handleTurn = async function(choice,game,setGame,e,db){
  let tempGameOver = game.gameOver;
  let tempWaldoFound = game.waldoFound;
  let tempOdlawFound = game.odlawFound;
  let tempWizardFound = game.wizardFound;
  let target = document.querySelector('.target');
  let selectedX=(e.pageX-100);
  let selectedY=(e.pageY);
  let charBool = await charAtCoords(selectedX,selectedY,choice,db);
  console.log(charBool);
  //find character at location and compare it to the chosen character
  if (charBool){
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
      fastestTime: game.fastestTime,
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