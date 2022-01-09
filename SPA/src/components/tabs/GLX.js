import React, { Component } from 'react';
import { Form, Container, Row, Button, Alert } from 'react-bootstrap';
import '../../App.css'
import axios from 'axios'

var { axiosMDR } = require('../core/URLConfiguration');

class GLX extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
    }

    uploadFile = async (value) => {

        this.setState({ content: await value.target.files[0] });
    }

    uploadGLX = async () => {

        document.getElementById("alert200").hidden = true;
        document.getElementById("alert401").hidden = true;
        let formdata = new FormData()

        formdata.append('glx', this.state.content);
        
        let response = await axiosMDR({
            url: 'importGLX',
            method: 'post',
            data: formdata
        })
        if(response.status == "200"){
            document.getElementById("alert200").hidden = false;
        }
        if(response.status == "401"){
            
            document.getElementById("alert401").hidden = false;
        }
    }

    /* Render all JSX elements of page */

    render() {
        return (
            <Container fluid>
                <div className="margem">
                    <Form>
                        <Row>
                            <Form>
                                <Form.File className="miniMargem"
                                    id="uploadGLX"
                                    label="Custom file input"
                                    onChange={this.uploadFile}
                                    custom
                                />
                            </Form>
                        </Row>
                        <Row className="miniMargem"><Button className="createDriverTypeButton" variant="primary" onClick={this.uploadGLX} >Submit</Button></Row>
                        <Alert id="alert200" className="alertBox" variant="success" hidden={true}>
                            <Alert.Heading>Success!</Alert.Heading>
                            <p>GLX was successfully imported!</p>
                        </Alert>
                        <Alert id="alert401" className="alertBox" variant="danger" hidden={true}>
                            <Alert.Heading>Error importing!</Alert.Heading>
                        </Alert>
                    </Form>
                </div>
            </Container>

        )
    }

}

export default GLX;