import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function GoalModal(props) {
  return (
    <Modal
      isOpen={props.goalModal}
      toggle={() => props.toggleGoalModal(props.postData)}
    >
      {props.goalModal && (
        <div>
          <ModalHeader toggle={() => props.toggleGoalModal(props.postData)} >
            <h3>{props.userId[props.postData.user_id]}</h3>
          </ModalHeader>
          <ModalBody>
            <p><b>Title: </b>{props.postData.item_name}</p>
            <p><b>Description: </b>{props.postData.description}</p>
            <p><b>Finish by: </b>{props.postData.target_date}</p>
          </ModalBody>
        </div>
      )}
    </Modal>
  );
}

export default GoalModal;
