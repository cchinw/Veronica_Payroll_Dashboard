const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Schema.Types.ObjectId, ref: 'Status', required: true }
  },
  { timestamps: true }
)

module.exports = Employee
