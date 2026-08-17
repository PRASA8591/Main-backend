const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models import
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const Message = require('./models/Message');
const Admin = require('./models/Admin');
const Service = require('./models/Service');
const Product = require('./models/Product');
const Settings = require('./models/Settings');
const WebProject = require('./models/WebProject');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware with 50MB payload limit for base64 image uploads
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection string with url-encoded password
const MONGO_URI = process.env.MONGO_URI || "mongodb://Admin:whiteJackal%40678@ac-ga1kobs-shard-00-00.zrtnsy9.mongodb.net:27017,ac-ga1kobs-shard-00-01.zrtnsy9.mongodb.net:27017,ac-ga1kobs-shard-00-02.zrtnsy9.mongodb.net:27017/prasatek?ssl=true&replicaSet=atlas-antxka-shard-0&authSource=admin&appName=Database";

console.log("Connecting to MongoDB Atlas...");
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas database: prasatek");
        seedDefaultReviews();
        seedDefaultAdmin();
        seedDefaultServices();
        seedDefaultProducts();
        seedDefaultSettings();
        seedDefaultWebProjects();
    })
    .catch((err) => {
        console.error("MongoDB Connection Error: ", err.message);
    });

// Seed default reviews if database is empty (similar to Dexie client-side behavior)
async function seedDefaultReviews() {
    try {
        const count = await Review.countDocuments();
        if (count === 0) {
            const defaultReviews = [
                {
                    name: "Samantha Perera",
                    rating: 5,
                    comment: "Excellent repair service! My laptop was heating up and very slow. The technician cleaned it up and replaced the thermal paste. It works like brand new now!",
                    date: new Date().toISOString().split("T")[0]
                },
                {
                    name: "Ruwan Jayasekara",
                    rating: 5,
                    comment: "Highly recommend PrasaTek! They recovered all my project data from a corrupted external drive. Super fast work and very fair price.",
                    date: new Date().toISOString().split("T")[0]
                },
                {
                    name: "Nilani de Silva",
                    rating: 4,
                    comment: "Excellent Windows installation service. Clean setup, fully updated and all drivers are working perfectly.",
                    date: new Date().toISOString().split("T")[0]
                }
            ];
            await Review.insertMany(defaultReviews);
            console.log("Database seeded with default client testimonials.");
        }
    } catch (err) {
        console.error("Error seeding default reviews: ", err.message);
    }
}

// Seed default admin credentials if database is empty
async function seedDefaultAdmin() {
    try {
        const count = await Admin.countDocuments();
        if (count === 0) {
            const adminUser = new Admin({
                username: "admin",
                password: "admin123"
            });
            await adminUser.save();
            console.log("Database seeded with default Admin user.");
        }
    } catch (err) {
        console.error("Error seeding default admin: ", err.message);
    }
}

