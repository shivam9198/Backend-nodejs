const { SESClient } = require('@aws-sdk/client-ses');
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION , credentials:{
    accessKeyId: process.env.ECS_Acess_key,
    secretAccessKey: process.env.ECS_Scret_key
},  });
module.exports =  { sesClient };
