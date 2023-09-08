const express = require("express")
const app = express()
const path = require("path")
//export mongoose
require("./config/mongoose")

//export register model
const Registeration = require("./model/Event")

const port = process.env.PORT || 3000


app.set("view engine" , "ejs")

//recognize public folder
app.use(express.static("public"))
app.use(express.static("node_modules"))

//get event router
const events = require("./routes/event")
app.use("/events" , events)

//save input values in database
app.use(express.urlencoded({extended : false}))

app.get("/login" , (req,res)=>{
    res.render("events/login")
})
app.get("/logup" , (req,res)=>{
    res.render("events/logup")
})

app.post("/logup" , async (req , res)=>{
    const user = {
        username : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    await Registeration.insertMany([user])
    res.render("events/login")
})

app.get("/login" ,async (req,res)=>{
    const email = req.body.email
     Registeration.find(email).then((user)=>{
        if(!user){
            res.send("user not find")
        }res.render("events")
     }).catch((e)=>{res.send(e)})
     
})


app.listen(port , ()=>{console.log(`app is listening on port ${port}`)})