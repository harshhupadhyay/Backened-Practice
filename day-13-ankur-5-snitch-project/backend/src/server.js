import app from "./app/app.js";
import connectionDb from "./config/db.js";
await connectionDb()

app.listen(3000,()=>{
  console.log("port 3000 is listening......");

})

