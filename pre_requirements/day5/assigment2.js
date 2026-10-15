
class Circle {
    constructor(radius , color ){
     this.radius = radius;
     this.color = color
    }


    findRadious(){
        return this.radius * this.radius * 3.14
    }


     showColor(){
        console.log("The color of the image is " + this.color);
        
    }




}




let c1 = new Circle(2 , "red")


c1.showColor()
console.log(c1.findRadious())