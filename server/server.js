import express from "express";

const app = express();

app.get('/api',(req,res)=>{
    res.send({
        message:'Hello World'
    })
})

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})