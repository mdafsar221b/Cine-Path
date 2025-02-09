import React from 'react'

const MovieCard = ({ List:
  { primaryTitle, averageRating, primaryImage, startYear, runtimeMinutes,url,spokenLanguages}
}) => {
    
    const handleClick = () => {
      window.open(url, "_blank"); 
    };
  return (
    <div className="movie-card cursor-pointer" onClick={handleClick}>
      <img
        src={primaryImage ? primaryImage : 'src\assets\No-Poster.png'}
        alt={primaryTitle}
      />

      <div className="mt-4">
        <h3>{primaryTitle}</h3>

        <div className="content">
          <div className="rating">
            <img src="src\assets\star.svg" alt="Star Icon" />
            <p>{
                averageRating ? averageRating.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
         <p className='year'>{spokenLanguages? `${JSON.stringify(spokenLanguages[0]).toUpperCase()} ${spokenLanguages[1]?JSON.stringify(spokenLanguages[1]).toUpperCase():''}`: 'N/A'}</p>

          <span>•</span>
          <p className="year">
            {startYear ? startYear : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MovieCard