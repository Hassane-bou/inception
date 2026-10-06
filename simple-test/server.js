const express = require('express');
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://admin:password@localhost:27017/testdb?authSource=admin';

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.send(`User ${name} saved! <a href="/">Back</a>`);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});