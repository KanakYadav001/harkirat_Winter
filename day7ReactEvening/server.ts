
import express from 'express'
import cors from 'cors'

import type {Request , Response} from 'express'
const app = express()

app.use(express.json())

app.use(cors())


let cources  = [
  {id : 1 , title : "web dev" , price : 400},
  {id : 2 , title : "devops" , price : 200},
]


app.get('/cources',async (req : Request,res : Response)=>{
try{


  res.status(200).json({
    message : "All Cource Fetch Sucessfully ",
    cource : cources
  })


  }catch(err){
    console.log(err);
    
    res.status(501).json({
       message : "Error While Fetching cources"
    })
  }
})



app.post('/create', async (req : Request,res : Response)=>{
  try{

    const {title , price} = req.body


    console.log(title , price)


    cources.push({
      id : Date.now(),
      title : title,
      price : price
      })




    res.status(201).json({
      message  : "New Cources Create Sucessfully",
      cources
    })

    



  }catch(err){
    console.log(err);
    
    res.status(501).json({
           message : "Error while creating the cource"
    })
  }
})



const PORT = 3004


app.listen(PORT, ()=>{
  console.log(`Server Is Running On ${PORT}`)
})