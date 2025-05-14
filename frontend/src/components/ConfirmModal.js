import React from 'react';
import './ConfirmModal.css';
import Button from './Button';

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <Button variant="ghost" onClick={onCancel}>{cancelText}</Button>
          <Button variant="primary" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}
