import React, { Component } from "react";
import UserAPI from "../../api/user.api";

class Operador extends Component {
    state = {
        nomina: "",
        nombre: "",
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

            nomina: "",
            nombre: "",
        })
        UserAPI.postOperador(
            {
                nomina: this.state.nomina,
                nombre: this.state.nombre,
            })
            .then(response => {
               //console.log(response.data.errors)
                if (response.data.errors) {
                    this.setState({
                        mensaje: "El operador ya existe",
                        classrespuesta:"col-12 bg-danger text-white"
                    })
                }
                else {
                    this.setState({
                        mensaje: "Operador Creado Exitosamente",
                        classrespuesta:"col-12 bg-success text-white"
                    })
                }
                console.log(response)
                //window.location.replace("/login")

            })
    }



    render() {
        return (
            <div className="wrapper">

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            
                            <form className="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputNomina">Numero de Nomina</label>
                                    <input type="number" autoFocus onChange={this.handleInputChange} name="nomina" className="form-control" id="nominainput" value={this.state.nomina} placeholder="Numero de Nomina" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputNombre">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" onChange={this.handleInputChange} id="nombre-input" value={this.state.nombre} placeholder="Nombre" />
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

export default Operador;