/* QUERY SELECTORS*/
/* 1. checkbox functionality */
const readCheckbox = document.querySelector("#read");
const disabledInputs = document.querySelectorAll(".disabled");

//2. Rating button functionality

const starRating = document.querySelectorAll(".star-rating");

//3. Add book button and not display read part 

const addBookBtn = document.querySelector("#add-book-btn");
const form = document.querySelector("form");
let notDisplayedSection = document.querySelector("section:last-of-type");

/* STAR RATING */
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

//"HAVE YOU FINISHED IT" CHECKBOX FUNCTIONALITY (readCheckbox)

/* Disables or enables the inputs that are hidden behind the "Have you finished it" checkbox (readCheckbox)*/

function disableEnableHiddenInputs() {
  disabledInputs.forEach((disabledInput) => {
    disabledInput.toggleAttribute(
      "disabled"
    );
  });
}

readCheckbox.addEventListener("click", () => {
  /* hides and shows the section*/
  let notDisplayedSection = document.querySelector("section:last-of-type");
  notDisplayedSection.classList.toggle("not-displayed");
  resetStars();
  disableEnableHiddenInputs();
  disabledInputs.forEach((disabledInput) => {
    //reseting the values of the other inputs (excluding radio since the value isn't added by the user and has to stay the same)
    if (disabledInput.getAttribute("type") !== "radio") {
      disabledInput.value = null;
    }
  });
});

/* ADD BOOK BUTTON AND EXIT FORM BUTTON */

addBookBtn.addEventListener("click", function () {
  form.classList.remove("not-displayed");
  notDisplayedSection.setAttribute("disabled", "");
  disabledInputs.forEach((disabledInput) => {
    disabledInput.setAttribute("disabled", "");
  })

});

function exitFormBtnReset() {
  resetStars();
  notDisplayedSection.classList.add("not-displayed");
  form.classList.add("not-displayed");
  if (readCheckbox.checked) {
    disableEnableHiddenInputs();
  }
}
const exitFormBtn = document.querySelector("#exit-form-btn");
exitFormBtn.addEventListener("click", exitFormBtnReset);

const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("#submit-btn");

/*CONSTRUCTOR FUNCTION FOR BOOK OBJECTS*/

function Book() {
  /* select form control */
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    if (input.name === "date-start") {
      let inputName = "Started reading";
      this[inputName] = input.value;
    } else if (input.name === "date-end") {
      let inputName = "Finished reading";
      this[inputName] = input.value;
      /* rating filter makes sure that only the checked rating form control is added.
      Otherwise it would add each one since they all have a value */
    } else if (input.name === "rating") {
      if (input.name === "rating" && input.checked) {
        let inputName = input.name;
        this[inputName] = input.value;
      }
    } else {
      let inputName = input.name;
      this[inputName] = input.value;
    }
  });
  /* textarea form control */
  const review = document.querySelector("#review");
  this.review = review.value;
  const genre = document.querySelector("#genre");
  this.genre = genre.value;
  this.checkReadStatus();
}
/* checks if the book was read */
Book.prototype.checkReadStatus = function () {
  const read = document.querySelector("#read");
  if (read.checked) {
    this.read = true;
  } else {
    this.read = false;
  }
};
/* ADD READ SIGN IF BUTTON PRESSED*/

Book.prototype.changeReadStatus = function () {
  this.read = true;
};

//ARRAY FILLED WITH BOOKS AND ADDING BOOKS TO THE ARRAY
let myLibrary = [];


function addBookToLibrary() {
  let book = new Book();
  myLibrary.push(book);
}

/* DISPLAYING BOOKS FROM ARRAY */
const librarySection = document.querySelector("#book-library-section");

