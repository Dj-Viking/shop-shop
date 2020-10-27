export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

/**
 * Opens the database connection, 
 * 
 * Creates the object store (if it's the first time using it on the machine)
 * 
 * Runs whatever transaction function we need to have run on
 * a successful connection
 * @param {String} storeName 
 * @param {Function} method 
 * @param {Object} object 
 * @returns Promise
 */
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //open connecton to the database `shop-shop` with
    // the version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    //create variables to hold reference to the database,
    // transaction (tx), and object store
    let db, tx, store;

    // if version has changed or if this is the first time using
    // the database, run this method and create the three object stores
    request.onupgradeneeded = function(event) {
      const db = request.result;
      //create object store for each type of data and set "primary" key
      // index to be the `_id` of the data
      db.createObjectStore('products', { keyPath: '_id'} );
      db.createObjectStore('categories', { keyPath: '_id'} );
      db.createObjectStore('cart', { keyPath: '_id'} );
    };

    //handle any errors with connecting
    request.onerror = function(event) {
      console.log('There was an error.');
    };

    //on database open success
    request.onsuccess = function(event) {
      //save references of the database to the `db` variable
      db = request.result;

      //open a transaction to whatever we pass into `storeName`
      // must match one of the object store names in this promise
      tx = db.transaction(storename, 'readWrite');

      //save a reference to that object store
      store = tx.objectStore(storeName);

      //if any errors
      db.onerror = function(error) {
        console.log('there was an error on success method: ', error);
      };

      switch(method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid Method!');
          break;
      }

      //when transaction done close the connection
      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}

 /**
* 
* @param {Number} num number that needs commas placed in the string
* @returns string
*/
export function numberWithCommas(num) {
 let parts = num.toString().split(".");
 parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 //console.log(parts);
 //if only a tens place fill in hundredths place with zero and splice off the extra if its not a zero
 if (parts.length === 2) {
   parts.splice(1, 0, parts[1] + "0");
   parts.splice(2);
   if (parts[1].length > 2) {
     //pop last number and manipulate it to take out the stuff after hundreds place
     let decimals = parts.pop().split('');
     //console.log(decimals);
     //splice out anything past second index
     decimals.splice(2);
     //console.log(decimals);
     let joinedDec = decimals.join('');
     //console.log(joinedDec);
     //push joined dec into parts array
     parts.push(joinedDec);
   }
 }
 //console.log(parts);
 return parts.join('.');
}
