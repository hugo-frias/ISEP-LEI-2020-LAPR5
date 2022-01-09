const driverType = require('../models/driverType');
const vehicleType = require('../models/vehicleType');
const linePath = require('../models/linePath');
const LineSchema = require('../models/line');
const LineMap = require('../mappers/lineMap');
const mapInstance = new LineMap();


module.exports = class LineRepo {

    constructor(schema, driverTypeSchema, vehicleTypeSchema) {
        if (schema === undefined) {
            this.schema = LineSchema;
            this.driverTypeSchema = driverType;
            this.vehicleTypeSchema = vehicleType;
        } else {
            this.driverType = driverTypeSchema;
            this.vehicleType = vehicleTypeSchema;
            this.schema = schema;
        }
    }
    async saveLine(line, res) {
        try {
            // verifies if code is repeated
            const repeatedLine = await LineSchema.findOne({ code: line.code });
            if (repeatedLine) {
                return null;
            }
            // verifies if allowed drivers exist in the base
            if (line.allowedDrivers != undefined) {
                for (var i = 0; i < line.allowedDrivers.length; i++) {
                    const driver = await driverType.findOne({ code: line.allowedDrivers[i] })
                    if (!driver) {
                        console.log('driver doesnt exist');
                        return null;
                    }
                }
            }
            // verifies if denied drivers exist in the base
            if (line.deniedDrivers != undefined) {
                for (var i = 0; i < line.deniedDrivers.length; i++) {
                    const driver = await driverType.findOne({ code: line.deniedDrivers[i] })
                    if (!driver) {
                        console.log('driver doesnt exist');
                        return null;
                    }
                }
            }            
            // verifies if allowed drivers exist in the base
            if (line.allowedVehicles != undefined) {
                for (var i = 0; i < line.allowedVehicles.length; i++) {
                    const vehicle = await vehicleType.findOne({ code: line.allowedVehicles[i] })
                    if (!vehicle) {
                        console.log('vehicle doesnt exist');
                        return null;
                    }
                }
            }
            // verifies if allowed drivers exist in the base
            if (line.deniedVehicles != undefined) {
                for (var i = 0; i < line.deniedVehicles.length; i++) {
                    const vehicle = await vehicleType.findOne({ code: line.deniedVehicles[i] })
                    if (!vehicle) {
                        console.log('vehicle doesnt exist');
                        return null;
                    }
                }
            }

            let lineRaw = mapInstance.toPersistence(line);
            let lineSchema = new LineSchema(lineRaw);
            lineSchema.code = line.code;
            lineSchema.name = line.name;
            lineSchema.color = line.color;
            lineSchema.linePaths = line.linePaths;
            lineSchema.allowedVehicles = line.allowedVehicles;
            lineSchema.deniedVehicles = line.deniedVehicles;
            lineSchema.allowedDrivers = line.allowedDrivers;
            lineSchema.deniedDrivers = line.deniedDrivers;


            lineSchema.save();
            return line;
        } catch (error) {
            throw error;
        }

    }

    async updateLine(line, res) {
        try {
            await LineSchema.deleteOne({code: line.code});
            let lineRaw = mapInstance.toPersistence(line);
            let lineSchema = new LineSchema(lineRaw);
            lineSchema.code = line.code;
            lineSchema.name = line.name;
            lineSchema.color = line.color;
            lineSchema.linePaths = line.linePaths;
            lineSchema.allowedVehicles = line.allowedVehicles;
            lineSchema.deniedVehicles = line.deniedVehicles;
            lineSchema.allowedDrivers = line.allowedDrivers;
            lineSchema.deniedDrivers = line.deniedDrivers;
            await lineSchema.save();
            return line;
        } catch (error) {
            throw error;
        }

    }


    async getAllLines(res) {
        LineSchema.find(function (err, lines) {
            if (err)
                return res.send(err);

            return res.send(mapInstance.toDTOs(lines));
        });
    }

    async getLineByCode(code, res, value) {
        if (code == "ASC") {
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                };
                lines.sort((a, b) => (a.code > b.code) ? 1 : -1);
                return res.send(mapInstance.toDTOs(lines))
            });
        }
        if (code == "DESC") {
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                };
                lines.sort((a, b) => (a.code < b.code) ? 1 : -1);
                return res.send(mapInstance.toDTOs(lines))
            });
        } if (code.startsWith("CODE-")) {
            
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                }
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].code == value) {
                        return res.send(mapInstance.toDTO(lines[i]));
                    }
                }
                return null;

            }
            );
        }
    }


    async getLineByName(name, res, value) {
        if (name == "ASC") {
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                };
                lines.sort((a, b) => (a.name > b.name) ? 1 : -1);
                return res.send(mapInstance.toDTOs(lines))
            });
        }
        if (name == "DESC") {
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                };
                lines.sort((a, b) => (a.name < b.name) ? 1 : -1);
                return res.send(mapInstance.toDTOs(lines))
            });
        }
        if (name.startsWith("NAME-")) {
            LineSchema.find(function (err, lines) {
                if (err) {
                    return res.send(err);
                }
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].name == value) {

                        return res.send(mapInstance.toDTO(lines[i]));
                    }
                }
                return null;

            }
            );
        }
    }
    async getLineByKeyword(keyword, res) {
        var finalLines = [];
        LineSchema.find(async function (err, lines) {
            if (err) {
                return res.send(err);
            };
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].name.startsWith(keyword)) {
                    finalLines.push(lines[i]);
                }
            }
            return res.send(mapInstance.toDTOs(finalLines))
        });

    }
}
