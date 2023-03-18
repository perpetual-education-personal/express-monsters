import express from 'express';
import monsterData from './monsters.json' assert { type: 'json' };


import contentful from 'contentful';

const client = contentful.createClient({
  space: '8gjcuad3dr24',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'qo2CFiuKeIkYyUD6lUM0302dAeo2EoG_MayfVfOCySo'
})



const app = express();

app.set('view engine', 'ejs');


// Public asset folders
app.use( express.static('public') );
app.use( express.static('css') );


// Page routes
app.get('/', function(request, response) {

	client.getEntry('3jblgGPeOqxPhG4vVv6XbR')
		.then( function(entry) {
			response.render('home', { page: entry.fields });
		})
		.catch(console.error)
	;
});

app.get('/monsters', function(request, response) {

	client.getEntries({
	  content_type: 'monster'
	})
	.then( function(data) {

		const monsterData = data.items.map( function(item) {
			return {
				name: item.fields.name,
				story: item.fields.story.content.content[0].value,
				portrait: item.fields.portrait.fields.file.url,
				adopted: item.fields.adopted,
				birthday: item.fields.birthday,
				color: item.fields.color,
			};
		});

		console.log(monsterData);

		response.render('monsters', { monsters: monsterData });
	})
	.catch(console.error);
	
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
