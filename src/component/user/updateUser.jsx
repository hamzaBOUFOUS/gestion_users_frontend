import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'

export default function UpdateUser(props) {

    const [id, setId] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [confirm_password, setConfirm_password] = useState("");

    const handleSubmitUpdate = (values) => {
        values.preventDefault();
        const user = {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
            password: password
        };
        axios({
            method: "POST",
            url: "https://gestion-users-backend.herokuapp.com/user/updateUser",
            data: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
                if (res.status === 200) {
                    console.log("Nice Update ", res.data);
                } else {
                    console.log("Error server ");
                }
                props.getListUsers(0);
                props.handleClose();
            });
    };

    useEffect(() => {
        axios.get(`https://gestion-users-backend.herokuapp.com/user/getUserById/${props.idUser!=null?props.idUser:0}`)
            .then((res) => {
                setEmail(res.data.email);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setRole(res.data.role);
                setPassword(((res.data.password === undefined)?"":res.data.password));
                setId(props.idUser);
            });
            
        if(props.rowEventUpdate === false){
            setPassword("");
            setConfirm_password("");
        }
    }, [props.idUser,props.rowEventUpdate]);

    return (

        <Modal show={props.rowEventUpdate} onHide={props.handleClose}>
            <form onSubmit={handleSubmitUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <div className="form-outline">
                                <input type="text" value={firstName} className="form-control form-control-user" onChange={(event) => { setFirstName(event.target.value) }} placeholder="First Name" required />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-outline">
                                <input type="text" value={lastName} className="form-control form-control-user" onChange={(event) => { setLastName(event.target.value) }} placeholder="Last Name" required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={role} onChange={(event) => { setRole(event.target.value) }} required>
                            <option value="DEFAULT" disabled>Choose Role..</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} className="form-control" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(event)=>{setPassword(event.target.value);}} 
    className={((password.length >=8 && password === confirm_password)?"form-control "+(password.length !== 0 && password === confirm_password?"is-valid":""):"form-control is-invalid")} id="password" name="password" minLength="8" placeholder="Password" required />
                        <div className="invalid-feedback">
                            {(password.length < 8 && password.length !== 0)?"Min length is 8":"Please choose a Password."}
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(event)=>{setConfirm_password(event.target.value);}} 
    className={(((confirm_password.length >=8 && password === confirm_password))?"form-control "+confirm_password.length+" "+(confirm_password.length >= 8?"is-valid "+confirm_password+" - "+password:""):"form-control is-invalid "+confirm_password+" - "+password)} id="confirm_password" minLength="8" name="confirm_password" placeholder="Confirm Password" required/>
                        <div className="invalid-feedback">
                           {(confirm_password.length < 8 && confirm_password.length !== 0)?"Min length is 8":"Please choose a Password."}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-primary" type="submit" disabled={(password.length === 0 || confirm_password.length === 0 || password !== confirm_password)?true:false}>Save Changes</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
