import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import Loader from './components/loader';
import {useDebounce} from 'react-use';
//import Buttons from './components/Buttons';

// const TOP_POPULAR_MOVIE = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
// const SEARCH_URL= 'https://imdb236.p.rapidapi.com/imdb/autocomplete?query=batman'
// const TOP_RATED_INDIAN= 'const url = 'https://imdb236.p.rapidapi.com/imdb/india/top-rated-indian-movies';'
// https://imdb236.p.rapidapi.com/imdb/
const BASE_URL = 'https://imdb236.p.rapidapi.com/imdb/';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ca8f913189msh2781c5c5e6deeb7p15c067jsn5a4bfb115860',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

const App = () => { 
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [List, setList] = useState([]);
  const [apiCallCount, setApiCallCount] = useState(() => {
    const savedCount = localStorage.getItem('apiCallCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  }); // Initialize counter from local storage


  const [isloading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 2000, [searchTerm])

  const fetchData = async (query='') => {
    setIsLoading(true);
    setApiCallCount(prevCount => {
        const newCount = prevCount + 1; // Increment the API call counter
        localStorage.setItem('apiCallCount', JSON.stringify(newCount)); // Save to local storage
        return newCount;
    });

    setErrorMessage('');

    try {
      // setEndpoint(query ? `${BASE_URL}autocomplete?query=${encodeURIComponent(query)}` : `${BASE_URL}most-popular-movies`);
      
      const endpoint = query ? 
        `${BASE_URL}autocomplete?query=${encodeURIComponent(query)}` 
      : `${BASE_URL}most-popular-movies`;

       const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json(); // Change to text to log the response
      console.log(data); // Log the response to see what is returne

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
    fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // Fetch data whenever the SearchTerm changes

    return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img className='w-[300px]' src="src/assets/logo.png" alt="logo" />
            <img src="./src/assets/hero-img.png" alt="Hero-Banner" />
            <h1> 

              Find <span className='text-gradient'>Movie & TV Shows </span> You'll Enjoy Without the Hassle 

            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className='all-movies'> 
            <h2 className='pt-5'>Trending Movies</h2>
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span className="font-medium">Numbers of API Calls Made : </span>{apiCallCount}
                      </div>

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
