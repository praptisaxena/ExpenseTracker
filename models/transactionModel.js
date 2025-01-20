const mongoose=require('mongoose')

const transectionSchema=new mongoose.Schema({
    userid:{
        type: String,
        required:true,
    },
    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    currency: {
        type: String,
        required: [true, 'currency is required'],
        enum: ['USD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD'], // Add currencies you want to support
        default: 'INR', // Optional: set a default currency
    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category:{
        type:String,
        required:[true,'cat is required']
    },
    reference:{
        type:String,
    },
    description:{
        type:String,
        required:[true,'desc is required']
    },
    // date:{
    //     type:Date,
    //     required:[true,'date is required']
    // }
    date:{
        type:Date,
        default:Date.now
    }

},{timestamps: true}
);

const transectionModel=mongoose.model('transections',transectionSchema)
module.exports=transectionModel;