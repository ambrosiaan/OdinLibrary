class Library {
  constructor(books = []) {
    this.books = books;
  }

  addToLibrary(book) {
    this.books.push(book);
    return this.books.length - 1;
  }

  deleteFromLibrary(bookIndex) {
    this.books.splice(bookIndex, 1);
  }

  getBook(bookIndex) {
    return this.books[bookIndex];
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class UI {
  constructor(library, bookForm, bookTableBody) {
    this.library = library;
    this.bookForm = bookForm;
    this.bookTableBody = bookTableBody;
  }
  addBookToLibrary() {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newBook = this.getBookFromForm();
      const bookIndex = this.library.addToLibrary(newBook);
      this.addBookToTable(newBook, bookIndex);
      formModal.style.display = "none";
    });
  }

  addBookToTable(book, bookIndex) {
    const newRow = tbody.insertRow(-1);
    newRow.setAttribute("data-id", bookIndex);

    const titleCell = newRow.insertCell(0);
    const authorCell = newRow.insertCell(1);
    const pagesCell = newRow.insertCell(2);
    const readCell = newRow.insertCell(3);
    const deleteCell = newRow.insertCell(4);

    titleCell.innerText = book.title;
    authorCell.innerText = book.author;
    pagesCell.innerText = book.pages;
    readCell.innerText = book.read ? "Yes" : "No";
    readCell.classList.add("toggle-text");

    readCell.addEventListener("click", () => {
      book.toggleReadStatus();
      readCell.innerText = book.read ? "Yes" : "No";
    });

    const deleteButton = this.createDeleteButton(newRow);
    deleteCell.appendChild(deleteButton);
  }

  deleteRow(row) {
    const bookIndex = parseInt(row.getAttribute("data-id"), 10);
    this.library.deleteFromLibrary(bookIndex);
    row.remove();
  }

  createDeleteButton(row) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
      this.deleteRow(row);
    });
    return deleteButton;
  }
  getBookFromForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read =
      document.querySelector('input[name="read"]:checked').value === "true";

    return new Book(title, author, pages, read);
  }
}

const bookForm = document.getElementById("bookForm");
const tbody = document.querySelector("#booksTable tbody");
const showModalButton = document.getElementById("showFormButton");
const formModal = document.getElementById("formModal");
const closeModalButton = document.querySelector(".close");

showModalButton.addEventListener("click", () => {
  formModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  formModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === formModal) {
    formModal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const myLibrary = new Library();
  const ui = new UI(myLibrary, bookForm, tbody);
  ui.addBookToLibrary();
});
