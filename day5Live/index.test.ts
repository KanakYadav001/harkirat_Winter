import {test , expect} from "bun:test"
import axios from "axios";

const BACKEND_URL = "http://localhost:3000"

test("if username is small, the sigup" , async()=>{

    try {

        const response  = await axios.post(`${BACKEND_URL}/signup` , {
            username :"a",
            password : "kanakabc@123"
        })


    



    }catch(err){
        
    }
})