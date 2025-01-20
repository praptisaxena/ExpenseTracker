
const transectionModel=require('../models/transactionModel');
const moment=require('moment')
const getAllTransection=async (req,res)=>{
    try {
        const {type}=req.body;
        const transections=await transectionModel.find({
            userid:req.body.userid,
            ...(type!='all' && { type }),
        });
            // date:{
            //     $gt: moment().subtract(Number(frequency),'d').toDate(),
            // },
        //     ...(frequency !== 'custom' ? {
        //         date:{
        //             $gt: moment().subtract(Number(frequency),"d").toDate(),
        //         },
        //     } : {
        //         date:{
        //             $gte: selectedDate[0],
        //             $lte: selectedDate[1]
        //         }
        //     }),
            
        // });
        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
};
const addTransection=async(req,res)=>{
    try {
        const newTransection=new transectionModel(req.body)
        await newTransection.save()
        res.status(201).send('Transection Created');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports={getAllTransection,addTransection};