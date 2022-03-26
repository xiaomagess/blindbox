
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const JsonConfig = require("../help/upJson");
const config = require('../constant.json');
const { deployContract } = require("ethereum-waffle");

let address0 = "0x0000000000000000000000000000000000000000";
/**
 * 部署banker 合约 
 */
async function main() {
   await deployCon();

  // let Diamonds =  await hre.ethers.getContractAt("Diamonds", config.diamonds);
  // BigNumber.config({
  //   EXPONENTIAL_AT: 100,
  //   DECIMAL_PLACES: 18,
  // })
  // let value = new BigNumber(2 * 1e18).toString();
  // await Diamonds.exchange({value:value});

  // let Box =  await hre.ethers.getContractAt("Box", config.box);
  // await Box.buyBox();
}



async function deployCon(){
  let WorkerL =  await hre.ethers.getContractAt("Diamonds", config.diamonds);
  await WorkerL.setRole(config.game);
  return;
  let  [owner, twowner,devaddr] = await hre.ethers.getSigners();
  const  Diamonds = await hre.ethers.getContractFactory("Diamonds");
  const diamonds = await Diamonds.deploy();
  await diamonds.deployed();
  console.log("diamonds deployed to:", diamonds.address);

  const  Worker = await hre.ethers.getContractFactory("Worker");
  const worker = await Worker.deploy();
  await worker.deployed();
  console.log("worker deployed to:", worker.address);


  const  Hoe = await hre.ethers.getContractFactory("Hoe");
  const  hoe = await Hoe.deploy();
  await hoe.deployed();
  console.log("hoe deployed to:", hoe.address);


  const  Box = await hre.ethers.getContractFactory("Box");
  const  box = await Box.deploy(diamonds.address,worker.address,hoe.address);
  await  box.deployed();
  console.log("box deployed to:", box.address);


  const  Game = await hre.ethers.getContractFactory("Game");
  const  game = await Game.deploy(diamonds.address,worker.address,hoe.address);
  await  game.deployed();
  console.log("game deployed to:", game.address);


  const  MarketWorker = await hre.ethers.getContractFactory("MarketWorker");
  const  marketWorker = await MarketWorker.deploy(diamonds.address,worker.address);
  await  marketWorker.deployed();
  console.log("marketWorker deployed to:", marketWorker.address);

  const  MarketHoe = await hre.ethers.getContractFactory("MarketHoe");
  const  marketHoe = await MarketHoe.deploy(diamonds.address,hoe.address);
  await  marketHoe.deployed();
  console.log("marketHoe deployed to:", marketHoe.address);



  await diamonds.setRole(box.address);
  await diamonds.setRole(marketHoe.address);
  await diamonds.setRole(marketWorker.address);
  await diamonds.setRole(game.address);

  await worker.setRole(box.address);
  await hoe.setRole(box.address);
  await worker.setRole(marketWorker.address);
  await hoe.setRole(marketHoe.address);


//   let WorkerL =  await hre.ethers.getContractAt("Worker", config.worker);
// let HoeL =  await hre.ethers.getContractAt("Hoe", config.hoe);
// await WorkerL.setRole(config.marketWorker);
// await HoeL.setRole(config.marketHoe);

  await JsonConfig.upJsonConfig({
    diamonds:diamonds.address,
    worker:worker.address,
    hoe:hoe.address,
    box:box.address,
    game:game.address,
    marketWorker:marketWorker.address,
    marketHoe:marketHoe.address
  });
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})
