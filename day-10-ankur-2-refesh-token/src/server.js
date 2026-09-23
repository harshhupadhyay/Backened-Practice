import app from "./app/app.js";
import conncetDb from "./config/db.config.js";

await conncetDb()

app.listen(3000,(req,res)=>{
  console.log("port 300 is running");
})
