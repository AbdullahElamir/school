var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var System = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  sys_class:{ 
    type: [{
      id_class:{type: Schema.Types.ObjectId , ref: 'Class'},
      selected:{
        type:[{
          id_subject:{type:Schema.Types.ObjectId , ref: 'Subject'}
        }]
      }
    }]
  },
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

System.plugin(timestamps);
System.index({ name: 'text'});
exports.System = mongoose.model('System', System);