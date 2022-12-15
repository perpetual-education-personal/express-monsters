import express from 'express';
import monsterData from './monsters.json' assert { type: 'json' };

const app = express();

app.set('view engine', 'ejs');


// Public asset folders
app.use( express.static('public') );
app.use( express.static('css') );


// Page routes
app.get('/', function(request, response) {
	response.render('home');
});

app.get('/monsters', function(request, response) {
	response.render('monsters', { monsters: monsterData });
});

app.get('/monsters/:slug', function(request, response) {

	const monster = monsterData.find( function(monster) {
		return monster.slug == request.params.slug;
	});
	response.render('detail', { monster });
});


// If no route matches...
app.use( function(request, response) {
	response.status(404).render('404', { query: request.url });
});


// Start app
app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});
