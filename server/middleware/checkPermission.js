const Role = require('../models/Role');

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findOne({ name: req.user.role });
      
      if (!role) {
        return res.status(403).json({ message: 'Role not found' });
      }

      if (role.permissions.includes('all') || role.permissions.includes(requiredPermission)) {
        next();
      } else {
        res.status(403).json({ message: 'Permission denied' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
};

module.exports = checkPermission;