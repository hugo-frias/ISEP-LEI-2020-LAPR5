import React, { Component } from 'react';
import { Navbar, Row, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute'

import Node from '../tabs/Node';
import Line from '../tabs/Line';
import LinePath from '../tabs/LinePath';
import Path from '../tabs/Path';
import VehicleType from '../tabs/VehicleType';
import DriverType from '../tabs/DriverType';
import PathNode from '../tabs/PathNode';
import Trip from '../tabs/Trip';
import ListTrips from '../tabs/ListTrips';
import WorkBlock from '../tabs/WorkBlock';
import Map from '../tabs/Map';
import GLX from '../tabs/GLX';
import Driver from '../tabs/Driver';
import Vehicle from '../tabs/Vehicle';
import VehicleDuty from '../tabs/VehicleDuty';
import Login from '../tabs/Login';
import Terms from '../tabs/Terms';
import DeleteAccount from '../tabs/DeleteAccount';
import Planning from '../tabs/Planning';
import DriverDuty from '../tabs/DriverDuty';

var roleGlobal = 0;

class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: '',
      userEmail: '',
      userPassword: '',
      role: 0
    }
  }
  /* Generic set Data method - updates state params */

  setData = ({ target: { id, value } }) => {
    this.setState({ [id]: value });

  };
  static getRoleGlobal = () => {
    return roleGlobal;
  }

  static setRoleGlobal = (role) => {
    roleGlobal = role;
  }

  static loadButtons = (role, email, password) => {
    ProtectedRoute.setRole(0);
    // document.getElementById("btnMap").hidden = true;
    // document.getElementById("btnNodes").hidden = true;
    // document.getElementById("btnLines").hidden = true;
    // document.getElementById("btnPaths").hidden = true;
    // document.getElementById("btnDriverTypes").hidden = true;
    // document.getElementById("btnVehicleTypes").hidden = true;
    // document.getElementById("btnLinePaths").hidden = true;
    // document.getElementById("btnDrivers").hidden = true;
    // document.getElementById("btnVehicles").hidden = true;
    // document.getElementById("btnTrips").hidden = true;
    // document.getElementById("btnPathNodes").hidden = true;
    // document.getElementById("btnVehicleDuty").hidden = true;
    // document.getElementById("btnWorkBlocks").hidden = true;
    // document.getElementById("btnGLX").hidden = true;
    // document.getElementById("btnPlanning").hidden = true;
    // document.getElementById("btnListTrips").hidden = true;

    
    if (role === "GESTOR") {
      document.getElementById("btnMap").hidden = false;
      document.getElementById("btnPlanning").hidden = false;
      ProtectedRoute.setRole(1);
      roleGlobal = 1;
    }
    if (role === "DATADM") {
      document.getElementById("btnNodes").hidden = false;
      document.getElementById("btnLines").hidden = false;
      document.getElementById("btnPaths").hidden = false;
      document.getElementById("btnDriverTypes").hidden = false;
      document.getElementById("btnVehicleTypes").hidden = false;
      document.getElementById("btnLinePaths").hidden = false;
      document.getElementById("btnDrivers").hidden = false;
      document.getElementById("btnVehicles").hidden = false;
      document.getElementById("btnTrips").hidden = false;
      document.getElementById("btnListTrips").hidden = false;
      document.getElementById("btnPathNodes").hidden = false;
      document.getElementById("btnVehicleDuty").hidden = false;
      document.getElementById("btnDriverDuty").hidden = false;
      document.getElementById("btnWorkBlocks").hidden = false;
      document.getElementById("btnGLX").hidden = false;
      ProtectedRoute.setRole(2);
      console.log(roleGlobal+"-sdasd");
      roleGlobal = 2;
    }
    if (role === "CLIENTE") {
      document.getElementById("btnMap").hidden = false;
      document.getElementById("btnListTrips").hidden = false;
      ProtectedRoute.setRole(3);
      roleGlobal = 3;
    }

    document.getElementById("btnLogin").hidden = true;
    document.getElementById("btnLogout").hidden = false;
    // if(role === "CLIENTE") {
    //   document.getElementById("btnMap").hidden = false;
    //   document.getElementById("btnListTrips").hidden = false;
    // }
    // document.getElementById("btnLogin").hidden = true;
  };

  logout = () => {
    document.getElementById("btnNodes").hidden = true;
    document.getElementById("btnLines").hidden = true;
    document.getElementById("btnPaths").hidden = true;
    document.getElementById("btnDriverTypes").hidden = true;
    document.getElementById("btnVehicleTypes").hidden = true;
    document.getElementById("btnLinePaths").hidden = true;
    document.getElementById("btnDrivers").hidden = true;
    document.getElementById("btnVehicles").hidden = true;
    document.getElementById("btnTrips").hidden = true;
    document.getElementById("btnPathNodes").hidden = true;
    document.getElementById("btnVehicleDuty").hidden = true;
    document.getElementById("btnDriverDuty").hidden = true;
    document.getElementById("btnWorkBlocks").hidden = true;
    document.getElementById("btnGLX").hidden = true;
    document.getElementById("btnMap").hidden = true;
    document.getElementById("btnPlanning").hidden = true;
    document.getElementById("btnLogin").hidden = false;
    document.getElementById("btnLogout").hidden = true;
    document.getElementById("btnListTrips").hidden = true;
    ProtectedRoute.setRole(0);

  }


  render() {
    return (

        <Router>


          <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand to="/">App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div>
                <Link to="/Nodes">
                  <Button id="btnNodes" variant="light" hidden={true}>Nodes</Button>
                </Link>
                <Link to="/Lines">
                  <Button id="btnLines" variant="light" hidden={true}>Lines</Button>
                </Link>
                <Link to="/DriverTypes">
                  <Button id="btnDriverTypes" variant="light" hidden={true}>Driver Types</Button>
                </Link>
                <Link to="/VehicleTypes">
                  <Button id="btnVehicleTypes" variant="light" hidden={true}>Vehicle Types</Button>
                </Link>
                <Link to="/LinePaths">
                  <Button id="btnLinePaths" variant="light" hidden={true}>Line Paths</Button>
                </Link>
                <Link to="/Paths">
                  <Button id="btnPaths" variant="light" hidden={true}>Paths</Button>
                </Link>
                <Link to="/Map">
                  <Button id="btnMap" variant="light" hidden={true}>Map</Button>
                </Link>
                <Link to="/PathNodes">
                  <Button id="btnPathNodes" variant="light" hidden={true}>Path Nodes</Button>
                </Link>
                <Link to="/Drivers">
                  <Button id="btnDrivers" variant="light" hidden={true}>Drivers</Button>
                </Link>
                <Link to="/Vehicles">
                  <Button id="btnVehicles" variant="light" hidden={true}>Vehicles</Button>
                </Link>
                <Link to="/Trips">
                  <Button id="btnTrips" variant="light" hidden={true}>Trips</Button>
                </Link>
                <Link to="/ListTrips">
                  <Button id="btnListTrips" variant="light" hidden={true}>List Trips</Button>
                </Link>
                <Link to="/VehicleDuty">
                  <Button id="btnVehicleDuty" variant="light" hidden={true}>Vehicle Duties</Button>
                </Link>
                <Link to="/DriverDuty">
                  <Button id="btnDriverDuty" variant="light" hidden={true}>Driver Duties</Button>
                </Link>
                <Link to="/WorkBlocks">
                  <Button id="btnWorkBlocks" variant="light" hidden={true}>Work Blocks</Button>
                </Link>
                <Link to="/importGLX">
                  <Button id="btnGLX" variant="light" hidden={true}>Import GLX</Button>
                </Link>
                <Link to="/Login">
                  <Button id="btnLogin" variant="light">Login</Button>
                </Link>
                <Link to="/Planning">
                  <Button id="btnPlanning" variant="light" hidden={true}>Planning</Button>
                </Link>
                <Link to="/Logout">
                  <Button id="btnLogout" variant="light" hidden={true} onClick={this.logout}>Logout</Button>
                </Link>
                {/* <Link to="/Teste">
                <Button id="btnTeste" variant="light" hidden={true} onClick={console.log(roleGlobal)}>Teste</Button>
              </Link> */}
              </div>
            </Navbar.Collapse>

          </Navbar>
          <Switch>

            {/*
          <Route path="/Nodes" component={Node} />
          <Route path="/Lines" component={Line} />
          <Route path="/LinePaths" component={LinePath} />
          <Route path="/Paths" component={Path} />
          <Route path="/DriverTypes" component={DriverType} />
          <Route path="/VehicleTypes" component={VehicleType} />
          <Route path="/PathNodes" component={PathNode} />
          <Route path="/Drivers" component={Driver} />
          <Route path="/Vehicles" component={Vehicle} />
          <Route path="/Trips" component={Trip} />
          <Route path="/Planning" component={Planning} /> */}
            {/*roles de gestor*/}
            {/* <ProtectedRoute auth={roleGlobal} allowedUsers={[1]} path="/Teste" component={Teste} /> */}
            <ProtectedRoute auth={roleGlobal} allowedUsers={[1]} path="/Planning" component={Planning} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[1,3]} path="/Map" component={Map} />



            {/*roles de data adm*/}

            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/DriverDuty" component={DriverDuty} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/VehicleDuty" component={VehicleDuty} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/WorkBlocks" component={WorkBlock} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/importGLX" component={GLX} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Trips" component={Trip} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2,3]} path="/ListTrips" component={ListTrips} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Vehicles" component={Vehicle} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Drivers" component={Driver} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/PathNodes" component={PathNode} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/VehicleTypes" component={VehicleType} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Nodes" component={Node} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Lines" component={Line} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/LinePaths" component={LinePath} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/Paths" component={Path} />
            <ProtectedRoute auth={roleGlobal} allowedUsers={[2]} path="/DriverTypes" component={DriverType} />

            {/* <Route path="/DriverDuty" component={DriverDuty} />
          <Route path="/VehicleDuty" component={VehicleDuty} />
          <Route path="/WorkBlocks" component={WorkBlock} />
          <Route path="/Map" component={Map} />
          <Route path="/importGLX" component={GLX} /> */}

            <Route path="/Login" component={Login} />
            <Route path="/Terms" component={Terms} />
            <Route path="/DeleteAccount" component={DeleteAccount} />
            {/* <Route path="/Teste" component={Teste} /> */}
          </Switch>
          <Row>
          </Row>

        </Router >


    );

  }

}


export default NavigationBar;