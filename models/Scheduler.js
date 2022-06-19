const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    employeeId: [{ type: Schema.Types.ObjectId, required: true }],
    start: { type: Date, default: Date.now, required: false },
    end: { type: Date, default: Date.now, required: false },
    hoursWorked: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = Employee
