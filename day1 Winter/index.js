// const fs = require('fs');

// function editFile(path , callBack ){

//     fs.readFile(path , 'utf-8' , (err ,data)=>{
//        if(err){
//         console.log("Error While Reading The File");

//        }

//        else {

//         console.log(data)

//          fs.writeFile(path , data.toUpperCase() ,(err)=>{
//                  if(err){
//                    console.log("Error white writing the file");

//                  }else{
//                     callBack()
//                  }
//          })

//        }
//     })
// }

// editFile("a.txt", function (){
//     console.log("File Edit Sucerssfully");

// })

// const fs = require('fs')

// function editFileWithTime(n , m , path , callBack){

//     fs.readFile(path , 'utf-8' ,(err , data)=>{
//         if(err){
//             console.log("Error Come file Read The File");

//         }else {
//             console.log(data);

//             setTimeout(()=>{

//                 fs.writeFile(path , data.toUpperCase() , (err)=>{

//                     setTimeout(()=>{
//                         if(err){
//                             console.log("Error while write the file");

//                         }else{
//                             callBack()
//                         }
//                     } , m)

//                 })

//             } , n)
//         }
//     })

// }

// editFileWithTime(5000 , 5000 ,"a.txt" ,  ()=>{
//    console.log("File Edit Sucessfully");

// })

// const fs = require("fs");

// function createFileAndEdit(file, callBack) {
//   let count = 0;
//   fs.readFile(file, "utf-8", (err, data) => {
//     if (err) {
//       console.log("Error White Reading The File",err);
//     }else {
//       let  parseData = JSON.parse(data);
//       let arrLength = parseData.length
//       console.log(arrLength);
      
      


//      parseData.forEach(element => {

//        const content =
//         typeof element.content === "string"
//           ? element.content
//           : JSON.stringify(element.content, null, 2);

//         fs.writeFile(element.path, content, (err) => {
//           if (err) {
//             console.log("Error while writing the file",err);
//           } else {
//             count++;
//             if (count == arrLength) {
//               callBack();
//             }
//           }


//         });
//      });
        
        

//     }
//   });
// }

// createFileAndEdit("a.txt" , ()=>{
//   console.log("Alll File Write Content Done");
  
// });



const fs  = require('fs')



function readFileAndWrite(file , callBack){
  let count  = 0  ;
  fs.readFile(file , 'utf-8' , (err , data)=>{
    if(err){
      console.log("Error while reading the file" , err);
      
    }
    else{


      let jsonData = JSON.parse(data)
      let fileLength  = jsonData.length
    

      jsonData.forEach(element => {
        
        const content = typeof element.content== "string" ? element.content : JSON.stringify(element.content , null , 2)


        fs.writeFile(element.path , content , (err)=>{
          if(err) {
            console.log("Error while writing the file");
            
          }else{
            count++;
            if(count == fileLength  ){
                     
              callBack()
            }
          }
        })

      });
       

    }
  })
}


readFileAndWrite('a.txt' , () => {
  console.log("All File Read Sucessfully");
  
})