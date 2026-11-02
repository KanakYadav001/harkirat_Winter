//1
function greet(name) {
    console.log(`Hello ${name}`);
}
greet('kanak');
//2
function isLegal(age) {
    if (age > 18)
        return true;
    return false;
}
console.log(isLegal(21));
//3                    
function addDigit(a, b) {
    return a + b;
}
console.log(addDigit(2, 4));
//4
function delayCall(fn) {
    // setInterval(fn ,1000)
}
delayCall(function () {
    console.log("Hello Yooooo");
});
class Student {
    name;
    age;
    rollNo;
    constructor(n, a, r) {
        this.name = n;
        this.age = a;
        this.rollNo = r;
    }
}
console.log(new Student('kanak', 21, 101));
//array in typescript
function findMax(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}
console.log(findMax([1, 2, 5, 8, 99]));
//enums
var allowDirection;
(function (allowDirection) {
    allowDirection[allowDirection["up"] = 0] = "up";
    allowDirection[allowDirection["down"] = 1] = "down";
    allowDirection[allowDirection["left"] = 2] = "left";
    allowDirection[allowDirection["right"] = 3] = "right";
})(allowDirection || (allowDirection = {}));
function whichDirection(d) {
    console.log("Direction is : ", allowDirection[d]);
}
whichDirection(allowDirection.up);
//generic
function getFirstElement(arr) {
    return arr[0];
}
const result1 = getFirstElement([1, 2, 3, 4, 5]);
const result2 = getFirstElement(['a', 'b', 'c', 'd']);
console.log(result1);
console.log(result2);
export {};
//# sourceMappingURL=live.js.map