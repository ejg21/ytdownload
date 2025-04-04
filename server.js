const express = require('express');
const { exec } = require('child_process'); // Node's child_process module to run shell commands
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
    // Run yt-dlp to get the video URL using child_process
    exec(`yt-dlp --get-url ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing yt-dlp: ${error}`);
        return res.status(500).json({ error: 'Failed to fetch video URL' });
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Failed to fetch video URL' });
      }

      const videoUrl = stdout.trim(); // Remove any extra whitespace/newlines
      res.json({ videoUrl });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch video URL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
