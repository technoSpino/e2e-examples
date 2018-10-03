
const fs = require('fs');

if (!process.env.SAUCE_USERNAME) {
    if (fs.existsSync('sauce.json')) {
      if(require('../sauce').username !== '' || require('../sauce').accessKey !== '') {
        process.env.SAUCE_USERNAME = require('../sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('../sauce').accessKey;
      }else{
        console.log('set your username/accesskey in the sauce.json file');
        process.exit(1);
      }
    } else {
      console.log('sauce.json does not exist');
      process.exit(1);
    }
  }

const createTestCafe = require('testcafe');
let testcafe         = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe     = tc;
        const runner = testcafe.createRunner();

        return runner
            .src(['./testcafe/todo.spec.js'])
            .browsers(['saucelabs:Chrome','saucelabs:Internet Explorer'])
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });

    

    