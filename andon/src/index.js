import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from "./views/Login"
import { BrowserRouter as Router, HashRouter, Route, Switch, Redirect } from "react-router-dom";
import decode from "jwt-decode";
import Graph from "./views/Graph";
import Usuario from "./views/Usuario";
import TablaOperador from "./views/TablaOperador"
import TablaMaquina from "./views/TablaMaquina"
import TablaFalla from "./views/TablaFalla"


const checkAuth=()=>{
    const token=localStorage.getItem("token")
    if(!token){
      return false;
    }
    try{
      // exp: 1213212121321
    const {exp}=decode(token)
    if(exp<new Date().getTime()/1000){
      return false;
    }
    }catch(err){
      return false;
    }
    
    return true
    }

    
//*Funcion que crea que las rutas privadas, que se muestren solo si esta autentificado
const PrivateRoute=({component:Component,...rest})=>(
    <Route {...rest} render={(props)=>(
      checkAuth()
      ?(<Component {...props}/>)
      :(<Redirect to={{pathname: "/"}} />)
    )}/>
  )

ReactDOM.render(
<HashRouter>
    <Switch>
        <Route exact path="/" render={()=><Login/>}/>
        <PrivateRoute path="/graph" component={Graph}/>;
        <PrivateRoute path="/usuario" component={Usuario}/>;
        <PrivateRoute path="/operador" component={TablaOperador}/>;
        <PrivateRoute path="/maquina" component={TablaMaquina}/>
        <PrivateRoute path="/falla" component={TablaFalla}/>
      
    </Switch>
</HashRouter>,
document.getElementById("root")
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


serviceWorker.unregister();
