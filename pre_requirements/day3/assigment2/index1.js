import fs from 'fs';
import { Command } from 'commander';
const program = new Command();

const FILE_PATH = 'data.json';

program.name('to-do')
  .description('CLI to do file based tasks')
  .version('0.8.0');


  //read data from the file
  const readData = () => {
    if (!fs.existsSync(FILE_PATH)) return
    
const data = fs.readFileSync(FILE_PATH, 'utf8');

return JSON.parse(data);

  }


  //write data to the file

  const writeTodos = (todos) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
};





  program.command('add <task>')
  .description('Add a new to-do item')
  .action((task) => {
    const data = readData() || [];

    const newTodo = {
      id: data.length + 1,
      task: task,
      completed: false
    };


    data.push(newTodo);


    writeTodos(data);

    console.log(`Added new to-do: ${task}`);
  })

   program.command('get')
  .description('get all to-do item')
  .action(() => {
    const data = readData() || [];

    if (data.length === 0) {
      console.log('No to-do items found.');
      return;
    }


    console.log('To-do items:' , data.map(todo => `ID: ${todo.id}, Task: ${todo.task}, Completed: ${todo.completed}`).join('\n'));
  })


   program.command('edit <id> <newtask>')
  .description('edit to-do item')
  .action((id , newtask) => {

    const data = readData() || [];


    if (data.length === 0) {
      console.log('No to-do items found.');
      return;
    }


    let update = data.map(todo => {

      if (todo.id === parseInt(id)) {
        todo.task = newtask;
      }

        return todo;
    })  
    

    console.log(update);
    


    writeTodos(update);

    console.log(`edit to-do: ${id} with new task: ${newtask}`);
  })


   program.command('del <id>')
  .description('delete to-do item')
  .action((id) => {
    
    const data = readData() || [];

    const findTodo = data.find(todo => todo.id === parseInt(id));

    if (!findTodo) {
      console.log(`No to-do item found with ID: ${id}`);
      return;
    }

    const updatedTodos = data.filter(todo => todo.id !== parseInt(id));

  




    writeTodos(updatedTodos);

    console.log(`Deleted to-do item with ID: ${id}`);
    
  })



  program.parse(process.argv);