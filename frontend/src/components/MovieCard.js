import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import Button from './Button';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />
      
      <h3>
        {movie.title} <span>({movie.year})</span>
      </h3>
      
      <p>{movie.synopsis.substring(0, 145)}...</p>
      
      <div className="movie-card__actions">
        <Button variant="ghost btn-sm" onClick={() => navigate(`/edit/${movie.id}`)}>
          Editar
        </Button>
        <Button variant="primary btn-sm" onClick={() => navigate(`/movie/${movie.id}`)}>
          + Saiba mais
        </Button>
      </div>
    </div>
  );
}