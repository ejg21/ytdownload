const express = require('express');
const ytDlp = require('yt-dlp');  // Assuming yt-dlp is available globally
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to fetch the video URL from the provided YouTube link
app.get('/getVideoUrl', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    // Run yt-dlp to get the video URL
    const result = await ytDlp.exec([url, '--get-url']);
    const videoUrl = result.stdout.trim();

    // Return the video URL as JSON
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch video URL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
