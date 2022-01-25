import express from "express"

import relianceModel from "../models/relianceModel"
import data from "../data"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const reliance = await relianceModel.find()
    res.json(reliance)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

router.delete("/", async (req, res) => {
  try {
    const reliance = await relianceModel.collection.drop()
    res.json(reliance)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/seed", async (req, res) => {
  try {
    //
    const seedingData = data.map(item => {
      //
      return new relianceModel({
        price: parseFloat(item.Price),
        date: new Date(item.Date),
      })
    })

    return res.json(await Promise.all(seedingData.map(item => item.save())))
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

export default router
