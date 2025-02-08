import React, {useEffect, useState } from 'react';
import Search from './components/Search';



const url = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '0c1683b310mshe96ed35887ff7dcp14b057jsn08e315a7a60c',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

/*
const API_BASE_URL= 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
   
    headers:{
      accept:'application/json',
       'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      Authorization:`Bearer ${API_KEY}`
    }

};
*/


const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const fetchMovies= async () => {
    setIsLoading(true);
    setErrorMessage('');

    try{

      const response = await fetch(url, options);
     if(!response.ok){
      throw new Error('Failed to fetch data');
     }
     const data = await response.json();
     console.log(data);

     if(data.response === 'false'){
      setErrorMessage(data.error || 'Failed to fetch movies');
      setMovieList([]);
      return;
     }
      setMovieList(data|| []);
    } catch(error) {
      console.error(`Error fetching movies : ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally{
      setIsLoading(false);
    }
  }
   
   useEffect(() =>{
    fetchMovies();
   },[]);
   

  return (
    <main>
      <div className='pattern' >
      <div className='wrapper'>
        <header>
          <img src="./src/assets/hero-img.png" alt="Hero-Banner" />
          <h1>
            Find <span className='text-gradient'>Movie </span> You'll Enjoy Without the Hassle
          </h1>
        <Search/>
        </header>
        <section className='all-movies'>
          <h2>Popular Movies</h2>
          <ul>
             
             {movieList.map((movie) => (
              
              <div key={movie.id} className='movie-card flex flex-col justify-between'>
                <img src={movie.primaryImage} alt="" />
                <h3 className='text-white'>{movie.originalTitle}</h3>
                <div>
                  <p className='text-white py-0.5'> Year : {movie.startYear}</p>
                  <p className='text-white py-0.5'> Lan : {movie.language}</p>
                </div>

              </div>
               
             ))}
           </ul>
         
         {isloading ? (
          <p className='text-white'> Loading......</p>
         ):errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
         ) :(
          <ul>
             
            { movieList.map((movie,index) => (
              <p key={index} className='text-white'>{movie.title}</p>
              
            ))}
          </ul>
         )
        }
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>} 

        </section>
      </div>
      </div>
    </main>
  );
}

export default App;