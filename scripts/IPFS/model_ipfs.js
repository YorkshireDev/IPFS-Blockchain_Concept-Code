class Model_IPFS {

    constructor() {

        this.ipfs = null; // Since you can't await in a constructor you have to do a workaround...

    }

    async initialise() { // ... By calling this once somewhere before you need to utilise IPFS functions to start it up.

        if (this.ipfs !== null) return;

        async function LOAD_IPFS() {
            const { create } = await import("ipfs-core");
            return await create();
        }

        this.ipfs = await LOAD_IPFS();

    }

    async upload(resume) {

        const {cid} = await this.ipfs.add({ // To pin in IPFS it is just this.pin.add({...});
            path: "Test.TXT",
            content: resume
        });

        return cid; // cID is the unique hash that is used as the URL for IPFS

    }

    async download(cID) {

        const textDecoder = new TextDecoder();
        let resumeText = "";

        for await (const chunk of this.ipfs.cat(cID)) {
            resumeText += textDecoder.decode(chunk, {stream: true});
        };

        return resumeText; // Using the cID of the resume we can retrieve it from IPFS

    }

}

module.exports = Model_IPFS;