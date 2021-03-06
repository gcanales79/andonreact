import React, { Component } from "react";


class Header extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/#/graph">Andon</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/#/graph">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Administracion
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/#/usuario">Agregar Usuario</a>
                                <a className="dropdown-item" href="/#/operador">Agregar Operador</a>
                                <a className="dropdown-item" href="/#/maquina">Agregar Maquina</a>
                                <a className="dropdown-item" href="/#/falla">Agregar Falla</a>
                                
                            </div>
                        </li>
                        
                    </ul>
                    
                </div>
            </nav>



        )
    };
}


export default Header;