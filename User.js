const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
   
  const orderProductSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true }
  }, { _id: false });
  
  // Order History Schema
  const orderHistorySchema = new Schema({
    order_date: { type: Date, default: Date.now },
    total_amount: { type: Number, required: true },
    products: [orderProductSchema],
    shipping_address: String,
    status: { type: String, required: true }
  });
  
  // User Schema
  const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String },
    order_history: [orderHistorySchema],
    created_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("users", userSchema);