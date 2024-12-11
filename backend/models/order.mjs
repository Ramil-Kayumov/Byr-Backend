import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    usluga:{
        type:[mongoose.Schema.ObjectId],
        ref:'Usluga',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    price:{
        type:Number
    }
});



 const Order = mongoose.model('Order',orderSchema)
 export default Order