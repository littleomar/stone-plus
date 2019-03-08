const fs = require('fs')
const path = require('path')


const res = fs.readdirSync(path.resolve(__dirname,'./dist'))

console.log(res);
