import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import React from 'react'//, { useState, useEffect }

export default function DeleteUser(props) {

    const handleSubmitDelete = (values) => {
        values.preventDefault();
        axios.get(`https://gestion-users-backend.herokuapp.com/user/deleteUser/${props.idUser}`)
            .then((res) => {
                props.getListUsers(0);
                props.handleClose();
            });
    };

    
    return (
        <Modal show={props.rowEventDelete} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you shor  delete User id :{props.idUser}.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmitDelete}>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}
