let mongoose =  require("mongoose");
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String, 
    email: String,
    text: String,
    name:String,
    date: Date
});
                                                // 3rd argument specifies in which collection data needs to be stored
let Email = mongoose.model("Email", emailSchema, "emails");

module.exports = {Email};