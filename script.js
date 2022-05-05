//RATING BUTTON FUNCTIONALITY

const starRating = document.querySelectorAll(".star-rating");

starRating.forEach((star) => {
  star.addEventListener("click", function () {
    activateStars(this.value);
  });
});

function activateStars(selectedStarValue) {
  starRating.forEach((star) => {
    if (star.value <= selectedStarValue) {
      star.classList.add("golden-star");
      star.classList.remove("black-star");
    } else {
      star.classList.remove("golden-star");
      star.classList.add("black-star");
    }
  });
}

//Reset Star Images from gold to black hide bottom function
function resetStars() {
  const stars = document.querySelectorAll("[type = radio]");
  stars.forEach((star) => {
    star.checked = false;
    star.classList.replace("golden-star", "black-star");
  });
}

//CHECKBOX FUNCTIONALITY
//Disabling/enabling the not displayed section
//NEED TO ORGANIZE THE DISABLING ENABLING BETTER. SEE IF NECESSARY TO DISABLE THINGS WHEN HIDDEN

const readCheckbox = document.querySelector("#read");



readCheckbox.addEventListener("click", () => {
  let notDisplayedSection = document.querySelector("section:last-of-type");
  let disabledInputs = document.querySelectorAll(".disabled");
  notDisplayedSection.classList.toggle("not-displayed");
  resetStars();
  disabledInputs.forEach((disabledInput) => {
    //reseting the values of the other inputs (excluding radio since the value isn't added by the user and has to stay the same)
    if (disabledInput.getAttribute("type") !== "radio") {
      disabledInput.value = null;
    }
    //disabling and enabling the hidden inputs
    disabledInput.getAttribute("disabled") === null
      ? disabledInput.setAttribute("disabled", "")
      : disabledInput.removeAttribute("disabled");
  });
});

const addBookBtn = document.querySelector("#add-book-btn");
const form = document.querySelector("form");
let notDisplayedSection = document.querySelector("section:last-of-type");

addBookBtn.addEventListener("click", function () {
  form.classList.remove("not-displayed");
});

function exitFormBtnReset() {
  resetStars();
  notDisplayedSection.classList.add("not-displayed");
  form.classList.add("not-displayed");
}
const exitFormBtn = document.querySelector("#exit-form-btn");
exitFormBtn.addEventListener("click", exitFormBtnReset);

const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("#submit-btn");

/* constructor function for Book Objects*/

function Book() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const genre = document.querySelector("#genre");
  const pages = document.querySelector("#pages");
  
  const dateStarted = document.querySelector("#date-start");
  const dateEnded = document.querySelector("#date-end");
  const review = document.querySelector("#review");
  let dateTextStart = "Date started";
  this.title = title.value;
  this.author = author.value;
  this.genre = genre.value;
  this.pages = pages.value;
  /* this.read = read.value; */
  this.dateStarted = dateStarted.value;
  this.dateEnded = dateEnded.value;
  this.review = review.value;
  this.checkReadStatus();
}
Book.prototype.checkReadStatus = function() {
  const read = document.querySelector("#read");
  if (read.checked) {
    this.read = true;
  } else {
    this.read = false;
  }
}

//array filled with library books
let myLibrary = [];

function addBookToLibrary() {
  let book = new Book();
  myLibrary.push(book);
}

/* displaying the library books */
const librarySection = document.querySelector("#book-library-section");

function displayLibrary() {
  /* removes the previously shown books */
  let allListedBooks = document.querySelectorAll(".listed-book");
  allListedBooks.forEach((listedBook) => {
    listedBook.remove();
  });

  for (let book of myLibrary) {
    let container = document.createElement("div");
    librarySection.appendChild(container);
    let list =
      document.createElement(
        "ul"
      ); /* create a class that will style this list element and add it */
    container.classList.add("listed-book");
    container.appendChild(list);

    for (let [key, value] of Object.entries(book)) {
      if (key === "read") {
        console.log(`${key}: ${value}`);
        continue;
      } else if (value) {
        let listItem = document.createElement("li");
        listItem.textContent = `${key}: ${value}`;
        list.appendChild(listItem);
      }
    }
  }
}

/* check validity  */

/* event listener for the "submit" button in the form*/
function clickSubmitBtn() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  if (title.checkValidity() && author.checkValidity()) {
    addBookToLibrary();
    displayLibrary();
    resetStars();
    let disabledInputs = document.querySelectorAll(".disabled");
    disabledInputs.forEach((disabledInput) => {
      disabledInput.getAttribute("disabled") === null
      ? disabledInput.setAttribute("disabled", "")
      : disabledInput.removeAttribute("disabled");
  })
    
    exitFormBtnReset()
    form.reset(); 
  }
 
}

submitBtn.addEventListener("click", clickSubmitBtn);
