const mongoose = require('mongoose');

const WebProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    images: [{ type: String }],
    details: { type: String, required: true },
    category: { type: String, default: 'Web Application' },
    featured: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('WebProject', WebProjectSchema);
