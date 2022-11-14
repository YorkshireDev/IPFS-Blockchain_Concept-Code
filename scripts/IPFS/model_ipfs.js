const HTTPS = require("https");

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

        const {cid} = await this.ipfs.add({ // First add to IPFS, "pin" means it won't be deleted from inactivity or whatnot.
            path: "Test.TXT",
            content: resume,
            pin: true
        });

        const IPFS_PATH = "https://ipfs.io/ipfs/".concat(cid);
        await fetch(IPFS_PATH); // Wait for file to be distributed to IPFS public network (better to do this asyncronously from the GUI)

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

    async remove(cID) {

        await this.ipfs.pin.rm(cID); // Remove a pin 
        await this.ipfs.repo.gc(); // Garbage Collect Local Node
        
        // Due to the nature of decentralisation you can't "delete" a file from IPFS. You can on your local machine/node..
        // ..But obviously not to any peers hosting your file, so all you can do is unpin it which tells IPFS that this file..
        // ..Is allowed to be deleted whenever their nodes run a garbage collection, while we run our own garbage collection..
        // ..Immediately.

    }

}

module.exports = Model_IPFS;