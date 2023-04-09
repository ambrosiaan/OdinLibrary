const myLibrary = [];

const bookForm = document.getElementById("bookForm");
const tbody = document.querySelector("#booksTable tbody");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  return this;
}

Book.prototype.toggleReadStatus = function toggleRead() {
  this.read = !this.read;
};

function deleteRow(row) {
  const bookIndex = parseInt(row.getAttribute("data-id"), 10);
  myLibrary.splice(bookIndex, 1);
  row.remove();
}

function getBookFromForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read =
    document.querySelector('input[name="read"]:checked').value === "true";

  return new Book(title, author, pages, read);
}

function addToLibrary(book) {
  myLibrary.push(book);
  return myLibrary.length - 1;
}

function createDeleteButton(row) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", () => {
    deleteRow(row);
  });

  return deleteButton;
}

function addBookToTable(book, bookIndex) {
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

  const deleteButton = createDeleteButton(newRow);
  deleteCell.appendChild(deleteButton);
}
function addBookToLibrary(event) {
  event.preventDefault();

  const newBook = getBookFromForm();
  const bookIndex = addToLibrary(newBook);
  addBookToTable(newBook, bookIndex);
  console.log(myLibrary);
}

document.addEventListener(
  "DOMContentLoaded",
  bookForm.addEventListener("submit", addBookToLibrary)
);
