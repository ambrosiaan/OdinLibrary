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
  constructor(library) {
    this.library = library;
    this.bookForm = document.getElementById("bookForm");
    this.bookTableBody = document.querySelector("#booksTable tbody");
  }

  resetForm() {
    this.bookForm.reset();
  }

  addBookToLibrary() {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newBook = this.getBookFromForm();
      const bookIndex = this.library.addToLibrary(newBook);
      this.addBookToTable(newBook, bookIndex);
      this.resetForm();
      formModal.style.display = "none";
    });
  }

  addBookToTable(book, bookIndex) {
    const newRow = this.bookTableBody.insertRow(-1);
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

class Modal {
  constructor(modalWindowId, openButtonId, closeButtonClass) {
    this.modalWindow = document.getElementById(modalWindowId);
    this.openButton = document.getElementById(openButtonId);
    this.closeButton = document.querySelector(`.${closeButtonClass}`);
    this.init();
  }
  init() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    window.addEventListener("click", (event) => {
      if (event.target === this.modalWindow) {
        this.close();
      }
    });
  }

  open() {
    this.modalWindow.style.display = "block";
  }
  close() {
    this.modalWindow.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const myLibrary = new Library();
  const ui = new UI(myLibrary);
  const newBookModal = new Modal("formModal", "showFormButton", "close");
  ui.addBookToLibrary();
});
