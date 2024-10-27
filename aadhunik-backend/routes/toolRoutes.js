const express = require('express');
const Tool = require('../models/Tool'); // Make sure the Tool model is defined in models/Tool.js

const router = express.Router();

// GET route to retrieve all tools
router.get('/tools', async (req, res) => {
  try {
    const tools = await Tool.find(); // Fetch all tools from the database
    res.json(tools); // Send the tools as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a new tool
router.post('/tools', async (req, res) => {
  const tool = new Tool(req.body); // Create a new tool with data from the request body
  try {
    const newTool = await tool.save(); // Save the new tool to the database
    res.status(201).json(newTool); // Respond with the newly created tool
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;