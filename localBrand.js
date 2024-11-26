const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const localBrandSchema = new Schema({
  name: { type: String, unique: true,required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  logoImage: { type: Number, required: false },
  phoneNumber: {type: Number, required: true},
  authenticated: {
    type: String,
    enum: ['pending', 'rejected', 'accepted'],
    default: 'pending'
  },
  created_at: { type: Date, default: Date.now }
});

// Export Product model
module.exports = mongoose.model('localbrands', localBrandSchema);
