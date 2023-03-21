const {spawn} = require('child_process');
const { resolve } = require('path');
function get_crop(arr) {
    return new Promise((resolve, reject) => {
      let py = spawn('python3', ['trained.py', arr])
      py.stdout.on('data', (data) => {
        mystr = data.toString()
        myjson = JSON.parse(mystr)
        resolve(myjson.Data)
      })
      py.stderr.on('data', (data) => {
        reject(data.toString())
      })
    })
  }
  

module.exports={get_crop}
