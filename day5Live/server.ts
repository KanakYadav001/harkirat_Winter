import app from "./src/app"
import dotenv from "dotenv"
import connectToDB from "./src/db/db"
dotenv.config();


connectToDB()

app.listen(3000, ()=>{
    console.log("Server run on 3000");
    
})

