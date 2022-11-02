import React from "react";
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from "./pages/Home";
import AddUser from "./pages/addUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ='/' component ={Home}/>
        <Route exact path ='/adduser' component ={AddUser}/>
        <Route exact path ='/edituser/:id' component ={EditUser}/>
      </Switch>
    </div>
  );
}

export default App;
