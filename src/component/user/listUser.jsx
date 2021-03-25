import axios from 'axios';
import { Col } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react'
import AddUser from './addUser';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';
import Header from './header';
import ReactPaginate from 'react-paginate';

export default function ListUsers(props) {

    const [id, setId] = useState();
    const [listUsers, setListUsers] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [searchName, setSearchName] = useState("");
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleCloseAdd = () => setShowAdd(false);
    const rowEventsAdd = () => { setShowAdd(true); }

    //----Selection Update----
    const rowEventsUpdate = (e) => {
        //console.log("Update : ", e);
        setId(e);
        setShowUpdate(true);
    }
    //----Selection Delete----
    const rowEventsDelete = (e) => {
        //console.log("Delete : ", e);
        setId(e);
        setShowDelete(true);
    }
    //---input Serach---
    const searchEvent = ((e, p) => {
        setSearchName(e);
        if (e.target.value === "") {
            getListUsers(0);
        } else {
            axios.get(`https://gestion-users-backend.herokuapp.com/user/getUsersByFirstName?firstName=${(e.target.value === "" ? "null" : e.target.value)}&size=5&page=${p}`)
                .then((res) => {
                    setListUsers(res.data.content);
                    //console.log(res.data.content);
                    //console.log(res.data.length," - ",listUsers)
                    setPageCount(res.data.totalPages);
                });
        }
    });

    //---Liste Users---
    const getListUsers = useCallback(
        (e) => {
            axios.get(`https://gestion-users-backend.herokuapp.com/user/listUser?size=5&page=${e}`)
                .then((res) => {
                    if (res.status === 200) {
                        setListUsers(res.data.content);
                        setPageCount(res.data.totalPages);
                    } else {
                        console.log("Ereuur ");
                    }
                });
        },
        [],
    );

    useEffect(() => {
        getListUsers(0);
        const tokenString = localStorage.getItem('token');
        if(tokenString !== null){
            axios.get(`https://gestion-users-backend.herokuapp.com/user/getUserById/${tokenString}`)
                .then((res) => {
                    props.changeLogin(res.data);
                });
        }
    }, [getListUsers]);

    //---pagination---
    const handlePageClick = (e) => {
        if (typeof (searchName) === 'object' && searchName.target.value !== "") {
            searchEvent(searchName, e.selected);
        } else {
            getListUsers(e.selected);
        }
    }

    return (
        <div>
            <Header logoutUser={props.changeLogin} userName={props.logintest} />
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="form-row align-items-center">
                                    <div className="col-auto my-1">
                                        <button className="btn btn-primary" onClick={rowEventsAdd}>
                                            <i className="fas fa-user-plus"></i>
                                        </button>
                                    </div>
                                    <div className="col-sm-8 my-1">
                                        <div className="input-group">
                                            <Col>
                                                <input type="text" className="form-control" onChange={(e) => searchEvent(e, 0)} placeholder="Search..." required />
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listUsers.length > 0
                                        ? listUsers.map((listUser) => {
                                            return (
                                                <tr key={listUser.id} className="text-center">
                                                    <td>{listUser.id}</td>
                                                    <td>{listUser.firstName}</td>
                                                    <td>{listUser.lastName}</td>
                                                    <td>{listUser.role}</td>
                                                    <td>{listUser.email}</td>
                                                    <td>********</td>
                                                    {(props.logintest.role !== "admin") ? (<td>{listUser.role}</td>)
                                                        : (<td><button className="btn mr-3" onClick={() => rowEventsUpdate(listUser.id)} style={{ padding: "5px" }}><i className="fas fa-pen text-warning"></i></button><button className="btn" onClick={() => rowEventsDelete(listUser.id)} style={{ padding: "5px" }}><i className="fas fa-trash-alt text-danger"></i></button></td>)}

                                                </tr>
                                            );
                                        })
                                        : (<tr><td colSpan={7} className="text-center">No matching records found</td></tr>)
                                    }
                                    <DeleteUser rowEventDelete={showDelete} handleClose={handleCloseDelete} idUser={id} getListUsers={getListUsers} />
                                    <UpdateUser rowEventUpdate={showUpdate} handleClose={handleCloseUpdate} idUser={id} getListUsers={getListUsers} />
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <ReactPaginate className="pagination"
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                onPageChange={handlePageClick}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div>
                        <AddUser rowEventsAdd={showAdd} handleClose={handleCloseAdd} getListUsers={getListUsers} />
                    </div>
                </div>
            </div>

        </div>
    )
}
