import React, { useEffect, useState } from 'react'//useEffect
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function AddUser(props) {

    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const handleSubmit = (values) => {
        values.preventDefault();
        const user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
            password: password
        };
        axios({
            method: "POST",
            url: "https://gestion-users-backend.herokuapp.com/user/addUser",
            data: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
                if (res.status === 200) {
                    console.log("Semestre bien ajouter");
                } else {
                    console.log("Error server ");
                }
                props.getListUsers(0);
                props.handleClose();
            });
    };
    useEffect(() => {
        if(props.rowEventsAdd === false){
            setPassword("");
            setConfirm_password("");
        }
    }, [props.rowEventsAdd]);
    return (
        <Modal show={props.rowEventsAdd} onHide={props.handleClose}  >
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-user" onChange={(event) => { setFirstName(event.target.value) }} placeholder="First Name" required />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-user" onChange={(event) => { setLastName(event.target.value) }} placeholder="Last Name" required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" defaultValue={'DEFAULT'} onChange={(event) => { setRole(event.target.value) }} required>
                            <option value="DEFAULT" disabled>Choose Role..</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={(event) => { setEmail(event.target.value) }} className="form-control" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(event)=>{setPassword(event.target.value);}} 
    className={(((password.length === 0 && confirm_password.length === 0) || (password.length >=8 && password === confirm_password))?"form-control "+((password.length !== 0 && password === confirm_password)?"is-valid":""):"form-control is-invalid")} id="password" name="password" minLength="8" placeholder="Password" required />
                        <div className="invalid-feedback">
                            {(password.length < 8 && confirm_password.length === 0)?"Min length is 8":"Please choose a Password."}
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(event)=>{setConfirm_password(event.target.value);}} 
    className={(((password.length === 0 && confirm_password.length === 0) || (confirm_password.length >=8 && password === confirm_password))?"form-control "+confirm_password.length+" "+(confirm_password.length >= 8?"is-valid ":""):"form-control is-invalid ")} id="confirm_password" minLength="8" name="confirm_password" placeholder="Confirm Password" required/>
                        <div className="invalid-feedback">
                           {(confirm_password.length < 8 && password.length === 0)?"Min length is 8":"Please choose a Password."}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                </Button>
                    <div className="form-group">
                        <button className="btn btn-secondary" type="submit" disabled={(password.length >= 8 && confirm_password.length >= 8 && password === confirm_password)?false:true} >add</button>
                    </div>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
