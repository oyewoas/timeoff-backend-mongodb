const mongoose = require('mongoose');
const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'schoolmgt';  


class Database {
    constructor() {
      this.dbConnect();
    }
    dbConnect() {
       mongoose.connect(`mongodb://${server}/${database}`)
         .then(() => {
           console.log('Database connection successful');
           
         })
         .catch(err => {
           console.error('Database connection error');
         });
    }
  }


module.exports = new Database();