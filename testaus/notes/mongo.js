require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.TEST_MONGODB_URI)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'This course is getting on my nerves',
  important: false,
})

note.save().then((result) => {
  console.log('note saved!')
  mongoose.connection.close()
})
/*
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/