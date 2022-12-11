import express from 'express';
import monsterData from './monsters.json' assert { type: 'json' };

const app = express();

app.set('view engine', 'ejs');

app.use( express.static('public') );
app.use( express.static('css') );


// Page routes
app.get('/', function(request, response) {
	response.render('home');
});

app.get('/monsters', function(request, response) {
	response.render('monsters', { monsters: monsterData });
});

app.get('/monster', function(request, response) {
	response.render('detail');
});


// If no route matches...
app.use( function(request, response) {
	response.status(404).render('404', { query: request.url });
});


app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});