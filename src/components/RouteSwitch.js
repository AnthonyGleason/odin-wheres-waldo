import {React} from 'react';
import { BrowserRouter,Routes,Route} from "react-router-dom";

//import components
import Nav from '../components/Nav.js';
import App from './App.js';

export default function RouteSwitch(){
  return(
    <div className='body'>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};