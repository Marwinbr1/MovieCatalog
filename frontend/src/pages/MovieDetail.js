import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import Navbar from '../components/Navbar';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/movies/${id}`)
      .then(res => res.json())
      .then(setMovie);
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
      <>
        <Navbar />  
        <div className="movie-detail">
          <div className="movie-detail__image">
            <img src={movie.image} alt={movie.title} />
          </div>
          
          <div className="movie-detail__content">
            <h2 className='movie-title'>{movie.title}</h2>
            <p className="movie-year">({movie.year})</p>
            <p className="movie-synopsis">{movie.synopsis}</p>
          </div>
        </div>
      </>
    );
}
