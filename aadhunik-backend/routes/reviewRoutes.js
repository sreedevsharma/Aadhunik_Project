const express = require('express');
const Review = require('../models/Review');
const Tool = require('../models/Tool');

const router = express.Router();

// Add a review for a tool
router.post('/tools/:toolId/reviews', async (req, res) => {
  const { userId, rating, comment } = req.body;
  const { toolId } = req.params;

  try {
    const review = new Review({
      user: userId,
      tool: toolId,
      rating,
      comment,
    });

    const newReview = await review.save();

    // Update tool rating (basic calculation, could be enhanced)
    const tool = await Tool.findById(toolId);
    const reviews = await Review.find({ tool: toolId });
    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    tool.rating = averageRating;
    await tool.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reviews for a tool
router.get('/tools/:toolId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ tool: req.params.toolId }).populate('user', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;