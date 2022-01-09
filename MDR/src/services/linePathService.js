var LinePathRepoClass = require('../repos/linePathRepo');
var linePath = require('../domain/linePath');
const LinePathMap = require('../mappers/linePathMap');

const LinePathServiceInstance = new LinePathRepoClass();

const classInstance = new linePath();
const mapInstance = new LinePathMap();

module.exports = class LinePathService {
    constructor(newInstance) {
        if (newInstance == undefined) {
            this.repoInstance = LinePathServiceInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createLinePathService(linePathDTO) {
        try {
            const linePath = classInstance.create(linePathDTO);

            const newLinePath = await this.repoInstance.saveLinePath(linePath);
            if (newLinePath == null) {
                return null;
            }
            return mapInstance.toDTO(newLinePath);
        } catch (err) {
            throw err;
        }
    }

    async getLinePathService(req, res) {
        var filter = req.query.filter;
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
            return this.repoInstance.getAllLinePaths(res);
        }

        return res.status(400).send("Invalid filter");
    }

    async getPathsByLine(req,res){
        return await this.repoInstance.getPathsByLine(req.params.line,res);
    }
}
