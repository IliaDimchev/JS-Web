const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const dbEndpoint = 'mongodb://127.0.0.1:27017/'
const dbName = 'scaffold'

const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect(dbEndpoint + dbName);

app.listen(3000, () => console.log('Server is running on port 3000..'))