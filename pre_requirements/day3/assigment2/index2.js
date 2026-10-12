

function transform(val){
     return val * 2 ;
}


let arr  = [1,2,3,45,5,6,7,8,9]



const convert = arr.map((val , i)=>{

    let transformData = [] ; 

 
    

    transformData.push(transform(arr[i]))

    return transformData

})



console.log(convert)






// function transform(val){
//      return val * 2 ;
// }


// let arr  = [1,2,3,45,5,6,7,8,9]



// const convert  = (()=>{
   
//  let transformData = []

// for( let i = 0 ; i < arr.length ; i++){

//     transformData.push(transform(arr[i]))

// }


// return transformData



// })



// console.log(convert())