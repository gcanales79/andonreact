import React, { Component } from "react";
import Header from "../../components/Header";
import UserAPI from "../../api/user.api";
import { MDBDataTable, MDBBtn, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import Operador from "../Operador/Operador"



class TablaOperador extends Component {




    constructor(props, context) {
        super(props, context);

        this.borrarOperador = this.borrarOperador.bind(this);

        this.state = {
            operadores: [],
            nombre: "",
            mensaje: "",
            classrespuesta: "",
            modal: false
        }
    }


    componentDidMount() {
        this.obtenerOperadores()

    }

    obtenerOperadores() {
        UserAPI.getOperador()
            .then(response => {
                //console.log(response)
                this.setState({
                    operadores: response.data
                })
            })
    }

    borrarOperador(e) {
        let operadorid = e.target.getAttribute("operadorid")
        //console.log(operadorid)
        UserAPI.deleteOperador(operadorid)
            .then(response => {
                //console.log(response)
                this.obtenerOperadores();
            })
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.obtenerOperadores();
    }



    render() {
        //console.log(this.state.operadores)
        const operadores = [];
        this.state.operadores.map((respuesta) => {
            return (
                operadores.push({
                    nomina: respuesta.nomina,
                    nombre: respuesta.nombre,
                    borrar: <MDBBtn color="danger" onClick={(e) => this.borrarOperador(e)} operadorid={respuesta.id} size="sm">Borrar</MDBBtn>
                })
            )
            //console.log(operadores)
        })
        const data = {
            columns: [
                {
                    label: 'Nomina',
                    field: 'nomina',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc',
                    width: 400
                },
                {
                    label: "Borrar",
                    field: "borrar",
                    sort: "asc",
                    width: 150
                }

            ],
            rows: operadores

        }
        return (
            <div className="wrapper">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-3">
                            <h2>Tabla Operadores</h2>
                        </div>
                    </div>

                    <button type="submit" onClick={this.toggle} className="btn btn-primary">Agregar Operador</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Agregar Operador</ModalHeader>
                        <ModalBody>
                            <Operador />
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

export default TablaOperador;