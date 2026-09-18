const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./model/user-model');
const Product = require('./model/product-model');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
  {
    name: "Makrana White Marble",
    description: "Premium Makrana white marble with a clean finish and natural texture, ideal for flooring, walls and luxury interiors.",
    price: 280,
    category: "Indian Marble",
    stock: 25,
    imagesUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    numReviews: 32
  },

  {
    name: "Rajasthan White Marble",
    description: "Elegant white marble sourced from Rajasthan, suitable for residential flooring, countertops and wall applications.",
    price: 240,
    category: "Indian Marble",
    stock: 30,
    imagesUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    numReviews: 25
  },

  {
    name: "Indian Statuario Marble",
    description: "White Indian marble featuring attractive grey veining, perfect for premium flooring and statement walls.",
    price: 450,
    category: "Indian Marble",
    stock: 18,
    imagesUrl: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    numReviews: 41
  },

  {
    name: "Black Galaxy Granite",
    description: "Durable black granite with subtle natural patterns, ideal for kitchen countertops, stairs and commercial spaces.",
    price: 320,
    category: "Granite",
    stock: 22,
    imagesUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    numReviews: 29
  },

  {
    name: "Absolute Black Granite",
    description: "Deep black granite with a smooth polished finish, suitable for countertops, flooring and modern interiors.",
    price: 290,
    category: "Granite",
    stock: 35,
    imagesUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    numReviews: 37
  },

  {
    name: "Classic White Onyx",
    description: "Luxurious translucent white onyx with natural patterns, designed for premium walls, counters and decorative interiors.",
    price: 850,
    category: "Onyx Stone",
    stock: 10,
    imagesUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    numReviews: 16
  },

  {
    name: "Imported Carrara Marble",
    description: "Premium imported marble with soft grey veining and a sophisticated appearance for luxury residential interiors.",
    price: 750,
    category: "Imported Marble",
    stock: 12,
    imagesUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    numReviews: 28
  },

  {
    name: "Italian Calacatta Marble",
    description: "High-end Italian marble with dramatic veining and a luxurious finish, ideal for feature walls and premium flooring.",
    price: 1200,
    category: "Imported Marble",
    stock: 8,
    imagesUrl: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    numReviews: 19
  },

  {
    name: "Premium Marble Tiles",
    description: "Elegant polished marble tiles designed for modern floors, bathrooms, kitchens and decorative wall applications.",
    price: 180,
    category: "Marble Tiles",
    stock: 50,
    imagesUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    numReviews: 22
  },

  {
    name: "Natural Sandstone",
    description: "Strong and naturally textured sandstone suitable for outdoor flooring, walls, pathways and architectural projects.",
    price: 150,
    category: "Sandstone",
    stock: 45,
    imagesUrl: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    numReviews: 17
  },

  {
    name: "Rainforest Brown Marble",
    description: "Distinctive natural marble with rich brown patterns inspired by the textures of a rainforest, ideal for feature walls.",
    price: 390,
    category: "Indian Marble",
    stock: 14,
    imagesUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    numReviews: 21
  },

  {
    name: "Fantasy Brown Marble",
    description: "Beautiful marble featuring brown, grey and white flowing patterns, suitable for countertops and luxury interiors.",
    price: 520,
    category: "Indian Marble",
    stock: 20,
    imagesUrl: "https://images.unsplash.com/photo-1600566753051-9c57f3d6b1d1?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    numReviews: 34
  }
    ];

    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();