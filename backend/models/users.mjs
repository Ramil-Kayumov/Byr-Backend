import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        require:true
    },
    telephone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Пользователь",
        enum: ["Пользователь", "Тех поддержка", "Рабочий", "Админ"],
        required:true
    },
    orders:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }]
});




 const User = mongoose.model('User',userSchema);
 export default User
