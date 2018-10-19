import React, { Component } from "react";
import Header from "../../components/Header";
import UserAPI from "../../api/user.api";
import { MDBDataTable, MDBBtn, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import ModalFalla from "../../components/ModalFalla/ModalFalla"



class TablaFalla extends Component {




    constructor(props, context) {
        super(props, context);

        this.borrarFalla = this.borrarFalla.bind(this);

        this.state = {
            fallas: [],
            mensaje: "",
            classrespuesta: "",
            modal: false
        }
    }


    componentDidMount() {
        this.obtenerFallas()

    }

    obtenerFallas() {
        UserAPI.getFalla()
            .then(response => {
                //console.log(response)
                this.setState({
                    fallas: response.data
                })
            })
    }

    borrarFalla(e) {
        let fallaid = e.target.getAttribute("fallaid")
        //console.log(operadorid)
        UserAPI.deleteFalla(fallaid)
            .then(response => {
                //console.log(response)
                this.obtenerFallas();
            })
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.obtenerFallas();
    }



    render() {
        //console.log(this.state.operadores)
        const fallas = [];
        this.state.fallas.map((respuesta) => {
            return (
                fallas.push({
                    falla: respuesta.falla,
                    borrar: <MDBBtn color="danger" onClick={(e) => this.borrarFalla(e)} fallaid={respuesta.id} size="sm">Borrar</MDBBtn>
                })
            )
            //console.log(operadores)
        })
        const data = {
            columns: [
                {
                    label: 'Falla',
                    field: 'falla',
                    sort: 'asc',
                    width: 300
                },
                
                {
                    label: "Borrar",
                    field: "borrar",
                    sort: "asc",
                    width: 150
                }

            ],
            rows: fallas

        }
        return (
            <div className="wrapper">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-3">
                            <h2>Tabla Fallas</h2>
                        </div>
                    </div>

                    <button type="submit" onClick={this.toggle} className="btn btn-primary">Agregar Falla</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Agregar Falla</ModalHeader>
                        <ModalBody>
                            <ModalFalla />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cerrar</Button>{' '}

                        </ModalFooter>
                    </Modal>
                    <MDBDataTable
                        stripped="true"
                        bordered
                        small
                        data={data}
                    />



                </div>
            </div>


        )
    }


}

export default TablaFalla;