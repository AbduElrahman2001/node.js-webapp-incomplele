const { trim } = require("jquery")
const mongoose = require("mongoose")
const validator = require("validator")
const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    }
})
const logup = new mongoose.Schema({
    username :{
        type :String , 
        required : true,
        trim : true
    },
    password :{
        type :String , 
        required : true,
        trim : true,
        validate(val) {
            let password = new RegExp(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
            );
            if (!password.test(val)) {
              throw new Error("pass must include [a-z],[A-Z],[0-9],[!@#$%^&*]");
            }
          },
    },
    email :{
        type :String,
        require : true,
        trim  :true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("invalid email")
            }
        }
    }
})
const Registeration = mongoose.model("register1" , logup)
const Event = mongoose.model("Event" , eventSchema)
module.exports = Registeration 