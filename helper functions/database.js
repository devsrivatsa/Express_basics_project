const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://srivatsa:<MongoDBpassword@123>@cluster0.shpla.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!!!');
        callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;