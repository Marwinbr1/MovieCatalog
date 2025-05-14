import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import '../index.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(res => res.json())
      .then(setMovies);
  }, []);

  return (
    <div>
      <Navbar />
  
      <div className="container section-bottom-spacing">
        {movies.length > 0 ? (
          <>
            <div className="flex-between" style={{ width: '100%', marginBottom: '16px' }}>
              <h2 className="heading-xl">Filmes adicionados</h2>
              <button
                className="btn btn-secondary btn-md"
                onClick={() => navigate('/add')}
              >
                <span className="btn-icon">+</span>
                Adicionar filme
              </button>
            </div>
  
            <MovieList movies={movies} />
          </>
        ) : (
          <div className="empty-wrapper" style={{ flexDirection: 'column' }}>
            <p className="empty-state">Nenhum filme por aqui... <br /> que tal adicionar o primeiro?</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/add')}
            >
              <span className="btn-icon">+</span>
              Adicionar filme
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
}
