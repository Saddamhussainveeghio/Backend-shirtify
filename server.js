const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-scan-token', async (req, res) => {
  try {
    const response = await axios.post(
      `https://platform.bodygram.com/api/orgs/${process.env.ORG_ID}/scan-tokens`,
      { scope: ['api.platform.bodygram.com/scans:create'] },
      {
        headers: {
          'Authorization': process.env.API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create scan token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));