const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, required: "required", unique: true },
  imgPath: {
    type: String, default: "/images/defaultprofile.png",
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
