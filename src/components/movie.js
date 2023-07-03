import React from 'react';
import '../index.css';

function Movie({title,overview,poster_path,vote_average}){

  const setvoteclass=(a) => {
    if(a>=8)
    {
      return 'green';
    }
    else if(a>=6)
    {
      return 'orange';
    }
    else{
      return 'red';
    }
  }
    

    const img_api='https://image.tmdb.org/t/p/w500'

    return (
        <div className='movies'>
          <img src={img_api+poster_path} alt='title'/>
        <div className='movie-info'>
         {<h3>{title}</h3>}
         <span className={`tag ${setvoteclass(vote_average)}`}>{vote_average}</span>
        </div>
        <div className='movie-over'>
         <h2>Overview</h2>
         <p>{overview}</p>
        </div>

       </div>
    )
}

export default Movie;