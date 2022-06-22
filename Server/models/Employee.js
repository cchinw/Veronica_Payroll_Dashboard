const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isCurrent: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = Employee
