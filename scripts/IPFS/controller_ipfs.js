const Model_IPFS = require("./model_ipfs");

class Controller_IPFS {

    constructor() {

        this.model_ipfs = new Model_IPFS();

    }

    async upload(resume) {

        return await this.model_ipfs.upload(resume);

    }

    async download(cID) {

        return await this.model_ipfs.download(cID);

    }

}

module.exports = Controller_IPFS;