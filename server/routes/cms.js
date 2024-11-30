const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await PageContent.find().select('-content').sort({ title: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await PageContent.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new page (admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { slug, title, content, metaDescription } = req.body;
    
    let page = await PageContent.findOne({ slug });
    if (page) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }

    page = new PageContent({
      slug,
      title,
      content,
      metaDescription,
      modifiedBy: req.user.userId
    });

    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update page (admin only)
router.put('/:slug', [auth, admin], async (req, res) => {
  try {
    const { title, content, metaDescription } = req.body;
    
    const page = await PageContent.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    page.title = title || page.title;
    page.content = content || page.content;
    page.metaDescription = metaDescription || page.metaDescription;
    page.modifiedBy = req.user.userId;
    page.lastModified = Date.now();

    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete page (admin only)
router.delete('/:slug', [auth, admin], async (req, res) => {
  try {
    const page = await PageContent.findOneAndDelete({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;