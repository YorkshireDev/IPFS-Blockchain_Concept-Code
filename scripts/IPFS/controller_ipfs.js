const Model_IPFS = require("./model_ipfs");

class Controller_IPFS {

    constructor() {

        this.model_ipfs = new Model_IPFS();

    }

    async initialise() {

        await this.model_ipfs.initialise();

    }

    async upload(resume) {

        return await this.model_ipfs.upload(resume);

    }

    async download(cID) {

        return await this.model_ipfs.download(cID);

    }

    async remove(cID) {

        return await this.model_ipfs.remove(cID);

    }

}

module.exports = Controller_IPFS;