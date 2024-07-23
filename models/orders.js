const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_service_code: { type: String, ref: 'Service', required: true },
    order_client_cpf: { type: Number, ref: 'Client', required: true },
    order_vehicle_sign: { type: String, ref: 'Vehicle' },
    order_status: {
        type: String,
        enum: ['open', 'in_progress', 'completed', 'canceled'],
        required: true
    },
    order_date_request: {
        type: Date,
        required: true
    },
    order_date_complete: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);