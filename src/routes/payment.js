const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const instance = require('../utils/razarpay');
const payments = require('../models/payments');
const { membershipAmount } = require('../utils/constants');
const paymentRouter =  express.Router();
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const user = require('../models/user');
paymentRouter.post('/payment/create',userAutho,async(req,res)=>{
    try {
        const { membershipType } = req.body;
        const { firstName, lastName, email } = req.user;
        //connection to the insitance
        const order = await instance.orders.create({
            amount: membershipAmount[membershipType] * 100,
          currency: "INR",
           receipt: "receipt#1",
          notes: {
            firstName,
            lastName,
            email,
            membershipType: membershipType,
        }})
        // save the order to the db

    const payment = new payments({
        orderId : order.id,
        userId: req.user.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        notes: order.notes,
        receipt: order.receipt,
        
    })
   const savedPayment=  await payment.save();
    // after saving the order to db retrn the order to the frontend 
    res.json({ ...savedPayment.toJSON(), keyId: process.env.razorpay_key_id });
        
    } catch (err) {
       console.log(err);
    }

})

paymentRouter.post('/payment/webhook',async(req,res)=>{
   try {
         // vlaidiating webhook
const webhookSignature = req.headers("X-Razorpay-Signature");// this websignature comes from the header of the req body 

    const iswebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.webhook_Secret);

    if(!iswebhookValid){
        return res.status(400).json({messgae:"invalid webhook"});
    }
    const paymentDetail = req.body.payload.entity;// this is send to the server  as the response when the payment is sucessfull by the razarpay
    // this we are saving in the payment order model that the payment status is sucessfull
    const payment = await payments.findOne({orderId: paymentDetail.order_id}); 
    payments.status = paymentDetail.status;
    await payment.save();
    // if the payment is sucessfull then we need to update the user as a premium mber in the database 
    if(paymentDetail.status === "captured"){
const User = await user.findOne({_id: payment.userId});
     User.isPremium = true;
     membershipType = payment.notes.membershipType;
     await User.save();
     //return a sucess res to razorpay
     return res.status(200).json({message:"payment is sucessfull"});

    }
        


   } catch (error) {
    return res.status(400).json({messgae: "invalid webhook"});
    
   }
})

paymentRouter.get('/verify/payment',userAutho,(req,res)=>{
  
    const user = req.user.json();
    if(user.isPremium){
        return res.json({message:"user is premium member"});
    }
    else{
        return res.json({message:"user is not premium member"});
    }


})


module.exports = paymentRouter;
