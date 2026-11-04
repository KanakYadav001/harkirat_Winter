import { useState } from "react";
import "./index.css";


function GreetingCard(props){
  return (
    <div style={{border : "1px solid black" , display:"flex" , flexDirection:"column" , gap:"1rem", marginTop:"1rem" , width:"fit-content" , padding:"10px 5px"}}>
      <h1>Hello, {props.name}</h1>
      <p>Nice to meet you , {props.name} our product price is {props.price} </p>
    </div>
  )
}


export function App() {


  const [Count , setCount] = useState(0)

  const [password , setPassword] = useState(false)

  function Increment(){

    setCount((pre) => pre +1);

  }

  function Decrement(){
    setCount((pre) => pre -1)

  }






  return (
    <div className="app">
      
       <h1>{Count}</h1>
       <button onClick={Increment}>+Increment</button>
       <button onClick={Decrement}>-Decrement</button>

<br></br>

    <input type={password ? "text" : "password"} placeholder="enter you password"   />

    <button onClick={()=>setPassword(!password)} >{password ? "Hide" : "Show"}</button>




    <GreetingCard name ="kanak" price={40} />
    <GreetingCard name="vaibhav" price={50}   />
      <GreetingCard name ="manthan" price={60} />
    <GreetingCard name="gurushan" price={60}   />
    
        
     
    </div>
  );
}

export default App;
