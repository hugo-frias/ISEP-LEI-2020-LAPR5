import React, { Component } from 'react';
import { Alert, Button, Card, Col, Container, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap';
import '../../App.css';
import Select from 'react-select';

var { axiosMDR } = require('../core/URLConfiguration');
const PathMapClass = require('../mappers/PathMap');
let pathsToShow = 'Paths will appear here...';
const PathMapInstance = new PathMapClass();
let pathToPost;

class Path extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isEmpty: false,
      pathNodes: [],
      options: []
    }
    this.getPathNodes();
  }
  setCode = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  setIsEmpty = (value) => {
    this.setState({ isEmpty: value.target.checked });
  }
  handleChange(e) {
    this.state.pathNodes.push(e);
  }
  getPathNodes = async () => {
    try {
      let res = await axiosMDR.get("pathNode");
      let data = res.data;
      let opcoes = data.map(d => ({
        "code": d.code
      }));
      for (var i in opcoes) {
        this.state.options[i] = opcoes[i].code;
      }

    } catch (error) {
      console.log("errror:" + error);
    }
  }

  clean = () => {
    this.setState({
      code: "",
      isEmpty: false,
      pathNodes: null
    });
    if (this.state.isEmpty) {
      document.getElementById("isEmpty").click();
    }
    document.getElementById("pathNodes").value = "";
  }
  createPath = async () => {
    document.getElementById('alertSuccessfully').hidden = true;
    document.getElementById('alertFailed').hidden = true;

    let code = "p" + Date.now() + Math.random().toString(36).substring(2, 5);
    this.state.code = code;
    pathToPost = PathMapInstance.toDTO(this.state);
    this.setState();
    try {
      let res = await axiosMDR({
        method: 'post',
        url: 'path',
        data: pathToPost
      })
      if (res.status === 201) {
        this.clean();
        document.getElementById('alertSuccessfully').hidden = false;
      }
    } catch (error) {
      document.getElementById('alertFailed').hidden = false;
    }
  }

  /* Method to get Nodes */

  getPaths = async () => {

    try {

      let res = await axiosMDR.get("path");

      console.log(res);

      document.getElementById("pathsShowArea").value = JSON.stringify(res.data);

    } catch (error) {
      console.log("getPaths, Node.js SPA" + error);
    }

  }

  render() {

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first" className="Tab">Create Path</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="Tab5">Retrieve Paths</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="Tab" sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Container fluid>
                  <div className="margem">
                    <Form>
                      <Row className="miniMargem">
                        <Col sm={1}>
                          <Form.Label >isEmpty:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control id="isEmpty" type="checkBox" placeholder="This path is Empty?" onChange={this.setIsEmpty} />
                        </Col>
                      </Row>
                      <Row className="miniMargem">
                        <Col sm={1}>
                          <Form.Label >PathNodes:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Select
                            id="pathNodes"
                            multiple
                            isClearable
                            options={this.state.options}
                            placeholder="Select the path nodes here"
                            onChange={this.handleChange.bind(this)}
                            getOptionLabel={option => option}
                            getOptionValue={option => option}
                          >
                          </Select>
                        </Col>
                      </Row>
                      <Button id="btnSubmit" variant="primary" onClick={this.createPath}>Submit</Button>
                      <Row className="miniMargem">
                        <Alert id="alertSuccessfully" variant="success" hidden="true">Path created successfully.</Alert>
                        <Alert id="alertFailed" variant="danger" hidden="true">Error creating Path.</Alert>
                      </Row>
                    </Form>
                  </div>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Container fluid>
                  <Form>
                    <Row className="miniMargem">
                      <div className="input-group">
                        <InputGroup.Text id="pathsShowAreaLabel">Paths</InputGroup.Text>
                        <textarea className="form-control" id="pathsShowArea" rows={5} readOnly={true} defaultValue={pathsToShow} />
                      </div>
                    </Row>
                    <Button variant="primary" onClick={this.getPaths}>Get</Button>
                  </Form>
                </Container>

              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}

export default Path;