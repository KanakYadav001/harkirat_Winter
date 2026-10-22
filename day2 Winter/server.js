

import app from './src/app.js'
import  { configDotenv}  from 'dotenv';
import ConnectToDb from './src/db/db.js';
configDotenv()

ConnectToDb(()=>{
    

}).then(()=>{
app.listen(3000 , ()=>{
    console.log("Server running on 3000");
    
})
})



