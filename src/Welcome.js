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

  const search_api=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_SEARCH_API}&query=`;
  const IMU = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_IMU}&hi`;


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
    
    {/* <label><button className='logout-btn' onClick={handlelogout}>Logout</button></label>     */}
    
    <span className='logout-btn' onClick={handlelogout}>Logout</span>

    </header>
    
      
    <div className='movie-container'>
     {movies.map((movie) => <Movie key={movie.id} {...movie}/>)}
    </div>
    </>
  )
}


export default Welcome;


