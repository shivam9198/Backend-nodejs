const { SESClient } = require('@aws-sdk/client-ses');
// Set the AWS Region.
const REGION = "ap-south-1";// select the reagion where you want to send the emails
// Create SES service object.
// create ses client by passing a credientials object with acceddkeyId and secret acesskey
const sesClient = new SESClient({ region: REGION , credentials:{
    accessKeyId: process.env.ECS_Acess_key,
    secretAccessKey: process.env.ECS_Scret_key
},  });
module.exports =  { sesClient };
