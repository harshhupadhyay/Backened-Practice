import app from "./app/app.js";
import { connectDb } from "./config/db.config.js";


await connectDb()


app.listen(3000,()=>{
  console.log('port 3000 is wokring');

})
