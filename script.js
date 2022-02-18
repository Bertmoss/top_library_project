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
  })
}



//CHECKBOX FUNCTIONALITY (HAVE YOU FINISHED IT)
//Disabling/enabling the not displayed section
//NEED TO ORGANIZE THE DISABLING ENABLING BETTER. SEE IF NECESSARY TO DISABLE THINGS WHEN HIDDEN



const readCheckbox = document.querySelector("#read");

readCheckbox.addEventListener("click", () => {
  let notDisplayedSection = document.querySelector("section:last-of-type");
  let disabledInputs = document.querySelectorAll(".disabled");
  notDisplayedSection.classList.toggle("not-displayed");
  resetStars();
  disabledInputs.forEach((disabledInput) => {
    //reseting the values of the other inputs (excluding radio)
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


addBookBtn.addEventListener("click", function() {
  form.classList.remove("not-displayed");

})

const exitFormBtn = document.querySelector("#exit-form-btn")
exitFormBtn.addEventListener("click", () => {
  resetStars();
  notDisplayedSection.classList.toggle("not-displayed");
  form.classList.add("not-displayed");
})














const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("#submitBtn");

//array filled with library books
const library = [];

//constructor function for new Book Objects
function Book(
  title,
  author,
  genre,
  pages,
  read,
  dateStart,
  dateEnd,
  rating,
  review
) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
  this.dateStart = dateStart;
  this.dateEnd = dateEnd;
  this.rating = rating;
  this.review = review;
}

//function prompting for library books from user

let string = "";

inputs.forEach((input) => {
  string += `${input.value},`;
});

/*
function addBookToLibrary() {
  let book = new Book(undefined, undefined, undefined, undefined, undefined);
  inputs.forEach((input) => {
    switch (input) {
      case input.name == title:
        book.title = input.value;
        break;
    }
  });
  return library.push(book);
}
console.log(library.length);
*/
