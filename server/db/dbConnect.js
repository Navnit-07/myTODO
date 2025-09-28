const mongoose = require("mongoose");
const {DB_NAME} = require("../constants")

exports.dbConnect = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('DB connection Successfull');
    } catch(err){
        console.log('DB connection error ' + err);
    }
}