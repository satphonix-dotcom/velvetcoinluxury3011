const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create new role (Admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { name, permissions, description } = req.body;

    // Check if role already exists
    let role = await Role.findOne({ name });
    if (role) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    // Create new role
    role = new Role({
      name,
      permissions,
      description
    });

    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all roles
router.get('/', auth, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update role (Admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { name, permissions, description } = req.body;
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Don't allow modification of built-in roles
    if (!role.isCustom) {
      return res.status(403).json({ message: 'Cannot modify built-in roles' });
    }

    role.name = name || role.name;
    role.permissions = permissions || role.permissions;
    role.description = description || role.description;

    await role.save();
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete role (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Don't allow deletion of built-in roles
    if (!role.isCustom) {
      return res.status(403).json({ message: 'Cannot delete built-in roles' });
    }

    await role.remove();
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;