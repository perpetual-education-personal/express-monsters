// import express from 'express';
// import monsterData from './monsters.json' assert { type: 'json' };


import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client as prismicClient } from './config/prismicConfig.js'

const PORT = 1982;

// import contentful from 'contentful';

// const client = contentful.createClient({
//   space: '8gjcuad3dr24',
//   environment: 'master', // defaults to 'master' if not set
//   accessToken: 'qo2CFiuKeIkYyUD6lUM0302dAeo2EoG_MayfVfOCySo'
// })



const app = express();

app.set('view engine', 'ejs');


// Public asset folders
app.use( express.static('public') );
app.use( express.static('css') );

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
})


// Page routes
app.get('/', function(request, response) {

	// client.getEntry('3jblgGPeOqxPhG4vVv6XbR')
	// 	.then( function(entry) {
	// 		response.render('home', { page: entry.fields });
	// 	})
	// 	.catch(console.error)
	// ;
});



app.get('/products', async function(request, response) {
	const products = await prismicClient.getAllByType('product');

	response.render('products', { products });
});

app.get('/products/:uid', async function(request, response) {
	const specificProduct = await prismicClient.getByUID('product', request.params.uid);
	response.render('product', { specificProduct });
});



app.get('/monsters', function(request, response) {

	// client.getEntries({
	//   content_type: 'monster'
	// })
	// .then( function(data) {

	// 	const monsterData = data.items.map( function(item) {
	// 		return {
	// 			name: item.fields.name,
	// 			story: item.fields.story.content.content[0].value,
	// 			portrait: item.fields.portrait.fields.file.url,
	// 			adopted: item.fields.adopted,
	// 			birthday: item.fields.birthday,
	// 			color: item.fields.color,
	// 		};
	// 	});

	// 	console.log(monsterData);

	// 	response.render('monsters', { monsters: monsterData });
	// })
	// .catch(console.error);
	
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
app.listen(PORT, function() {
	console.log("Server started at http://localhost:1982");
});














