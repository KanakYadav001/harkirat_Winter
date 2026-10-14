
let AutoId=  0 ;
function addToDo(){


let div  = document.getElementById('allTodos')
let inputData = document.getElementById('inputBox')



if(inputData.value ==  "" ||  inputData.value == " "){
    return ;
}

let nDiv = document.createElement('div')


nDiv.id = "Todo "+AutoId

let span  = document.createElement('span')
span.innerText = inputData.value
nDiv.appendChild(span)


let button  =  document.createElement('button')
button.innerText = 'Delete'

button.addEventListener('click' , function (){
    DeleteTodo(nDiv.id)
})

nDiv.appendChild(button)



div.appendChild(nDiv)
AutoId++
  

inputData.value = ''

}


function DeleteTodo(id){

    let todo = document.getElementById(id)

    if(todo){
        todo.remove()
    }

    

}








