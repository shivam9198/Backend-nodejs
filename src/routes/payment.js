const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const instance = require('../utils/razarpay');
const payments = require('../models/payments');
const { membershipAmount } = require('../utils/constants');
const paymentRouter =  express.Router();

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
module.exports = paymentRouter;
