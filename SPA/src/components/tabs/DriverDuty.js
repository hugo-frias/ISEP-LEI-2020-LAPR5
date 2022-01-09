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
import Select from 'react-select';

var { axiosMDV } = require('../core/URLConfiguration');

const DriverDutyMapClass = require('../mappers/DriverDutyMap');
const DriverDutyMapInstance = new DriverDutyMapClass();
let driverDutyToPost;

class DriverDuty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            color: "",
            labelWorkBlock: "Select WorkBlock here",
            workblocks: [],
            workblocksOptions: [],
            workblocksIds: [],
            lastWorkBlock: "",
            driverDuties: []
        };
        this.getWorkBlocks();
    }

    /* Generic set Data method - updates state params */

    setData = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    defineColor = (value) => {
        this.setState({ color: value.hex });
    };

    handleChangeWorkBlock(e) {
        try {
            console.log(e);
            var ind = this.state.workblocksOptions.indexOf(e[e.length - 1]);
            console.log(ind);
            var code = this.state.workblocksIds[ind];
            console.log(code);
            //var lastElement = e[e.length - 1 ];
            this.setState({lastWorkBlock : code});
            this.setState({ labelWorkBlock: e });
            this.state.workblocks.push(code);
            console.log(this.state.lastWorkBlock);
            this.getWorkBlocksFiltered(this.state.lastWorkBlock);
        } catch (e) {
            console.log(e.message);
            this.setState({lastWorkBlock : ''})
            this.setState({ labelWorkBlock: "Select WorkBlock here" });
            this.getWorkBlocks();
        }
    }

    /*Get WorkBlocks*/

    getWorkBlocks = async () => {
        try {
            let res = await axiosMDV({
                method: 'get',
                url: 'WorkBlocks',
            });
            let data = res.data;
            console.log(data);
            let opcoes = data.map(d => ({
                "id": d.id,
                "startNode": d.startNode,
                "endNode": d.endNode,
                "startTime": d.startTime,
                "endTime": d.endTime,
            }));
            let ids = data.map(d => ({
                "id": d.id
            }));

            let i;
            console.log("ids:->");
            for (i in ids) {
                this.state.workblocksIds[i] = ids[i].id;
                console.log("id:" + this.state.workblocksIds[i]);
            }
            i = 0;
            console.log("texto:->");
            for (i in opcoes) {
                var startTimeHHMM = String(Math.floor(opcoes[i].startTime / 3600)).padStart(2, "0") + ":" + String(Math.floor(opcoes[i].startTime / 60) % 60).padStart(2, "0")
                var endTimeHHMM = String(Math.floor(opcoes[i].endTime / 3600)).padStart(2, "0") + ":" + String(Math.floor(opcoes[i].endTime / 60) % 60).padStart(2, "0")
                this.state.workblocksOptions[i] = "Id: " + opcoes[i].id + ", Time: " + startTimeHHMM + "-" + endTimeHHMM + ", " + opcoes[i].startNode + "-" + opcoes[i].endNode;
                console.log("T:" + this.state.workblocksOptions[i]);
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    getWorkBlocksFiltered = async (workBlockId) => {

        try {
            let res = await axiosMDV({
                method: 'get',
                url: 'WorkBlocks/Filtered/' + workBlockId,
            });
            this.setState({ workblocksOptions: [] });
            let data = res.data;
            console.log(data);
            let opcoes = data.map(d => ({
                "id": d.id,
                "startNode": d.startNode,
                "endNode": d.endNode,
                "startTime": d.startTime,
                "endTime": d.endTime,
            }));
            let ids = data.map(d => ({
                "id": d.id
            }));
            let i;
            for (i in ids) {
                this.state.workblocksIds[i] = ids[i].id;
            }
            i = 0;
            for (i in opcoes) {
                var startTimeHHMM = String(Math.floor(opcoes[i].startTime / 3600)).padStart(2, "0") + ":" + String(Math.floor(opcoes[i].startTime / 60) % 60).padStart(2, "0")
                var endTimeHHMM = String(Math.floor(opcoes[i].endTime / 3600)).padStart(2, "0") + ":" + String(Math.floor(opcoes[i].endTime / 60) % 60).padStart(2, "0")
                this.state.workblocksOptions[i] = "Id: " + opcoes[i].id + ", Time: " + startTimeHHMM + "-" + endTimeHHMM + ", " + opcoes[i].startNode + "-" + opcoes[i].endNode;
            }


        } catch (error) {
            console.log("error:" + error);
            this.setState({ workblocksOptions: [] });
            this.getWorkBlocks();
        }
    }

    /* Method to create Vehicles */

    createDriverDuty = async () => {
        document.getElementById("alertSuccessfully").hidden = true;
        document.getElementById("alertFailed400").hidden = true;
        document.getElementById("alertMaxTime").hidden = true;
        document.getElementById("alertFieldsMissing").hidden = true;
        console.log(this.state);
        driverDutyToPost = DriverDutyMapInstance.toDTO(this.state);
        console.log(driverDutyToPost);
        console.log("-------")
        console.log(driverDutyToPost.name)
        console.log(driverDutyToPost.color)
        console.log(driverDutyToPost.workBlocks.length)
        if (driverDutyToPost.Name === undefined || driverDutyToPost.Color === undefined || driverDutyToPost.WorkBlocks.length === 0) {
            console.log("entrou")
                
            document.getElementById("alertFieldsMissing").hidden = false;
        } else {


            try {
                let response = await axiosMDV({
                    method: "post",
                    url: "DriverDuties",

                    data: driverDutyToPost,
                });
                console.log("teste");
                if (response.status === 201) {
                    document.getElementById("alertSuccessfully").hidden = false;
                }
            } catch (error) {
                console.log(error.message);
                if (error.message.includes("400")) {
                    document.getElementById("alertFailed400").hidden = false;
                }
                if (error.message.includes("500")) {
                    document.getElementById("alertMaxTime").hidden = false;
                }
            }

            /* We reset the forms state after changes */

            document.getElementById("name").value = "";
            document.getElementById("code").value = "";

            /* We reset the state after changes */

            this.state.color = "";
            this.state.name = "";
            this.state.code = "";
        }
    };

    getDriverDuties = async () => {
        try {
            let res = await axiosMDV.get("DriverDuties");

            document.getElementById("ddutiesShowArea").value = JSON.stringify(
                res.data
            );
        } catch (error) {
            console.log("getDriverDuties SPA" + error);
        }
    };

    /* Render all JSX elements of page */

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="Tab">Create Driver Duty</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="Tab2">Retrieve Driver Duties</Nav.Link>
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
                                                    <Form.Label>Code:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Control id="code" size="sm" type="text"
                                                        placeholder="Insert code here." onChange={this.setData} />
                                                </Col>
                                            </Row>
                                            {/* Nome */}
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
                                            {/* Cor */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}>
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
                                            {/* WorkBlocks */}
                                            <Row className="miniMargem">
                                                <Col className="inputMargem" sm={1}>
                                                    <Form.Label>WorkBlocks:</Form.Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Select
                                                        id="workblocks"
                                                        options={this.state.workblocksOptions}
                                                        placeholder={this.state.labelWorkBlock}
                                                        onChange={this.handleChangeWorkBlock.bind(this)}
                                                        getOptionLabel={option => option}
                                                        getOptionValue={option => option}
                                                        isMulti>
                                                    </Select>
                                                </Col>
                                            </Row>
                                            {/* Submit e alerts */}
                                            <Button id="btnSubmit" variant="primary" onClick={this.createDriverDuty}>Submit</Button>
                                            <Row className="margem">
                                                <Alert id="alertSuccessfully" variant="success" hidden={true}>Driver Duty successfully created.</Alert>
                                                <Alert id="alertFailed400" variant="danger" hidden={true}>This name is incorrect or it already exists.</Alert>
                                                <Alert id="alertFieldsMissing" variant="danger" hidden={true}>One or more data camps are empty!</Alert>
                                                <Alert id="alertMaxTime" variant="warning" hidden={true}>The workblocks surpass 8 hours!</Alert>


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
                                                <InputGroup.Text id="linesShowAreaLabel">Driver Duties</InputGroup.Text>
                                                <textarea className="form-control" id="ddutiesShowArea" rows={5} readOnly={true} />
                                            </div>
                                        </Row>
                                        <Button variant="primary" onClick={this.getDriverDuties}>Get</Button>
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

export default DriverDuty;
