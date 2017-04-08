var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ClassSchema = new Schema({
  subject : String,
  course : String,
  crn : String,
  section : String,
  credit : String,
  title : String,
  schedule : [{
    days : [String],
    start_time : String, 
    end_time : String, 
    location : String,
    class_type : String,
    date : String
  }],
  instructor : [String],
  date : { 
    start_date : String, 
    end_date : String
  }
})

module.exports = mongoose.model('classes', ClassSchema);
