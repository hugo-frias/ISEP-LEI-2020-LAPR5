import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from '../tabs/Login'

var roleGlob = 0;
class ProtectedRoute extends React.Component {
    
    constructor(props) {
        super(props);
    }

    static setRole = (roleAux) => {
        console.log("testeProtec")
        console.log(roleAux)
        roleGlob = roleAux;
    }
    

    render() {
        const Component = this.props.component;
        const allowedUser = this.props.allowedUsers;
        const auth = allowedUser.includes(roleGlob);
        return auth ? (
            <Component />
        ) : (
                <Switch>
                    <Route path="/Login" component={Login} />
                </Switch>
            );
    }
}

export default ProtectedRoute;