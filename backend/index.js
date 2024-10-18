import dotenv from "dotenv";
import connectDB from "./src/db/dbconnection.js";
import {app } from "./app.js";


//dotenv configuration

dotenv.config(
    {
        path:'./.env'
    }
);

//DB connection call
connectDB()

//server listening

.then(() =>{
     
    app.listen(process.env.PORT || 3000 , () =>{
        console.log(`Server is running on port ${process.env.PORT}`); 
    } )
})

.catch((err)=>{
    console.error("Server error or Database connection failed !!! ", err);
})