function displayLibrary() {
  /* removes the previously shown books */
  let allListedBooks = document.querySelectorAll(".listed-book");
  allListedBooks.forEach((listedBook) => {
    listedBook.remove();
  });

  for (let book of myLibrary) {
    let container = document.createElement("div");
    container.classList.add("book");
    container.setAttribute("data-book-position", myLibrary.indexOf(book));
    let indexNum = myLibrary.indexOf(book);
    librarySection.appendChild(container);
    let dltBookBtn = document.createElement("button");
    /* Minimization */
    container.addEventListener("mouseover", () => {
      let minimizedItems = document.querySelectorAll(`.minimized`);
      
      minimizedItems.forEach((minimizedItem) => {
        if (minimizedItem.getAttribute("data-index") == indexNum) {
          minimizedItem.classList.toggle("not-displayed");
        }
      });
    });
    container.addEventListener("mouseout", () => {
      let minimizedItems = document.querySelectorAll(`.minimized`);
      
      minimizedItems.forEach((minimizedItem) => {
        if (minimizedItem.getAttribute("data-index") == indexNum) {
          minimizedItem.classList.toggle("not-displayed");
        }
      });
    });

    /* delete book button */
    dltBookBtn.setAttribute("type", "button");
    dltBookBtn.setAttribute("data-book-position", myLibrary.indexOf(book));
    dltBookBtn.classList.add("dlt-book-btn");
    container.appendChild(dltBookBtn);
    dltBookBtn.addEventListener("click", () => {
      if (
        container["data-book-position"] === dltBookBtn["data-book-position"]
      ) {
        container.remove();
        myLibrary.splice(dltBookBtn["data-book-position"], 1);
      }
    });

    let list = document.createElement("ul");
    container.classList.add("listed-book");
    container.appendChild(list);
    /* Read Sign Button */
    let readSignBtn = document.createElement("button");
    readSignBtn.setAttribute("type", "button");
    readSignBtn.classList.add("read-btn", "not-displayed", "minimized");
    readSignBtn.setAttribute("data-index", indexNum);
    readSignBtn.textContent = "Read";
    container.appendChild(readSignBtn);

    readSignBtn.addEventListener("click", () => {
      let readSignText = document.createElement("h4");
      readSignText.classList.add("read-sign-text");
      readSignText.textContent = "Finished Reading";
      container.appendChild(readSignText);
      book.changeReadStatus();
      readSignBtn.setAttribute("style", "display: none");
    });
    /* Form controls result */
    for (let [key, value] of Object.entries(book)) {
      console.log(key, value);
      if (key === "read") {
        if (value) {
          let readSign = document.createElement("h4");
          readSign.classList.add("read-sign-text");
          readSign.textContent = "Finished Reading";
          container.appendChild(readSign);
          readSignBtn.setAttribute("style", "display: none");
        }
      } else if (value) {
        let listItem = document.createElement("li");
        
        if (key !== "title" && key !== "author") {
          listItem.classList.add("not-displayed", "minimized");
          listItem.setAttribute("data-index", indexNum);
          if (key === "genre") { /* Inserts the genre behind the author list item */
            let author =
              document.querySelector(
                `div[data-book-position="${indexNum}"] li:nth-child(2)` 
              );
            listItem.textContent = `${key}: ${value}`; 
            author.insertAdjacentElement(
              "afterend",
              listItem
            ); 
            continue;
          } else if (key === "rating") {
            listItem.textContent = `${key}: `;
            for (let i = 1; i <= value;  i++) {
              let star = document.createElement("img");
              star.setAttribute("src", "/images/star-gold.svg");
              star.setAttribute("alt", "image of star");
              listItem.appendChild(star); 
            }
            list.appendChild(listItem);
            continue;
          }
        }
        listItem.textContent = `${key}: ${value}`;
        list.appendChild(listItem);
      }
    }
  }
}

/* VALIDITY CHECK */

/* event listener for the "submit" button in the form*/
function clickSubmitBtn() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  if (title.checkValidity() && author.checkValidity()) {
    addBookToLibrary();
    displayLibrary();
    resetStars();

    if (readCheckbox.checked) {
      disableEnableHiddenInputs();
    }
    exitFormBtnReset();
    form.reset();
  }
}

submitBtn.addEventListener("click", clickSubmitBtn);
