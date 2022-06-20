const { Schema } = require('mongoose')

const Employee = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isCurrent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: false
      }
    ]
  },
  { timestamps: true }
)

module.exports = Employee
