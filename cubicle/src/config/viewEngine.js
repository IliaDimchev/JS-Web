const handlebars = require('express-handlebars');

function setupViewEngine(app){
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        // layoutsDir: 'path',
        // defaultLayout; 'main',
        // partialsDir: 'path',
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = setupViewEngine;