const mongoose = require('mongoose');

// 定應Schema
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    Id : { type:Number, required: true },
    Message : { type:String, required: true, trim: true },
    PatientId : {type:Number}
});

// 建立名為Order的Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;