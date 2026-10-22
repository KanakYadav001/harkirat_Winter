import workSpaceModel from "../model/workspace.model.js";

import userModel from "../model/user.model.js";

import zod from "zod";


const taskValidation = zod.object({
   name : zod.string().min(3).max(20),
})



const createWorkspace = async (req,res)=>{

    try {


        const {name} = req.body;

        const validate = taskValidation.safeParse({name});


        if(!validate.success){  


            return res.status(400).json({message:validate.error.issues[0].message})

        }



        const userId = req.user;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }


        const workspace = await workSpaceModel.create({name,userId});

        res.status(201).json({message:"Workspace Created",workspace})



    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}


const getWorkspace = async (req,res)=>{
    try { 


        const userId = req.user;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }


        const workspace = await workSpaceModel.find({userId});

        res.status(200).json({message:"Workspace Found",workspace})



    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}


const deteleWorkspace = async (req,res)=>{


    try {


        const workspaceId = req.params.id;
        
        const userId = req.user;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }



        const workspace = await workSpaceModel.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({message:"Workspace Not Found"})
        }


        if(workspace.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to delete this workspace"})
        }



        await workSpaceModel.findByIdAndDelete(workspaceId);

        res.status(200).json({message:"Workspace Deleted successfully"})


    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}



export default {createWorkspace,getWorkspace,deteleWorkspace}


