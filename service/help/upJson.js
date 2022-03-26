const fs = require('fs');
const path = require('path');

module.exports = {
    async upJsonConfig(dataObj){
        return new Promise(function(resolve,reject){
                fs.readFile('constant.json', 'utf8', function (err, data) {
                        if (err){
                            reject(err);
                        }
                        let jsonParams =data ? JSON.parse(data) : {};
                        let jsonData = Object.assign(jsonParams,dataObj);
                        let newContent = JSON.stringify(jsonData, null, 4);
                        fs.writeFile('constant.json', newContent, 'utf8', (err) => {
                            console.log('update constant.json done');
                            resolve(data);
                        });
                    });
     })
       
    }
};

