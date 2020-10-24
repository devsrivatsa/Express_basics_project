const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    //modified the below connection string: <dbname> to shop
    MongoClient.connect('mongodb+srv://srivatsa:mongoDBpassword_123@learningnodejs.shpla.mongodb.net/learnNodeJs_DB?retryWrites=true&w=majority')    
    .then(client => {
        console.log('Connected!!!');
        _db = client.db() //this will return the database that we are connecting to ~ shop database
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb =() => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;