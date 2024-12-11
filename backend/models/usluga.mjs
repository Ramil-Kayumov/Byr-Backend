import mongoose from "mongoose";


const uslugaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    }
});



const Usluga = mongoose.model('Usluga',uslugaSchema)
export default Usluga