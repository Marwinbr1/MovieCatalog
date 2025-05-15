import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieForm.css';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import Navbar from '../components/Navbar';

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: '',
    image: '',
    synopsis: '',
    year: '',
  });
  const [initialFields, setInitialFields] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:3001/movies/${id}`)
        .then((res) => res.json())
        .then((movie) => {
          const movieAsString = Object.fromEntries(
            Object.entries(movie).map(([k, v]) => [
              k,
              v == null ? '' : String(v),
            ]),
          );
          setFields(movieAsString);
          setInitialFields(movieAsString);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const hasChanges = () => {
    if (!initialFields) return false;
    return Object.keys(fields).some(
      (key) => String(fields[key] ?? '') !== String(initialFields[key] ?? ''),
    );
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
  }

  function handleUpdateClick(e) {
    e.preventDefault();
    setShowUpdateModal(true);
  }

  async function submitUpdate() {
    setIsLoading(true);
    try {
      await fetch('http://localhost:3001/movies/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
      alert('Ocorreu um erro ao salvar o filme. Tente novamente.');
    } finally {
      setIsLoading(false);
      setPendingSubmit(false);
    }
  }

  async function handleSubmit(e) {
    if (id && hasChanges()) {
      e.preventDefault();
      setShowUpdateModal(true);
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const method = id ? 'PUT' : 'POST';
      await fetch('http://localhost:3001/movies' + (id ? `/${id}` : ''), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
      alert('Ocorreu um erro ao salvar o filme. Tente novamente.');
    } finally {
      setIsLoading(false);
      setPendingSubmit(false);
    }
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      await fetch(`http://localhost:3001/movies/${id}`, { method: 'DELETE' });
      setShowDeleteModal(false);
      navigate('/');
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
      alert('Ocorreu um erro ao excluir o filme. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    if (hasChanges()) {
      setShowCancelModal(true);
    } else {
      navigate('/');
    }
  }

  if (isLoading && id) {
    return (
      <div>
        <Navbar />
        <div className="form">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h2
        className="heading-xl"
        style={{ textAlign: 'center', marginTop: 32, marginBottom: 32 }}
      >
        {id ? 'Editar dados do filme' : 'Adicionar filme'}
      </h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Título do filme</label>
          <input
            id="title"
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="Digite o título do filme"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Capa do filme</label>
          <input
            id="image"
            name="image"
            value={fields.image}
            onChange={handleChange}
            placeholder="Cole o link da imagem"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="synopsis">Sinopse</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={fields.synopsis}
            onChange={handleChange}
            placeholder="Digite a sinopse do filme"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Ano de lançamento</label>
          <input
            id="year"
            name="year"
            value={fields.year}
            onChange={handleChange}
            placeholder="Digite o ano de lançamento do filme"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-actions">
          <div className="form-actions__top">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              size="lg"
            >
              Cancelar
            </Button>
            {id && hasChanges() ? (
              <Button
                variant="primary"
                type="button"
                disabled={isLoading}
                size="lg"
                onClick={handleUpdateClick}
              >
                {isLoading ? 'Salvando...' : 'Atualizar'}
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            )}
          </div>
          {id && (
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={isLoading}
              size="lg"
            >
              Excluir permanentemente
            </Button>
          )}
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

      {/* Modal de confirmação de cancelamento */}
      <ConfirmModal
        open={showCancelModal}
        title="Deseja realmente cancelar a edição?"
        message="Todas as alterações serão perdidas."
        onConfirm={() => navigate('/')}
        onCancel={() => setShowCancelModal(false)}
        confirmText="Sim, cancelar"
        cancelText="Não, continuar editando"
      />

      <ConfirmModal
        open={showUpdateModal}
        title="Deseja salvar as alterações que acabou de fazer?"
        message="Ao clicar em atualizar, as informações do filme serão alteradas."
        onConfirm={() => {
          setShowUpdateModal(false);
          submitUpdate();
        }}
        onCancel={() => {
          setShowUpdateModal(false);
          setPendingSubmit(false);
        }}
        confirmText="Atualizar"
        cancelText="Cancelar"
      />
    </div>
  );
}
