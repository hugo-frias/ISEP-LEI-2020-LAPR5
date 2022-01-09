import React, { Component } from 'react';
import { Form, Container, Tab, Nav, Row, Col, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import '../../App.css';

var { axiosMDR, axiosMDV } = require('../core/URLConfiguration');
const DriverMapClass = require('../mappers/DriverMap');
const driverMapInstance = new DriverMapClass();

let defaultDateBirth = new Date();
let defaultDrivingLicenseExpirationDate = new Date();
let defaultEntryDateCompany = new Date();

class Driver extends Component {

    selectRef = null;

    constructor(props) {
        super(props);
        this.state = {
            mechanographicNumber: '',
            name: '',
            dateBirth: defaultDateBirth.getTime(),
            citizenCardNumber: 0,
            NIF: 0,
            drivingLicenseNumber: 0,
            drivingLicenseExpirationDate: defaultDrivingLicenseExpirationDate.getTime(),
            driverTypes: [],
            optionsDriverTypes: [],
            entryDateCompany: defaultEntryDateCompany.getTime()
        };
        this.getDriverTypes();
    }

    clearDriverTypeValue = () => {
        this.selectRef.select.clearValue();
      };

    getDriverTypes = async () => {
        let res = await axiosMDR({
            method: 'get',
            url: 'driverType',
        });
        let data = res.data;
        data.map(element => (
            this.state.optionsDriverTypes.push(element.code)
        ));
    }

    /* Generic set Data method - updates state params */

    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    /* Updates date */

    setDateBirth = (value) => {
        this.setState({ dateBirth: value.getTime() });
        defaultDateBirth = value;
    };

    setDrivingLicenseExpirationDate = (value) => {
        this.setState({ drivingLicenseExpirationDate: value.getTime() });
        defaultDrivingLicenseExpirationDate = value;
    };

    setEntryDateCompany = (value) => {
        this.setState({ entryDateCompany: value.getTime() });
        defaultEntryDateCompany = value;
    };

    optionChangedDriverTypes = (value) => {
        this.setState({ driverTypes: value });
    }

    /* Method to create Driver Types */

    createDriver = async () => {

        document.getElementById('alertSuccessfully').hidden = true;
        document.getElementById('alertFailed400').hidden = true;

        let driver = driverMapInstance.toDTO(this.state);

        try {

            let response = await axiosMDV({
                method: 'post',
                url: 'Drivers',

                data: driver

            });

            if (response.status === 201) {
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

        /* We resete the forms state after changes */

        defaultDateBirth = new Date();
        defaultDrivingLicenseExpirationDate = new Date();
        defaultEntryDateCompany = new Date();

        document.getElementById("mechanographicNumber").value = "";
        document.getElementById("name").value = "";
        document.getElementById("citizenCardNumber").value = 0;
        document.getElementById("NIF").value = 0;
        document.getElementById("drivingLicenseNumber").value = 0;
        this.clearDriverTypeValue();

        /* We reset the state after changes */

        this.state.mechanographicNumber = '';
        this.state.name = '';
        this.state.dateBirth = defaultDateBirth.getTime();
        this.state.citizenCardNumber = 0;
        this.state.NIF = 0;
        this.state.drivingLicenseNumber = 0;
        this.state.drivingLicenseExpirationDate = defaultDrivingLicenseExpirationDate.getTime();
        this.state.entryDateCompany = defaultEntryDateCompany.getTime();
    }

    /* Render all JSX elements of page */

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="Tab">Add Driver</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Container fluid>
                                    <div className="margem">
                                        <Form>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>Mechanographic number:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="mechanographicNumber" size="sm" type="text" placeholder="Insert mechanographic number here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>Name:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="name" size="sm" type="text" placeholder="Insert name here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}><Form.Label>Date birth:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <div id="dateBirth">
                                                    <DatePicker
                                                        onChange={this.setDateBirth}
                                                        value={defaultDateBirth}
                                                    />                                                       
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>Citizen card number:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="citizenCardNumber" size="sm" type="number" placeholder="Insert citizen card number here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>NIF:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="NIF" size="sm" type="number" placeholder="Insert NIF here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>Driving license number:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="drivingLicenseNumber" size="sm" type="number" placeholder="Insert driving license here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}><Form.Label>Driving license expiration date:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <div id="licenseExp">
                                                    <DatePicker
                                                        onChange={this.setDrivingLicenseExpirationDate}
                                                        value={defaultDrivingLicenseExpirationDate}
                                                    />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}>
                                                    <Form.Label>Driver types:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        ref={ref => {
                                                            this.selectRef = ref;
                                                        }}
                                                        id="driverTypes"
                                                        options={this.state.optionsDriverTypes}
                                                        placeholder="Select the driver type here"
                                                        onChange={this.optionChangedDriverTypes}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                        isMulti>
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={3}><Form.Label>Entry date in company:</Form.Label></Col>
                                                <Col sm={3}>
                                                    <div id="entryDate">
                                                    <DatePicker
                                                        onChange={this.setEntryDateCompany}
                                                        value={defaultEntryDateCompany}
                                                    />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Button id="btnSubmit" className="createButton" variant="primary" onClick={this.createDriver} >Submit</Button>
                                            <Row className="alertBox">
                                                <Alert id="alertSuccessfully" variant="success" hidden={true}>Driver successfully created.</Alert>
                                                <Alert id="alertFailed400" variant="danger" hidden={true}>{''}</Alert>
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        )
    }

}

export default Driver;