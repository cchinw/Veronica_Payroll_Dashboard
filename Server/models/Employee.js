const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    currentStatus: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = Employee
