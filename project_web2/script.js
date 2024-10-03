// Function to add a note to localStorage
document.getElementById('note-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let addTitle = document.getElementById('note-title');
    let addTxt = document.getElementById('note-text');

    if (addTitle.value.trim() === '' || addTxt.value.trim() === '') {
        alert('Please add Note Title and Details');
        return;
    }

    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    };

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTxt.value = '';
    addTitle.value = '';

    showNotes();
});

// Function to display notes from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    let html = '';
    notesObj.forEach(function(element, index) {
        html += `
            <div class="note">
                <p class="note-counter">Note ${index + 1}</p>
                <h3 class="note-title">${element.title}</h3>
                <p class="note-text">${element.text}</p>
                <button onclick="deleteNote(${index})" class="note-btn">Delete Note</button>
                <button onclick="editNote(${index})" class="note-btn edit-btn">Edit Note</button>
            </div>
        `;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = 'No Notes Yet! Add a note using the form above.';
    }
}

// Function to delete a note
function deleteNote(index) {
    let confirmDel = confirm('Delete this note?');
    if (confirmDel) {
        let notes = localStorage.getItem('notes');
        let notesObj = notes ? JSON.parse(notes) : [];

        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));

        showNotes();
    }
}

// Function to edit a note
function editNote(index) {
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    let addTitle = document.getElementById('note-title');
    let addTxt = document.getElementById('note-text');

    // Check if form is cleared before editing
    if (addTitle.value.trim() !== '' || addTxt.value.trim() !== '') {
        alert('Please clear the form before editing a note');
        return;
    }

    addTitle.value = notesObj[index].title;
    addTxt.value = notesObj[index].text;

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();
}

// Initial display of notes when the page loads
showNotes();