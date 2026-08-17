const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    phone: { type: String, default: "0719 323 239" },
    email: { type: String, default: "info@prasatek.site" },
    address: { type: String, default: "No 73 Maputugala Poruwadanda" },
    mapsEmbedUrl: { type: String, default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1384732103565!2d80.12818907461123!3d6.762493393233857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2a5c2f5d9472f%3A0x6b4ef82bc85b19fb!2sPrasaTek%20System%20Solutions!5e0!3m2!1sen!2slk!4v1717320000000!5m2!1sen!2slk" },
    showHardwareShop: { type: Boolean, default: false },
    showOffers: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
