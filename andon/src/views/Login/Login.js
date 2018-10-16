import React, { Component } from 'react';
import "./Login.css";
import { Grid, Form, Button, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Parallax from "react-springy-parallax";
import logo from "../../assets/img/katcon.jpeg";
import UserAPI from "../../api/user.api";


class Login extends Component {
    state = {
        username: "",
        password: "",
        status: "",
        statusclass: "col-2",
    }

    componentDidMount() {
        UserAPI.getUser_data(localStorage.getItem("token"))
            .then(response => {
                if (response.data === null) {
                    //!Aqui se elimina localstorage cuando se vence el token
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")

                }
                else {
                    
                    window.location.replace("/#/graph")

                    console.log(response.data.authData.user.usuario)
                    //*Es lo que viene en el token
                    //console.log(response)

                }
            })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        UserAPI.postLogin(
            {
                usuario: this.state.username,
                password: this.state.password
            }
        )
            .then(response => {

                console.log(response.data);

                if (response.data.mensaje === "No user") {
                    this.setState({
                        status: "No Existe Usuario",
                        statusclass: "col-12 bg-warning",
                        username: "",
                        password: ""

                    })
                }
                else {
                    if (response.data.mensaje === "Incorrect Password") {
                        this.setState({
                            status: "Password Incorrecto",
                            statusclass: "col-12 bg-warning",
                            username: "",
                            password: ""

                        })
                    }
                    else {
                        this.setState({
                            status: "Bienvenido",
                            statusclass: "col-12 bg-success text-white",

                        })
                        //!Aqui se pone el localStorage cuando es login
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("role", response.data.role);
                        console.log("Entro")
                        window.location.replace("/#/graph")




                    }
                }

            })
            .catch(err => console.log(err));
    }






    render() {
        const styles = {
            fontFamily: 'Menlo-Regular, Menlo, monospace',
            fontSize: 20,
            lineHeight: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }
        return (
            <Parallax ref="parallax" pages={2}>
                <Parallax.Layer
                    offset={0}
                    speed={0.5}
                    style={styles}
                    onClick={() => this.refs.parallax.scrollTo(1)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <img src={logo} className="panel2" alt="logo" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                ANDON México
                            </div>
                        </div>
                    </div>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={1}
                    speed={-0.1}
                    style={styles}
                >
                    <Grid>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalUser">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Usuario
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" onChange={this.handleInputChange} name="username" placeholder="Usuario" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" onChange={this.handleInputChange} name="password" placeholder="Password" />
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" onClick={this.handleFormSubmit} type="submit">Entrar</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <div className="row">
                            <div className={this.state.statusclass}>
                                {this.state.status}

                            </div>
                        </div>
                    </Grid>
                </Parallax.Layer>
            </Parallax>
        )
    }
}

export default Login;