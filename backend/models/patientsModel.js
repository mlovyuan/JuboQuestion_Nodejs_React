const mongoose = require('mongoose');

// 定應Schema
const Schema = mongoose.Schema;
const patientSchema = new Schema({
    Id : { type:Number, required: true },
    Name : { type:String, required: true, trim: true },
    OrderIds : { type:[Number] }
});

// 建立名為Patient的Model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;