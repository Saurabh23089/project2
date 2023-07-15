import { useState } from 'react';
import './App.css'
import './firebase.js'
import {db} from './firebase.js'
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,signUpWithPopup} from 'firebase/auth';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
import {getFirestore,collection,addDoc} from 'firebase/firestore';
import glogo from './glogo.png';




function Createaccount(){
  

    const[Name,setName]=useState("");
    const[email,setemail]=useState("");
    const[mobile,setmobile]=useState("");
    const[password,setpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const provider=new GoogleAuthProvider();
   const navigate=useNavigate();
  
/*    const createaccount=(Name,email,password,mobile) => {  // For first time users
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
      }  */


      const createaccount=async(Name,email,password)=>{
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
        <h3 className='heading' onClick={() => {navigate('/')}}>SIGN IN</h3>
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