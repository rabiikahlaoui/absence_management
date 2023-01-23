const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
  startDate: String,
  endDate: String,
  createdAt: String,
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employees'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});

module.exports = model('Absence', employeeSchema);
