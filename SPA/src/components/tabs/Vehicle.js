import React, { Component } from "react";
import {
  Form,
  Container,
  Tab,
  Nav,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "../../App.css";
import VehicleMapClass from "../mappers/VehicleMap";

var { axiosMDR, axiosMDV } = require('../core/URLConfiguration');

const vehicleMapInstance = new VehicleMapClass();

let defaultEntryDateCompany = new Date();

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelVehicleType: "Select Vehicle Type Here",
      matricula: "",
      vin: "",
      vehicleTypes: "",
      optionsVehicleTypes: [],
      entryDateCompany: defaultEntryDateCompany,
    };
    this.getVehicleTypes();
  }

  getVehicleTypes = async () => {
    let res = await axiosMDR({
      method: "get",
      url: "vehicleType",
    });
    let data = res.data;
    data.map((element) => this.state.optionsVehicleTypes.push(element.name));
  };

  /* Generic set Data method - updates state params */

  setData = ({ target: { id, value } }) => {
    console.log(id + " - " + value);
    this.setState({ [id]: value });
  };

  /* Updates date */

  setEntryDateCompany = (value) => {
    this.setState({ entryDateCompany: value.getTime() });
    defaultEntryDateCompany = value;
  };

  optionChangedVehicleTypes = (value) => {
    let joined = this.state.vehicleTypes.concat(value);
    this.setState({ vehicleTypes: joined });
  };

  /* Method to create Vehicles */

  createVehicle = async () => {
    document.getElementById("alertSuccessfully").hidden = true;
    document.getElementById("alertFailed400").hidden = true;

    let vehicleToPost = vehicleMapInstance.toDTO(this.state);
    try {
      let response = await axiosMDV({
        method: "post",
        url: "Vehicles",

        data: vehicleToPost,
      });

      if (response.status === 201) {
        document.getElementById("alertSuccessfully").hidden = false;
      }
    } catch (error) {
      if (error.message.includes("400")) {
        document.getElementById("alertFailed400").hidden = false;
      }
    }

    /* We resete the forms state after changes */

    defaultEntryDateCompany = new Date();

    document.getElementById("matricula").value = "";
    document.getElementById("vin").value = "";
    document.getElementById("vehicleTypes").value = "";

    /* We reset the state after changes */

    this.state.matricula = "";
    this.state.vin = "";
    this.state.vehicleTypes = "";
    this.state.entryDateCompany = defaultEntryDateCompany;
  };

  /* Set vehicle type*/
  handleChangeVehicleType(e) {
    this.setState({ vehicleTypes: e });
    this.setState({ labelVehicleType: e });
  }

  /* Render all JSX elements of page */

  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first" className="Tab">
                  Add Vehicle
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Container fluid>
                  <div className="margem">
                    <Form>
                      <Row>
                        <Col className="inputMargem" sm={1}>
                          <Form.Label>Matrícula:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control
                            id="matricula"
                            size="sm"
                            type="text"
                            placeholder="XX-00-XX or 00-XX-00"
                            onChange={this.setData}
                          />
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col className="inputMargem" sm={1}>
                          <Form.Label>
                            Vehicle Identification Number:
                          </Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control
                            id="vin"
                            size="sm"
                            type="text"
                            placeholder="Insert VIN here."
                            onChange={this.setData}
                          />
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col sm={1}>
                          <Form.Label>Vehicle types:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Select
                            id="vehicleTypes"
                            options={this.state.optionsVehicleTypes}
                            placeholder={this.state.labelVehicleType}
                            onChange={this.handleChangeVehicleType.bind(this)}
                            getOptionLabel={(option) => option}
                            getOptionValue={(option) => option}
                          ></Select>
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col sm={1}>
                          <Form.Label>Entry date in company:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <div id="entryDate">
                            <DatePicker
                              onChange={this.setEntryDateCompany}
                              value={defaultEntryDateCompany}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Button
                        id="btnSubmit"
                        className="createVehicleButton"
                        variant="primary"
                        onClick={this.createVehicle}
                      >
                        Submit
                      </Button>
                      <Row className="alertBox">
                        <Alert
                          id="alertSuccessfully"
                          variant="success"
                          hidden={true}
                        >
                          Vehicle successfully created.
                        </Alert>
                        <Alert
                          id="alertFailed400"
                          variant="danger"
                          hidden={true}
                        >
                          Error while creating Vehicle.
                        </Alert>
                      </Row>
                    </Form>
                  </div>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Vehicle;
