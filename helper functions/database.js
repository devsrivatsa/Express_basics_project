const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    //modified the below connection string: <dbname> to shop
    MongoClient.connect('mongodb+srv://srivatsa:<MongoDBpassword@123>@cluster0.shpla.gcp.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!!!');
        _db = client.db() //this will return the database that we are connecting to ~ shop database
        callback(client);
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