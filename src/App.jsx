import React, { useEffect, useState } from 'react';
// import Search from './components/Search';
import MovieCard from './components/MovieCard';
import Loader from './components/loader';

const BASE_URL = 'https://imdb236.p.rapidapi.com/imdb/most-popular';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '0c1683b310mshe96ed35887ff7dcp14b057jsn08e315a7a60c',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

const App = () => {
  const [endpoint, setEndpoint] = useState(`${BASE_URL}-tv`);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [List, setList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);

      if (data.response === 'false') {
        setErrorMessage(data.error || 'Failed to fetch movies');
        setList([]);
        return;
      }
      setList(data || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]); // Fetch data whenever the endpoint changes

  const handleClick = () => {
    if (endpoint === `${BASE_URL}-tv`) {
      setEndpoint(`${BASE_URL}-movies`);
    } else {
      setEndpoint(`${BASE_URL}-tv`);
    }
  };

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img className='w-[300px]' src="src/assets/logo.png" alt="logo" />
            <img src="./src/assets/hero-img.png" alt="Hero-Banner" />
            <h1>
              Find <span className='text-gradient'>Movie </span> You'll Enjoy Without the Hassle
            </h1>
            {/* <Search /> */}
          </header>

          <button className='search text-white cursor-pointer' onClick={handleClick}>
            { isloading? (<Loader/>) :(endpoint === `${BASE_URL}-tv` ? 'Show Movies' : 'Show TV Shows') } 
          </button>

          <section className='all-movies'> 
            <h2 className='pt-5'>Trending {endpoint === `${BASE_URL}-tv` ? ' TV Shows' : ' Movies'}</h2>
            <ul>
              {List.map((List) => (
                <MovieCard key={List.id} List={List} />
              ))}
            </ul>

            {isloading ? (
              <Loader/>
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {List.map((List, index) => (
                  <p key={index} className='text-white'>{List.title}</p>
                ))}
              </ul>
            )}
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
