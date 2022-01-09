import React, { Component } from 'react';
import { Form, Container, Col, Button, Alert} from 'react-bootstrap';
import '../../App.css';

var { axiosMDR } = require('../core/URLConfiguration');



class DeleteAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    /* sets generic data */
    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    /* deletes account */

    deleteAccount = async () => {

        document.getElementById("alertContaApagada").hidden = true;
        document.getElementById("alertCamposInvalidos").hidden = true;
        document.getElementById("alertEmailNotFound").hidden = true;
        document.getElementById("alertPasswordsDontMatch").hidden = true;
        document.getElementById("alertWrongPassword").hidden = true;

        if (this.state.email !== '' || this.state.passwordConfirmation !== '' || this.state.password !== '' ) {
            if (this.state.password === this.state.passwordConfirmation) {
                try {
                    let resp = await axiosMDR({
                        method: 'get',
                        url: 'user' + '/' + this.state.email,
                    });
                    let data = resp.data;
                    if (resp.data !== undefined) {
                        if (this.state.password === data.password) {
                            let respDelete = await axiosMDR({
                                method: 'DELETE',
                                url: 'user' + '/' + this.state.email,
                            })
                            console.log(respDelete.status);
                            if (respDelete.status === 201) {
                                document.getElementById("alertContaApagada").hidden = false;
                            } else {
                                document.getElementById("alertCamposInvalidos").hidden = false;
                            }

                        } else {
                            document.getElementById("alertWrongPassword").hidden = false;
                        }
                    } else {
                        document.getElementById("alertEmailNotFound").hidden = false;
                    }
                } catch (error) {
                    console.log("error:" + error)
                }
            } else {
                document.getElementById("alertPasswordsDontMatch").hidden = false;
            }

        } else {
            document.getElementById("alertCamposInvalidos").hidden = false;
        }


    }

    render() {

        return (
            <Container fluid>
                <div className="margem">
                    {/* Campo do email */}
                    <Col className="miniMargem"><Form.Label>Email address</Form.Label></Col>
                    <Col className="miniMargem"><Form.Control id="email" type="email" placeholder="Enter email" onChange={this.setData} /></Col>
                    <Col className="miniMargem"><Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text></Col>

                    {/* Campo da password */}
                    <Col className="miniMargem"><Form.Label>Password</Form.Label></Col>
                    <Col className="miniMargem"><Form.Control id="password" type="password" placeholder="Password" onChange={this.setData} /></Col>

                    {/* Campo da password extra */}
                    <Col className="miniMargem"><Form.Label>Confirm Password</Form.Label></Col>
                    <Col className="miniMargem"><Form.Control id="passwordConfirmation" type="password" placeholder="Password" onChange={this.setData} /></Col>
                    <Col className="miniMargem"><Form.Text className="text-muted">Passwords must match.</Form.Text></Col>

                    {/* botão delete */}
                    <Col className="miniMargem"><Button id="btnDeleteAccount" variant="outline-danger" onClick={this.deleteAccount}>Permanently Delete Account</Button></Col>
                    <Col className="miniMargem"><Form.Text className="text-muted">This can't be reverted.</Form.Text></Col>

                    <Alert className="miniMargem" id="alertContaApagada" variant="success" hidden="true">Account deleted!</Alert>
                    <Alert className="miniMargem" id="alertCamposInvalidos" variant="danger" hidden="true">Invalid fields!</Alert>
                    <Alert className="miniMargem" id="alertEmailNotFound" variant="danger" hidden="true">Email not found!</Alert>
                    <Alert className="miniMargem" id="alertPasswordsDontMatch" variant="danger" hidden="true">The passwords don't match!</Alert>
                    <Alert className="miniMargem" id="alertWrongPassword" variant="danger" hidden="true">Wrong password or email!</Alert>

                </div>
            </Container >
        )
    }
}

export default DeleteAccount;