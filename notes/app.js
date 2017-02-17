console.log('Starting app..');

const fs = require ('fs');
const _	= require ('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
//console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
	try {
		var title = note.title;
	} catch (e) {
		
	}	
	if (note) console.log(`Note: ${title} added.`);
	else console.log('Note not added');
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
	  console.log(`note found ${note.body}`);
  }
  else console.log('note NOT found');
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note NOT found';
	console.log(message);
  
} else {
  console.log('Command not recognized');
}
