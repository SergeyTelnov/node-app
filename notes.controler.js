const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await saveNotes(notes);
  console.log(chalk.bgBlue("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.green(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.bgRed(`Note with id="${id}" has been removed.`));
}

async function changeNote(id, title) {
  const notes = await getNotes();
  const newNotes = notes.map((n) => {
    if (n.id === id) {
      return (n = { ...n, title: title });
    }
    return n;
  });
  await saveNotes(newNotes);
  console.log(chalk.bgGreen(`Note with id="${id}" has been changed.`));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  changeNote,
};
