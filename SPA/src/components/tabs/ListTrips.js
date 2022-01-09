import React, { Component } from 'react';
import {Form, Container, Row, Button, Col, InputGroup} from 'react-bootstrap';
import '../../App.css'
import Select from "react-select";
const TripMapClass = require('../mappers/TripMap');
const tripMapInstance = new TripMapClass();

let tripsToShow = 'Trips will appear here...';
let { axiosMDV, axiosMDR } = require('../core/URLConfiguration');

class ListTrips extends Component {

    /* Controls the State */

    constructor(props) {
        super(props);
        this.state = {
            labelLine: 'Select Line Here',
            Line1: '',
            linesOptions: []
        };
        this.getLines().then(r => console.log('' + r));
    }

    /*Get Lines*/

    getLines = async () => {

        try {
            let res = await axiosMDR({
                method: 'get',
                url: 'line',
                params: {
                    filter: "NOFILTER"
                }
            });
            let data = res.data;
            let opcoes = data.map(d => ({
                "line": d
            }));
            for (let i in opcoes) {
                this.state.linesOptions[i] = opcoes[i].line.name
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    /* Retrieves all the Trips from one single Line */

    getTripsFromLine = async () => {

        try {

            if (this.state.Line1 !== '') {

                let aux = "Trips/FromLine/" + this.state.Line1;

                let response = await axiosMDV({
                    method: 'get',
                    url: aux
                });

                /* We update the TextArea value */

                let tripsDTO = tripMapInstance.toDTOs(response.data);

                if(tripsDTO === undefined) {
                    document.getElementById("tripsShowArea").value = "Error retrieving Trips. Couldn't read the correct line. Please select line again.";
                } else {
                    document.getElementById("tripsShowArea").value = JSON.stringify(tripsDTO);
                }

                /* We reset the forms state after changes */

                document.getElementById('Line1').value = null;

                /* We reset the state after changes */

                this.setState({labelLine: 'Select Line Here'});
                this.state.Line1 = '';
            } else {
                document.getElementById("tripsShowArea").value = "Error retrieving Trips. Couldn't read the correct line. Please select line again.";
            }

        } catch (error) {
            console.log("getTripsFromLine, Trip.js SPA" + error);
            document.getElementById("tripsShowArea").value = "Error retrieving Trips. Couldn't read the correct line. Please select line again.";
        }
    }

    /* Handle the change of the line */

    handleChangeLine1(e) {
        this.setState({Line1: e});
        this.setState({labelLine: e});
    }
    /* Render all JSX elements of page */

    render() {
        return (
            <Container fluid>
                <div className="margem">
                    <Form>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label>Line:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Select
                                    id="Line1"
                                    options={this.state.linesOptions}
                                    placeholder={this.state.labelLine}
                                    onChange={this.handleChangeLine1.bind(this)}
                                    getOptionLabel={option => option}
                                    getOptionValue={option => option}
                                >
                                </Select>
                            </Col>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={9}>
                                <div className="input-group">
                                    <InputGroup.Text id="tripsShowAreaLabel">Trips</InputGroup.Text>
                                    <textarea className="form-control" id="tripsShowArea" rows={5} readOnly={true} defaultValue={tripsToShow}/>
                                </div>
                            </Col>
                        </Row>

                        <Button variant="primary" onClick={this.getTripsFromLine}>Get Trips</Button>

                    </Form>
                </div>
            </Container>
        )
    }

}

export default ListTrips;