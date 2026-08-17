const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    titleSi: { type: String },
    description: { type: String, required: true },
    descriptionSi: { type: String },
    badge: { type: String, default: "IT Service" },
    iconName: { type: String, default: "Wrench" },
    tealTheme: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
