const books = document.querySelector('#books');

const book = document.querySelector('.book');

const newBookBtn = document.querySelector('#newBookBtn');

const dialog = document.querySelector('dialog');

const addBookBtn = document.querySelector('#addBookBtn');

const readBtn = document.querySelector('.readBtn');

const title = document.querySelector('#title');

const author = document.querySelector('#author');

const pages = document.querySelector('#pages');

const read = document.querySelector('#yes');

const notRead = document.querySelector('#no');

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'no');

let richDadPoorDad = new Book('Rich Dad Poor Dad', 'Robert T. Kiyosaki', 336, 'yes');

let enciclopaediaBritannica = new Book('Encyclopaedia Britannica', '4411 contributors', 32640, 'yes');

let circe = new Book('Circe', 'Madeline Miller', 393, 'no');

const myLibrary = [theHobbit, richDadPoorDad, enciclopaediaBritannica, circe];

function Book(title, author, pages, isRead) { 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    if (this.isRead.toLowerCase() === 'yes') {
        return `${this.title} by ${this.author}, ${this.pages} pages, read`;
    } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
};

Book.prototype.changeReadStatus = function() {
    if (this.isRead === 'yes') {
        this.isRead = 'no';
    } else {
        this.isRead = 'yes';
    }
};

function displayBooks() {
    books.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book');
        books.appendChild(card);
        const title = document.createElement('span');
        title.textContent = `Title: ${book.title}`;
        card.appendChild(title);
        const author = document.createElement('span');
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);
        const pages = document.createElement('span');
        pages.textContent = `Number of Pages: ${book.pages}`;
        card.appendChild(pages);
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        removeBtn.textContent = 'Remove';
        card.appendChild(removeBtn);
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        const readBtn = document.createElement('button');
        readBtn.classList.add('readBtn');
        let isRead = book.isRead;
        if (isRead  === 'yes') {
                readBtn.textContent = 'Read';
                readBtn.style.color = 'green';
            } else {
                readBtn.textContent = 'Not Read Yet';
                readBtn.style.color = 'red';
            };
        card.appendChild(readBtn);
        readBtn.addEventListener('click', () => {
            book.changeReadStatus();
            readBtn.textContent = book.isRead === 'yes' ? 'Read' : 'Not Read Yet';
            readBtn.style.color = book.isRead === 'yes' ? 'green' : 'red';
        }); 
    }
)}

displayBooks();

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isRead;
    if (read.checked) {
        isRead = 'yes';
    } else {
        isRead = 'no';
    }
    let addedBook = new Book(title.value, author.value, parseInt(pages.value), isRead);
    addBookToLibrary(addedBook);
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
    notRead.checked = false;
    dialog.close();
});

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    displayBooks(newBook); 
}

