var paramsDir = process.env.OPENSHIFT_DATA_DIR || '..';
var parameters = require(paramsDir + '/parameters.json');

module.exports = parameters;
