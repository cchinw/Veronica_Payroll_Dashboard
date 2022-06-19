const { Schema } = require('mongoose')

const Status = new Schema(
  {
    isCurrent: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = Status
