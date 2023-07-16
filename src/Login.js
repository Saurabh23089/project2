import './index.css';
import './firebase.js';
import glogo from './glogo.png'; 
import { useState } from 'react';
import Welcome from './Welcome';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,signUpWithPopup} from 'firebase/auth';
import {BrowserRouter,Routes,Route,useNavigate, Link} from 'react-router-dom';
import {db} from './firebase.js';



function LoginForm(){
    const[email,setemail]=useState('');
    const[password,setpassowrd]=useState('');
    const provider=new GoogleAuthProvider();
    const navigate=useNavigate();

   
      
  
    const handlesignin=(email,password)=>{
      const auth=getAuth();
      signInWithEmailAndPassword(auth,email,password)
      .then((usercredential) => {
          const user=usercredential.user;
          console.log('Sign In Scuccessfull');
          navigate('/Welcome');
      })
      .catch((error) => {
        const errorcode=error.code;
        const errormessage=error.message;
        if(errorcode==='auth/user-not-found')
        {
          alert("Account not Found");
        }
        else if(errorcode==='auth/wrong-password')
        {
          prompt('Incorrect Password')
        }
       /*  const errorcode=error.code;
         const message=error.message;
         console.log('Sign In Failed:',errorcode,message,'1'); */
      })
    }  
  
  
      const signinwithgoogle=() => {
         const auth=getAuth();
         signInWithPopup(auth,provider)
         .then((result) => {
           const user=result.user;
           console.log('SignIn With Google Successfull',user);
           navigate('/Welcome');
         })
         .catch((error) => {
            const errormessage=error.message;
            const errorcode=error.code;
            console.log('Login With Google Failed',errorcode,errormessage);
         })
  
      }
  
  
    const handlelogin=(e) => {
       e.preventDefault();
       handlesignin(email,password);
    } 
  
    const handleloginwithgoogle=(e) => {
      e.preventDefault();
      signinwithgoogle();
    }
  
        return (

          <div className='loginpage'>
            <p className='lt1' onClick={() => navigate('/Createaccount')}>Create an account</p>
            
            <div className='loginform'>
            <form className='right-portion'>
            <label className='label'>Email Address
              <input className='ip' placeholder='Enter Email Address' type="email" onChange={(e) => {setemail(e.target.value)}}/>
            </label>
            <label className='label'>Password
              <input className='ip' placeholder='Enter Password'type="password" onChange={(e) => {setpassowrd(e.target.value)}}/>
            </label>
            <button type="submit" onClick={handlelogin} className='loginbtn'>Login</button>
            <div>
              
            </div>
            <button type='submit' onClick={handleloginwithgoogle} className='hg'><img src={glogo} alt='glogo'className='googlelogo'/>LogIn With Google</button> 
           </form>
          </div> 
         
         
          
          </div>
          )
  }

  export default LoginForm;
