const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubsectionSchema = Schema({
  title: String,
  sectionId: {type: Schema.Types.ObjectId, ref: "Section"},
  imgPath: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Subsection = mongoose.model('Subsection', SubsectionSchema);

module.exports = Subsection;