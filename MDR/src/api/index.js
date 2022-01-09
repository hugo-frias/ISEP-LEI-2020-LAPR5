let driverTypes = require('./routes/driverTypeRoute');
let node = require('./routes/nodeRoute');
let line = require('./routes/lineRoute');
let linePaths = require('./routes/linePathRoute');
let { Router } = require('express');
let pathNodes = require('./routes/pathNodeRoute');
let paths = require('./routes/pathRoute');
let vehicleTypes = require('./routes/vehicleTypeRoute');
let importGLX = require('./routes/glxFileRoute');
const user = require('./routes/userRoute');

module.exports =  () => {
    const app = Router();
    driverTypes(app);
    node(app);
    line(app);
    vehicleTypes(app);
    pathNodes(app);
    paths(app);
    linePaths(app);
    importGLX(app);
    user(app);
    return app;
}