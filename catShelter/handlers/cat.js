const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');



module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/addCat.html'))
        
        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder)
            res.write(modifiedData)
        })


        index.on('end', () => {
            res.end()
        })

        index.on('error', (err) => {
            console.log(err)
        })

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/addBreed.html'))
        
        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            res.write(data)
        })

        index.on('end', () => {
            res.end()
        })

        index.on('error', (err) => {
            console.log(err)
        })

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if (err) throw err;

            let oldPath = files.upload.filepath;
            let newPath = path.normalize(path.join('C:/vscode/catShelter', '/content/images/' + files.upload.originalFilename))

            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('File was uploaded succesSfully!')
            })

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;

                let allData = JSON.parse(data);
                allData.push({id: cats.length + 1, ...fields, image: files.upload.originalFilename})
                let json = JSON.stringify(allData)
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(303, {location: '/'})
                    res.end();
                })
            })
        })

    }  else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        })

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) =>{
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('../catShelter/data/breeds.json', json, 'utf-8', () => console.log('Your breed was added successfully!'));

                res.writeHead(303, {location: '/'})
                res.end();
            })
        })
    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/editCat.html'))
        
        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            let parts = pathname.split('/');
            let catId = Number(parts[parts.length - 1])

            const findCatById = (catId) => {
                const [key, cat] = Object.entries(cats).find(([key, cat]) => cat.id === catId);
                return cat;
            }

            const currentCat = findCatById(catId);

            let modifiedData = data.toString().replace('{{id}}', catId)
            modifiedData = modifiedData.replace('{{name}}', currentCat.name)
            modifiedData = modifiedData.replace('{{description}}', currentCat.description)

            const breedsAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`)
            modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('/'))

            modifiedData = modifiedData.replace('{{breed}}', currentCat.breed)
            res.write(modifiedData)
        })


        index.on('end', () => {
            res.end()
        })

        index.on('error', (err) => {
            console.log(err)
        })
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/catShelter.html'))
        
        const index = fs.createReadStream(filepath);
        index.on('data', (data) => {
            let parts = pathname.split('/');
            let catId = Number(parts[parts.length - 1])
            if (!isNaN(catId)) {
                const findCatById = (catId) => {
                    const [key, cat] = Object.entries(cats).find(([key, cat]) => cat.id === catId);
                    return cat;
                }
    
                const currentCat = findCatById(catId);
    
                let modifiedData = data.toString().replace('{{id}}', catId)
                modifiedData = modifiedData.replace('{{name}}', currentCat.name)
                modifiedData = modifiedData.replace('{{description}}', currentCat.description)
                modifiedData = modifiedData.replace('{{image}}', currentCat.image)
    
                const breedsAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`)
                modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('/'))
    
                modifiedData = modifiedData.replace('{{breed}}', currentCat.breed)
                res.write(modifiedData)
            }

        })


        index.on('end', () => {
            res.end()
        })

        index.on('error', (err) => {
            console.log(err)
        })
    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if (err) throw err;

            if (files.upload.path) {            
                let oldPath = files.upload.filepath;
                let newPath = path.normalize(path.join('C:/vscode/catShelter', '/content/images/' + files.upload.originalFilename))
    
                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log('File was uploaded succesSfully!')
                })
            }



            fs.readFile('./data/cats.json', 'utf8', function readFileCallback(err, data){
                if (err) {
                    console.log(err); 
                } else {
                    let currentCats = JSON.parse(data);
                    let parts = req.url.split('/');
                    let catId = Number(parts[parts.length - 1]);
                    currentCats = currentCats.filter((cat) => cat.id !== catId)
                    
                    let currentCat = JSON.parse(data);
                    currentCat = currentCat.filter((cat) => cat.id === catId)
                    // currentCat = currentCats.filter((cat) => cat.id === catId)
                    // currentCats.replace(`${currentCat}`, `{id: ${catId}, ${fields}: ${fields[field]}, image: ${files.upload.originalFilename}}`)
                    // currentCat.image = files.upload.originalFilename;
                    // currentCat.breed = fields.breed;
                    // currentCats.push(currentCat)
                    // ({id: cats.length + 1, ...fields, image: files.upload.originalFilename})
                    
                    console.log(currentCat)
                    let image = files.upload.originalFilename
                    if(image === '') {
                        currentCats.push({id: catId, ...fields, image: currentCat[0].image})
                    } else {
                        console.log(image)
                        currentCats.push({id: catId, ...fields, image: files.upload.originalFilename})
                    }

                    let json = JSON.stringify(currentCats);
                    fs.writeFile('./data/cats.json', json, 'utf8', () => {
                        res.writeHead(303, { 'location': '/'})
                        res.end();
                    });

                //     if (err) throw err;

                //     let oldPath = files.upload.filepath;
                //     let newPath = path.normalize(path.join('C:/vscode/catShelter', '/content/images/' + files.upload.originalFilename))
        
                //     fs.rename(oldPath, newPath, (err) => {
                //         if (err) throw err;
                //         console.log('File was uploaded succesSfully!')
                //     })
        
                //     fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                //         if (err) throw err;
        
                //         let allData = JSON.parse(data);
                //         allData.push({id: cats.length + 1, ...fields, image: files.upload.originalFilename})
                //         let json = JSON.stringify(allData)
                //         fs.writeFile('./data/cats.json', json, () => {
                //             res.writeHead(303, {location: '/'})
                //             res.end();
                //         })
                //     })
                // })

                    // let allData = JSON.parse(data);
                    // allData.push({id: cats.length + 1, ...fields, image: files.upload.originalFilename})
                    // let json = JSON.stringify(allData)
                    // fs.writeFile('./data/cats.json', json, () => {
                    //     res.writeHead(303, {location: '/'})
                    //     res.end();
                }
            })
        });
    
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if (err) throw err; 

            fs.readFile('./data/cats.json', 'utf8', function readFileCallback(err, data){
                if (err) {
                    console.log(err); 
                } else {
                    let currentCats = JSON.parse(data);
                    let parts = req.url.split('/');
                    let catId = Number(parts[parts.length - 1]);
                    currentCats = currentCats.filter((cat) => cat.id !== catId)
                    
                    // let currentCat = JSON.parse(data);
                    // currentCat = currentCat.filter((cat) => cat.id === catId)
                    // currentCat = currentCats.filter((cat) => cat.id === catId)
                    // currentCats.replace(`${currentCat}`, `{id: ${catId}, ${fields}: ${fields[field]}, image: ${files.upload.originalFilename}}`)
                    // currentCat.image = files.upload.originalFilename;
                    // currentCat.breed = fields.breed;
                    // currentCats.push(currentCat)
                    // ({id: cats.length + 1, ...fields, image: files.upload.originalFilename})
                
                    // currentCats.push({id: catId, ...fields, image: files.upload.originalFilename})
                    let json = JSON.stringify(currentCats);
                    fs.writeFile('./data/cats.json', json, 'utf8', () => {
                        res.writeHead(303, { 'location': '/'})
                        res.end();
                    });
                }
            })
        });

    } else {
        return true;
    }

};