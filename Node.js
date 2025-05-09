const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXBdNiVqtpqNGUuyR07mMCa9ahCJSSOvQK5pKR8tKF0mOXg7Wirw_0fJYGAAstP9acug/exec';

app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    if (response.ok) {
      res.status(200).send({ message: 'Success', text });
    } else {
      res.status(500).send({ message: 'Google Script Error', text });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server Error', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
