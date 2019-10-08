//Node JS Code that will take the html template as input and output a precompiled js function from nunjucks
//
const nunjucks = require('nunjucks');
const express = require('express');
const app = express();
const port = 3033; //ports 2999 - 3032 are reserved for the styleAssembler app

app.post('/templateCompiler/', function (req, res) {
	  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send('hello world ' + req);

});

app.listen(port, () => console.log(`listening on port ${port}`));

