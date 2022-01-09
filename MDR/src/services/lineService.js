var LineRepoClass = require('../repos/lineRepo');
var line = require('../domain/line');
const LineMap = require('../mappers/lineMap');

const LineServiceInstance = new LineRepoClass();

const classInstance = new line();
const mapInstance = new LineMap();

module.exports = class LineService {
    constructor(newInstance) {
        if (newInstance == undefined) {
            this.repoInstance = LineServiceInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createLineService(lineDTO) {
        try {
            const line = classInstance.create(lineDTO);

            const newLine = await this.repoInstance.saveLine(line);
            if (newLine == null) {
                return null;
            }
            return mapInstance.toDTO(newLine);
        } catch (err) {
            throw err;
        }
    }

    async getLineService(req, res) {
        var filter = req.query.filter;
        var value = req.query.filterValue;
        console.log(filter);
        console.log(value);
        //sem filtro - "NOFILTER"
        //linha com o código asd - CODE-ASD
        //linha com o nome asd - NAME-ASD
        //ordem alfabetica codigo - "CODEASC/CODEDESC"
        //ordem alfabetica nome - "NAMEASC/NAMEDESC"
        //contém "_" - "HAS-___"
        // ascendente = 1
        // descendente = -1
        // exato = 0
        if (filter == "NOFILTER") {
            return this.repoInstance.getAllLines(res);
        }
        if (filter.startsWith("CODE-")) {
            return this.repoInstance.getLineByCode(filter, res, value);
        }
        if (filter == "CODEASC") {
            return this.repoInstance.getLineByCode("ASC", res, value);
        }
        if (filter == "CODEDESC") {
            return this.repoInstance.getLineByCode("DESC", res, value);
        }
        if (filter.startsWith("NAME-")) {
            return this.repoInstance.getLineByName(filter, res, value);
        }
        if (filter == "NAMEASC") {
            return this.repoInstance.getLineByName("ASC", res, value);
        }
        if (filter == "NAMEDESC") {
            return this.repoInstance.getLineByName("DESC", res, value);
        }
        if (filter.startsWith("HAS")) {
            return this.repoInstance.getLineByKeyword(value, res);
        }

        return res.status(400).send("Invalid filter");
    }
    async updateLineService(lineDTO) {
        try {
            const line = classInstance.create(lineDTO);

            const newLine = await this.repoInstance.updateLine(line);
            if (newLine == null) {
                return null;
            }
            return mapInstance.toDTO(newLine);
        } catch (err) {
            throw err;
        }
    }
}
