const express = require('express');

const routes = require('./routes');
const config = require('./config');
// require('./config/viewEngine')(app); Short way
const setupViewEngine = require('./config/viewEngine');
const initDatabase = require('./config/initDatabase');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);


initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`)))
    .catch((err) => console.error(err.message));