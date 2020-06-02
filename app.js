const http = require('http');
const routes = require('./routes');

// create a server; createServer takes in a request listener
const server = http.createServer(routes);

// nodejs will keep this running to listen to incomming requests
server.listen(3000);

//-----------------At this point, we can run the code to see whats happening...................................
/////////////////// in the browser(go to localhost:3000)//////////////////////////////////////////////