import './App.css';
import ListUsers from "./component/user/listUser"
import React, { useState } from 'react'
import LoginUser from './component/login/login';
import { Route ,Redirect ,BrowserRouter as Router } from 'react-router-dom';

function App() {
    const [login, setLogin] = useState(false);

    const changeLogin = ((e) => {
        setLogin(e);
        if(e=== false){
            localStorage.removeItem('token');
        }
    });

    return (
        <div className="App">
            <Router>
                <Route exact path={["/user/home", "/user"]}>
                    <ListUsers changeLogin={changeLogin} logintest={login}/>
                </Route>
                <Route exact path={["/Login", "/"]}>
                        <LoginUser changeLogin={changeLogin} logintest={login}/>
                    </Route>
                {login ?
                    (<Redirect push to={{ pathname: '/user/home' }} />) :
                    (<Redirect push to={{pathname:"/Login"}} />)
                }
            </Router>
        </div>
    );
}

export default App;
