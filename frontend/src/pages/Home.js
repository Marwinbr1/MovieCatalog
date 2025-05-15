import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import '../index.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/movies')
      .then((res) => res.json())
      .then(setMovies)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container section-bottom-spacing">
        {isLoading ? (
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#080808',
              width: '100vw',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 2000,
            }}
          >
            <p className="empty-state">Carregando...</p>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div
              className="flex-between"
              style={{ width: '100%', marginBottom: '16px' }}
            >
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
            <p className="empty-state">
              Nenhum filme por aqui... <br /> que tal adicionar o primeiro?
            </p>
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
