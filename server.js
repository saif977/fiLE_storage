const express=require("express");
const app=express();
const multer=require("multer");
const path=require("path");
const mongoose=require("mongoose");
const File = require("./model/Data");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const cors=require("cors");

app.use(cors());

const storageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./data');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname+Date.now());
    }
});

const upload=multer({storage:storageEngine});

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res,next)=>{
    console.log("sa");
    res.sendFile(path.join(__dirname,'view','index.html'));
});

app.post('/postData',upload.single('file'),(req,res,next)=>{
    console.log(req.file);
    var newFile = new File({
        name: req.file.filename,
        path:req.file.path
    })
    newFile.save((err,res)=>{
        if(err) console.log(err);
        else console.log("success uploaded")
    });
    res.send("success");
})

app.use(express.json()); 


mongoose.connect("mongodb+srv://alien_786:passTheWord786@cluster0.rfgau.mongodb.net/file?retryWrites=true&w=majority")
        .then((res)=>{
            app.listen(process.env.Port || 8080,()=>{
                console.log("connected to db successfully!!");
                console.log("Server started running...");
            });
        })
        .catch(err=>console.log(err,"error while connecting to data base"));

// app.listen(8080,(err)=>{
//     if(err) console.log(err);
//     else console.log("server running on 8080");
// })