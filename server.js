const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

http.createServer((req, res)=>{

    const parsedURL = url.parse(req.url, true);
    const pathname = parsedURL.pathname;

    if(pathname == '/'){
        res.write('This is Home Page.');
    }
    else if(pathname == '/about'){
        res.write('This is About Page.');
    }
    else if(pathname == '/contact'){
        res.write('This is Contact Page.');
    }
    else if(pathname == '/file-write'){
        fs.writeFile('demo.txt', 'Hello World.', (err)=>{
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error creating file.');
            }
            else{
                res.write('File created successfully');
            }
            res.end();
        });
        return;
    }
    else if(pathname == '/upload'){
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, path.join(__dirname, 'uploads'));
            },
            filename: (req, file, cb) => {
              cb(null, file.originalname);
              console.log(file.originalname);
            },
          });
      
          const upload = multer({ storage }).single('file');

          upload(req, res, (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.write('Error uploading file');
            } 
            else {
                res.write('File uploaded successfully');
            }
            res.end(); 
          });
          return;
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Page not found.');
    }

    res.end();

}).listen(5500, ()=>{
    console.log('Server is Running');
});