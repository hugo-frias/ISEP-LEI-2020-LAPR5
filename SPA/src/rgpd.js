var convert = require('xml-js');
const util = require('util');

var xml = require('fs').readFileSync('1.xml', 'utf-8');

let nodeVec = [] ; let i = 0; let nodeString; let nodeJSON;
var json1 = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 3 }));
console.log(json1.Terms.Responsaveis.Responsavel._attributes);