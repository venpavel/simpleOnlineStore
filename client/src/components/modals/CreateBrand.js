import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateBrand = ({ show, onHide }) => {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder="Введите название бренда" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
