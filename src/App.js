import logo from './logo.svg';
import './App.css'
import LoginForm from './Login.js'
import Createaccount from './Createaccount.js'
import './firebase.js'
import Welcome from './Welcome.js'
import { useState } from 'react';
import Sample from './sample.js';
import dotenv from 'dotenv';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,signUpWithPopup} from 'firebase/auth';
import {BrowserRouter,Routes,Route,useNavigate, Router,Switch} from 'react-router-dom';


dotenv.config();

function App() {

 /* return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Sample/>}/>
    </Routes>

    </BrowserRouter>
   
  )*/
  

  return (
  <> 
  <BrowserRouter>
    
     <Routes>
       <Route exact path='/' element={<LoginForm/>}/>
       <Route exact path='/Createaccount' element={<Createaccount/>}/>
       <Route exact path='/Welcome' element={<Welcome/>}/>
     </Routes>
  </BrowserRouter>
  </>
); 
  }


export default App;
