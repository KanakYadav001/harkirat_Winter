
//1
function greet(name : String){
    console.log(`Hello ${name}`)


}      
greet('kanak')



//2
function isLegal( age : number):Boolean{
    if(age > 18) return true
     return false
    
}
console.log(isLegal(21))


//3                    
function addDigit(a :number, b:number):number {

    return a + b
}
console.log(addDigit(2, 4));



//4
function delayCall(fn:()=>void){
    // setInterval(fn ,1000)
}


delayCall(function(){
    console.log("Hello Yooooo");
    
})



//Interface vs type

interface User {
   name: String,
   age : number,
   rollNo : number

}


class Student implements User{
   name: string;
   age : number;
   rollNo : number;

   constructor(n :string, a:number ,r:number){
    this.name = n;
    this.age = a;
    this.rollNo = r
   }
}

console.log(new Student('kanak', 21 , 101));


//array in typescript
function findMax(arr:number[]):number | undefined{
    let max =  0 ;
   for(let i=0 ; i< arr.length ; i++){
    
       if(max< arr[i]){
        max = arr[i] 
       }
   }

   return max
}



console.log(findMax([1,2,5,8,99]));



//enums

enum allowDirection{
    "up",
    "down",
    "left",
    "right"
}


function whichDirection(d:allowDirection):void{
    console.log("Direction is : ", allowDirection[d])
}


whichDirection(allowDirection.up)


//generic


function getFirstElement<T>(arr:T[]):T | undefined{
      return arr[0]
}


const result1  =getFirstElement<number>([1,2,3,4,5])
const result2 =getFirstElement<string>(['a', 'b','c','d'])

console.log(result1);
console.log(result2);