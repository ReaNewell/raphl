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

function addEntry(e) {
    event.preventDefault();

	const name = nameInput.value;
	const num = numberInput.value;
	error.style.display = "none";
	
	// Adds total amount of entries for each name. {Name: Total}
	if (condensedEntries[name] == undefined) {
		condensedEntries[name] = parseInt(num);
	} else {
		condensedEntries[name] += parseInt(num);
	}

	for (i=0; i<num; i++) {
		entries.push(name);
	};

	updateList();
};
function removeEntry() {
	const entry = event.srcElement.id.split('-');
	const removableIndex = parseInt(entry[1]);

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
		const entryName = entry[1];
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
function clearAllEntries() {
	entries = [];
	condensedEntries = {};
	updateList();
}

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

function getRandomEntry() {
	if (entries.length != 0) {
		const randNum = (Math.floor(Math.random() * entries.length));
		const result = entries[randNum];
	
		resultsModal.style.display = 'flex';
		selectedEntry.innerHTML= "<h1>" + result + "</h1>";
	} else {
		error.style.display = "block";
	}
};

resultsModal.addEventListener('click', function() {
	resultsModal.style.display = 'none';
});

function changeDisplayMode() {
	if (condensed) {
		condensed = false;
	} else if (!condensed) {
		condensed = true;
	}
	updateList();
}
