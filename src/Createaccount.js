import { useState } from 'react';
import './App.css'
import './firebase.js'
import {db} from './firebase.js'
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,signUpWithPopup} from 'firebase/auth';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';




function Createaccount(){
  

    const[Name,setName]=useState("");
    const[email,setemail]=useState("");
    const[mobile,setmobile]=useState("");
    const[password,setpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const provider=new GoogleAuthProvider();
   const navigate=useNavigate();
  
    const createaccount=(Name,email,password,mobile) => {  // For first time users
      const auth=getAuth();
     // const db=firebase.firestore();
     console.log(db);
      createUserWithEmailAndPassword(auth,email,password)
        .then((usercredential) => {
            const user=usercredential.user;
            console.log('User Created:',user); 
            
            db.collection("users").doc(email).set({
              Name : Name,
              Mobile: mobile
            });
        })

        
    
        .catch((error) => {
          const errorcode=error.code;
          const errormessage=error.message;
          console.log('Error creating user:',errorcode,errormessage);
          
        })
        setemail('');
        setpassword('');
      }
  
      const signupwithGoogle=() =>{
          const auth=getAuth();
          signInWithPopup(auth,provider)
          .then((result) => {
            const user=result.user;
            console.log('SignIn With Google Successfull',user);
          //  navigate('/Welcome');
          })
          .catch((error) => {
             const errormessage=error.message;
             const errorcode=error.code;
             console.log('Login With Google Failed',errorcode,errormessage);
          })
      }
  
      const handlecreateaccount=(e) => {
         e.preventDefault();
         if(Name!=''&&email!=''&&password===confirmpassword)
         {
            createaccount(Name,email,password,mobile);
            console.log('sign in successfull');
         }
          
         else{
           
           console.log('failed');
           console.log(Name);
           console.log(email);
           console.log(mobile);
           console.log(password);
           console.log(confirmpassword);
         }
      }
  
      const handlegooglesignup=(e) => {
        e.preventDefault();
        signupwithGoogle();
      }
  
  
    
    return(
      <>
        <h3>CREATE ACCOUNT</h3>
        <p onClick={() => {navigate('/')}}>Sign In</p>
        <form className='caform'>
          <div>
          <label className='lb1'>Name
            <input type="text" className='ip1' onChange={(e) =>setName(e.target.value)}/>
          </label>
          </div>
  
          <div>
          <label className='lb2' >Email Address
            <input type="email" className='ip2' onChange={(e) => {setemail(e.target.value)}}/>
          </label>
          </div>
  
          <label>Password
            <input type="password"onChange={(e) => {setpassword(e.target.value)}}/>
          </label>
  
          <label>Confirm Password
          <input type="password" onChange={(e) => {setconfirmpassword(e.target.value)}}/>
          </label>
  
          <label>Mobile Number
           <input type="number" placeholder='Your mobile number'/>
           <input type="checkbox" onChange={(e) => {setmobile(e.target.value)}}/>
           <p>Whatsapp</p>
           <button onClick={handlecreateaccount}>Create new account</button>
           <button onClickCapture={handlegooglesignup}>Signup with Google</button>
           
          </label>
  
        </form>
      </>
    )
    }

    export default Createaccount;