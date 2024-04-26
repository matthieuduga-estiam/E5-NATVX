// Import library
import fs from "fs"
import * as uuid from "uuid"

// Import model
import Article from "../models/article.model.js"
import User from "../models/user.model.js"

// Create a new article
export const create = async (req, res) => {

  const dbPhotos = []

  for (let i = 0; i < req.body.photos.length; i++) {
    let name = uuid.v4()
    
    fs.writeFileSync(`./assets/uploads/${name}.png`, req.body.photos[i].base64, "base64")

    dbPhotos.push(name)
  }

  try {
    const user = await User.findById(req.user.id)

    var model = new Article({
      name: req.body.name,
      description: req.body.description,
      size: req.body.size,
      price: req.body.price,
      condition: req.body.condition,
      isSold: req.body.isSold,
      photos: dbPhotos,
      owner: user,
    })

    const newArticle = await model.save()
    res.status(201).json(newArticle)
  }
  catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Retrieve all articles
export const findAll = async (req, res) => {
  try {
    const models = await Article.find()
    res.status(200).json(models)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Retrieve a single article with id
export const findOne = async (req, res) => {
  try {
    const model = await Article.findById(req.params.id).populate("owner")
    
    res.status(200).json(model)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Update an article with id
export const update = async (req, res) => {
  try {
    const model = await Article.findById(req.params.id)
    if(req.body.name) model.name = req.body.name
    if(req.body.description) model.description = req.body.description
    if(req.body.size) model.size = req.body.size
    if(req.body.price) model.price = req.body.price
    if(req.body.condition) model.condition = req.body.condition
    if(req.body.isSold) model.isSold = req.body.isSold
    await model.save()
    res.status(200).json(model)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Delete an article with id
export const remove = async (req, res) => {
  try {
    await Article.findByIdAndRemove(req.params.id)
    res.status(204).json()
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Find all articles by name where isSold is false and include the owner
export const search = async (req, res) => {
  try {
    const models = await Article.find({
      name: { $regex: new RegExp(req.body.search, "i") },
      isSold: false,
    }).populate("owner")

    // Set URL for each photo
    for (let i = 0; i < models.length; i++) {
      for (let j = 0; j < models[i].photos.length; j++) {
        let url = `${req.protocol}://${req.get('host')}/images/${models[i].photos[j]}`
        models[i].photos[j] = url
      }
    }

    res.status(200).json(models)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}