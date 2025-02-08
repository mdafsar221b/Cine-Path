import React from 'react'

const MovieCard = ({ movie:
  { primaryTitle, averageRating, primaryImage, startYear, spokenLanguages}
}) => {
  return (
    <div className="movie-card">
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
          <p className="lang">{spokenLanguages}</p>

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