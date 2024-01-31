const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const path = require('path');
const exphbs = require('express-handlebars');
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine ({
	            layout: 'main',
	            layoutsDir: path.join(app.get('views'), 'layouts'),                                                                   partialsDir: path.join(app.get('views'), 'partials'),
	            extname:'.hbs',
	            helpers: require('handlebars')                 }));
app.set('view engine','.hbs');                             
app.use(express.static(path.join(__dirname,'public')));
app.listen(app.get('port'),() =>{
	    console.log('server on port', app.get('port'));
	    });
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: 'localhost', user:'root', password: '', database: 'trabajoSocial', connectionLimit: 5 });
pool.getConnection() .then(conn =>{ console.log('sql conetada')});

app.get('/', async (req, res) => {
	  let carpetas = await pool.query('select * from carpetas');
	console.log('pasa sql', carpetas);
	  res.render('../views/layouts/main.hbs', { carpetas });
});
