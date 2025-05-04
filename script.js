// Refactored using ES6 Classes and SOLID Principles
// Single Responsibility: Represents a book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// Single Responsibility: Handles UI interactions for the form
class BookForm {
    constructor(onSubmit) {
        this.titleInput = document.querySelector('#form-title');
        this.authorInput = document.querySelector('#form-author');
        this.pagesInput = document.querySelector('#form-pages');
        this.readInput = document.querySelector('#form-read');

        this.form = document.querySelector('#book-form');
        this.modal = document.querySelector('#modal');

        // error spans
        this.titleError = document.querySelector('#form-title-error');
        this.authorError = document.querySelector('#form-author-error');
        this.pagesError = document.querySelector('#form-pages-error');

        // input event listeners
        this.titleInput.addEventListener('input', () => this.validateField(this.titleInput, this.titleError, 'Title field cannot be empty.'));
        this.authorInput.addEventListener('input', () => this.validateField(this.authorInput, this.authorError, 'Author field cannot be empty'));
        this.pagesInput.addEventListener('input', () => this.validateField(this.pagesInput, this.pagesError, 'Pages field cannot be empty'));

        // form event listener
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isTitleValid = this.validateField(this.titleInput, this.titleError, 'Title field cannot be empty.');
            const isAuthorValid = this.validateField(this.authorInput, this.authorError, 'Author field cannot be empty');
            const isPagesValid = this.validateField(this.pagesInput, this.pagesError, 'Pages field cannot be empty');

            if (!isTitleValid || !isAuthorValid || !isPagesValid) return

            onSubmit(this.getBookFromForm());
            this.modal.close();
        });

        this.modal.addEventListener('close', () => {
            console.log('clearing the form');
            this.clearForm();
        });
    }

    validateField(input, errorElement, message) {
        if (input.validity.valueMissing) {
            input.classList.remove('green');
            input.classList.add('red');

            errorElement.textContent = message;
            errorElement.classList.add('active');
            return false;
        } else {
            input.classList.remove('red');
            input.classList.add('green');
            errorElement.textContent = '';
            errorElement.classList.remove('active');
            return true;
        }
    }

    getBookFromForm() {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
        const pages = this.pagesInput.value;
        const read = this.readInput.checked;

        this.clearForm();
        return new Book(title, author, pages, read);
    }

    clearForm() {
        this.titleInput.value = '';
        this.authorInput.value = '';
        this.pagesInput.value = '';
        this.readInput.checked = false;

        this.titleError.textContent = '';
        this.authorError.textContent = '';
        this.pagesError.textContent = '';

        this.titleError.classList.remove('active');
        this.authorError.classList.remove('active');
        this.pagesError.classList.remove('active');

        this.titleInput.classList.remove('green', 'red');
        this.authorInput.classList.remove('green', 'red');
        this.pagesInput.classList.remove('green', 'red');
    }
}

// Single Responsibility: Manages the collection of books
class Library {
    constructor() {
        this.myLibrary = [];
    }

    addBook(book) {
        this.myLibrary.push(book);
    }

    removeBook(index) {
        this.myLibrary.splice(index, 1);
    }

    getBooks() {
        return this.myLibrary;
    }
}

// Single Responsibility: Renders the UI for the library
class LibraryUI {
    constructor(library, cardContainerSelector) {
        this.library = library;
        this.cardContainer = document.querySelector(cardContainerSelector);
    }

    render() {
        this.cardContainer.innerHTML = '';
        this.library.getBooks().forEach((book, index) => this.createBookCard(book, index));
    }

    createBookCard(book, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-index', index);

        const titleSpan = this.createSpan(book.title);
        const authorSpan = this.createSpan(`By ${book.author}`);
        const pagesSpan = this.createSpan(`Pages: ${book.pages}`, 'pages');
        const readBtn = this.createReadButton(book);
        const removeBtn = this.createRemoveButton(index);

        cardDiv.appendChild(titleSpan);
        cardDiv.appendChild(authorSpan);
        cardDiv.appendChild(pagesSpan);
        cardDiv.appendChild(readBtn);
        cardDiv.appendChild(removeBtn);

        this.cardContainer.appendChild(cardDiv);
    }

    createSpan(text, className = '') {
        const span = document.createElement('span');
        span.textContent = text;
        if (className) span.className = className;
        return span;
    }

    createReadButton(book) {
        const readBtn = document.createElement('button');
        readBtn.className = 'cardReadBtn';
        readBtn.textContent = book.read ? "Read" : "Not Read";
        this.setReadButtonColor(readBtn, book.read);

        readBtn.addEventListener('click', () => {
            book.toggleRead();
            readBtn.textContent = book.read ? "Read" : "Not Read";
            this.setReadButtonColor(readBtn, book.read);
        });

        return readBtn;
    }

    createRemoveButton(index) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'cardRemoveBtn';
        removeBtn.textContent = 'Delete';

