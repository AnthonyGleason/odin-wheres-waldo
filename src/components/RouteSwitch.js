import {React,useState} from 'react';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore/lite';

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
  });

  //using firebase config from project
const firebaseConfig = {
  apiKey: "AIzaSyAVD-gDD17IbiS94t1FCypXkzhPLTosRe8",
  authDomain: "react-waldo.firebaseapp.com",
  projectId: "react-waldo",
  storageBucket: "react-waldo.appspot.com",
  messagingSenderId: "598090854624",
  appId: "1:598090854624:web:2a40ecb451ff29b654a085"
};
//initalize the firebase app with the config
const app = initializeApp(firebaseConfig);
//get the current database
const db = getFirestore(app);

  return(
    <div className='body'>
      <Nav setGame={setGame.bind(this)} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content game={game} setGame={setGame.bind(this)} db={db} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};


//Need timer
//Need firebase support for coordinates, use await async when retrieving 