import React, { Component } from 'react';
import { Alert, Button, Card, Col, Container, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap';
import '../../App.css';

let { axiosMDR } = require('../core/URLConfiguration');

const NodeMapClass = require('../mappers/NodeMap');
const nodeMapInstance = new NodeMapClass();
let nodeToPost, nodesToShow = 'Nodes will appear here...';

/* Main class of Nodes's Tab */


class Node extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelToPost : 'Select a model type',
            Name: '',
            ShortName: '',
            Longitude: 0,
            Latitude: 0,
            IsDepot: false,
            IsReliefPoint: false,
            filterType: 'all',
            filterValue: '',
            model : null
        };
    }

    /* Generic set Data method - updates state params */

    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    /* Updates isDepot param of state */

    setIsDepot = (value) => {
        this.setState({ IsDepot: value.target.checked });
        console.log(document.getElementById("models").options);
        if(this.state.IsDepot === true){
            document.getElementById("models").options[0].hidden = false;
            document.getElementById("models").options[1].hidden = false;
            document.getElementById("models").options[2].hidden = true;
            document.getElementById("models").options[3].hidden = true;
        } else {
            document.getElementById("models").options[0].hidden = true;
            document.getElementById("models").options[1].hidden = true;
            document.getElementById("models").options[2].hidden = false;
            document.getElementById("models").options[3].hidden = false;
            
        }
    }

    /* Updates isReliefPoint param of state */

    setIsReliefPoint = (value) => {
        this.setState({ IsReliefPoint: value.target.checked });
    }

    /* Method to create Nodes */

    createNode = async () => {

        document.getElementById('alertSuccessfully').hidden = true;
        document.getElementById('alertFailed400').hidden = true;
        document.getElementById('alertFailed406').hidden = true;

        nodeToPost = nodeMapInstance.toDTO(this.state);

        try {
            let response = await axiosMDR({
                method: 'post',
                url: 'node',

                data: nodeToPost

            })
            if (response.status === 201) {
                document.getElementById('alertSuccessfully').hidden = false;
            }
        } catch (error) {
            if (error.message.includes('400')) {
                document.getElementById('alertFailed400').hidden = false;
            } else if (error.message.includes('406')) {
                document.getElementById('alertFailed406').hidden = false;
            }

        }


        if (this.state.IsDepot) {
            document.getElementById("IsDepot").click();
        }

        if (this.state.IsReliefPoint) {
            document.getElementById("IsReliefPoint").click();
        }


        /* We reset the forms state after changes */

        document.getElementById("Name").value = "";
        document.getElementById("ShortName").value = "";
        document.getElementById("Longitude").value = null;
        document.getElementById("Latitude").value = null;

        /* We reset the state after changes */

        this.state.Name = '';
        this.state.ShortName = '';
        this.state.Longitude = 0;
        this.state.Latitude = 0;
        this.state.IsDepot = false;
        this.state.IsReliefPoint = false;
        nodeToPost = null;
    }

    /* We change the filter type */

    onChangeFilter = (filterEvent) => {
        let options = filterEvent.target.options;
        let optionSelected = options[filterEvent.target.selectedIndex];
        this.setState({ filterType: optionSelected.value });
    }

    /* We change the filter type */

    onChangeModel = (filterEvent) => {
        let options = filterEvent.target.options;
        let optionSelected = options[filterEvent.target.selectedIndex];
        this.setState({ model: optionSelected.value });
    }


    // /* We change the filter type */

    // onChangeModels = (filterEvent) => {
    //     let options = filterEvent.target.options;
    //     let optionSelected = options[filterEvent.target.selectedIndex];
    //     this.setState({ filterType: optionSelected.value });
    // }

    /* Method to get Nodes */

    getNodes = async () => {

        try {

            let res = await axiosMDR.get("node", {
                params: {
                    filter: this.state.filterType,
                    filterValue: this.state.filterValue
                }
            });

            document.getElementById("nodesShowArea").value = JSON.stringify(res.data);

            /* We reset the forms state after changes */

            document.getElementById("filterValue").value = '';
            document.getElementById("filterType").value = '';


            /* We reset the state after changes */

            this.state.filterValue = "";
            this.state.filterType = "";


        } catch (error) {
            console.log("getNodes, Node.js SPA" + error);
        }

    }

    /* Render all JSX elements of page */

    render() {
        return (

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="Tab">Create Nodes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="Tab2">Retrieve Nodes</Nav.Link>
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
                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>Name:
                                                    </Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Name" size="sm" type="text"
                                                        placeholder="Insert name here."
                                                        onChange={this.setData} />
                                                </Col>

                                            </Row>
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>ShortName:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="ShortName" size="sm" type="text"
                                                        placeholder="Insert short name here."
                                                        onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>Longitude:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Longitude" size="sm" type="number"
                                                        placeholder="Insert longitude here."
                                                        onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            <Row className="miniMargem">

                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>Latitude:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="Latitude" size="sm" type="number"
                                                        placeholder="Insert latitude here."
                                                        onChange={this.setData} />
                                                </Col>
                                            </Row>

                                            <Row className="miniMargem">

                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>isDepot:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="IsDepot" type="checkbox" size="sm"
                                                        placeholder="This node is Depot?"
                                                        onChange={this.setIsDepot} />
                                                </Col>
                                            </Row>

                                            <Row className="miniMargem">

                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>isReliefPoint:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="IsReliefPoint" type="checkbox" size="sm"
                                                        placeholder="This node is Relief Point?"
                                                        onChange={this.setIsReliefPoint} />
                                                </Col>
                                            </Row>

                                            <Row className="miniMargem">
                                                <Col className="NodeInputSpace" sm={1}>
                                                    <Form.Label>Models:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control
                                                        id="models"
                                                        as="select"
                                                        size="sm" 
                                                        defaultValue ={this.state.modelToPost} 
                                                        placeholder = {this.state.modelToPost}
                                                        onChange={this.onChangeModel}>
                                                        
                                                        <option value='https://raw.githubusercontent.com/hugo-frias/testelapr/master/busstop/scene.gltf'>Bus Stop 1</option>
                                                        <option value='https://raw.githubusercontent.com/hugo-frias/testelapr/master/scene.gltf'>Bus Stop 2</option>
                                                        <option hidden={true} value='https://raw.githubusercontent.com/hugo-frias/testelapr/master/officeBuildingLowPoly/scene.gltf'>Estação Low-Poly</option>
                                                        <option hidden={true} value="https://raw.githubusercontent.com/hugo-frias/testelapr/master/trainStation/scene.gltf">Estação Normal</option>
                                                    </Form.Control>
                                                </Col>
                                            </Row>



                                            <Button id="btnSubmit" variant="primary"
                                                onClick={this.createNode}>Submit</Button>
                                            <Row className="miniMargem">
                                                <Alert id="alertSuccessfully" variant="success" hidden={true}>Node
                                                    created successfully.</Alert>
                                                <Alert id="alertFailed400" variant="danger" hidden={true}>There is a
                                                    node with this ShortName already.</Alert>
                                                <Alert id="alertFailed406" variant="danger" hidden={true}>Node
                                                    validation error.</Alert>
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Container fluid>
                                    <Form>

                                        <Row className="miniMargem">
                                            <Col className="NodeInputSpace" sm={1}>
                                                <Form.Label>Filter:</Form.Label>
                                            </Col>
                                            <Col sm={3}>
                                                <Form.Control
                                                    id="filterType"
                                                    as="select"
                                                    size="sm"
                                                    onChange={this.onChangeFilter}>
                                                    <option value='all'>All</option>
                                                    <option value="startsWith">StartWith</option>
                                                    <option value='specific'>ShortName</option>
                                                    <option value='Depot'>isDepot</option>
                                                </Form.Control>
                                            </Col>
                                        </Row>

                                        <Row className="miniMargem">

                                            <Col className="NodeInputSpace" sm={1}>
                                                <Form.Label>Valor:</Form.Label>
                                            </Col>
                                            <Col sm={3}>
                                                <Form.Control id="filterValue" size="sm" type="text"
                                                    placeholder="Insert your filter here."
                                                    onChange={this.setData} />
                                            </Col>
                                        </Row>

                                        <Row>
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
                                        </Row>

                                        <Row className="miniMargem">
                                            <div className="input-group">
                                                <InputGroup.Text id="nodesShowAreaLabel">Nodes</InputGroup.Text>
                                                <textarea className="form-control" id="nodesShowArea" rows={5} readOnly={true} defaultValue={nodesToShow} />
                                            </div>
                                        </Row>

                                        <Button variant="primary" onClick={this.getNodes}>Get</Button>
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

export default Node;