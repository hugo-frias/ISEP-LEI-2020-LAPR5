import React, { Component } from 'react';
import { Form, Container, Tab, Nav, Row, Col, Button, Alert } from 'react-bootstrap';
import '../../App.css';

var { axiosMDR } = require('../core/URLConfiguration');
const DriverTypeMapClass = require('../mappers/DriverTypeMap');
const driverTypeMapInstance = new DriverTypeMapClass();
class DriverType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      description: '',
    };
  }

  /* Generic set Data method - updates state params */

  setData = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  /* Method to create Driver Types */

  createDriverType = async () => {

    document.getElementById('alertSuccessfully').hidden = true;
    document.getElementById('alertFailed400').hidden = true;

    let driverType = driverTypeMapInstance.toDTO(this.state);

    try {

      let response = await axiosMDR({
        method: 'post',
        url: 'driverType',

        data: driverType

      });

      if (response.status === 201) {
        document.getElementById('alertSuccessfully').hidden = false;
      }

    } catch (error) {

      if (error.message.includes('400')) {
        document.getElementById('alertFailed400').hidden = false;
      }

    }

    /* We resete the forms state after changes */

    document.getElementById("code").value = "";
    document.getElementById("description").value = "";

    /* We reset the state after changes */

    this.state.code = '';
    this.state.description = '';
  }

  /* Render all JSX elements of page */

  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first" className="Tab">Add Driver Type</Nav.Link>
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
                          <Form.Control id="code" size="sm" type="text" placeholder="Insert code here." onChange={this.setData} />
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col className="inputMargem" sm={1}>
                          <Form.Label>Description:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control id="description" size="sm" type="text" placeholder="Insert description here." onChange={this.setData} />
                        </Col>
                      </Row>
                      <Button id="btnSubmit" className="createButton" variant="primary" onClick={this.createDriverType} >Submit</Button>
                      <Row className="alertBox">
                        <Alert id="alertSuccessfully" variant="success" hidden={true}>Driver type successfully created.</Alert>
                        <Alert id="alertFailed400" variant="danger" hidden={true}>The code already exists.</Alert>
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

export default DriverType;