// Seed default services if database is empty
async function seedDefaultServices() {
    try {
        const count = await Service.countDocuments();
        if (count === 0) {
            const defaultServices = [
                {
                    title: "Computer Repair",
                    titleSi: "පරිගණක අලුත්වැඩියාව",
                    description: "Fast and reliable repair solutions for all types of computer issues. Hardware diagnostic, replacement, and fix.",
                    descriptionSi: "සියලුම වර්ගයේ පරිගණක ගැටළු සඳහා වේගවත් හා විශ්වාසනීය අලුත්වැඩියා විසඳුම්. දෘඩාංග හඳුනා ගැනීම, ප්‍රතිස්ථාපනය සහ අලුත්වැඩියාව.",
                    badge: "Hardware & Fixes",
                    iconName: "Monitor",
                    tealTheme: true
                },
                {
                    title: "Computer Service",
                    titleSi: "පරිගණක සේවාකරණය",
                    description: "Complete system checkup, hardware cleaning, cooling paste renewal, maintenance and performance optimization.",
                    descriptionSi: "සම්පූර්ණ පද්ධති පරීක්ෂාව, දෘඩාංග පිරිසිදු කිරීම, සිසිලන පේස්ට් අලුත් කිරීම, නඩත්තුව සහ කාර්ය සාධනය ප්‍රශස්ත කිරීම.",
                    badge: "Maintenance",
                    iconName: "Settings",
                    tealTheme: false
                },
                {
                    title: "Windows Installation",
                    titleSi: "වින්ඩෝස් ස්ථාපනය",
                    description: "Professional installation of Windows OS (10/11) with original drivers, necessary updates, and data backup.",
                    descriptionSi: "මුල් ධාවක (drivers), අවශ්‍ය යාවත්කාලීන කිරීම් සහ දත්ත උපස්ථ සමඟ වින්ඩෝස් මෙහෙයුම් පද්ධතිය (10/11) වෘත්තීයමය ලෙස ස්ථාපනය කිරීම.",
                    badge: "Operating Systems",
                    iconName: "Layers",
                    tealTheme: true
                },
                {
                    title: "Software Installation",
                    titleSi: "මෘදුකාංග ස්ථාපනය",
                    description: "Install and configure general, design, development or custom tools and applications securely with proper settings.",
                    descriptionSi: "පොදු, සැලසුම්, සංවර්ධන හෝ අභිරුචි මෙවලම් සහ යෙදුම් නිසි සැකසුම් සහිතව ආරක්ෂිතව ස්ථාපනය කර වින්‍යාස කිරීම.",
                    badge: "Applications",
                    iconName: "DownloadCloud",
                    tealTheme: false
                },
                {
                    title: "Mobile Unlocking",
                    titleSi: "ජංගම දුරකථන අගුළු හැරීම",
                    description: "Unlock network carrier locks, passcode lockouts, and account verification on major mobile brands safely.",
                    descriptionSi: "ප්‍රධාන ජංගම දුරකථන සන්නාමයන්හි ජාල වාහක අගුළු, මුරපද අගුළු සහ ගිණුම් සත්‍යාපනය ආරක්ෂිතව අගුළු හැරීම.",
                    badge: "Mobile Solutions",
                    iconName: "Smartphone",
                    tealTheme: true
                },
                {
                    title: "Data Recovery",
                    titleSi: "දත්ත ප්‍රතිසාධනය",
                    description: "Recover your important documents, photos, and databases from lost, deleted, formatted or damaged drives.",
                    descriptionSi: "නැතිවූ, මකා දැමූ, ආකෘතිකරණය කළ හෝ හානියට පත් ධාවකයන්ගෙන් ඔබේ වැදගත් ලේඛන, ඡායාරූප සහ දත්ත සමුදායන් ප්‍රතිසාධනය කිරීම.",
                    badge: "Storage & Recovery",
                    iconName: "HardDrive",
                    tealTheme: false
                },
                {
                    title: "Professional Resume Writing",
                    titleSi: "වෘත්තීය ජීව දත්ත පත්‍රිකා ලිවීම",
                    description: "Get an outstanding resume designed to capture recruiters' attention, formatted with optimal ATS keywords.",
                    descriptionSi: "බඳවා ගන්නන්ගේ අවධානය දිනා ගැනීම සඳහා නිර්මාණය කර ඇති, ප්‍රශස්ත ATS මූල පද සමඟ ආකෘතිගත කරන ලද විශිෂ්ට ජීව දත්ත පත්‍රිකාවක් ලබා ගන්න.",
                    badge: "Career Services",
                    iconName: "FileText",
                    tealTheme: true
                },
                {
                    title: "Basic Website Development",
                    titleSi: "මූලික වෙබ් අඩවි සංවර්ධනය",
                    description: "We create clean, lightweight, modern, and highly responsive landing pages and web apps custom-made for your brand.",
                    descriptionSi: "අපි ඔබේ සන්නාමය සඳහා අභිරුචි-සාදන ලද පිරිසිදු, සැහැල්ලු, නවීන සහ ඉහළ ප්‍රතිචාරාත්මක ගොඩබෑමේ පිටු සහ වෙබ් යෙදුම් නිර්මාණය කරමු.",
                    badge: "Web Solutions",
                    iconName: "Code",
                    tealTheme: false
                }
            ];
            await Service.insertMany(defaultServices);
            console.log("Database seeded with default services catalog.");
        }
    } catch (err) {
        console.error("Error seeding default services: ", err.message);
    }
}

