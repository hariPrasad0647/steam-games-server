const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000


const schema = new mongoose.Schema({
  gameName: String,
  steamLink: String,
  releaseData: String,
  developer: String,
  publisher: String,
  gameTrailer: String,
  genere: [String],
  screenshots: [String]
})

// ✅ Dynamic model based on collection name
const getModel = (collection) => {
  return mongoose.model(collection, schema, collection) // modelName, schema, collectionName
}

app.post('/api/:collection', async (req, res) => {
  const { collection } = req.params
  try {
    const Model = getModel(collection)
    const data = new Model(req.body)
    await data.save()
    res.status(201).json({ message: "Posted successfully" })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: "Something went wrong" })
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to DB')
    app.listen(PORT, () => {
      console.log(`server running on PORT ${PORT}`)
    })
  })
  .catch((e) => {
    console.log(`Error: ${e}`)
  })
