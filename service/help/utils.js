const hre = require("hardhat");
const { utils } = require("ethers");

module.exports = {
    // async  sleep() {
    //     return new Promise(function (res, rej) {
    //         setTimeout(() => {
    //             res()
    //         }, 0)
    //     })
    // },
    
    async sleep(duration=500) {
        return new Promise(resolve => {
            setTimeout(resolve, duration);
        })
     },


   addZero (_p, _l) {
         let rel = _p + new Array(_l).fill(0).join('');
        return rel;
    }
  
};
  