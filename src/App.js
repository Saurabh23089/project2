import './App.css'
import LoginForm from './Login.js'
import Createaccount from './Createaccount.js'
import './firebase.js'
import Welcome from './Welcome.js'
import {BrowserRouter,Routes,Route,useNavigate, Router,Switch} from 'react-router-dom';




function App() {
  return (
  <> 
  <BrowserRouter>
    
     <Routes>
       <Route path='/' element={<LoginForm/>}/>
       <Route path='/Createaccount' element={<Createaccount/>}/>
       <Route path='/Welcome' element={<Welcome/>}/>
     </Routes>
  </BrowserRouter>
  </>
); 
}


export default App;
