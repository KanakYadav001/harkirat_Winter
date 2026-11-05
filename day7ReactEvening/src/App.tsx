import { useState , useEffect } from "react";
import "./index.css";
import { json } from "express";


export function App() {

  const [title , seTtitle] = useState<string>("")
  const [price , setPrice] = useState<number>()
  const [course , setCourse] = useState<any[]>([])


  async function GetCources(){

    const allCources = await fetch('http://localhost:3004/cources', {
       method : "GET",
       headers : {
       "Content-Type"  : "application/json"
      }

    })

    if(!allCources.ok){
      console.log("Error while fetching Cources")
      return
    }

    const data  = await allCources.json()

     setCourse(data.cource)


      
  }
  

  async function createCource(e : any){
    
     e.preventDefault();

    const response  = await fetch('http://localhost:3004/create' , { 
      headers : {
       "Content-Type"  : "application/json",
      },
      method : "POST",
      body : JSON.stringify({title :title , price : Number(price)})
    })

    if(!response.ok){
       
      console.log("Error while creating cource")
      return
    }
    seTtitle("")
    setPrice(0)


    GetCources()

    
    
  }
  
  useEffect(() => {
    
  GetCources()
    
  }, [])
  

  return (
    <div className="app">             
         

<form onSubmit={createCource}>
         <input type="text" placeholder="enter cource name" value={title} onChange={(e)=> seTtitle(e.target.value)}/>
         <input type="number" placeholder="enter cource amount" value={price} onChange={(e)=> setPrice(e.target.value)}/>
         <button type="submit" >Create Cource</button>


         
 
</form>
         {course.map((item : any , index : number)=>(
           <p key ={index}>{item.title} ${item.price}</p>
           
         ))}

    </div>
  );
}

export default App;
