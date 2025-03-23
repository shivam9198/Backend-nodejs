const Mongoose= require('mongoose');

const paymenetSchema = new Mongoose.Schema({
   
    orderId: {
        type: String,
        required:true

    },
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status:{
        type: String,
        required:true,
    },

    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        type:Object,
    }
},{timestamps:true});


module.exports = Mongoose.model("payments", paymenetSchema);