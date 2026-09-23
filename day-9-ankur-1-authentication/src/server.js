
import app from "./app/app.js";
import dBConnect from "./config/db.config.js";


await dBConnect()

app.listen(3000,()=>{
  console.log('server is running');

})
