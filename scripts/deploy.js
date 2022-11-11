const { ethers } = require("hardhat");

async function main() {

    const Resume = await ethers.getContractFactory("Resume");

    console.log("Deploying Resume...");

    const resume = await Resume.deploy();
    await resume.deployed();

    console.log("Resume Deployed To:", resume.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });