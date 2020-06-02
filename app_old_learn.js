// These are part of the Node's standard library.
// This is how we import files in node js
const http = require('http');
const fs = require('fs');
// Now node js searches the global modules for the http module.
// Instead, if you want to import modules from within the same folder, we say '/name'

// this is request listener; request listener decides what to do when the server receives a request
const rqListener = (req, res)=> {
    // this just logs these fields
    // console.log(req.url, req.method, req.headers);
    // when the user visits the localhost:3000/, this is what happens
    const myurl = req.url;
    const method = req.method;
    console.log(myurl);
    //This will be true only if the url is a string and if it is equal to a slash
    if (myurl === '' || myurl === '/') {
        res.write('<html>');
        res.write('<head><title>form</title></head>');
        res.write('<body><form method="POST" action="/message"><label for="message">Your Message: </label><input type="text" name="message"><button type="submit" value="submit">Send</button></body>');
        res.write('</html>');
        // This is not actually required to return res.end()
        // But, doing so will make sure the code that comes after is not executed
        // Also because no code should come after res.end(). if we dont return, the execution will continue and cause an error
        return res.end();
    }
    if (myurl === '/message' && method === 'POST') {
        // create an array to store the chunks of data stream
        const body = [];
        // operate on the chunks with request's .on method
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // concatinate all the chunks with the Buffer object and extract the message
        return req.on('end', () => { 
                console.log();
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                // we are not using fs.writeFileSync() because it prevents asynchronous execution
                fs.writeFile('message.txt', message, err => {
                    res.statusCode = 302; //status code for redirect
                    res.setHeader('Location', '/'); //this 'location' is also default http stuff. setHeader is the general way to redirect
                    return res.end(); //It is important to do this to avoid executing the code below
                });
        });        
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is stupidest way to send html response</title></head>');
    res.write('<body><h1>I am a stupid response</h1></body>');
    res.write('</html>');
    res.end();
    // this is to quit the server. But we dont want to do this as we want our server to be up all the time
    // process.exit();
}


// create a server; createServer takes in a request listener
const server = http.createServer(rqListener);

// nodejs will keep this running to listen to incomming requests
server.listen(3000);

//-----------------At this point, we can run the code to see whats happening...................................
/////////////////// in the browser(go to localhost:3000)//////////////////////////////////////////////


