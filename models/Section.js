const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = Schema({
  title: String,
  imgPath: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;