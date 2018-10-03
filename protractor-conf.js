var fs = require('fs');

if (!process.env.SAUCE_USERNAME) {
    if (fs.existsSync('sauce.json')) {
      if(require('./sauce').username !== '' || require('./sauce').accessKey !== '') {
        process.env.SAUCE_USERNAME = require('./sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
      }else{
        console.log('set your username/accesskey in the sauce.json file');
        process.exit(1);
      }
    } else {
      console.log('sauce.json does not exist');
      process.exit(1);
    }
  }

exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    multiCapabilities: [
         {
          base: 'SauceLabs',
          browserName: 'chrome',
          platform: 'Windows 10'
        },
    
        {
          base: 'SauceLabs',
          browserName: 'firefox',
          platform: 'Windows 10'
        },
         {
          base: 'SauceLabs',
          browserName: 'internet explorer',
          platform: 'Windows 7',
          version: '11'
        },
    
    
    ],
    specs: ['./protractor/*.spec.js']
  };