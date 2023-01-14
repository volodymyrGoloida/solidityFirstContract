// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  process.env.PNEUMONIC,
  process.env.PROVIDER_URL
);

const web3 = new Web3(provider);
deploy();
async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  console.log("Attempting to deploy from account", accounts[0]);

  const { options } = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({
      gas: "1000000",
      from: accounts[0],
    });
  console.log("Contract deploy to ", options.address);
  provider.engine.stop();
}
