import React, { Component } from "react";
import UserAPI from "../../api/user.api";

class ModalFalla extends Component {
    state = {
        falla: "",
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

            falla: "",

        })
        UserAPI.postFalla(
            {
                falla: this.state.falla,
            
            })
            .then(response => {
               //console.log(response.data.errors)
                if (response.data.errors) {
                    this.setState({
                        mensaje: "La falla ya existe",
                        classrespuesta:"col-12 bg-danger text-white"
                    })
                }
                else {
                    this.setState({
                        mensaje: "Falla Agregada Exitosamente",
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
                            
                            <form className="falla">
                                
                                <div className="form-group">
                                    <label htmlFor="exampleInputFalla">Falla</label>
                                    <input type="text" className="form-control" name="falla" onChange={this.handleInputChange} id="falla-input" value={this.state.falla} placeholder="Falla" />
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

export default ModalFalla;