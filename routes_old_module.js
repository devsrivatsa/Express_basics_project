const http = require('http');
const fs = require('fs');

const requestHandler = (req, res) => {
    myurl = req.url;
    mymethod = req.method;

    if( myurl === '' || myurl === '/') {
        res.write("<html>");
        res.write("<head><title>Your Message..</title></head>");
        res.write("<body>");
        res.write("<h1>Please Enter Your Message to Humanity</h1></br>");
        res.write("<form method='POST' action='/message'>");
        res.write("<input type='text' name='message'>");
        res.write("<button type='submit'>Send</button>");
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        res.end()
    }
    if (myurl === "/message" && mymethod === 'POST' ){
        body = [];
        // get the chunks of stream under one array
        req.on('data',(chunk) => {
            body.push(chunk);
        });
        // concatinate all the chunks, convert them to String, and extract the msg
        return req.on('end',() => {
            const paresedBody = Buffer.concat(body).toString();
            const msg = paresedBody.split('=')[1];
            // write the message to File, and handle the error if any
            fs.writeFile('message.txt', msg, err =>{
                res.statusCode = 302; //redirect
                res.setHeader('Location', '/'); //redirect to '/'
                return res.end();
            });
        });
    }

    // If the request is neither post or the url is something else
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>This is stupidest way to send html response</title></head>');
    // res.write('<body><h1>I am a stupid response</h1></body>');
    // res.write('</html>');
    // res.end();
};

// exporting the function
module.exports  = requestHandler;	