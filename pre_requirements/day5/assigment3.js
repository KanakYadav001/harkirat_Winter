class Shape {
  constructor(color) {
    this.color = color;
  }

  showColor() {
    console.log("This shape color is ", this.color);
  }

  area() {
    throw new Error("this method not build yek devlopers still work on this");
  }
}

class Rectangle extends Shape {
  constructor(width , height , color) {
    super(color);
    this.width = width;
    this.height = height


  }


  area(){
    return this.width * this.height
  }

  
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }

  area() {
    return this.radius * this.radius * 3.14;
  }
}





let c1 = new Circle(2 , "red")

let r1 = new Rectangle(5  , 5  , "Green")



c1.showColor()
r1.showColor()





console.log(c1.area())
console.log(r1.area());
