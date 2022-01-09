import React, { Component } from 'react';
import { Button, Col, Container, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
var pl = require('tau-prolog');
require("./lists")(pl);

const NodeMapClass = require('../mappers/NodeMap');

/* Main class of Planning's Tab */

let defaultStartTime = new Date();

class Planning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: defaultStartTime,
            session: pl.create(1000),
            optionsNodes: [],
            startNode: '',
            endNode: '',
            lblStartNode: 'Select start node here',
            lblEndNode: 'Select end node here',
            program: '',
            goal: '',
            vehicleDuty: '',
            numberGenerations: 0,
            populationSize: 0,
            crossingProbability: 0,
            mutationProbability: 0
        };
        this.getNodes();
        this.setProgram();
        this.setGoal();
    }

    setProgram = () => {
        this.state.program =
            // Load the lists module
            ":- use_module(library(lists))." +
            // fruit/1
            "fruit(apple). fruit(pear). fruit(banana)." +
            // fruits_in/2
            "fruits_in(Xs, X) :- member(X, Xs), fruit(X).";
    }

    setGoal = () => {
        this.state.goal = "fruits_in([carrot, apple, banana, broccoli], X).";
    }

    oGandaTeste = () => {
        console.log(this.state.goal);
        console.log(this.state.program);
        console.log(this.state.session);
        this.state.session.consult(this.state.program, {
            success: function () {
                // Query the goal
                this.state.session.query
                    (this.state.goal, {
                        success: function () {
                            // Look for answers
                            this.state.session.answers(x => console.log(pl.format_answer(x)));
                        }
                    });
            }
        });
        console.log(this.state.session.answers);
        console.log("teste");
    }

    /* get nodes*/
    getNodes = async () => {
        try {
            let res = await axios.get("http://localhost:8080/api/node");
            let data = res.data;
            let opcoes = data.map(d => ({
                "shortName": d.ShortName
            }));
            for (var i in opcoes) {
                this.state.optionsNodes[i] = opcoes[i].shortName;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    generateGAResult = async () => {
        try {
            let res = await axios({
                method: 'get',
                url: 'http://13.66.35.100:80/api/ag',

                params: {
                    vehicleDuty: this.state.vehicleDuty,
                    numberGenerations: this.state.numberGenerations,
                    populationSize: this.state.populationSize,
                    crossingProbability: this.state.crossingProbability,
                    mutationProbability: this.state.mutationProbability
                }

            });

            document.getElementById("solutionShowArea").value = JSON.stringify(res.data);

            /* We reset the forms state after changes */

            document.getElementById("vehicleDuty").value = '';
            document.getElementById("numberGenerations").value = '';
            document.getElementById("populationSize").value = '';
            document.getElementById("crossingProbability").value = '';
            document.getElementById("mutationProbability").value = '';

            /* We reset the state after changes */

            this.state.vehicleDuty = '';
            this.state.numberGenerations = 0;
            this.state.populationSize = 0;
            this.state.crossingProbability = 0;
            this.state.mutationProbability = 0;

        } catch (error) {
            console.log("error:" + error);
            document.getElementById("solutionShowArea").value = "A solution was not found!";
        }
    }

    /* Gera o escalonamento dos DriverDuties */

    gerarDriverDuties = async () => {
        try {
            let res = await axios({
                method: 'get',
                url: 'http://13.66.35.100:80/api/dd',

            });

            document.getElementById("driverDutiesShowArea").value = JSON.stringify(res.data).replace("/", ",");

        } catch (error) {
            document.getElementById("driverDutiesShowArea").value = error.response.data.message;
        }
    }

    /* Set Start Node*/
    handleChangeStartNode(e) {
        this.setState({ startNode: e });
        this.setState({ lblStartNode: e });
    }

    /* Set Start Node*/
    handleChangeEndNode(e) {
        this.setState({ endNode: e });
        this.setState({ lblEndNode: e });
    }

    /* Updates the starttime */
    setStartTime = (value) => {
        var mins = value.getMinutes();
        var hrs = value.getHours();
        var aux = (mins + hrs * 60) * 60;
        this.setState({ startTime: aux });
        defaultStartTime = value;

    }

    /* Generic set Data method - updates state params */

    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    /* generate Connections */
    generateConnections = () => {
        console.log("yo")
    }


    /* Render all JSX elements of page */

    render() {

        return (


            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills">
                            <Nav.Item><Nav.Link eventKey="first" className="Tab">Generate Connections</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="second" className="Tab2">A-Star</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="third" className="Tab3">Best First</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="fourth" className="Tab4Aux">Genetic Algorithm</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="fifth" className="Tab5Aux">Generate DriverDuties</Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col className="Tab" sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            {/* Start Time */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>StartTime:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <DateTimePicker
                                                        onChange={this.setStartTime}
                                                        value={defaultStartTime}
                                                        minDate={new Date()} />
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Start Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="startNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeStartNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>End Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="endNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeEndNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            <Button id="btnSubmit" variant="primary"
                                                onClick={this.oGandaTeste}>Generate Connections</Button>
                                            <Row className="miniMargem">
                                                {/* <Alert id="alertSuccessfully" variant="success" hidden={true}>Node
                                            created successfully.</Alert>
                                            <Alert id="alertFailed400" variant="danger" hidden={true}>There is a
                                            node with this ShortName already.</Alert>
                                            <Alert id="alertFailed406" variant="danger" hidden={true}>Node
                                            validation error.</Alert> */}
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            {/* Start Time */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>StartTime:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <DateTimePicker
                                                        onChange={this.setStartTime}
                                                        value={defaultStartTime}
                                                        minDate={new Date()}
                                                    />
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Start Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="startNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeStartNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>End Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="endNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeEndNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            <Button id="btnSubmit" variant="primary"
                                                onClick={this.generateConnections}>Generate A-Star</Button>
                                            <Row className="miniMargem">
                                                {/* <Alert id="alertSuccessfully" variant="success" hidden={true}>Node
                                            created successfully.</Alert>
                                            <Alert id="alertFailed400" variant="danger" hidden={true}>There is a
                                            node with this ShortName already.</Alert>
                                            <Alert id="alertFailed406" variant="danger" hidden={true}>Node
                                            validation error.</Alert> */}
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            {/* Start Time */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>StartTime:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <DateTimePicker
                                                        onChange={this.setStartTime}
                                                        value={defaultStartTime}
                                                        minDate={new Date()}
                                                    />
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Start Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="startNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeStartNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            {/* Nó inicial */}
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>End Node:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="endNode"
                                                        options={this.state.optionsNodes}
                                                        placeholder="Select the nodes here"
                                                        onChange={this.handleChangeEndNode.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                            <Button id="btnSubmit" variant="primary"
                                                onClick={this.generateConnections}>Generate Best First</Button>
                                            <Row className="miniMargem">
                                                {/* <Alert id="alertSuccessfully" variant="success" hidden={true}>Node
                                            created successfully.</Alert>
                                            <Alert id="alertFailed400" variant="danger" hidden={true}>There is a
                                            node with this ShortName already.</Alert>
                                            <Alert id="alertFailed406" variant="danger" hidden={true}>Node
                                            validation error.</Alert> */}
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            {/* Vehicle Duty */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}><Form.Label>Vehicle Duty:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="vehicleDuty" size="sm" type="text" placeholder="Insert Vehicle Duty here." onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            {/* Number of Generations */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}><Form.Label>Number of Generations:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="numberGenerations" size="sm" type="number" placeholder="Insert number here." onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            {/* Population Size */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}><Form.Label>Population Size:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="populationSize" size="sm" type="number" placeholder="Insert size here." onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            {/* Crossing Probability */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}><Form.Label>Crossing Probability:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="crossingProbability" size="sm" type="number" placeholder="Insert probability here." onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            {/* Mutation Probability */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}><Form.Label>Mutation Probability:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="mutationProbability" size="sm" type="number" placeholder="Insert probability here." onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            <Button id="btnSubmit4" variant="primary" onClick={this.generateGAResult}>Generate Solution</Button>
                                            <Row className="miniMargem3">
                                                <div className="input-group">
                                                    <InputGroup.Text id="SolutionShowAreaLabel">Solution:</InputGroup.Text>
                                                    <textarea className="form-control" id="solutionShowArea" rows={1} readOnly={true} />
                                                </div>
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            <Row className="miniMargem">
                                                <Col><Button id="btnSubmitDD" variant="primary" onClick={this.gerarDriverDuties}>Generate DriverDuties</Button></Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <div className="input-group">
                                                    <InputGroup.Text id="DriverDutiesShowAreaLabel">DriverDuties:</InputGroup.Text>
                                                    <textarea className="form-control" id="driverDutiesShowArea" rows={5} readOnly={true} />
                                                </div>
                                            </Row>

                                        </Form>
                                    </div>
                                </Container>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container >

        )
    }

}

export default Planning;