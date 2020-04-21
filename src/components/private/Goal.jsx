import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function Goal(props) {
  let [deleteModal, setDeleteModal] = useState(0)

  return (
    <div className='goalContainer'>
      <Modal isOpen={deleteModal}>
        <ModalHeader>Delete goal?</ModalHeader>
        <ModalBody>Are you sure you want to delete this goal?</ModalBody>
        <ModalHeader>
          <Button outline color='secondary' onClick={() => setDeleteModal(0)}>Cancel</Button>
          <Button outline color='danger' onClick={() => props.handleDelete(props.card.id)}>Delete</Button >
        </ModalHeader>
      </Modal>
      <p><b>Category:</b> {props.card.category_name}</p>
      <p className='title'><b>Title:</b> {props.card.item_name}</p>
      <p className='description'>{props.card.description}</p>
      <p><b>Finish by:</b> {props.card.target_date}</p>
      <div className='buttonContainer'>
        <Button outline color='danger' onClick={() => setDeleteModal(1)}>Delete</Button >
        {props.card.complete ? (
          <Button outline color='warning' onClick={() => props.itemIncomplete(props.card)}>
            Toggle Incomplete
          </Button>
        ) : (
          <Button outline color='success' onClick={() => props.itemComplete(props.card)}>
            Goal Complete
          </Button>
        )}
      </div>
    </div>
  );
}

export default Goal;
