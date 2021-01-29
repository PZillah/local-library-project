//return the account object that has the matching ID
function findAccountById(accounts, id) {              
  return accounts.find(account => account.id === id); //use find method to access id of accounts array
}

//return a sorted array of objects
function sortAccountsByLastName(accounts) {           
  return accounts.sort((accountA, accountB) =>        //use sort() to sort alphabetically by last name
  accountA['name'].last.toLowerCase() < accountB['name'].last.toLowerCase() ? -1 : 1 );
}

function numberOfBorrows(account, books) {
  let counter = 0;
  for (let book of books) {                           //in books array, iterate thru each book object
    for (let borrowsElement of book.borrows) {        //(nested) in borrows array, iterate thru each borrows id   
      if (borrowsElement.id === account.id) {         //if the id in the borrows matches the id of the account
      counter++;                                      //increase accumulator by 1
      } 
    }
  } return counter;                                   // return total count
}
/* This is another solution
function numberOfBorrows(account, books) {
  let counter = 0;
  for (let index in books) {                          //loop thru books array
    const book = books[index];                        //set index of books array as book. now book is an object
    const borrows = book.borrows;                     //borrows is an array of id objects
    for (let borrowsElement of borrows) {             //loop thru array of objects
      if (borrowsElement.id === account.id) {
        counter++
        }
      }
  } return counter;
}
*/

function getBooksPossessedByAccount(account, books, authors) {
  const user = account.id                                                         //get account id
  let booksArray = [];                                                            //create an empty array                    
  for (let book of books) {                                                       //iterate thru books to find every book.borrows.returned is false
    const borrows = book.borrows;
    if (borrows[0].id === user && borrows[0].returned === false) {                //for each borrowed book, check if account has borrowed books indicated by book.borrows.returned === false
      booksArray.push({'title' : book.title, 'author' : {'name':book.authorId}}); //template for book info and author id
    }                                                                             //push the authorId into the borrowed book object   
  }                                                                               //put together the author data and the book data into an array
  booksArray = booksArray.map(bookObject => {                                     //look in books array
    let authorId = bookObject.author.name;                                        //change author's id to include first/last name
    bookObject.author.name = authors.find(author => authorId === author.id).name  //replacing the id with the author's name
    return bookObject;                                                            //give back new book object
  });                                                                             //then push that book id with embedded authorId into an array
  return booksArray;                                                              //return an array of found books
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
