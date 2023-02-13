const express = require('express');
const handlebars = require('express-handlebars');

const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.listen(3000, () => console.log('Server is running on port 3000..'))