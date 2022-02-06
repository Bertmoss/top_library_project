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

let string = ""



inputs.forEach(input => {
  string += `${input.value},`
})



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