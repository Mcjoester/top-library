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

        // Setting up data attribute to store index of the book
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

        // Add click event to the remove button
        removeBtn.addEventListener('click', () => {
            //Retrieve the index from the data attribute
            const dataIndex = cardDiv.getAttribute('data-index');
            // Convert to number (index in myLibrary array)
            const indexToRemove = parseInt(dataIndex, 10);

            //Remove the book from the array and update the DOM
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



    