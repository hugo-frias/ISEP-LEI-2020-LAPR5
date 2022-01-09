const GLXFileController = require('../../controllers/glxFileController');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const router = Router();

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "FILE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("glx");

module.exports = (app) => {

    // Creates a new route related to driver types
    app.use('/importGLX', router);

    //register one driver type
    router.post('', function (req, res, next) {

        upload(req, res, (err) => {
            /*Now do where ever you want to do*/
            // Calls the controller function
            const controllerInstance = new GLXFileController();
            controllerInstance.importGLX(req, res, next);
        });
    });

}