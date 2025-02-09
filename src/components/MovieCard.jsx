import React from 'react'

const MovieCard = ({ movie:
  { primaryTitle, averageRating, primaryImage, startYear, runtimeMinutes,url}
}) => {
 
    const handleClick = () => {
      window.open(url, "_blank"); 
    };
  return (
    <div className="movie-card cursor-pointer" onClick={handleClick}>
      <img
        src={primaryImage ?primaryImage : '/No-Poster.png'}
        alt={primaryTitle}
      />

      <div className="mt-4">
        <h3>{primaryTitle}</h3>

        <div className="content">
          <div className="rating">
            <img src="src\assets\star.svg" alt="Star Icon" />
            <p>{
                averageRating ?averageRating.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
         <p className='year'>{runtimeMinutes? `${(runtimeMinutes/60).toFixed(1)}hr`:'N/A'}</p>

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