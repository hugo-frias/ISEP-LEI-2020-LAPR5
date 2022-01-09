import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Accordion, Card} from 'react-bootstrap';
import '../../App.css';

// var dotenv = require ('dotenv'); //calls .env file

// const envFound = dotenv.config(); //Loads .env file content into | process.env
// if (envFound.error) {
//   // This error should crash whole process
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }


class Terms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsavel: '',
            finalidades: '',
            dadosARecolher: ''
        }
        //this.loadTerms();
    }

    // loadTerms = async () => {
    //     // var xml = fs.readFileSync(this.state.termsFile);

    //     // var json1 = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 3 }));
    //     // this.setState({responsavel: JSON.stringify(json1.Terms.Responsaveis.Responsavel._attributes)})
    //     await fetch(file)
    //         .then(r => r.text())
    //         .then(text => {
    //             var arraySplit = text.split('----------------------------------------------');
    //             this.state.responsavel = arraySplit[0];
    //             this.state.finalidades = arraySplit[1];
    //             this.state.dadosARecolher = arraySplit[2];
    //             // console.log(this.state.responsavel);
    //             // console.log(this.state.finalidades);
    //             // console.log(this.state.dadosARecolher);
    //         });
    // }

    render() {

        return (
            <Container fluid>
                <div className="margem">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Responsável
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    O responsável pelo tratamento dos seus dados é a Team Okapi. Localizada na R. Dr. António Bernardino de Almeida 431, 4200-072 Porto e com o telefone 22 834 0500.
                                    Para mais informações, pode contactar o nosso delegado de proteção de dados através do email teamokapi@exemplo.com.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Finalidades
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    Quanto á finalidade dos dados, eles são recolhidos de modo a: permitir a utilização dos nossos serviços e proporcionar e melhorar a sua experiencia com os mesmos,
                                    para a investigação e o desenvolvimento de novos serviços e funcionalidades, para lhe enviar comunicações relevantes e personalizadas e para verificar a identidade do cliente e com isso prevenir, detetar e combater possiveis fraudes.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                Dados Recolhidos
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    As informações recolhidas são o email e a password do usuário.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Row className="margem">
                        <Link to="/Login">
                            <Button id="btnShowLogin" variant="primary" >Return to Login</Button>
                        </Link></Row>
                </div>
            </Container >
        )
    }
}

export default Terms;

