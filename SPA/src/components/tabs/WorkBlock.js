import React, { Component } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import '../../App.css';
import Select from 'react-select';

var { axiosMDR, axiosMDV } = require('../core/URLConfiguration');

const WorkBlockMapClass = require('../mappers/WorkBlockMap');
const workBlockMapInstance = new WorkBlockMapClass();
let defaultStartTime = new Date();

class WorkBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelNode: 'Select Node Here',
            labelNode2: 'Select Node Here',
            labelTrip: 'Select Trip Here',
            labelVehicleDuty: 'Select Vehicle Duty Here',
            startNode: '',
            endNode: '',
            trips: [],
            startTime: 0,
            isCrewTravelTime: false,
            isActive: false,
            nodesOptions: [],
            tripsOptions: [],
            numMaxBlocks: 0,
            blockDuration: 0,
            vehicleDuty: '',
            vehicleDutyOptions: [],
            vehicleDutyIds: [],

        };
        this.getNodes();
        this.getVehicleDuties();
        this.getTrips();
    }

    /*Get Nodes*/
    getNodes = async () => {
        try {
            let res = await axiosMDR.get("node");
            let data = res.data;
            let opcoes = data.map(d => ({
                "shortName": d.ShortName
            }));
            for (var i in opcoes) {
                this.state.nodesOptions[i] = opcoes[i].shortName;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    /*Get Trips*/

    getTrips = async () => {
        try {
            let res = await axiosMDV({
                method: 'get',
                url: 'Trips',
            });
            let data = res.data;
            console.log(data);
            let opcoes = data.map(d => ({
                "id": d.id
            }));
            for (var i in opcoes) {
                this.state.tripsOptions[i] = opcoes[i].id;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    /*Get vehicle duty*/
    getVehicleDuties = async () => {
        try {
            let res = await axiosMDV.get("VehicleDuties");
            let data = res.data;
            console.log(data);
            let opcoes = data.map(d => ({
                "name": d.name
            }));
            let i;
            for (i in opcoes) {
                this.state.vehicleDutyOptions[i] = opcoes[i].name;
            }
            let ids = data.map(d => ({
                "id": d.id
            }));
            i = 0;
            for (i in ids) {
                this.state.vehicleDutyIds[i] = ids[i].id;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }


    /* Generic set Data method - updates state params */
    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    /* Updates the starttime */
    setStartTime = (value) => {
        var mins = value.getMinutes();
        var hrs = value.getHours();
        var aux = (mins + hrs * 60) * 60;
        this.setState({ startTime: aux });
        defaultStartTime = value;

    }

    /* Updates IsCrewTravelTime param of state */
    setIsCrewTravelTime = (value) => {
        this.setState({ isCrewTravelTime: value.target.checked });
    }

    /* Updates IsActive param of state */

    setIsActive = (value) => {
        this.setState({ isActive: value.target.checked });
    }

    /* Updates IsActive param of state */

    setTrips = (value) => {
        this.setState({ trips: value });
    }




    createWorkBlock = async () => {

        document.getElementById('alert500').hidden = true;
        document.getElementById('alert201').hidden = true;
        document.getElementById('alert501').hidden = true;
        document.getElementById('alert400').hidden = true;
        document.getElementById('alert502').hidden = true;
        document.getElementById('alert404').hidden = true;

        console.log(this.state.trips)

        let workBlock = workBlockMapInstance.toDTO(this.state);
        console.log(workBlock);
        if (this.state.blockDuration == 0 || this.state.endNode == '' || this.state.startNode == '' || this.state.trips.length == 0
            || this.state.vehicleDuty == '' || this.state.numMaxBlocks == 0) {

            document.getElementById('alert404').hidden = false;
        } else {
            try {
                let response = await axiosMDV({
                    method: 'post',
                    url: 'WorkBlocks',
                    data: workBlock
                });
                console.log(response.data.length);
                console.log(this.state.numMaxBlocks);

                if (response.data == null) {
                    document.getElementById('alert500').hidden = false;

                }
                if (response.data.length == 0) {
                    document.getElementById('alert501').hidden = false;

                } if ((response.data.length != 0) && (response.data.length != this.state.numMaxBlocks)) {
                    document.getElementById('alert502').hidden = false;

                    document.getElementById('numMaxBlocks').value = null;
                    document.getElementById('blockDuration').value = null;

                    /* We reset the state after changes */

                    this.state.startNode = '';
                    this.state.endNode = '';
                    this.state.vehicleDuty = '';
                    this.state.startTimeInSeconds = 0;
                    this.state.numMaxBlocks = 0;
                    this.state.blockDuration = 0;

                    this.setState({ labelNode: 'Select Node Here' });
                    this.setState({ labelNode2: 'Select Node Here' });
                    this.setState({ labelTrip: 'Select Trip Here' });
                    this.setState({ labelVehicleDuty: 'Select Vehicle Duty Here' });
                }


                if (response.data.length == this.state.numMaxBlocks) {
                    document.getElementById('alert201').hidden = false;

                    /* We reset the forms state after changes */


                    document.getElementById('numMaxBlocks').value = null;
                    document.getElementById('blockDuration').value = null;

                    /* We reset the state after changes */

                    this.state.startNode = '';
                    this.state.endNode = '';
                    this.state.vehicleDuty = '';
                    this.state.startTimeInSeconds = 0;
                    this.state.numMaxBlocks = 0;
                    this.state.blockDuration = 0;

                    this.setState({ labelNode: 'Select Node Here' });
                    this.setState({ labelNode2: 'Select Node Here' });
                    this.setState({ labelTrip: 'Select Trip Here' });
                    this.setState({ labelVehicleDuty: 'Select Vehicle Duty Here' });
                }

            } catch (error) {
                document.getElementById('alert400').hidden = false;
            }
        }


    }

    /* Set Start Node*/
    handleChangeStartNode(e) {
        this.setState({ startNode: e });
        this.setState({ labelNode: e });
    }

    /* Set End Node*/
    handleChangeEndNode(e) {
        this.setState({ endNode: e });
        this.setState({ labelNode2: e });
    }

    handleChangeTrip(e) {
        this.setState({ labelTrip: e });
        this.setState({ trips: e });
    }

    handleChangeVehicleDuty(e) {
        console.log(e);
        var ind = this.state.vehicleDutyOptions.indexOf(e);
        console.log(ind);
        var code = this.state.vehicleDutyIds[ind];
        console.log(code);
        this.setState({ vehicleDuty: code });
        this.setState({ labelVehicleDuty: e });

    }


    /* Render all JSX elements of page */

    render() {
        return (
            <Container fluid>
                <div className="margem">
                    <Form>
                        <Form>
                            {/* Start Time */}
                            <Row className="miniMargem">
                                <Col sm={1}><Form.Label>StartTime:</Form.Label></Col>
                                <Col sm={3}>
                                    <div id="dataHora">
                                        <DateTimePicker
                                            onChange={this.setStartTime}
                                            value={defaultStartTime}
                                            minDate={new Date()}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            {/* Start Node */}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>StartNode:</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Select
                                        id="startNode"
                                        options={this.state.nodesOptions}
                                        placeholder={this.state.labelNode}
                                        onChange={this.handleChangeStartNode.bind(this)}
                                        getOptionLabel={option => option}
                                        getOptionValue={option => option}
                                    >
                                    </Select>
                                </Col>
                            </Row>

                            {/* End Node */}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>EndNode:</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Select
                                        id="endNode"
                                        options={this.state.nodesOptions}
                                        placeholder={this.state.labelNode2}
                                        onChange={this.handleChangeEndNode.bind(this)}
                                        getOptionLabel={option => option}
                                        getOptionValue={option => option}
                                    >
                                    </Select>
                                </Col>
                            </Row>

                            {/* Vehicle Duty */}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>Vehicle Duty:</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Select
                                        id="vehicleDuty"
                                        options={this.state.vehicleDutyOptions}
                                        placeholder={this.state.labelVehicleDuty}
                                        onChange={this.handleChangeVehicleDuty.bind(this)}
                                        getOptionLabel={option => option}
                                        getOptionValue={option => option}
                                    >
                                    </Select>
                                </Col>
                            </Row>


                            {/* Trips */}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>Trips:</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Select
                                        id="trips"
                                        options={this.state.tripsOptions}
                                        placeholder={this.state.labelTrip}
                                        onChange={this.handleChangeTrip.bind(this)}
                                        getOptionLabel={option => option}
                                        getOptionValue={option => option}
                                        isMulti>
                                    </Select>
                                </Col>
                            </Row>

                            {/* IsCrewTravelTime */}
                            <Row className="miniMargem">
                                <Col sm={2}>
                                    <Form.Label>Is crew travel time?</Form.Label>
                                </Col>
                                <Col sm={1}>
                                    <Form.Control id="isCrewTravelTime" type="checkbox" size="sm" placeholder="" onChange={this.setIsCrewTravelTime} />
                                </Col>
                            </Row>

                            {/* IsActive */}
                            <Row className="miniMargem">
                                <Col sm={2}>
                                    <Form.Label>Is Active?</Form.Label>
                                </Col>
                                <Col sm={1}>
                                    <Form.Control id="isActive" type="checkbox" size="sm" placeholder="" onChange={this.setIsActive} />
                                </Col>
                            </Row>

                            {/*Número Máximo de Blocos*/}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>Max number of Blocks:</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Form.Control id="numMaxBlocks" size="sm" type="number" placeholder="Insert max number of blocks here" onChange={this.setData} />
                                </Col>
                            </Row>

                            {/*Duração de cada bloco*/}
                            <Row className="miniMargem">
                                <Col sm={1}>
                                    <Form.Label>Block Duration (min):</Form.Label>
                                </Col>
                                <Col sm={3}>
                                    <Form.Control id="blockDuration" size="sm" type="number" placeholder="Insert the block duration in mins" onChange={this.setData} />
                                </Col>
                            </Row>

                            {/*Submits e alerts*/}
                            <Row className="miniMargem2" >
                                <Button id="btnSubmit" className="createDriverTypeButton" variant="primary"
                                    onClick={this.createWorkBlock}>Submit</Button>
                            </Row>
                            <Row className="margem">

                                <Alert id="alert201" variant="success" hidden={true}>Work Block successfully created.</Alert>
                                <Alert id="alert502" variant="warning" hidden={true}>Couldn't create all workblocks (it would exceed 24 hours!).</Alert>
                                <Alert id="alert500" variant="danger" hidden={true}>WorkBlock exceeds 4 hours!</Alert>
                                <Alert id="alert501" variant="danger" hidden={true}>The total amount of time of workblocks exceeds 24 hours!</Alert>
                                <Alert id="alert400" variant="danger" hidden={true}>Something went wrong</Alert>
                                <Alert id="alert404" variant="danger" hidden={true}>Dont leave empty fields!</Alert>

                            </Row>
                        </Form>
                    </Form>
                </div>
            </Container>
        )
    }

}

export default WorkBlock;