import express from 'express';

const app = express();

app.get('/', function(request, response) {
	console.log("Home page");
	response.send("<h1>Home page</h1>")
});

app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});