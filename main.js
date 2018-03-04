// HTML elements converted to variables.
const nameInput = document.getElementById('name-input');
const numberInput = document.getElementById('number-input');
const listDisplay = document.getElementById('list-display');
const selectedEntry = document.getElementById('selected-entry');
const displayModePicker = document.getElementById('display-mode');
const resultsModal = document.getElementById('selected-entry-modal');
const entryError = document.getElementById('error');

let condensed = false;
let entries = [];
let condensedEntries = {};

//Adds entry to array and increases count in condensedEntries object.
function addEntry(e) {
    event.preventDefault();
	// Assigns variables to form inputs.
	const name = nameInput.value;
	const num = numberInput.value;
	// Removes error when new entry submitted.
	error.innerHTML = "";
	// Adds total amount of entries for each name. {Name: Total}
	if (condensedEntries[name] == undefined) {
		condensedEntries[name] = parseInt(num);
	} else {
		condensedEntries[name] += parseInt(num);
	}
	// Adds number entries depending on submited number value.
	for (i=0; i<num; i++) {
		entries.push(name);
	};
	updateList();
};

// Removes entry from array and lowers count in condensedEntries object.
function removeEntry() {
	const buttonId = event.srcElement.id.split('-');
	const entry = buttonId[1];
	const removableIndex = parseInt(entry);

	if (condensed === false) {
		const name = entries[removableIndex];
		if (condensedEntries[name] === 1) {
			// Deletes key-value pair from object.
			delete condensedEntries[name];
		} else {
			// Subtracts from number of total entries for a name.
			condensedEntries[entries[removableIndex]] -= 1;
		}
		entries.splice(removableIndex, 1);
	} else if (condensed === true) {
		const entryName = entry;
		const count = entries.length;
		for (i=0; i<entries.length; i++) {
			if (entries[i] === entryName) {
				entries.splice(i, 1);
				if (condensedEntries[entryName] === 1) {
					delete condensedEntries[entryName];
				} else {
					condensedEntries[entryName] --;
				}
				i = entries.length;
			} 
		}
	}

	updateList();
};
// Clears the entries array and condensedEntries objects.
// Then updates the list view.
function clearAllEntries() {
	if (entries.length > 0) {
		entries = [];
		condensedEntries = {};
		updateList();
	} else {
		error.innerHTML = "There is nothing to clear.";
	}
}


// Updates list of entries everytime an entry is added, removed, 
// or the display is changed.
function updateList() {
	var input = '';

	if (condensed === false) {
		for (i=0; i<entries.length; i++) {
			entry = `<div class='list-item'><h6>${entries[i]}</h6>` + ` <button class='entry-button' id='button-${i}' onclick='removeEntry()'>x</button></div>`
			input += entry;
		}
	} else if (condensed === true) {
		Object.keys(condensedEntries).forEach(function(key) {
			entry = `<div class='list-item'><h6>${key} x${condensedEntries[key]}</h6>` + `<button class='entry-button' id='button-${key}' onclick='removeEntry()'>x</button></div>`
			input += entry;
		});
	}


	listDisplay.innerHTML = input;
};


// Changes the display mode when checkbox is changed.
function changeDisplayMode() {
	if (condensed) {
		condensed = false;
	} else if (!condensed) {
		condensed = true;
	}
	updateList();
}

// Selects a random entry by creating a random number and selecting 
// that index in the entries array.
function getRandomEntry() {
	if (entries.length != 0) {
		const randNum = (Math.floor(Math.random() * entries.length));
		const result = entries[randNum];
	
		resultsModal.style.display = 'flex';
		selectedEntry.innerHTML= "<h1>" + result + "</h1>";
	} else {
		error.innerHTML = "Please add at least one entry.";
	}
};

// Exits modal by clicking outside display box.
function exitModal() {
	resultsModal.style.display = 'none';
};

