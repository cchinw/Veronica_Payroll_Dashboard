const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    currentStatus: { type: String }
  },
  { timestamps: true }
)

module.exports = Employee
