const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
  title: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  subsectionId: { type: Schema.Types.ObjectId, ref: "Subsection"},
  content: String,
  picPath: {type: String, default:"/Users/yaredmyers/Documents/IronHack/lab/ironclub/public/images/admin1.png"},
  section: { type: String, enum: ['JavaScript', 'CSS', 'HTML', 'Node', 'Middlewares', 'Express', 'MongoDB'] }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;