import React, { Component } from "react";
import { CirclePicker } from 'react-color';
import {
  Form,
  Container,
  Tab,
  Nav,
  Row,
  Col,
  Button,
  Alert,
  InputGroup
} from "react-bootstrap";
import "../../App.css";

var { axiosMDV } = require('../core/URLConfiguration');

let vduties = 'All vehicle duties will appear here...';

class VehicleDuty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      color: "",
      lista: [],
      listaC: []
    };
  }

  /* Generic set Data method - updates state params */

  setData = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  defineColor = (value) => {
    this.setState({ color: value.hex });
  };

  /* Method to create Vehicles */

  createVehicleDuty = async () => {
    document.getElementById("alertSuccessfully").hidden = true;
    document.getElementById("alertFailed400").hidden = true;

    let vehicleDuty = this.state;

    try {
      let response = await axiosMDV({
        method: "post",
        url: "VehicleDuties",

        data: vehicleDuty,
      });

      if (response.status === 201) {
        document.getElementById("alertSuccessfully").hidden = false;
      }
    } catch (error) {
      if (error.message.includes("400")) {
        document.getElementById("alertFailed400").hidden = false;
      }
    }

    /* We reset the forms state after changes */

    document.getElementById("code").value = "";
    document.getElementById("name").value = "";

    /* We reset the state after changes */

    this.state.code = "";
    this.state.name = "";
  };

  getVehicleDuties = async () => {
    try {
      let res = await axiosMDV.get("VehicleDuties");
      console.log(res.data);
      let array = []; let array2 = [];
      for (var i = 0; i < res.data.length; i++) { array[i] = "Name: " + res.data[i].name + " (" + res.data[i].code + ")"; }
      this.setState({ lista: array });
      for (var i = 0; i < res.data.length; i++) { array2[i] = res.data[i].color; }
      this.setState({ listaC: array2 });

    } catch (error) {
      console.log("getVehicleDuties SPA" + error);
    }
  }

  alertItemName = (item) => {
    alert(item.name)
  }
  /* Render all JSX elements of page */

  render() {
    let i = 0;
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first" className="Tab">
                  Add Vehicle Duty
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="Tab2">Show Vehicle Duties</Nav.Link>
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
                          <Form.Label>Code:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control
                            id="code"
                            size="sm"
                            type="text"
                            placeholder="Insert code here (20 characthers)."
                            onChange={this.setData}
                          />
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col className="inputMargem" sm={1}>
                          <Form.Label>Name:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control
                            id="name"
                            size="sm"
                            type="text"
                            placeholder="Insert name here."
                            onChange={this.setData}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={1}>
                          <Form.Label>RGB:</Form.Label>
                        </Col>
                        <Col sm={3} className="circleColour">
                          <CirclePicker
                            id="colorPicker"
                            color={this.state.color}
                            onChangeComplete={this.defineColor}
                          />
                        </Col>
                      </Row>
                      <Button
                        id="btnSubmit"
                        className="createVehicleButton"
                        variant="primary"
                        onClick={this.createVehicleDuty}
                      >
                        Submit
                      </Button>
                      <Row className="alertBox">
                        <Alert
                          id="alertSuccessfully"
                          variant="success"
                          hidden={true}
                        >
                          Vehicle Duty successfully created.
                        </Alert>
                        <Alert
                          id="alertFailed400"
                          variant="danger"
                          hidden={true}
                        >
                          Error while creating Vehicle Duty.
                        </Alert>
                      </Row>
                    </Form>
                  </div>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Container fluid>
                  <Form>
                    <Row className="margem"></Row>
                    <Button variant="primary" onClick={this.getVehicleDuties}>Show Vehicle Duties</Button>
                    <Row className="margem">
                      <Col>
                        <React.Fragment>
                          <ul className="list-group">
                            {this.state.lista.map(item => (
                              <li className="list-group-item list-group-item-primary">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </React.Fragment>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default VehicleDuty;
