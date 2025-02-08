import React, {useEffect, useState } from 'react';
import Search from './components/Search';


const API_BASE_URL= 'https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb?name=robot&page=1';

const API_OPTIONS = {
   headers: {
    'x-rapidapi-key': '0c1683b310mshe96ed35887ff7dcp14b057jsn08e315a7a60c',
    'x-rapidapi-host': 'tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com'
  }

};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const fetchMovies=async () => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint =`${API_BASE_URL}`;

      const response = await fetch(endpoint,API_OPTIONS);
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
      setMovieList(data.results || []);
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
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
         {isloading ? (
          <p className='text-white'> Loading......</p>
         ):errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
         ) :(
          <ul>
             
            {movieList.map((movie) => (
              <p className='text-white'>{movieList}</p>
              
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
