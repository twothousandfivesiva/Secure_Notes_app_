const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    USER: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})
const Note = mongoose.model('Note', NoteSchema)

module.exports = Note