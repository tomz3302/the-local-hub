const mongoose = require('mongoose');
const products = require("./products");

const sampleProducts = [
    {
      name: "the breaker",
      description: "Comfortable cotton hoodie in various colors.",
      category: "hoodies",
      price: 45,
      size_stock: [
        { size: "S", stock: 10 },
        { size: "M", stock: 15 },
        { size: "L", stock: 20 }
      ],
      brand: "oudies",
      material: "Cotton",
      tags: ["casual", "winter", "hoodie"]
    },
    {
      name: "Denim Jeans",
      description: "Stylish and durable denim jeans.",
      category: "Denim",
      price: 50,
      size_stock: [
        { size: "32", stock: 80 },
        { size: "34", stock: 60 },
        { size: "36", stock: 40 }
      ],
      brand: "elmtayaz",
      material: "Denim",
      tags: ["jeans", "denim", "fashion"]
    },
    {
      name: "Running Shoes",
      description: "Lightweight and breathable running shoes.",
      category: "Footwear",
      price: 70,
      size_stock: [
        { size: "8", stock: 5 },
        { size: "9", stock: 5 },
        { size: "10", stock: 5 }
      ],
      brand: "elmtayaz",
      material: "Mesh",
      tags: ["running", "shoes", "sports"]
    },
    {
        name: "monster house",
        description: "Comfortable cotton hoodie in 2 colors.",
        category: "hoodies",
        price: 65,
        size_stock: [
          { size: "S", stock: 7 },
          { size: "M", stock: 12 },
          { size: "L", stock: 22 }
        ],
        brand: "oudies",
        material: "Cotton",
        tags: ["casual", "winter", "hoodie"]
      },
      {
        name: "minion hat",
        description: "hat shaped like a minion",
        category: "Hats",
        price: 15,
        size_stock: [
          { size: "ALL", stock: 10 }
        ],
        brand: "tomzorrow",
        material: "leather",
        tags: ["casual", "summer", "cool hat"]
      },
      {
        name: "zingerella",
        description: "Comfortable cotton pants in various colors.",
        category: "pants",
        price: 30,
        size_stock: [
          { size: "S", stock: 10 },
          { size: "M", stock: 15 },
          { size: "L", stock: 20 }
        ],
        brand: "tomzorrow",
        material: "Cotton",
        tags: ["casual", "winter"]
      },
  ];














mongoose.connect('mongodb://localhost:27017/summer_project', {
    minpoolSize: 5
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


  // Populate Database
async function populateDatabase() {
    try {
      await products.insertMany(sampleProducts);
      console.log('Sample products added successfully');
    } catch (error) {
      console.error('Error adding sample products:', error);
    } finally {
      // Close the database connection
      mongoose.connection.close();
    }
  }
  
  populateDatabase();