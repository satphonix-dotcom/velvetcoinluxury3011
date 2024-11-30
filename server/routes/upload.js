const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/s3');

// Upload single image
router.post('/single', auth, upload.single('image'), (req, res) => {
  try {
    res.json({
      url: req.file.location,
      key: req.file.key
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Upload multiple images
router.post('/multiple', auth, upload.array('images', 5), (req, res) => {
  try {
    const files = req.files.map(file => ({
      url: file.location,
      key: file.key
    }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Delete image
router.delete('/:key', auth, async (req, res) => {
  try {
    const s3 = require('../config/s3').s3;
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key
    }).promise();
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;