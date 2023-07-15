import React , {useState,useEffect} from 'react'; 
import './firebase.js'
import firebase from 'firebase/app';
import {getAuth,onAuthStateChanged,signOut} from 'firebase/auth';
import { getStorage,ref,getDownloadURL} from 'firebase/storage';
import Movie from './components/movie';
import './index.css';
import {} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginForm from './Login.js'

function Welcome()
{
  
  const[movies,setmovies]=useState([]);
  const[searchterm,setsearchterm]=useState('');
  const navigate=useNavigate();

  const search_api=`https://api.themoviedb.org/3/search/movie?api_key=${'8b43381d2baea978799884b0d93c2310'}&query=`;
  const IMU = `https://api.themoviedb.org/3/discover/movie?api_key=${'8b43381d2baea978799884b0d93c2310'}&hi`;


  useEffect(() => {
    getmovies(IMU);
  },[])

  const getmovies=(API) => {
    fetch(API)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setmovies(data.results);
    })
  }

  
  const handleonsubmit=(e) => {
      e.preventDefault();
      if(searchterm){
        window.history.pushState(null,'','/movies/search');
        getmovies(search_api+searchterm);
      }    
  } 

  useEffect(() => {
    const handlepopstate=()=> {
      setsearchterm('');
      getmovies(IMU);
    }
    window.addEventListener('popstate',handlepopstate);

    return () => {
      window.removeEventListener('popstate',handlepopstate);
    }

  },[searchterm])


  const handleonchange=(e) => {
    setsearchterm(e.target.value)

  } 

  const handlelogout=(e)=>{
    e.preventDefault();
    const auth=getAuth();
    signOut(auth).then(() => {
      console.log('Sign Out Successfull');
      navigate('/');
      
    })
    .catch(() => {
      console.log('Error Happened');
    })

    window.history.replaceState(null, '','/');
    
  }
  
  
  return (
    <>
    
    <header>

    <form onSubmit={handleonsubmit}>
      <input type="text" placeholder='Search...' className='search'
      value={searchterm} onChange={handleonchange}
      />
      
    </form>
    <button className='logout-btn' onClick={handlelogout}>Logout</button>
        
    </header>
    
      
    <div className='movie-container'>
     {movies.map((movie) => <Movie key={movie.id} {...movie}/>)}
    </div>
    </>
  )
}


export default Welcome;


























/*

function Profile(){

  const[showprofile,setshowprofile]=useState(false);

  const handlemenuclick=() => {  // I want to acheive when user clicks outside profile area , the profile should be hidden
     setshowprofile(!showprofile);
  }

  const handleoutsideclick=(e) => {
    if(e.target.id!=='menu-btn')
    {
      setshowprofile(false);
    }
  } 

/*  return (
    <>
    <div id='profile' onnClick={handleoutsideclick}>
      <p id='menu-btn' onClick={handlemenuclick}>MENU</p>
      {showprofile&&<div>
       {<h1>AIACTR</h1>}
      </div>}
    </div>
    
    </>
  )*/

 /* return(
    <Dropdown>
      <DropdownButton id="profile" title="Profile">
        <Dropdown.Item href="#/action-1">Image</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Watchlist</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
        </DropdownButton>
    </Dropdown>
  )
}    

function Welcome(){
    const [web,setweb]=useState([]);
    const [showrating,setshowrating]=useState(false);

    useEffect(() => {

      fetch('/series.json')
      
      .then((response) => {
        console.log(response);
        return response.json()
        
      })
      .then((data) => setweb(data))
      .catch((error) => console.log(error.message))
    },[])

 return(
   <>
    
    
    <h1 className='title'>Showjjhghhhhhhhhhhhhhhgghgjh</h1>
    
     <Dropdown>
      <DropdownButton id="profile2" title="Profile">
        <Dropdown.Item href="#/action-1">Image</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Watchlist</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
        </DropdownButton>
    </Dropdown>
    

    
     {web.map((e) => {
       return (
         <div class="ss">
       <img src={e.poster} alt={e.title}/>
       <button>Watch</button>
       <span onMouseEnter={() => setshowrating(true)} onMouseLeave={() => setshowrating(false)}>IMDB {showrating?e.imdb:""}</span>
       
       <span><p>S1 || S2</p></span>
      
       </div>
       
       )
     })} 
   </>
 )
  
}

export default Welcome; 


/*
 const[profileimage,setprofileimage]=useState();

useEffect(() => {
  const auth=getAuth();
   onAuthStateChanged(auth,(user) => {
      const storage=getStorage();
      const imageref=ref(storage,`image${user.uid}`);
      getDownloadURL(imageref).then((url) => setprofileimage(url))
   })
},[])

return (
   <nav>
     {profileimage&&<img src={profileimage} alt="ProfileImage"/>}
   </nav>
)  
*/