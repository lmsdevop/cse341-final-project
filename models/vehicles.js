const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    vehicle_renavam: { type: Number, required: true },
    vehicle_sign: { type: String, required: true, unique: true },
    vehicle_fabrication_year: { type: Date, required: true },
    vehicle_model_year: { type: Date, required: true },
    vehicle_brand: { type: String, required: true },
    vehicle_model: { type: String, required: true },
    vehicle_chassi: { type: String, required: true },
    vehicle_color: { type: String, required: true },
    vehicle_category: { type: String, enum: ['owner', 'lease'], required: true },
    vehicle_gas: { type: String, enum: ['gas', 'alcohol', 'flex', 'gas/gnv', 'alcohol/gnv', 'diesel', 'electric'], required: true },
    vehicle_client_cpf: { type: Number, ref: 'Client' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);