const { resolve } = require('dns')
const fs  = require('fs')


// function cleanFile(fileN , cb ){

//      fs.readFile(fileN , "utf-8" , function (err , data){
//       let cleanContent = data.trim()

//      fs.writeFile(fileN ,  cleanContent  , function(){
//         cb()
//      })
//      })
    

// }

// function done(){
//    console.log("File Read Done");
   
// }



// cleanFile("a.txt" , done)





function cleanFile(fName){
    return new Promise(function(resolve){

        fs.readFile(fName , 'utf-8' , function(err ,content){
   
           let data  = content.trim()

           fs.writeFile(fName , data , function () {
            resolve(data)
           })
        })
    })
}



async function main(){
    const data =  await cleanFile('a.txt')
    console.log("File Clean Sucessfully   \ncontent is : " ,  data);
    
}


main()
