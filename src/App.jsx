import React, { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern' >
      <div className='wrapper'>
        <header>
          <img src="./src/assets/hero-img.png" alt="Hero-Banner" />
          <h1>
            Find <span className='text-gradient'>Movie </span> You'll Enjoy Without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className='text-white'>{searchTerm}</h1>
      </div>
      </div>
    </main>
  );
}

export default App;
