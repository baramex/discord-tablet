const path = require("path");
const AbstractApplication = require("../AbstractApplication");
const { IMAGES_DIR } = require("../Util");

module.exports = class TestApplication extends AbstractApplication {
    constructor(options) {
        super('Test', path.join(IMAGES_DIR, 'test.png'), options);
    };
};