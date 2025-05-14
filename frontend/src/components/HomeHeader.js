import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeHeader.css';
import Button from './Button';

export default function HomeHeader() {
  const navigate = useNavigate();
  return (
    <div className="home-header">
      <h1>FLMS</h1>
      <Button variant="primary" onClick={() => navigate('/add')}>
        + Adicionar filme
      </Button>
    </div>
  );
}
