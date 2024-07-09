// ES6 Classes
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // method to toggle read
    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.cardContainer = document.querySelector('.card-container');
        this.openButton = document.querySelector('.open-button');
        this.modal = document.querySelector('#modal');
        this.titleInput = document.querySelector('#form-title');
        this.authorInput = document.querySelector('#form-author');
        this.pagesInput = document.querySelector('#form-pages');
        this.readInput = document.querySelector('#form-read');
        this.submitFormBtn = document.querySelector('#submit-form');

        this.initialize();
    }

    // method to initialize
    initialize() {
        this.submitFormBtn.addEventListener('click', () => this.addBookFromForm());
        this.openButton.addEventListener('click', () => this.modal.showModal());
        this.loopThroughLibrary();
    }

    // method to add book from form
    addBookFromForm() {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
        const pages = this.pagesInput.value;
        const read = this.readInput.checked ? true : false;

        const newBook = new Book(title, author, pages, read);
        this.addBookToLibrary(newBook);
        this.clearForm();
        this.render();
    }

    // method to add book to library
    addBookToLibrary(book) {
        this.myLibrary.push(book);
    }

    // method to clear form
    clearForm() {
        this.titleInput.value = '';
        this.authorInput.value = '';
        this.pagesInput.value = '';
        this.readInput.checked = false;
    }

    // method to loop through library
    loopThroughLibrary() {
        this.cardContainer.innerHTML = '';
        this.myLibrary.forEach((book, index) => this.createBookCard(book, index));
    }

    // method  to create book card
    createBookCard(book, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-index', index);

        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${book.title}`;

        const authorSpan = document.createElement('span');
        authorSpan.textContent = `By ${book.author}`;

        const pagesSpan = document.createElement('span');
        pagesSpan.className = 'pages';
        pagesSpan.textContent = `Pages: ${book.pages}`;

        const readBtn = this.createReadButton(book);
        const removeBtn = this.createRemoveButton(index);

        cardDiv.appendChild(titleSpan);
        cardDiv.appendChild(authorSpan);
        cardDiv.appendChild(pagesSpan);
        cardDiv.appendChild(readBtn);
        cardDiv.appendChild(removeBtn);

        this.cardContainer.appendChild(cardDiv);
    }

    // method to create read button
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

        readBtn.addEventListener('mouseover', () => {
            readBtn.style.backgroundColor = book.read ? "rgba(45, 106, 79, 0.7)" : "#e8edf4";
        });

        readBtn.addEventListener('mouseout', () => {
            this.setReadButtonColor(readBtn, book.read);
        });

        return readBtn;
    }

    // method to set read button color
    setReadButtonColor(button, read) {
        button.style.backgroundColor = read ? "rgba(64, 145, 108, 0.7" : "#d1d5db";
    }

    // method to create button
    createRemoveButton(index) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'cardRemoveBtn';
        removeBtn.textContent = 'Delete';

        removeBtn.addEventListener('click', () => {
            this.myLibrary.splice(index, 1);
            this.render();
        });

        return removeBtn;
    }

    // method to render
    render() {
        this.cardContainer.innerHTML = '';
        this.loopThroughLibrary();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();
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


    