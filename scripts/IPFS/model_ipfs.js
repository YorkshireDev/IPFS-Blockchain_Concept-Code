class Model_IPFS {

    constructor() {

        this.ipfs = null;

    }

    async INITIALISE_IPFS() {

        async function LOAD_IPFS() {
            const { create } = await import("ipfs-core");
            return await create();
        }

        this.ipfs = await LOAD_IPFS();

    }

    async upload(resume) {

        if (this.ipfs === null) { await this.INITIALISE_IPFS(); }

        const {cid} = await this.ipfs.add({
            path: "Test.TXT",
            content: resume
        });

        return cid; // cID is the unique hash that is used as the URL for IPFS

    }

    async download(cID) {

        if (this.ipfs === null) { await this.INITIALISE_IPFS(); }

        const textDecoder = new TextDecoder();
        let resumeText = "";

        for await (const chunk of this.ipfs.cat(cID)) {
            resumeText += textDecoder.decode(chunk, {stream: true});
        };

        return resumeText; // Using the cID of the resume we can retrieve it from IPFS

    }

}

module.exports = Model_IPFS;