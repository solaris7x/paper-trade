import mongoose from "mongoose"

const relianceSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true
  //   },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    // default: Date.now
  },
})

export default mongoose.model("Reliance", relianceSchema)
