const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name:String,
  description: String,
  location: { type: { type: String }, coordinates: [Number] },
  type: {type:String}
},{
  timestamps:true
})

eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event',eventSchema);

Event.add = function(name, description, lat, lng){
  return Event.create({
    name, description,
    location:{
      type:"Point",
      coordinates:[lat,lng]
    }
  })
}


module.exports = Event