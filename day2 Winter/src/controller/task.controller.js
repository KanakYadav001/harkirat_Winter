
import task from "../model/task.model.js";
import workSpaceModel from "../model/workspace.model.js";
import mongoose from "mongoose";

import zod from "zod";


const taskValidation = zod.object({
   title : zod.string().min(3).max(50),
   description : zod.string().min(3).max(100)
})


const createTask = async (req,res)=>{

    try { 

        const {title,description,workspace,dueDate} = req.body;



        const validate = taskValidation.safeParse({title,description});


        if (!mongoose.Types.ObjectId.isValid(workspace)) {
            return res.status(400).json({ message: "Invalid workspace ID" });
        }

        if(!validate.success){
            return res.status(400).json({message:validate.error.issues[0].message})
        }

        const userId = req.user;

        const workspaceData = await workSpaceModel.findById(workspace);

        if(!workspaceData){
            return res.status(404).json({message:"Workspace Not Found"})
        }

        if(workspaceData.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to create task in this workspace"})
        }


        const [day, month, year] = dueDate.split("/").map(Number);

         const parsedDate = new Date(year, month - 1, day);


         //date not in past
        const currentDate = new Date();

        if (parsedDate < currentDate) {
            return res.status(400).json({ message: "Due date cannot be in the past" });
        }

        const newTask = await task.create({title,description,workspace,dueDate:parsedDate});

        res.status(201).json({message:"Task Created",task:newTask})



    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error while creating task"})
    }

}
const getTask = async (req,res)=>{
    try {   


        const userId = req.user;


        const {search} = req.query;
        const {id} = req.params;


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid workSpace Id"})
        }


        const workspaceData = await workSpaceModel.findById(id);

        if(!workspaceData){
            return res.status(404).json({message:"Workspace Not Found"})
        }



        if(workspaceData.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to get task in this workspace"})
        }



        const tasks = await task.find({ title :{ $regex: search, $options: "i" } ,  workspace:id}).sort({ createdAt: -1 }).limit(10)

        res.status(200).json({message:"Task Found",tasks})




    }catch(error){
        res.status(500).json({message:"Error while getting task"})
    }
}
const updateTask = async (req,res)=>{

    try {

        const {title,description,completed,dueDate} = req.body;

        const userId = req.user;


        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid task Id"})
        }


        const taskData = await task.findById(id);

        if(!taskData){
            return res.status(404).json({message:"Task Not Found"})
        }


        const workspaceData = await workSpaceModel.findById(taskData.workspace);

        if(!workspaceData){
            return res.status(404).json({message:"Workspace Not Found"})
        }


        if(workspaceData.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to update task in this workspace"})
        }



        if(title) taskData.title = title;
        if(description) taskData.description = description;
        if(completed !== undefined) taskData.completed = completed;
        if(dueDate) {
            const [year , month  , day] = dueDate.split("/").map(Number);
            const parsedDate = new Date(year, month-1, day+1);
            taskData.dueDate = parsedDate;
        }



        await taskData.save();


        res.status(200).json({message:"Task Updated",task:taskData})
          







    }catch(error){
        res.status(500).json({message:"Error while updating task"})
    }
}
const deleteTask = async (req,res)=>{
    try {


        const userId = req.user;

        const {id} = req.params;


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid task Id"})
        }


        const taskData = await task.findById(id);

        if(!taskData){
            return res.status(404).json({message:"Task Not Found"})
        }



     const workspaceData = await workSpaceModel.findById(taskData.workspace);

        if(!workspaceData){
            return res.status(404).json({message:"Workspace Not Found"})
        }


        if(workspaceData.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to delete task in this workspace"})
        }




     await taskData.deleteOne();

        res.status(200).json({message:"Task Deleted"})




    }catch(error){

        console.log(error)
        res.status(500).json({message:"Error while deleting task"})
    }

}





export default {createTask,getTask,updateTask,deleteTask}