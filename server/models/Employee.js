const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
  fullName: String,
  email: String,
  address: String,
  jobTitle: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Employee', employeeSchema);
