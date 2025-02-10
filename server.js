const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Allow frontend requests

const DATA_FILE = "data.json"; // JSON file to store inquiries

// Load existing inquiries
function loadEnquiries() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
    return []; // Return empty array if file doesn't exist
}

// Save inquiries to file
function saveEnquiries(enquiries) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
}

// API to get all inquiries
app.get("/api/enquiries", (req, res) => {
    const enquiries = loadEnquiries();
    res.json(enquiries);
});

// API to save a new inquiry
app.post("/api/enquiries", (req, res) => {
    const enquiries = loadEnquiries();
    const newEnquiry = req.body; // Get data from frontend
    enquiries.push(newEnquiry);
    saveEnquiries(enquiries);
    res.json({ message: "Enquiry saved successfully!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