// Seed default products if database is empty
async function seedDefaultProducts() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const defaultProducts = [
                {
                    name: "Solid State Drive (SSD) 512GB NVMe",
                    price: 13500,
                    description: "High-speed PCIe Gen3 NVMe SSD. Dynamic read speeds up to 3000MB/s. 3-year warranty included.",
                    imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
                },
                {
                    name: "DDR4 Desktop RAM 8GB 3200MHz",
                    price: 7500,
                    description: "Premium high-performance desktop memory module. Heat spreader optimization with low latency.",
                    imageUrl: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80"
                },
                {
                    name: "Dual-Band Wi-Fi 6 Router",
                    price: 11500,
                    description: "Gigabit wireless internet router with 4 high-gain antennas. Multi-device support with minimal latency.",
                    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
                },
                {
                    name: "Anti-Virus Plus Security (1 User, 1 Year)",
                    price: 3200,
                    description: "Comprehensive software security protecting your computers against ransomware, malware, and cyber threats.",
                    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
                }
            ];
            await Product.insertMany(defaultProducts);
            console.log("Database seeded with default products inventory.");
        }
    } catch (err) {
        console.error("Error seeding default products: ", err.message);
    }
}

// Seed default settings if empty
async function seedDefaultSettings() {
    try {
        const count = await Settings.countDocuments();
        if (count === 0) {
            const defaultSettings = new Settings({
                phone: "0719 323 239",
                email: "info@prasatek.site",
                address: "No 73 Maputugala Poruwadanda",
                mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1384732103565!2d80.12818907461123!3d6.762493393233857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2a5c2f5d9472f%3A0x6b4ef82bc85b19fb!2sPrasaTek%20System%20Solutions!5e0!3m2!1sen!2slk!4v1717320000000!5m2!1sen!2slk",
                showHardwareShop: false,
                showOffers: false
            });
            await defaultSettings.save();
            console.log("Database seeded with default website configuration settings.");
        }
    } catch (err) {
        console.error("Error seeding default settings: ", err.message);
    }
}

// Seed default web projects if database is empty
async function seedDefaultWebProjects() {
    try {
        const count = await WebProject.countDocuments();
        if (count === 0) {
            const defaultProjects = [
                {
                    name: "E-Commerce Storefront Platform",
                    url: "https://prasatek.site",
                    images: [
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
                    ],
                    details: "Modern full-stack web application featuring payment gateway integration, responsive UI/UX, product catalog management, and admin order analytics.",
                    category: "Web Application"
                },
                {
                    name: "Corporate ERP System Portal",
                    url: "https://prasatek.site",
                    images: [
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
                    ],
                    details: "Comprehensive business resource planning portal with role-based access control, automated report generation, and employee workflow tracking.",
                    category: "Enterprise System"
                }
            ];
            await WebProject.insertMany(defaultProjects);
            console.log("Database seeded with default web projects.");
        }
    } catch (err) {
        console.error("Error seeding default web projects: ", err.message);
    }
}

// ==========================================
// API ROUTES
// ==========================================

// --- Bookings Endpoints ---

// Get all bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, phone, email, service, date, description } = req.body;
        if (!name || !phone || !email || !service || !description) {
            return res.status(400).json({ error: "Please fill all required fields." });
        }
        
        const newBooking = new Booking({
            name,
            phone,
            email,
            service,
            date: date || "",
            description
        });
        
        const saved = await newBooking.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update booking status
