console.log('Starting notes.js..');

const fs = require('fs');

var fetchNotes = () => {
	try {
	var notesString = fs.readFileSync('notes.json');
	return JSON.parse(notesString);
	
	} catch (e) {
	  return [];	
	}
	
};

var saveNotes = (notes) => {
	  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicatedNote = notes.filter((note) => note.title === title);
	
	if (duplicatedNote.length === 0) {
	  notes.push(note);
	  saveNotes(notes);
	  return note;
	}
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var deleteNote = notes.filter((note) => note.title !==	title);
	saveNotes(deleteNote);
	
	return notes.length !== deleteNote.length;
}

var getNote = (title) => {
	var notes = fetchNotes();
	var findNote = notes.filter((note) => note.title === title);
	//console.log(findNote);
	return findNote[0];
}

module.exports = {
	addNote,
	removeNote,
	getNote
};