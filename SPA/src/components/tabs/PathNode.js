import React, { Component } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import '../../App.css';
import Select from 'react-select';

var { axiosMDR } = require('../core/URLConfiguration');
const PathNodeMapClass = require('../mappers/PathNodeMap');
const PathNodeMapInstance = new PathNodeMapClass();
let pathnodeToPost;

class PathNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            duration: null,
            distance: null,
            node: '',
            labelNode:'Select Node Here',
            options: []
        }
        this.getNodes();
    }

    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    handleChange(e) {
        this.setState({ node: e });
        this.setState({labelNode : e});
    }

    getNodes = async () => {
        try {
            let res = await axiosMDR.get("node");
            let data = res.data;
            let opcoes = data.map(d => ({
                "shortName": d.ShortName
            }));
            for (var i in opcoes) {
                this.state.options[i] = opcoes[i].shortName;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    clean = () => {
        this.setState({
            code: "",
            distance: null,
            duration: null,
            node: ""
        });
        document.getElementById("distance").value = null;
        document.getElementById("duration").value = null;
        document.getElementById("node").value = "";
        this.setState({labelNode: 'Select Node Here'});

    }
    createPathNode = async () => {
        document.getElementById('alertSuccessfully').hidden = true;
        document.getElementById('alertFailed').hidden = true;

        let code = "pn" + Date.now() + Math.random().toString(36).substring(2, 5);
        this.state.code = code;
        pathnodeToPost = PathNodeMapInstance.toDTO(this.state);
        this.setState();

        try {
            let res = await axiosMDR({
                method: 'post',
                url: 'pathNode',
                data: pathnodeToPost
            })
            if (res.status === 201) {
                this.clean();
                document.getElementById('alertSuccessfully').hidden = false;
            }
        } catch (error) {
            //this.clean();
            document.getElementById('alertFailed').hidden = false;
        }
    }

    render() {
        return (
            <Container fluid>
                <div className="margem">
                    <Form>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label >Duration:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Form.Control id="duration" type="number" placeholder="Insert duration here" onChange={this.setData} />
                            </Col>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label >Distance:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Form.Control id="distance" type="number" placeholder="Insert distance here" onChange={this.setData} />
                            </Col>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label>Node:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Select
                                    id="node"
                                    options={this.state.options}
                                    placeholder={this.state.labelNode}
                                    onChange={this.handleChange.bind(this)}
                                    getOptionLabel={option => option}
                                    getOptionValue={option => option}
                                >
                                </Select>
                            </Col>
                        </Row>
                        <Button id="btnSubmit" variant="primary" onClick={this.createPathNode}>Submit</Button>
                        <Row className="miniMargem">
                            <Alert id="alertSuccessfully" variant="success" hidden="true">Path Node created successfully.</Alert>
                            <Alert id="alertFailed" variant="danger" hidden="true">Error creating Path Node.</Alert>
                        </Row>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default PathNode;