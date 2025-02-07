import React from 'react'


const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="./src/assets/Search.svg" alt="search" />
            <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search