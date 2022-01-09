import React, { Component } from "react";
import { Alert, Form, Container, Row, Col, Button } from "react-bootstrap";
import "../../App.css";

var { axiosMDR } = require('../core/URLConfiguration');
const VehicleTypeMapClass = require("../mappers/VehicleTypeMap");
const vehicleTypeMapInstance = new VehicleTypeMapClass();
let vehicleTypeToPost;

class VehicleType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      autonomy: 0,
      cost: 0,
      consumption: 0,
      energy: 1,
      avgSpeed: 0,
      emission: 0,
    };
  }

  onChangeEnergy = (e) => {
    let options = e.target.options;
    let optionSelected = options[e.target.selectedIndex];
    let optionSelectedValue = optionSelected.value;
    this.setState({ energy: optionSelectedValue });

    if (optionSelectedValue === 75) {
      document.getElementById("emission").disabled = true;
    } else {
      document.getElementById("emission").disabled = false;
    }
  };

  setData = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  cleanForm = () => {
    this.setState({
      code: "",
      name: "",
      autonomy: 0,
      cost: 0,
      consumption: 0,
      energy: 1,
      avgSpeed: 0,
      emission: 0,
    });

    document.getElementById("name").value = "";
    document.getElementById("autonomy").value = 0;
    document.getElementById("cost").value = 0;
    document.getElementById("consumption").value = 0;
    document.getElementById("energy").value = 1;
    document.getElementById("avgSpeed").value = 0;
    document.getElementById("emission").value = 0;
    document.getElementById("emission").disabled = false;
    document.getElementById("alertSubmitSuc").hidden = true;
    document.getElementById("alertSubmitFail").hidden = true;
  };

  createVehicleType = async () => {


    let code = "vt" + Date.now() + Math.random().toString(36).substring(2, 7);
    this.state.code = code;
    vehicleTypeToPost = vehicleTypeMapInstance.toDTO(this.state);

    this.setState();
    try {
      let resp = await axiosMDR({
        method: "post",
        url: "vehicleType",

        data: vehicleTypeToPost,
      });

      if (resp.status === 201) {
        this.cleanForm();
        document.getElementById("alertSubmitSuc").hidden = false;
      } else {
        document.getElementById("alertSubmitFail").hidden = false;
      }
    } catch (error) {
      document.getElementById("alertSubmitFail").hidden = false;
    }
  };

  render() {
    return (
      <Container fluid>
        <div className="margem">
          <Form>
            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Name:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Insert name here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Autonomy:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="autonomy"
                  type="number"
                  placeholder="Insert autonomy here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Average Speed:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="avgSpeed"
                  type="number"
                  placeholder="Insert average speed here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Consumption:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="consumption"
                  type="number"
                  placeholder="Insert consumption here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Cost:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="cost"
                  type="number"
                  placeholder="Insert cost here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Energy:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="energy"
                  as="select"
                  size="sm"
                  onChange={this.onChangeEnergy}
                >
                  <option value="1">Gasolina</option>
                  <option value="23">Gasóleo</option>
                  <option value="20">GPL</option>
                  <option value="50">Hidrogénio</option>
                  <option value="75">Elétrico</option>
                </Form.Control>
              </Col>
            </Row>

            <Row className="miniMargem">
              <Col sm={1}>
                <Form.Label>Emission:</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control
                  id="emission"
                  type="number"
                  placeholder="Insert emission here"
                  onChange={this.setData}
                />
              </Col>
            </Row>

            <Row>
              <Button
                id="botaoSubmit"
                variant="primary"
                onClick={this.createVehicleType}
              >
                Submit
              </Button>
            </Row>
            <Row className="miniMargem">
              <Alert id="alertSubmitSuc" variant="success" hidden="true">
                Tipo de Viatura criado com sucesso!
              </Alert>
              <Alert id="alertSubmitFail" variant="danger" hidden="true">
                Erro ao criar o tipo de viatura!
              </Alert>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

export default VehicleType;
