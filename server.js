const express = require('express');
const path = require('path');

const { generateAction } = require('./generate');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = 'your_api_key_here';
// EJS Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res, next){
	return res.render('index.ejs');
});
app.get('/content', function(req, res, next){
	return res.render('content.ejs');
});

app.get('/generate-content', function(req, res, next){
	var prompt = req.query.prompt;
	var style = req.query.style;
	var feel = req.query.feel;

	async() => {
		const output = await generateAction(prompt, style, feel);
		return res.render('content', {output:output});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on 127.0.0.1${PORT}`);
});