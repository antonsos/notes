const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find(note => note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red('No note found!'))
    }    
}

const listNote = () => {
    const notes = loadNotes()

    if (notes.length) {
        console.log(chalk.blue('Your note(s)!'))
        notes.forEach(note => {
            console.log(chalk.green(note.title))
        });
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk(note.title))
        console.log(chalk.blue(note.body))
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNote,
    readNote,
}