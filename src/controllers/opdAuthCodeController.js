require('dotenv').config();
const request = require('request');

exports.index = async (req,res) =>{

res.status(200).json({
  message:"hello"
})

}