const frontInput = document.getElementById('front-text');
const backInput = document.getElementById('back-text');
const addCardBtn = document.getElementById('add-card-btn');
const cardsContainer = document.getElementById('cards-container');
const notesModal = document.getElementById('notes-modal');
const closeBtn = document.querySelector('.close-btn');
const notesTextarea = document.getElementById('notes-text');
const saveNotesBtn = document.getElementById('save-notes-btn');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
let currentCardIndex = null;

function renderFlashcards() {
    cardsContainer.innerHTML = '';
    flashcards.forEach((card, index) => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerHTML = `
            <div class="flashcard-content">
                <p class="card-front">${card.front}</p>
            </div>
            <div class="card-actions">
                <button class="btn delete-btn" data-index="${index}">Delete</button>
                <button class="btn notes-btn" data-index="${index}">Notes</button>
            </div>
        `;
        
        flashcardElement.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const front = flashcardElement.querySelector('.card-front');
                if (front.textContent === card.front) {
                    front.textContent = card.back;
                } else {
                    front.textContent = card.front;
                }
            }
        });
        
        cardsContainer.appendChild(flashcardElement);
    });

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteCard(index);
        });
    });

    document.querySelectorAll('.notes-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCardIndex = e.target.dataset.index;
            showNotesModal();
        });
    });
}

function addCard() {
    const front = frontInput.value.trim();
    const back = backInput.value.trim();

    if (front && back) {
        flashcards.push({ front, back, notes: '' });
        saveAndRender();
        frontInput.value = '';
        backInput.value = '';
    } else {
        alert("Please fill in both fields.");
    }
}

function deleteCard(index) {
    if (confirm("Are you sure you want to delete this flashcard?")) {
        flashcards.splice(index, 1);
        saveAndRender();
    }
}

function showNotesModal() {
    const card = flashcards[currentCardIndex];
    notesTextarea.value = card.notes;
    notesModal.style.display = "block";
}

function hideNotesModal() {
    notesModal.style.display = "none";
}

function saveNotes() {
    if (currentCardIndex !== null) {
        flashcards[currentCardIndex].notes = notesTextarea.value;
        saveToLocalStorage();
        alert("Notes saved successfully!");
        hideNotesModal();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function saveAndRender() {
    saveToLocalStorage();
    renderFlashcards();
}

addCardBtn.addEventListener('click', addCard);
closeBtn.addEventListener('click', hideNotesModal);
saveNotesBtn.addEventListener('click', saveNotes);
window.addEventListener('click', (e) => {
    if (e.target === notesModal) {
        hideNotesModal();
    }
});

// Initial render
renderFlashcards();