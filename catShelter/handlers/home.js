const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const allCats = require('../data/cats');
let cats = require('../data/cats');
const formidable = require('formidable');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {

        let filepath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        )



        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
    
                res.write('404 Not Found');
                res.end();
                return
            }


            let modifiedCats = allCats.map((cat) => `<li>
                <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`);
            let modifiedData = data.toString().replace('{{cats}}', modifiedCats)

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
    
            res.write(modifiedData);
            res.end();
        })

    } else if (pathname === '/search' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields)=> {
            if (err) throw err;
            cats = allCats
            cats = cats.filter((cat) => cat.name.includes(fields.search))            
        })
        
        let filepath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        )



        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
    
                res.write('404 Not Found');
                res.end();
                return
            }


            let modifiedCats = cats.map((cat) => `<li>
                <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`);
            let modifiedData = data.toString().replace('{{cats}}', modifiedCats)

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
    
            res.write(modifiedData);
            res.end();
        })

    } else {
        return true;

    }


}

