import React, { Component } from 'react';
import { Alert, Form, Container, Row, Col, Button, Tab, Nav, InputGroup } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import '../../App.css';

var { axiosMDR } = require('../core/URLConfiguration');

const LineMapClass = require('../mappers/LineMap');
const lineMapInstance = new LineMapClass();
let lineToPost;

class Line extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      color: '',
      codesAux: [],
      lines: [],
      filterType: "NOFILTER",
      filterValue: ''
    };
    this.getCodes();
  }

  getCodes = async () => {
    try {
      let res = await axiosMDR({
        method: 'get',
        url: 'line',
        params: {
          filter: "NOFILTER"
        }
      });
      let data = res.data;
      for (var i in data) {
        this.state.codesAux[i] = data[i].code;
      }
    } catch (error) {
      console.log("error:" + error);
    }
  }

  getLines = async () => {
    try {
      console.log(this.state.filterValue);
      console.log(this.state.filterType);
      let res = await axiosMDR({
        method: 'get',
        url: 'line',
        params: {
          filter: this.state.filterType,
          filterValue: this.state.filterValue
        }
      });
      document.getElementById("linesShowArea").value = JSON.stringify(res.data);
      // let data = res.data;
      // for (var i in data) {
      //   this.state.lines[i] = data[i].code;
      // }
    } catch (error) {
      console.log("error:" + error);
    }
  }


  /* We change the filter type */

  onChangeFilter = (filterEvent) => {
    document.getElementById("filterValue").disabled = true;
    let options = filterEvent.target.options;
    console.log(options);
    let optionSelected = options[filterEvent.target.selectedIndex];
    console.log(optionSelected);
    if (optionSelected.value === "CODE-" || optionSelected.value === "NAME-" || optionSelected.value === "HAS-") {
      console.log("teste");
      document.getElementById("filterValue").disabled = false;
    }
    this.setState({ filterType: optionSelected.value });
  }

  defineColor = (value) => {
    this.setState({ color: value.hex });
  };

  setAtributes = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  /* Generic set Data method - updates state params */

  setData = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  checkValidity = () => {
    if (this.state.code.length === 0) {
      document.getElementById("alertMau").hidden = false;
      return false;
    }
    document.getElementById("alertBom").hidden = true;
    document.getElementById("alertMau").hidden = true;
    document.getElementById("alertSubmitSuc").hidden = true;
    document.getElementById("alertSubmitFail").hidden = true;
    for (var i in this.state.codesAux) {
      if (this.state.codesAux[i] === this.state.code) {
        document.getElementById("alertMau").hidden = false;
        return false;
      }
    }
    document.getElementById("botaoSubmit").hidden = false;
    document.getElementById("checkCode").hidden = true;
    document.getElementById("alertBom").hidden = false;
    document.getElementById("code").disabled = true;
    return true;
  }


  createLine = async () => {



    lineToPost = lineMapInstance.toDTO(this.state);

    try {
      let resp = await axiosMDR({
        method: 'post',
        url: 'line',
        data: lineToPost
      });
      if (resp.status === 201) {
        this.state.codesAux.push(this.state.code);
        this.state.name = "";
        this.state.color = "";
        document.getElementById("code").value = "";
        document.getElementById("name").value = "";
        document.getElementById("alertSubmitSuc").hidden = false;
      } else {
        document.getElementById("alertSubmitFail").hidden = false;
      }
    } catch {
      document.getElementById("alertSubmitFail").hidden = false;
    } finally {
      document.getElementById("botaoSubmit").hidden = true;
      document.getElementById("code").disabled = false;
      document.getElementById("checkCode").hidden = false;
    }

  }


  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first" className="Tab">Create Lines</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="Tab2">Retrieve Lines</Nav.Link>
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
                        <Col sm={1}><Form.Label>Code:</Form.Label></Col>
                        <Col sm={3}><Form.Control id="code" type="text" placeholder="Insert code here" onChange={this.setAtributes} /></Col>
                        <Col sm={5}><Button id="checkCode" variant="primary" onClick={this.checkValidity} >Check code</Button></Col>
                        <Row className="miniMargem">
                          <Alert id="alertBom" variant="success" hidden="true">Código disponivel!</Alert>
                          <Alert id="alertMau" variant="danger" hidden="true">Código indisponivel!</Alert>
                        </Row>
                      </Row >

                      <Row className="miniMargem">
                        <Col sm={1}>
                          <Form.Label>Name:</Form.Label>
                        </Col>
                        <Col sm={3}>
                          <Form.Control id="name" type="text" placeholder="Insert name here" onChange={this.setAtributes} />
                        </Col>
                      </Row>

                      <Row>
                        <Col sm={1}>
                          <Form.Label>RGB:</Form.Label>
                        </Col>
                        <Col sm={3} className="circleColour">
                          <CirclePicker id="colorPicker" color={this.state.color} onChangeComplete={this.defineColor} />
                        </Col>
                      </Row>

                      <Row><Button id="botaoSubmit" variant="primary" hidden="true" onClick={this.createLine}>Submit</Button></Row>
                      <Row className="miniMargem">
                        <Alert id="alertSubmitSuc" variant="success" hidden="true">Linha criada com sucesso!</Alert>
                        <Alert id="alertSubmitFail" variant="danger" hidden="true">Erro ao criar linha!</Alert>
                      </Row>
                    </Form>
                  </div>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Container fluid>
                  <Form>

                    <Row className="miniMargem">
                      <Col className="LineInputSpace" sm={1}>
                        <Form.Label>Filter:</Form.Label>
                      </Col>
                      <Col sm={3}>
                        <Form.Control
                          id="filterType"
                          as="select"
                          size="sm"
                          onChange={this.onChangeFilter}>
                          <option value='NOFILTER'>No Filter</option>
                          <option value="NAMEASC">Ascending Name</option>
                          <option value="NAMEDESC">Descending Name</option>
                          <option value="CODEASC">Ascending Code</option>
                          <option value="CODEDESC">Descending Code</option>
                          <option value='CODE-'>Specific Code</option>
                          <option value='NAME-'>Specific Name</option>
                          <option value='HAS-'>Contains Value</option>
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row className="miniMargem">

                      <Col className="LineInputSpace" sm={1}>
                        <Form.Label>Valor:</Form.Label>
                      </Col>
                      <Col sm={3}>
                        <Form.Control id="filterValue" size="sm" type="text"
                          placeholder="Insert your filter here." disabled="true"
                          onChange={this.setData} />
                      </Col>
                    </Row>

                    {/* <Row>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>Filters</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Guide</Card.Subtitle>
                          <Card.Text>
                            When selected isDepot: 0 means false and 1 means true.
    									    </Card.Text>
                          <Card.Text>
                            When selected all: 1 means by alphabetical order and -1, inverse order.
    									    </Card.Text>
                        </Card.Body>
                      </Card>
                    </Row> */}

                    <Row className="miniMargem">
                      <div className="input-group">
                        <InputGroup.Text id="linesShowAreaLabel">Lines</InputGroup.Text>
                        <textarea className="form-control" id="linesShowArea" rows={5} readOnly={true} defaultValue={this.lines} />
                      </div>
                    </Row>

                    <Button variant="primary" onClick={this.getLines}>Get</Button>
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

export default Line;


