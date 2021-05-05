import React from 'react'
import { Modal } from 'reactstrap'
import { axiosWithAuth } from '../../axiosAuth'

import { herokuUrl } from '../../App'

function AdminCategories(props) {
    const deleteCat = (id) => {
        axiosWithAuth()
            .delete(`${herokuUrl}/api/categories/${id}`)
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