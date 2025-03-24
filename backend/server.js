require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.GOOGLE_FACTCHECK_API_KEY;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON data

// Fact-check API route
app.get("/api/fact-check", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        const response = await axios.get(
            `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching fact-check data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});