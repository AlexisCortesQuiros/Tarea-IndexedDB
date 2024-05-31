// Obtener el contenedor de las notas del localStorage
const notesContainer = document.getElementById('notes-container');

// Cargar las notas existentes del localStorage al cargar la página
const notes = JSON.parse(localStorage.getItem('notes')) || [];

// Renderizar las notas existentes
notes.forEach(noteText => addNewNoteElement(noteText));

// Función para agregar una nueva nota
function addNewNote() {
  // Agregar una nueva nota al array de notas
  notes.push('');

  // Actualizar el localStorage
  updateLocalStorage();

  // Renderizar la nueva nota
  addNewNoteElement('');
}

// Función para renderizar una nota
function addNewNoteElement(text) {
  // Crear un nuevo elemento de nota
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');

  // Crear el contenido de la nota (botones y área de texto)
  noteElement.innerHTML = `
    <div class="tools">
      <button onclick="editNote(${notes.length - 1})">Edit</button>
      <button onclick="deleteNote(${notes.length - 1})">Delete</button>
    </div>
    <div class="main">${text}</div>
    <textarea class="hidden">${text}</textarea>
  `;

  // Agregar la nota al contenedor
  notesContainer.appendChild(noteElement);
}

// Función para editar una nota
function editNote(index) {
  const noteElement = notesContainer.children[index];
  const mainDiv = noteElement.querySelector('.main');
  const textArea = noteElement.querySelector('textarea');

  // Alternar la visibilidad entre el contenido principal y el área de texto
  mainDiv.classList.toggle('hidden');
  textArea.classList.toggle('hidden');
}

// Función para eliminar una nota
function deleteNote(index) {
  // Eliminar la nota del array y del contenedor
  notes.splice(index, 1);
  notesContainer.children[index].remove();

  // Actualizar el localStorage
  updateLocalStorage();
}

// Función para actualizar el localStorage con las notas actuales
function updateLocalStorage() {
  const notesText = Array.from(notesContainer.children).map(noteElement => {
    return noteElement.querySelector('textarea').value;
  });

  localStorage.setItem('notes', JSON.stringify(notesText));
}