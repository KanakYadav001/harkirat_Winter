import ToDo from "../model/todo.model.js";
import todoValidScema from "../middleware/zod.middleware.js";
import mongoose from "mongoose";

const createTodo = async (req, res) => {

    try {

        const { title, description } = req.body;

        const validationResult = todoValidScema.safeParse({ title, description });

        if (!validationResult.success) {
            return res.status(400).json({ message: "Validation Error", errors: validationResult.error.issues[0].message });
        
        }


        const newTodo = new ToDo({
            title,
            description
        });



        const savedTodo = await newTodo.save();

        res.status(201).json({ message: "ToDo created successfully", todo: savedTodo });



    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while create ToDo" });
    }
}

const getAllTodos = async (req, res) => {
     try {


        const todos = await ToDo.find();


        res.status(200).json({ message: "ToDos fetched successfully", todos });


    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetch ToDo" });
    }
}

const getTodoById = async (req, res) => {
     try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ToDo ID" });
        }


        const todo = await ToDo.findById(id);



        res.status(200).json({ message: "ToDo fetched successfully", todo });

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetch ToDo By Id" });
    }
}

const updateTodo = async (req, res) => {
     try {

        const { title, description } = req.body;

        const validationResult = todoValidScema.safeParse({ title, description });


        if (!validationResult.success) {
            return res.status(400).json({ message: "Validation Error", errors: validationResult.error.errors });
        }




        const id = req.params.id;

        const todo = await ToDo.findById(id);


        if (!todo) {
            return res.status(404).json({ message: "ToDo not found" });
        }


        if (title) todo.title = title;
        if (description) todo.description = description;

        todo.updatedAt = Date.now();

        await todo.save();


        res.status(200).json({ message: "ToDo updated successfully", todo });




    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while update ToDo" });
    }
}

const updateTodoStatus = async (req, res) => {

    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ToDo ID" });
        }

        const todo = await ToDo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "ToDo not found" });
        }


        todo.completed = !todo.completed;
        todo.updatedAt = Date.now();



        await todo.save();

        res.status(200).json({ message: "ToDo status updated successfully", todo });

        



    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while update ToDo status" });
    }

}

const deleteTodo = async (req, res) => {
    try {


        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ToDo ID" });
        }

        const todo = await ToDo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "ToDo not found" });
        }



        await ToDo.findByIdAndDelete(id);

        res.status(200).json({ message: "ToDo deleted successfully" });



    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while delete ToDo" });
    }
}




export  default { createTodo, getAllTodos, getTodoById, updateTodo, updateTodoStatus, deleteTodo };
