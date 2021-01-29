//use find function to return the author object that has the matching ID
function findAuthorById(authors, id) {              
  return authors.find(author => author.id === id);
}

//use find function to return the book object that has the matching ID
function findBookById(books, id) {                  
  return books.find(book => book.id === id);
}

/*returns an array with two arrays inside of it. 
The first array contains books _that have been loaned out, and are not yet returned_ while the second array contains books _that have been returned._ 
You can check for the return status by looking at the first transaction in the `borrows` array.*/
function partitionBooksByBorrowedStatus(books) {
  let falseArray = books.filter(book =>           //filter out borrowed books
    book.borrows[0].returned === false, []);      //if 'returned' value of first borrows element is strictly equal to false, then put into the falseArray
  let trueArray = books.filter(book =>            //filter out returned books 
    book.borrows[0].returned === true, []);       //if 'returned' value of first borrows element is strictly equal to true, then put into the trueArray
  return [falseArray, trueArray];                 //return an array with 2 arrays inside of it                                                                                       
}

/*return an array of all the transactions from the book's `borrows` key. 
However, each transaction should include the related account information and the `returned` key.*/
function getBorrowersForBook(book, accounts) {
  const {borrows} = book;                         //destructured book.borrows
  let borrowLog = borrows.map(instance => {       //create an array of borrowers id
    for (let account of accounts) {               //loop over accounts array thru each account
      if (instance.id === account.id) {           //to find if borrows id matches account id
        return {...instance, ...account}          //return that borrows data and account data
      }
    }
  })
  return borrowLog.slice(0,10);                   //limit the list to 10 borrowers  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
