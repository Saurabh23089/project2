import { useState } from 'react';
import './App.css'
import './firebase.js'
import { getAuth,createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {getFirestore,collection,addDoc, getDocs} from 'firebase/firestore';
import glogo from './glogo.png';





function Createaccount(){
  

    const[Name,setName]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const provider=new GoogleAuthProvider();
    const navigate=useNavigate();


    const createaccount=async(Name,email,password)=>{
      if(password.length<6&&password===confirmpassword)
      {
        alert("Password should be at least 6 characters");
      }
       
         try{
           const auth=getAuth();
           const firestore=getFirestore();

           const usercredential=await createUserWithEmailAndPassword(auth,email,password);
           const user=usercredential.user;
            
           const userData = {
            uid: '',
            Name: '',
            email: '',
            
          };
      
          if (user && user.uid) {
            userData.uid = user.uid;
            userData.Name = Name;
            userData.email = user.email;
            
          }
           
         
         const collectionref=collection(firestore,'users');
         await addDoc(collectionref,userData);
         console.log('User Signup details stored to firestore successfully');
         navigate('/Welcome');
          setName('');
           setemail('');
           setpassword('');
           setconfirmpassword('');
          }
        
          catch(error){
             console.log('Sign up failed',error.message);
          }
      }

      
  
      
      const signupwithGoogle=() =>{
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
             
             console.log('Signup With Google Failed',errorcode,errormessage);
          })
      }  
  
      const handlecreateaccount=(e) => {
         e.preventDefault();
         if(Name!=''&&email!=''&&password===confirmpassword)
         {
            createaccount(Name,email,password);
            console.log('sign in successfull');
         }
         else if(password!==confirmpassword)
         {
           alert("Passwords don't match");
         }
      }
  
      const handlegooglesignup=(e) => {
        e.preventDefault();
        signupwithGoogle();
      }
  
  
    
    return(
      <>
        <p className='heading' onClick={() => {navigate('/')}}>SIGN IN</p>
        <form className='caform'>
          <div className='div1'>

          <label className='lb1'>Name
            <input type="text" className='ip1' onChange={(e) =>setName(e.target.value)}/>
          </label>

          <label className='lb2' >Email Address
            <input type="email" className='ip1' onChange={(e) => {setemail(e.target.value)}}/>
          </label>
          </div>
  
          <div className='div2'>

          <label>Password
            <input type="password" className='ip2' onChange={(e) => {setpassword(e.target.value)}}/>
          </label>
  
          <label>Confirm Password
          <input type="password" className='ip2' onChange={(e) => {setconfirmpassword(e.target.value)}}/>
          </label>

          </div>
  
          
           
           <button className='cn' onClick={handlecreateaccount}>Create new account</button>
           <div className='lwg'>
           <button className='sg' onClickCapture={handlegooglesignup}><img src={glogo} alt='glogo'className='googlelogo1'/>Signup with Google</button>
           </div>
  
        </form>
      </>
    )
    }

    export default Createaccount;