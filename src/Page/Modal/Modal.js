import React from 'react';
import "./Modal.css"
import { Modal, Button } from 'react-bootstrap';

export default function ReusableModal({ show, onHide, title, children, onSave }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="custom-modal"
      backdrop="static" 
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">{children}</Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button variant="secondary" onClick={onHide} className="custom-modal-button">
          Close
        </Button>
        <Button variant="success" onClick={onSave} className="custom-modal-button">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
