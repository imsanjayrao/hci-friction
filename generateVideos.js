const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'public', 'videos');
const outputFilePath = path.join(__dirname, 'public', 'videos.json');

fs.readdir(videosDir, (err, files) => {
  if (err) {
    console.error('Error reading videos directory:', err);
    return;
  }

  // Filter video files (e.g., mp4)
  const videoFiles = files.filter(file => file.endsWith('.mp4'));

  // Create JSON structure
  const videoData = {
    videos: videoFiles.map(file => `/videos/${file}`)
  };

  // Write JSON file
  fs.writeFile(outputFilePath, JSON.stringify(videoData, null, 2), (err) => {
    if (err) {
      console.error('Error writing videos.json:', err);
    } else {
      console.log('videos.json has been updated with the following files:', videoFiles);
    }
  });
});