        removeBtn.addEventListener('click', () => {
            this.library.removeBook(index);
            this.render();
        });

        return removeBtn;
    }

    setReadButtonColor(button, read) {
        button.style.backgroundColor = read ? "rgba(64, 145, 108, 0.7)" : "#d1d5db";
    }
}

// Single Responsibility: Manages the application logic
class LibraryApp {
    constructor() {
        this.library = new Library();
        this.libraryUI = new LibraryUI(this.library, '.card-container');
        this.bookForm = new BookForm(book => this.handleBookFormSubmit(book));

        this.setupEventListeners();
        this.libraryUI.render();
    }

    setupEventListeners() {
        const openButton = document.querySelector('.open-button');
        const modal = document.querySelector('#modal');

        openButton.addEventListener('click', () => {
        console.log('Modal is being opened');
        modal.showModal();
});
    }

    handleBookFormSubmit(book) {
        const modal = document.querySelector('#modal');
        modal.close();
        this.library.addBook(book);
        this.libraryUI.render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LibraryApp();
});




























// Function Contructors 
/*

const myLibrary =  [];

const cardContainer = document.querySelector('.card-container');

const openButton = document.querySelector('.open-button');
const modal = document.querySelector('#modal');

const titleInput = document.querySelector('#form-title');
const authorInput = document.querySelector('#form-author');
const pagesInput = document.querySelector('#form-pages');
const readInput = document.querySelector('#form-read');
const submitFormBtn = document.querySelector('#submit-form');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function() {
        this.read = !this.read;
    };
    }

    submitFormBtn.addEventListener('click', () => {
        title = titleInput.value;
        author = authorInput.value;
        pages = pagesInput.value;
        read = readInput.checked ? "read" : "not read";
    
        const newLibro = new Book(title, author, pages, read);
    
        addBookToLibrary(newLibro);
        clearForm();
        cardContainer.innerHTML = '';
        loopThroughLibrary(myLibrary, cardContainer);
    })
    
    
    openButton.addEventListener('click', () => {
        modal.showModal();
    });

    function addBookToLibrary(userInput) {
        userInput.read = readInput.checked;
        myLibrary.push(userInput);
    }

    function clearForm() {
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        readInput.checked = false;
    }
   

    function loopThroughLibrary(objects, targetElement) {
       objects.forEach((obj, index) => {
       
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-index', index);

        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${obj.title} `;

        const authorSpan = document.createElement('span');
        authorSpan.textContent = `By ${obj.author}`;

        const pagesSpan = document.createElement('span');
        pagesSpan.className = 'pages';
        pagesSpan.textContent = `Pages: ${obj.pages}`;

        
        const readBtn = document.createElement('button');
        readBtn.className = 'cardReadBtn';
        readBtn.textContent = obj.read ? "Read" : "Not Read";
        if (readBtn.textContent === "Read") {
            readBtn.style.backgroundColor = "rgba(64, 145, 108, 0.7)";
        } else if (readBtn.textContent === "Not Read") {
            readBtn.style.backgroundColor = "#d1d5db";
        };
        

        readBtn.addEventListener('click', () => {
            obj.toggleRead();
            readBtn.textContent = obj.read ? "Read": "Not Read";
            if (readBtn.textContent === "Read") {
                readBtn.style.backgroundColor = "rgba(64, 145, 108, 0.7)";
            } else if (readBtn.textContent === "Not Read") {
                readBtn.style.backgroundColor = "#d1d5db";
            };
        });

        readBtn.addEventListener('mouseover', () => {
            if (readBtn.textContent === "Read") {
                readBtn.style.backgroundColor = "rgba(45, 106, 79, 0.7)";
            } else if (readBtn.textContent === "Not Read") {
                readBtn.style.backgroundColor = "#e8edf4";
            };
        });

        readBtn.addEventListener('mouseout', () => {
            if (readBtn.textContent === "Read") {
                readBtn.style.backgroundColor = "rgba(64, 145, 108, 0.7)";
            } else if (readBtn.textContent === "Not Read") {
                readBtn.style.backgroundColor = "";
            };
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'cardRemoveBtn';
        removeBtn.textContent = "Delete";

        
        removeBtn.addEventListener('click', () => {
            const dataIndex = cardDiv.getAttribute('data-index');
            const indexToRemove = parseInt(dataIndex, 10);

            myLibrary.splice(indexToRemove, 1);
            cardContainer.innerHTML = '';
            loopThroughLibrary(myLibrary, cardContainer);
        });

        cardDiv.appendChild(titleSpan);
        cardDiv.appendChild(authorSpan);
        cardDiv.appendChild(pagesSpan);
        cardDiv.appendChild(readBtn);
        cardDiv.appendChild(removeBtn);

        targetElement.appendChild(cardDiv);
       });
    };

    loopThroughLibrary(myLibrary, cardContainer);

*/ 


    
