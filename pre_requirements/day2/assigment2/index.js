

// function canVote(age){
//     if(age >=18){
//         console.log("Yes You Can Vote")
//     }else{
//         console.log("No You Cannot vote")
//     }
// }




// canVote(20)
// canVote(15)


// let num = 8;

// if(num %2==0){
//     console.log("Number is Even")
// }
// else{
//     console.log("Number is Odd")
// }




// let range = 5 ;

// let sum = 0 ;

// for(let   i = 0  ; i <= range ; i++){
//     sum += i;
// }


// console.log(sum)




function Greet(user){
    if(user.gender  == "male"){
        if(user.age >=18){
                console.log("Hi Mr " + user.name + " your age is " + user.age + " so you can vote.") 
        }
        else{
            console.log("Hi Mr " + user.name + " your age is " + user.age + " so you cannot vote.")
        }
        
    }
    else if(user.gender == "female"){
         if(user.age >=18){
                console.log("Hi Mrs " + user.name + " your age is " + user.age + " so you can vote.") 
        }
        else{
            console.log("Hi Mrs " + user.name + " your age is " + user.age + " so you cannot vote")
        }
       
    }
    else{
       if(user.age >=18){
                console.log("Hi Guy " + user.name + " your age is " + user.age + " so you can vote.") 
        }
        else{
            console.log("Hi Guy " + user.name + " your age is " + user.age) + " so you cannot vote"
        }
    }
}



const obj = {
    name : "kanak yadav",
    age : 22,
    gender : "male"
}


Greet(obj)



