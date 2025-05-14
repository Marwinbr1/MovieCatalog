import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieForm.css';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: '',
    image: '',
    synopsis: '',
    year: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/movies/${id}`)
        .then(res => res.json())
        .then(movie => setFields(movie));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    fetch('http://localhost:3001/movies' + (id ? `/${id}` : ''), {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).then(() => navigate('/'));
  }

  function handleDelete() {
    fetch(`http://localhost:3001/movies/${id}`, { method: 'DELETE' })
      .then(() => {
        setShowDeleteModal(false);
        navigate('/');
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          value={fields.title}
          onChange={handleChange}
          placeholder="Título do filme"
          required
        />
        <input
          name="image"
          value={fields.image}
          onChange={handleChange}
          placeholder="Capa do filme"
          required
        />
        <textarea
          name="synopsis"
          value={fields.synopsis}
          onChange={handleChange}
          placeholder="Sinopse"
          required
        />
        <input
          name="year"
          value={fields.year}
          onChange={handleChange}
          placeholder="Ano de lançamento"
          required
        />
        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={() => setShowDeleteModal(true)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </div>
      </form>

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        open={showDeleteModal}
        title="Deseja realmente excluir esse filme do catálogo?"
        message="Ao clicar em excluir, o filme será excluído permanentemente do nosso catálogo."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
}
