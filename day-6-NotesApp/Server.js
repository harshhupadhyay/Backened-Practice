require("dotenv").config()
const app = require("./src/app");

let port = process.env.port || 4000
app.listen(port,()=>{
  console.log('port is running');

})
