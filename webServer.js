const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    
    switch (req.url) {
        case '/':
            console.log(`${[]?}`)
            res.write('home view')
            break;
        case '/catalog':
            res.write('catalog view')
            break;
        
        default:
            res.write('404')
            break;
    }
    
    res.end();
}).listen(port);