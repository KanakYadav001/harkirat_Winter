// function callBack() {
//   setTimeout(() => {
//     console.log("hi");

//     setTimeout(() => {
//       console.log("hello");

//       setTimeout(() => {
//         console.log("Helllo there");
//       }, 5000);
//     }, 3000);
//   }, 1000);
// }

// callBack();




function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve , ms))
}



setTimeoutPromisified(1000).then(function () {
    console.log('hi')
    setTimeoutPromisified(3000).then(function () {
        console.log("hello");
        
        setTimeoutPromisified(5000).then(function () {
            console.log("Helllo there");
            
        })
    })
})