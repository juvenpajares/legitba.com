import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import cors from 'cors';

dotenv.config(); // Load environment variables

const app = express();
const API_KEY = process.env.GOOGLE_FACTCHECK_API_KEY;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON data

// Fact-check API route
app.get('/api/fact-check', async (req, res) => {
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
    console.error('Error fetching fact-check data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app; // Ensure this line is added if using ESM