import React, { Component } from "react";
import Header from "../../components/Header";
import UserAPI from "../../api/user.api";
import { MDBDataTable, MDBBtn, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import ModalMaquina from "../../components/ModalMaquina/ModalMaquina"



class TablaMaquina extends Component {




    constructor(props, context) {
        super(props, context);

        this.borrarMaquina = this.borrarMaquina.bind(this);

        this.state = {
            maquinas: [],
            nombre: "",
            mensaje: "",
            classrespuesta: "",
            modal: false
        }
    }


    componentDidMount() {
        this.obtenerMaquinas()

    }

    obtenerMaquinas() {
        UserAPI.getMaquina()
            .then(response => {
                //console.log(response)
                this.setState({
                    maquinas: response.data
                })
            })
    }

    borrarMaquina(e) {
        let maquinaid = e.target.getAttribute("maquinaid")
        //console.log(operadorid)
        UserAPI.deleteMaquina(maquinaid)
            .then(response => {
                //console.log(response)
                this.obtenerMaquinas();
            })
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.obtenerMaquinas();
    }



    render() {
        //console.log(this.state.operadores)
        const maquinas = [];
        this.state.maquinas.map((respuesta) => {
            return (
                maquinas.push({
                    maquina: respuesta.maquina,
                    borrar: <MDBBtn color="danger" onClick={(e) => this.borrarMaquina(e)} maquinaid={respuesta.id} size="sm">Borrar</MDBBtn>
                })
            )
            //console.log(operadores)
        })
        const data = {
            columns: [
                {
                    label: 'Maquina',
                    field: 'maquina',
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
            rows: maquinas

        }
        return (
            <div className="wrapper">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-3">
                            <h2>Tabla Maquinas</h2>
                        </div>
                    </div>

                    <button type="submit" onClick={this.toggle} className="btn btn-primary">Agregar Maquina</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Agregar Maquina</ModalHeader>
                        <ModalBody>
                            <ModalMaquina />
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

export default TablaMaquina;