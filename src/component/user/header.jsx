import React from 'react'

export default function Header(props) {

    const logoutUser =()=>{
        props.logoutUser(false);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="al-center-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <h3 className="nav-link"><i className="fas fa-users-cog"></i> Users
                            </h3>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#nameUser">{props.userName.firstName}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={logoutUser}>Logout</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}
