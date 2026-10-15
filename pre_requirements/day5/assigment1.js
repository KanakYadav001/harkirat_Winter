


class work { 
 
    constructor(name , age , rollNo){
        this.age = age;
        this.rollNo = rollNo
        this.name = name
    }


    study(){
        console.log(this.name  + " is studying")
    }

}

class Developer extends work{ 
    constructor(name , age , rollNo){
        super(name , age , rollNo)
        this.name = name
    }


    writeCode(){
        console.log(this.name + " writing Code")
    }



 
}


class Advocator extends work{
      constructor(name , age , rollNo){
        super(name , age , rollNo);
        this.name = name
    }



    solveCase(){
      console.log(this.name + " solve a Case")
    }

}




let S1 = new Developer("kanak yadav" , 21 , 35 )

let a1 = new Advocator('vaibhav', 24  , 45)



S1.study()
S1.writeCode()


a1.solveCase()
a1.study()