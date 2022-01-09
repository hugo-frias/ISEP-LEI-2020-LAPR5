import React, {Component} from 'react';
import {Alert, Button, Col, Container, Form, Nav, Row, Tab} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import '../../App.css';
import Select from 'react-select';

let {axiosMDR, axiosMDV} = require('../core/URLConfiguration');
const TripMapClass = require('../mappers/TripMap');
const tripMapInstance = new TripMapClass();
let defaultTime = new Date();
let labelAux = '';
const TripsMapClass = require('../mappers/TripsMap');
const tripsMapInstance = new TripsMapClass();

class Trip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelLine: 'Select Line Here',
            labelPath: 'Select Path Here',
            labelPathReturn: 'Select Return Path here',
            LabelSuccess: 'Trip successfully added. Code: ',
            labelPath2: 'Select Path Here',
            Orientation: 'Go',
            Code: '',
            Line1: '',
            Path: '',
            Time: 0,
            Frequence: 0,
            NrViagens: 0,
            PathVolta: '',
            PathIda: '',
            InParalell: 0,
            pathOptions: [],
            linesOptions: [],
            Duration: 0
        };
        this.getLines().then(r => console.log('' + r));
    }

    /*Get Lines*/

    getLines = async () => {

        try {
            let res = await axiosMDR({
                method: 'get',
                url: 'line',
                params: {
                    filter: "NOFILTER"
                }
            });
            let data = res.data;
            let opcoes = data.map(d => ({
                "line": d
            }));
            for (let i in opcoes) {
                this.state.linesOptions[i] = opcoes[i].line.name
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    /* Get Paths */

    getPaths = async (line) => {

        try {
            let res = await axiosMDR.get('linePath/' + line);
            let data = res.data;
            data.map(element => (
                this.state.pathOptions.push(element)
            ));

        } catch (error) {
            console.log("error:" + error);
        }
    }


    /* Generic set Data method - updates state params */

    setData = ({target: {id, value}}) => {
        this.setState({[id]: value});
    };

    /* Set the Orientation */

    setOrientation = () => {
        this.setState({Orientation: document.getElementById("Orientation").value});
    }

    /* Updates the time */

    setTime = (value) => {
        this.setState({Time: value.getTime()});
        defaultTime = value;
    }

    async verifyTrip(rawTrip) {

        if (rawTrip.Code !== undefined && rawTrip.Orientation !== undefined && (rawTrip.Path !== undefined && rawTrip.Path !== '') && (rawTrip.Line !== undefined && rawTrip.Line !== '')) {
            return tripMapInstance.toDTO(rawTrip);
        } else {
            return undefined;
        }
    }

    /* Method to create Trips */

    createTrip = async () => {

        labelAux = 'Trip successfully added. Code: ';
        document.getElementById('alertSuccessfully').hidden = true;
        document.getElementById('alertFailed400').hidden = true;

        let tripDTO = await this.verifyTrip(this.state);

        if (tripDTO !== undefined) {

            try {

                let response = await axiosMDV({
                    method: 'post',
                    url: 'Trips',

                    data: tripDTO

                });

                if (response.status === 201) {
                    labelAux = labelAux.concat(this.state.Code);
                    this.setState({LabelSuccess: labelAux});

                    document.getElementById('alertSuccessfully').hidden = false;
                }

            } catch (error) {

                if (error.message.includes('400')) {
                    document.getElementById('alertFailed400').textContent = error.response.data.message;
                } else {
					document.getElementById('alertFailed400').textContent = error.message;
				}
					document.getElementById('alertFailed400').hidden = false;
            }

        } else {
            console.log('Error in state');
        }

        /* We reset the forms state after changes */

        document.getElementById('Line').value = null;
        document.getElementById('Path').value = null;
        document.getElementById('Orientation').value = 'Go';
        document.getElementById('Code').value = '';

        /* We reset the state after changes */

        defaultTime = new Date();

        this.state.Code = '';
        this.state.Orientation = 'Go';
        this.state.Path = '';
        this.state.Line = '';
        this.state.Time = 0;


        this.setState({labelLine: 'Select Line Here'});
        this.setState({labelPath: 'Select Path Here'});
    }


    /*set frequence*/
    /*set trips number*/
    setData2 = ({target: {id, value}}) => {
        this.setState({[id]: value});
    }

    /* Set Path */
    handleChangePath(e) {
        this.setState({Path: e});
        this.setState({labelPath: e});
    }

    /*set return path*/
    handleChangeReturnPath(e) {
        this.setState({PathVolta: e})
        this.setState({labelPath2: e});
    }

    /* Set Path */
    handleChangePathIda(e) {
        this.setState({PathIda: e});
        this.setState({labelPath: e});
    }

    /* Set Lines*/
    handleChangeLine(e) {
        this.setState({pathOptions: []});
        this.setState({Line: e});
        this.setState({labelLine: e});
        this.getPaths(e).then(r => console.log('Paths updated.' + r));
    }


    async verifyTrips(rawTrips) {

        if (rawTrips.NrViagens !== 0 && (rawTrips.PathIda !== undefined && rawTrips.PathIda !== '')
            && (rawTrips.PathVolta !== undefined && rawTrips.PathVolta !== '')
            && (rawTrips.Line !== undefined && rawTrips.Line !== '')
            && (rawTrips.Frequence !== 0)) {
            return tripsMapInstance.toDTO(rawTrips);
        } else {
            return undefined;
        }
    }

    getDuration = async () => {
        let x = 0;
        try {
            let res = await axiosMDR.get('path/' + this.state.PathIda);
            let data = res.data;
            let pathNodes = data.map(d => ({
                "nome": d
            }));
            console.log("PathNodes" + pathNodes);
            for (let i = 1; i < pathNodes.length; i++) {
                try {
                    let res = await axiosMDR.get('pathNode/' + pathNodes[i].nome);
                    let data = res.data;
                    x += data;
                } catch (error) {
                    console.log("error:" + error);
                }
            }
        } catch (error) {
            console.log("error:" + error);
        }
        if (x === 0) {
            document.getElementById("alertDuration").hidden = true;
            return false;
        } else {
            alert("Path Duration->" + x / 60 + "\nIf frequence < duration, you should indicate in paralell number");
        }
        return x;
    }

    /*create many trips*/
    createManyTrips = async () => {
        document.getElementById('alertSuccessfully2').hidden = true;
        document.getElementById('alertFailed2').hidden = true;
        let tripsDTO = await this.verifyTrips(this.state);


        if (tripsDTO !== undefined) {
            try {

                let response = await axiosMDV({
                    method: 'post',
                    url: 'Trips/LargeScale',

                    data: tripsDTO

                });
                if (response.status === 200) {
                    let labelAux = this.state.LabelSuccess.concat(response.data.id);
                    this.setState({LabelSuccess: labelAux});
                    document.getElementById('alertSuccessfully2').hidden = false;
                }

            } catch (error) {
                if (error.message.includes('400')) {
                    document.getElementById('alertSuccessfully2').hidden = false;
                }

            }

        } else {
            console.log('Error in state');
        }

        /* We reset the forms state after changes */

        document.getElementById('Line2').value = null;
        document.getElementById('GoPath').value = null;
        document.getElementById('PathVolta').value = null;
        document.getElementById('Frequence').value = 0;
        document.getElementById('NrViagens').value = 0;
        document.getElementById('InParalell').value = 0;

        /* We reset the state after changes */

        defaultTime = new Date();

        this.state.PathIda = '';
        this.state.PathVolta = '';
        this.state.Line = '';
        this.state.Time = 0;
        this.state.NrViagens = 0;
        this.state.Frequence = 0;


        this.setState({labelLine: 'Select Line Here'});
        this.setState({labelPath: 'Select Path Here'});
        this.setState({labelPath2: 'Select Return Path Here'});
    }

    /* Render all JSX elements of page */

    render() {

        return (


            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills">
                            <Nav.Item><Nav.Link eventKey="first" className="Tab">Add Trip</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="second" className="Tab4">Add Trips</Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col className="Tab" sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>

                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>Code:
                                                    </Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Code" size="sm" type="text"
                                                                  placeholder="Insert code here." onChange={this.setData}/>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Line:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="Line"
                                                        options={this.state.linesOptions}
                                                        placeholder={this.state.labelLine}
                                                        onChange={this.handleChangeLine.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Path:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="Path"
                                                        options={this.state.pathOptions}
                                                        placeholder={this.state.labelPath}
                                                        onChange={this.handleChangePath.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Orientation:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Orientation" as="select" custom
                                                                  onChange={this.setOrientation}>
                                                        <option value="Go">Go</option>
                                                        <option value="Return">Return</option>
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Time:</Form.Label></Col>
                                                <Col sm={3}>
												<div id="leavingHourDate">
                                                    <DateTimePicker
                                                        onChange={this.setTime}
                                                        value={defaultTime}
                                                        minDate={new Date()}
                                                    />
													 </div>
                                                </Col>
                                            </Row>

                                            <Button id="btnSubmit" className="createDriverTypeButton" variant="primary" onClick={this.createTrip}>Submit</Button>
                                            <Row className="alertBox">
                                                <Alert id="alertSuccessfully" variant="success" hidden={true}>{this.state.LabelSuccess}</Alert>
                                                <Alert id="alertFailed400" variant="danger" hidden={true}>{''}</Alert>
                                            </Row>

                                        </Form>
                                    </div>
                                </Container>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>

                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Line:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="Line2"
                                                        options={this.state.linesOptions}
                                                        placeholder={this.state.labelLine}
                                                        onChange={this.handleChangeLine.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}><Form.Label>Time:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <div id="hora">
                                                    <DateTimePicker
                                                        onChange={this.setTime}
                                                        value={defaultTime}
                                                        minDate={new Date()}
                                                    />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Frequence:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Frequence" type="number" placeholder="Insert frequence here" onChange={this.setData}/>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Trips number:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="NrViagens" type="number" placeholder="Insert trips number here" onChange={this.setData}/>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Go Path:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="GoPath"
                                                        options={this.state.pathOptions}
                                                        placeholder={this.state.labelPath}
                                                        onChange={this.handleChangePathIda.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>Return Path:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="PathVolta"
                                                        options={this.state.pathOptions}
                                                        placeholder={this.state.labelPath2}
                                                        onChange={this.handleChangeReturnPath.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row><Col sm={11}><Button id="checkDuration" variant="primary" onClick={this.getDuration}>Check duration</Button></Col>
                                            <Row className="miniMargem">
                                                <Alert id="alertDuration" variant="success" hidden="true">{this.getDuration}</Alert>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col sm={1}>
                                                    <Form.Label>In parallel:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="InParalell" type="number" placeholder="Insert parallel here" onChange={this.setData}/>
                                                </Col>
                                            </Row>
                                            <Button id="btnSubmit2" variant="primary"
                                                    onClick={this.createManyTrips}>Submit</Button>
                                            <Row className="miniMargem">
                                                <Alert id="alertSuccessfully2" variant="success" hidden="true">Trips created successfully.</Alert>
                                                <Alert id="alertFailed2" variant="danger" hidden="true">Error creating Trips.</Alert>
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

export default Trip;