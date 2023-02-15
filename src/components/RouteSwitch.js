import {React,useState} from 'react';
import { BrowserRouter,Routes,Route} from "react-router-dom";

//import components
import Nav from '../components/Nav.js';
import Content from './Content.js';

//import css
import '../styles/routeSwitch.css';

export default function RouteSwitch(){
  
  const [game, setGame] = useState({
    gameOver: false,
    waldoFound: false,
    odlawFound: false,
    wizardFound: false,
    level: 1,
  });

  return(
    <div className='body'>
      <Nav game={game} setGame={setGame.bind(this)} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content game={game} setGame={setGame.bind(this)} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};