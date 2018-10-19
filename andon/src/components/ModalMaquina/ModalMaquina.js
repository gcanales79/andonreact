import React, { Component } from "react";
import UserAPI from "../../api/user.api";

class ModalMaquina extends Component {
    state = {
        maquina: "",
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

            maquina: "",

        })
        UserAPI.postMaquina(
            {
                maquina: this.state.maquina,
            
            })
            .then(response => {
               //console.log(response.data.errors)
                if (response.data.errors) {
                    this.setState({
                        mensaje: "La maquina ya existe",
                        classrespuesta:"col-12 bg-danger text-white"
                    })
                }
                else {
                    this.setState({
                        mensaje: "Maquina Agregada Exitosamente",
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
                            
                            <form className="maquina">
                                
                                <div className="form-group">
                                    <label htmlFor="exampleInputMaquina">Maquina</label>
                                    <input type="text" className="form-control" name="maquina" onChange={this.handleInputChange} id="maquina-input" value={this.state.nombre} placeholder="Maquina" />
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

export default ModalMaquina;