app.put('/api/bookings/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: "Status field is required." });
        }
        
        const updated = await Booking.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: "Booking not found." });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Booking not found." });
        }
        res.json({ success: true, message: "Booking deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Clear all bookings
app.delete('/api/bookings', async (req, res) => {
    try {
        await Booking.deleteMany({});
        res.json({ success: true, message: "All bookings cleared." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Reviews Endpoints ---

// Get all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ _id: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new review
app.post('/api/reviews', async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        if (!name || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required." });
        }
        
        const newReview = new Review({
            name,
            rating,
            comment,
            date: new Date().toISOString().split("T")[0]
        });
        
        const saved = await newReview.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete review
app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const deleted = await Review.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Review not found." });
        }
        res.json({ success: true, message: "Review deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Clear all reviews
app.delete('/api/reviews', async (req, res) => {
    try {
        await Review.deleteMany({});
        res.json({ success: true, message: "All reviews cleared." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Messages Endpoints ---

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit a message
app.post('/api/messages', async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Required fields: name, email, subject, message" });
        }
        
        const newMessage = new Message({
            name,
            phone,
            email,
            subject,
            message
        });
        
        const saved = await newMessage.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Message not found." });
        }
        res.json({ success: true, message: "Message deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Clear all messages
app.delete('/api/messages', async (req, res) => {
    try {
        await Message.deleteMany({});
        res.json({ success: true, message: "Inbox messages cleared." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Settings Endpoints ---
app.get('/api/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({});
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/settings', async (req, res) => {
    try {
        const { phone, email, address, mapsEmbedUrl, showHardwareShop, showOffers } = req.body;
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({});
        }
        
        settings.phone = phone || settings.phone;
        settings.email = email || settings.email;
        settings.address = address || settings.address;
        settings.mapsEmbedUrl = mapsEmbedUrl !== undefined ? mapsEmbedUrl : settings.mapsEmbedUrl;
        if (showHardwareShop !== undefined) settings.showHardwareShop = Boolean(showHardwareShop);
        if (showOffers !== undefined) settings.showOffers = Boolean(showOffers);
        
        const saved = await settings.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Services Endpoints ---
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/services', async (req, res) => {
    try {
        const { title, titleSi, description, descriptionSi, badge, iconName, tealTheme } = req.body;
        const newService = new Service({
            title,
            titleSi,
            description,
            descriptionSi,
            badge: badge || "IT Service",
            iconName: iconName || "Wrench",
            tealTheme: tealTheme !== undefined ? tealTheme : true
        });
        const saved = await newService.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Service not found." });
        }
        res.json({ success: true, message: "Service deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Products Endpoints ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;
        const newProduct = new Product({
            name,
            price: Number(price),
            description,
            imageUrl
        });
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Product not found." });
        }
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Web Projects Endpoints ---
app.get('/api/web-projects', async (req, res) => {
    try {
        const projects = await WebProject.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/web-projects', async (req, res) => {
    try {
        const { name, url, images, details, category } = req.body;
        if (!name || !url || !details) {
            return res.status(400).json({ error: "Project name, URL, and details are required." });
        }
        
        let cleanedImages = Array.isArray(images) ? images.filter(img => img && img.trim() !== '') : [];
        if (cleanedImages.length > 3) {
            cleanedImages = cleanedImages.slice(0, 3);
        }

        const newProject = new WebProject({
            name,
            url,
            images: cleanedImages,
            details,
            category: category || 'Web Application'
        });

        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/web-projects/:id', async (req, res) => {
    try {
        const { name, url, images, details, category } = req.body;
        let cleanedImages = Array.isArray(images) ? images.filter(img => img && img.trim() !== '') : [];
        if (cleanedImages.length > 3) {
            cleanedImages = cleanedImages.slice(0, 3);
        }

        const updated = await WebProject.findByIdAndUpdate(
            req.params.id,
            {
                name,
                url,
                images: cleanedImages,
                details,
                category
            },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Web Project not found." });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/web-projects/:id', async (req, res) => {
    try {
        const deleted = await WebProject.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Web Project not found." });
        }
        res.json({ success: true, message: "Web Project deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- PUT ENDPOINTS FOR EDITING ---

// Update service
app.put('/api/services/:id', async (req, res) => {
    try {
        const { title, titleSi, description, descriptionSi, badge, iconName, tealTheme } = req.body;
        const updated = await Service.findByIdAndUpdate(
            req.params.id,
            {
                title,
                titleSi,
                description,
                descriptionSi,
                badge: badge !== undefined ? badge : "IT Service",
                iconName: iconName !== undefined ? iconName : "Wrench",
                tealTheme: tealTheme !== undefined ? tealTheme : true
            },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Service not found." });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price: Number(price),
                description,
                imageUrl
            },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Product not found." });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update message status
app.put('/api/messages/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: "Status field is required." });
        }
        const updated = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Message not found." });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update admin credentials
app.put('/api/admin/credentials', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }
        let adminUser = await Admin.findOne();
        if (!adminUser) {
            adminUser = new Admin({ username, password });
        } else {
            adminUser.username = username;
            adminUser.password = password;
        }
        await adminUser.save();
        res.json({ success: true, message: "Admin credentials updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }
        
        const adminUser = await Admin.findOne({ username });
        if (!adminUser || adminUser.password !== password) {
            return res.status(401).json({ error: "Invalid username or password." });
        }
        
        res.json({ success: true, message: "Authentication successful." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: "ok", message: "PrasaTek API server is running." });
});

// Server listener
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
