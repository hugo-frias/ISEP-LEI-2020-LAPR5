import React, { Component } from 'react';
import { Alert, Form, Container, Row, Col, Button } from 'react-bootstrap';
import '../../App.css';
import Select from 'react-select';

var { axiosMDR } = require('../core/URLConfiguration');
class LinePath extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            path: '',
            orientation: 'Go',
            line: '',
            lines: [],
            optionsPaths: [],
            optionsLines: [],
            codesAux: [],
            filterType: "NOFILTER"
        };
        this.getCodes();
        this.getPaths();
        this.getLines();
    }
    getCodes = async () => {
        try {
            let res = await axiosMDR({
                method: 'get',
                url: 'linePath',
                params: {
                    filter: this.state.filterType
                }
            });
            let data = res.data;
            let opcoes = data.map(d => ({
                "code": d.code
            }));
            for (var i in opcoes) {
                this.state.codesAux[i] = opcoes[i].code
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    getPaths = async () => {
        try {
            let res = await axiosMDR.get('path');
            let data = res.data;
            let opcoes = data.map(d => ({
                "code": d.code
            }));
            for (var i in opcoes) {
                this.state.optionsPaths[i] = opcoes[i].code
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }

    updateLine = async () => {
        var updatedLine;
        for (var i = 0; i < this.state.lines.length; i++) {
            if (this.state.line === this.state.lines[i].name) {
                updatedLine = this.state.lines[i];
            }
        }
        for (var linePath in updatedLine.linePaths) {
            if (linePath === this.state.code) {
                return false;
            }
        }
        updatedLine.linePaths.push(this.state.code);
        try {
            await axiosMDR.put('line', {
                code: updatedLine.code,
                name: updatedLine.name,
                color: updatedLine.color,
                linePaths: updatedLine.linePaths,
                allowedVehicles: updatedLine.allowedVehicles,
                deniedVehicles: updatedLine.deniedVehicles,
                allowedDrivers: updatedLine.allowedDrivers,
                deniedDrivers: updatedLine.deniedDrivers

            }).then(response => {
                console.log(response)
            })
        } catch (error) {
            console.log("error:" + error);
        }
    }

    getLines = async () => {
        try {
            let res = await axiosMDR({
                method: 'get',
                url: 'line',
                params: {
                    filter: this.state.filterType
                }
            });
            let data = res.data;
            let opcoes = data.map(d => ({
                "line": d
            }));
            for (var i in opcoes) {
                this.state.optionsLines[i] = opcoes[i].line.name
                this.state.lines[i] = opcoes[i].line;
            }
        } catch (error) {
            console.log("error:" + error);
        }
    }
    optionChangedPath = value => {
        this.setState({ path: value })
    }

    optionChangedLine = value => {
        console.log(value);
        this.setState({ line: value })
    }

    setCode = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    setPath = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    };

    setOrientacao = () => {
        this.setState({orientation : document.getElementById("orientacao").value});
    };

    checkValidity = () => {
        if (this.state.code === '') {
            document.getElementById("alertMau").hidden = false;
            return false;
        }
        document.getElementById("alertBom").hidden = true;
        document.getElementById("alertMau").hidden = true;
        for (var i in this.state.codesAux) {
            if (this.state.codesAux[i] === this.state.code) {
                document.getElementById("alertMau").hidden = false;
                return false;
            }
        }
        document.getElementById("botaoSubmit").hidden = false;
        document.getElementById("alertBom").hidden = false;
        document.getElementById("checkPath").hidden = true;
        document.getElementById("code").disabled = true;
        document.getElementById("alertSubmitSuc").hidden = true;
        return true;
    }



    createLinePath = async () => {
        try {
            let resp = await axiosMDR({
                method: 'post',
                url: 'linePath',
                data: {
                    code: this.state.code,
                    path: this.state.path,
                    orientation: this.state.orientation
                }
            });
            if (resp.status === 201) {
                this.updateLine();
                this.state.codesAux.push(this.state.code);
                this.state.code = "";
                this.state.path = "";
                document.getElementById("code").value = "";
                document.getElementById("path").value = "";
                document.getElementById("alertSubmitSuc").hidden = false;
            } else {
                document.getElementById("alertSubmitFail").hidden = false;
            }
        } catch {
            document.getElementById("alertSubmitFail").hidden = false;
        } finally {
            document.getElementById("botaoSubmit").hidden = true;
            document.getElementById("checkPath").hidden = false;
            document.getElementById("code").disabled = false;
        }

    }

    render() {
        return (
            <Container fluid>
                <div className="margem">
                    <Form>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label>Code:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Form.Control id="code" type="text" placeholder="Insert code here" onChange={this.setCode} />
                            </Col>
                            <Col sm={5}>
                                <Button id="checkPath" variant="primary" onClick={this.checkValidity} >Check Code</Button>
                            </Col>
                        </Row >
                        <Row className="miniMargem">
                            <Alert id="alertBom" variant="success" hidden="true">Code válido!</Alert>
                            <Alert id="alertMau" variant="danger" hidden="true">Code inválido!</Alert>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label>Path:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Select
                                    id="path"
                                    options={this.state.optionsPaths}
                                    placeholder="Select the path here"
                                    value={this.state.path}
                                    onChange={this.optionChangedPath}
                                    getOptionLabel={option => option}
                                    getOptionValue={option => option}>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={1}><Form.Label>Orientation:</Form.Label></Col>
                            <Col sm={3}>
                                <Form.Control id="orientacao" as="select" custom onChange={this.setOrientacao}>
                                    <option value="Go">Go</option>
                                    <option value="Return">Return</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row className="miniMargem">
                            <Col sm={1}>
                                <Form.Label>Line:</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Select
                                    id="line"
                                    options={this.state.optionsLines}
                                    placeholder="Select the line here"
                                    value={this.state.line}
                                    onChange={this.optionChangedLine}
                                    getOptionLabel={option => option}
                                    getOptionValue={option => option}>
                                </Select>
                            </Col>
                        </Row>
                        <Button id="botaoSubmit" variant="primary" hidden="true" onClick={this.createLinePath}>Add to Line</Button>
                        <Row className="miniMargem">
                            <Alert id="alertSubmitSuc" variant="success" hidden="true">Line Path criado com sucesso!</Alert>
                            <Alert id="alertSubmitFail" variant="danger" hidden="true">Erro ao criar Line Path!</Alert>
                        </Row>
                    </Form>

                </div>
            </Container>


        );
    }
}

export default LinePath;