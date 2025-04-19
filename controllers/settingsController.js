const Settings = require('../models/Settings');

const updateSettings = async (req, res) => {
  try {
    const { name, description } = req.body;

    let settings = await Settings.findOne();
    if (settings) {
      settings.name = name;
      settings.description = description;
      await settings.save();
    } else {
      settings = await Settings.create({ name, description });
    }

    res.json(settings);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

module.exports = {
  updateSettings,
  getSettings,
};