const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true
  },

   // Message identifiers for tracking
  bcastId: { type: String, default: null }, 
  whisId: { type: String, default: null }, 

  // Node role in the system
  type: {
    type: String,
    enum: ['admin', 'peer'], // admin = introducer/server, peer = regular node
    default: 'peer'
  },

  // Network / gossip-related
  subscribedPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastSeen: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  isLeader: { type: Boolean, default: false }, // global leader flag



   // Messages received from pages (latest per page)
  messages: [
    {
      messageId: { type: String, required: true },
      page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User",userSchema);
module.exports = User;
