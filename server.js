// DEPENDENCIES
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// SEQUELIZE SERVER CONNECTION AND STORAGE
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// EXPRESS SERVER CONNECTION
const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS HELPERS
const hbs = exphbs.create({ helpers });

// SESSION OBJECT
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// SERVER USES SESSION OBJECT
app.use(session(sess));

// HANDLEBARS ENGINE
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ENCODING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING
app.use(routes);

// SERVER SYNC AND START
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
