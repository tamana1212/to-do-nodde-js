const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT || 3001

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/myTodoList")
const itemSchema = {
    name : String,
    priority : Number
}

const Item = mongoose.model("Item",itemSchema)
const item1 = new Item({
    name: "Welcome to the ToDo App",
    priority : 10
})
const item2 = new Item({
    name: "By Kshitij Sharma",
    priority : 10
})

var todos = [item1,item2];

Item.insertMany(todos,(err)=>{
    if(err){
        console.log(err)
    }
})

app.get("/",(req,res)=>{
    Item.find({},(err,f)=>{
        res.render("index", { newListItem : f })
    })
})

app.post("/delete",(req,res)=>{
    Item.findByIdAndRemove(req.body.delete ,(err)=>{
        if(!err){
            res.redirect("/")
        }
        else{
            console.log(err)
        }
    })
})

app.post("/",(req,res)=>{
    var i = req.body.todoName
    var j = req.body.priority
    if(!j){
        j=0;
    }
    const todo = new Item({
        name : i,
        priority : j
    })
    todo.save()
    res.redirect("/")
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})