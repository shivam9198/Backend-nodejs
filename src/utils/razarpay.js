const Razorpay = require("razorpay");

var instance = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret,
  });

  module.exports = instance;