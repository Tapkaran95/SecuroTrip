let mongoose =  require("mongoose");
let Schema = mongoose.Schema;

let callbackRequetSchema = new Schema({
    id: String, 
    phoneNumber: String,
    date: Date
});
                                                // 3rd argument specifies in which collection data needs to be stored
let CallbackRequest = mongoose.model("CallbackRequest", callbackRequetSchema, "callback-requests");

module.exports = {CallbackRequest};