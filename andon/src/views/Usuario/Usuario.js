import React, { Component } from "react";
import Header from "../../components/Header";
import UserAPI from "../../api/user.api";

class Usuario extends Component {
    state = {
        username: "",
        password: "",
        role: "Produccion",
        mensaje: "",
        classrespuesta:"",


    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        this.setState({

            username: "",
            password: "",
        })
        UserAPI.postUser(
            {
                usuario: this.state.username,
                password: this.state.password,
                role: this.state.role
            })
            .then(response => {
               //console.log(response.data.errors)
                if (response.data.errors) {
                    this.setState({
                        mensaje: "El usuario ya existe",
                        classrespuesta:"col-12 bg-danger text-white"
                    })
                }
                else {
                    this.setState({
                        mensaje: "Usuario Creado Exitosamente",
                        classrespuesta:"col-12 bg-success text-white"
                    })
                }
                //console.log(response)
                //window.location.replace("/login")

            })
    }



    render() {
        return (
            <div className="wrapper">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Dar de Alta Usuario</h2>
                            <form className="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsuario">Usuario</label>
                                    <input type="text" autoFocus onChange={this.handleInputChange} name="username" className="form-control" id="usuario-input" value={this.state.username} placeholder="Usuario" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleInputChange} id="password-input" value={this.state.password} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="RolFormaUsuario">Rol</label>
                                    <select className="form-control" id="select-role" onChange={this.handleInputChange} name="role">
                                        <option>Produccion</option>
                                        <option>Almacen</option>
                                        <option>Mantenimiento</option>
                                        <option>Compras Indirectas</option>
                                        <option>Calidad</option>
                                        <option>Herramentales</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <button type="submit" onClick={this.handleFormSubmit} className="btn btn-primary">Dar de Alta</button>


                            </form>
                            <br />
                            <div className={this.state.classrespuesta}>
                                {this.state.mensaje}
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }


}

export default Usuario;