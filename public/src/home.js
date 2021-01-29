//return a number that represents the total number of book objects inside of the array
function totalBooksCount(books) {         
  return books.length;
}

//return a number that represents the total number of account objects inside of the array
function totalAccountsCount(accounts) {   
  let total = accounts.reduce(total => {
  return total + 1}, 0); 
  return total;
}

//return a number that represents the number of books borrowed (borrows is false)
function booksBorrowedCount(books) {      
  let borrowedBooksArray = books.filter((book) => 
    book.borrows[0].returned === false);
  return totalBooksCount(borrowedBooksArray);       //helper function
}

/*return an array containing five objects or less that represents the most common occurring genres, ordered from most common to least.
Each object in the returned array has two keys:
- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.
If more than five genres are present, only the top five should be returned.
*/
function getMostCommonGenres(books) {     
const newObject = {};                                                             //create an empty object
const newArray = [];                                                              //create an empty array
  for (const book of books) {                                                     //iterate over books array thru each book index
    newObject[book.genre] ? newObject[book.genre] +=1 : newObject[book.genre] = 1 //ternary operator used to add count of genre into newObject
  }
  for (let i=0; i < Object.keys(newObject).length; i++) {                         //iterate over newObject
    newArray.push({                                                               //push the new keys and values into newArray
      name:Object.keys(newObject)[i],
      count: Object.values(newObject)[i]
    })
  } 
  return newArray.sort((genreA,genreB) =>                                         //sort in descending order
  genreA.count > genreB.count ? -1 : 1 ).slice(0,5);                              //return an array of top 5 genre objects
}

/*returns an array containing five objects or less that represents the most popular books in the library. 
Popularity is represented by the number of times a book has been borrowed.
Each object in the returned array has two keys:
  - The `name` key which represents the title of the book.
  - The `count` key which represents the number of times the book has been borrowed
*/
function getMostPopularBooks(books) { 
const newArray = [];                                        //create empty array  
  for (const book of books) {                               //loop over books array thru each book
  const {borrows, title} = book;                            //destructure book object
    newArray.push({                                         //push title and count into newArray
      name:title, 
      count:borrows.length
    })
  }
  return newArray.sort((borrowsA,borrowsB) =>               //sort new array in descending order
    borrowsA.count > borrowsB.count ? -1 : 1 ).slice(0,5);  //return new array of 5 top book objects
}

/*returns an array containing top 5 objects that represents the most popular authors whose books have been checked out the most. 
Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
Each object in the returned array has two keys:
  - The `name` key which represents the first and last name of the author.
  - The `count` key which represents the number of times the author's books have been borrowed
*/
function getMostPopularAuthors(books, authors) {  
const popTitles = []                                    //create an empty titles array
  for (const book of books) {                           //loop over books array thru every book
  let count = book.borrows.length;                      //assign number of book borrows to count
    for (let author of authors) {                       //loop over authors array thru every author
    const {first, last} = author.name;                  //destructure author's name
      if (book.authorId === author.id) {                //if the book's author id matches author id
      authorFullName = `${first} ${last}`               //then assign author full name
      }
    }
    popTitles.push({                                    //push rest of book data, author's full name
    ...book,                                            //and count of borrows into popTitles array
    authorFullName,
    count
    })
  }
let sortedPopTitles = popTitles.sort((titleA,titleB) => //sort titles by count in descending order
  titleA.count > titleB.count ? -1 : 1);
const popularAuthors = [];                              //create an empty authors array
  for (const oneTitle of sortedPopTitles) {             //loop over sorted titles array thru each title
    popularAuthors.push({                               //push name and count into authors array
    name : oneTitle.authorFullName,
    count : oneTitle.count
    })
  }
return popularAuthors.slice(0, 5);                      //return top 5 author objects
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
