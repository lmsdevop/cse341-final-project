const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    client_cpf: { type: Number, required: true, unique: true },
    client_name: { type: String, required: true },
    client_type: { type: String, enum: ['DETRAN', 'SMTR'], required: true },
    client_civil: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
    client_gender: { type: String, enum: ['male', 'female'], required: true },
    client_phone: Number,
    client_email: String,
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;