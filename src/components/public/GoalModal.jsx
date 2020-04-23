import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

function GoalModal(props) {
    return (
        <Modal isOpen={props.goalModal}>
            <ModalBody>
                <h1>{props.goalModal && props.postData.item_name}</h1>
            </ModalBody>
        </Modal>
    )
}

export default GoalModal