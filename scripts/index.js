const Controller_IPFS = require('./IPFS/controller_ipfs')

async function main() {
    
    const controller_ipfs = new Controller_IPFS()

    console.log('Initialising IPFS...')
    await controller_ipfs.initialise()

    console.log('Uploading to IPFS...')
    const cID = await controller_ipfs.upload('HJWChbYixcWZCQqe')

    console.log('cID =', cID)

    console.log('Downloading from IPFS...')
    const resumeText = await controller_ipfs.download(cID)

    console.log('Resume Text:', resumeText)

    console.log("Removing from IPFS... (Note, this only asks peers to delete it eventually!)")
    await controller_ipfs.remove(cID);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
