const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;