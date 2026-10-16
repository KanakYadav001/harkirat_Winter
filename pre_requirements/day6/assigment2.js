

function newPromisTimeOut(ms){
    return new Promise(resolve => setTimeout(resolve , ms))
}


async function run(){
    try {
     await newPromisTimeOut(1000)
     console.log("hi");
      await newPromisTimeOut(3000)
     console.log("hello");
      await newPromisTimeOut(5000)
     console.log("hello there");

    }catch(err){
        console.log(err);
        
    }
     
}

run()