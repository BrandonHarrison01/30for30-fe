import React from 'react'
import { Modal } from 'reactstrap'
import { axiosWithAuth } from '../../axiosAuth'

function AdminCategories(props) {
    const deleteCat = (id) => {
        axiosWithAuth()
            .delete(`https://bucket-list-tracker.herokuapp.com/api/categories/${id}`)
            .then(res => props.setDeleteCatModal(false))
            .catch(err => console.log(err))
    }

    return(
        <Modal isOpen={props.deleteCatModal} toggle={() => props.setDeleteCatModal(!props.deleteCatModal)}>
            {props.categories.map(category => (
                <p key={category.id }>{category.category_name} <button onClick={() => deleteCat(category.id)}>X</button></p>
            ))}
        </Modal>
    )
}

export default AdminCategories