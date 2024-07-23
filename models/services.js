const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    service_code: { type: String, required: true, unique: true },
    service_name: { type: String, required: true },
    service_description: { type: String, required: true },
    service_price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);