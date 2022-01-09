import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import navBar from '../structure/NavigationBar'
import '../../App.css';

var { axiosMDR } = require('../core/URLConfiguration');
const UserClass = require('../mappers/UserMap');

const userInstance = new UserClass();
let userToPost;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userType: 'CLIENTE',
            terms: false,
            emailsAux: []
        }
        this.getAllUsersEmails()
    }

    /* sets the terms */
    setTerms = (value) => {
        this.setState({ terms: value.target.checked });
    }

    /* sets generic data */
    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    // /* changes the role */
    // onChangeRole = (e) => {
    //     let options = e.target.options;
    //     let optionSelected = options[e.target.selectedIndex];
    //     let optionSelectedValue = optionSelected.value;
    //     this.setState({ userType: optionSelectedValue })
    // }

    /* troca entre register e log in */

    enableOptions = () => {
        document.getElementById("btnSwitchRegister").hidden = false;
        document.getElementById("btnSwitchLogIn").hidden = false;
        document.getElementById("alertRegSucesso").hidden = true;
        document.getElementById("alertEmailRepetido").hidden = true;
        document.getElementById("alertLogSucesso").hidden = true;

        if (document.getElementById("login").hidden === false) {
            document.getElementById("checkBoxTerms").hidden = false;
            document.getElementById("lblTerms").hidden = false;
            document.getElementById("btnShowTerms").hidden = false;
            document.getElementById("btnSwitchRegister").hidden = true;
            document.getElementById("login").hidden = true
            document.getElementById("register").hidden = false
        } else {
            document.getElementById("checkBoxTerms").hidden = true;
            document.getElementById("lblTerms").hidden = true;
            document.getElementById("btnShowTerms").hidden = true;
            document.getElementById("btnSwitchLogIn").hidden = true;
            document.getElementById("login").hidden = false
            document.getElementById("register").hidden = true
        }
    }

    // // Mostra os termos 
    // enableAlertTerms = async () => {
    //     if (document.getElementById("alertTerms").hidden === false) {
    //         document.getElementById("alertTerms").hidden = true
    //     } else {
    //         document.getElementById("alertTerms").hidden = false
    //     }
    // }
    /* gets all user emails */
    getAllUsersEmails = async () => {

        try {
            let resp = await axiosMDR({
                method: 'get',
                url: 'user'
            });
            let data = resp.data;
            for (var i in data) {
                this.state.emailsAux[i] = data[i].email;
            }
            console.log(this.state.emailsAux);

        } catch (error) {
            console.log("error:" + error)
        }
    }

    /* registers an user */
    registerUser = async () => {
        userToPost = userInstance.toDTO(this.state);
        document.getElementById("alertAceitarTermos").hidden = true;
        document.getElementById("alertRegSucesso").hidden = true;
        document.getElementById("alertEmailRepetido").hidden = true;
        document.getElementById("alertCamposInvalidos").hidden = true;
        try {
            if (this.state.terms === true) {
                if (this.state.email !== '' || this.state.password !== '') {
                    let resp = await axiosMDR({
                        method: 'post',
                        url: 'user',
                        data: userToPost
                    });
                    if (resp.status === 201) {
                        this.state.emailsAux.push(this.state.email);
                        this.state.email = "";
                        this.state.password = "";
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("register").hidden = true;
                        document.getElementById("login").hidden = false;
                        document.getElementById("alertRegSucesso").hidden = false;
                    } else {
                        document.getElementById("alertEmailRepetido").hidden = false;
                    }
                } else {
                    document.getElementById("alertCamposInvalidos").hidden = false;
                }
            } else {
                document.getElementById("alertAceitarTermos").hidden = false;
            }
        } catch (e) {
            console.log(e)
            document.getElementById("alertEmailRepetido").hidden = false;
        }
    }

    /* logs an user */
    logUser = async () => {
        document.getElementById("alertLogSucesso").hidden = true;
        document.getElementById("alertLogErrado").hidden = true;
        document.getElementById("alertEmailErrado").hidden = true;
        
            let resp = await axiosMDR({
                method: 'get',
                url: 'user' + '/' + this.state.email,
            });
            let data = resp.data;
            if (resp.data != undefined) {
                if (this.state.password === data.password) {
                    document.getElementById("alertLogSucesso").hidden = false;
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    navBar.loadButtons(data.userType, data.userEmail, data.password, navBar.getRoleGlobal());
                    navBar.setRoleGlobal(1);
                    console.log(navBar.getRoleGlobal());
                } else {
                    document.getElementById("alertLogErrado").hidden = false;
                }
            } else {
                document.getElementById("alertEmailErrado").hidden = false;
            }
        
    }
    render() {

        return (
            <Container fluid>
                <div className="margem">
                    <Row>
                        <Col>
                            <Form>
                                {/* Campo do email */}
                                <Col className="miniMargem"><Form.Label>Email address</Form.Label></Col>
                                <Col className="miniMargem"><Form.Control id="email" type="email" placeholder="Enter email" onChange={this.setData} /></Col>
                                <Col className="miniMargem"><Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text></Col>

                                {/* Campo da password */}
                                <Col className="miniMargem"><Form.Label>Password</Form.Label></Col>
                                <Col className="miniMargem"><Form.Control id="password" type="password" placeholder="Password" onChange={this.setData} /></Col>

                                {/* Campo da checkbox dos termos */}
                                <Col className="miniMargem3">
                                    <Row>
                                        <Col sm={1}><Form.Control id="checkBoxTerms" type="checkbox" size="sm" hidden="true" onChange={this.setTerms} /></Col>
                                        <Form.Label id="lblTerms" hidden="true">I declare that I agree with the terms and conditions</Form.Label>
                                    </Row>
                                </Col>

                                {/* Botão para mostrar os termos */}
                                <Col className="miniMargem">
                                    <Link to="/Terms">
                                        <Button id="btnShowTerms" variant="primary" variant="info"  hidden="true" >Click here to read the terms</Button>
                                    </Link>
                                </Col>

                                {/* Botões de log in e register */}
                                <Row className="miniMargem2"><Button id="login" variant="primary" onClick={this.logUser}>Login</Button></Row>
                                <Row className="miniMargem2"><Button id="register" variant="primary" hidden="true" onClick={this.registerUser}>Register</Button></Row>

                                {/* Botões de switch log in, register e de apagar a conta*/}
                                <Col className="miniMargem3">
                                    <Button id="btnSwitchRegister" variant="primary" variant="light" onClick={this.enableOptions}>Not a member? Register now</Button>
                                    <Button id="btnSwitchLogIn" variant="primary" variant="light" onClick={this.enableOptions} hidden="true">Already a member? Sign in now</Button>
                                </Col>
                                <Col className="miniMargem3">
                                    <Link to="/DeleteAccount">
                                        <Button id="btnDeleteAccount" variant="outline-danger">Delete Account</Button>
                                    </Link>
                                </Col>

                                {/* Alerts de sucesso e insucesso log in/register */}
                                <Alert id="alertTerms" variant="dark" hidden="true">{ }asdasdasd</Alert>

                                <Alert className="miniMargem" id="alertLogSucesso" variant="success" hidden="true">Successfully logged!</Alert>
                                <Alert className="miniMargem" id="alertLogErrado" variant="danger" hidden="true" >Error Logging in!</Alert>
                                <Alert className="miniMargem" id="alertEmailErrado" variant="danger" hidden="true" >Email not found!</Alert>

                                <Alert className="miniMargem" id="alertEmailRepetido" variant="danger" hidden="true" >This email is already used!</Alert>
                                <Alert className="miniMargem" id="alertRegSucesso" variant="success" hidden="true" >Registration completed!</Alert>
                                <Alert className="miniMargem" id="alertAceitarTermos" variant="danger" hidden="true" >You have to accept the terms and conditions!</Alert>
                                <Alert className="miniMargem" id="alertCamposInvalidos" variant="danger" hidden="true" >You have empty camps!</Alert>

                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container >
        )
    }
}

export default Login;

