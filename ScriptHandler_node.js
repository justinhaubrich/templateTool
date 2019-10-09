//Node JS Code that will take the html template as input and output a precompiled js function from nunjucks
//
const nunjucks = require('nunjucks');
const express = require('express');
const app = express();
//need to use the bodyparser node module to get POST variables...
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
const port = 3033; //ports 2999 - 3032 are reserved for the styleAssembler app

app.post('/templateCompiler/', function (req, res) {
	  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(nunjucks);
	let body = req.body;
	let template = body.template;
	let precompiled = nunjucks.precompileString(template, {name:'Quinstreet-Nunjucks-Tool'});
	//res.send(req.param);
	res.send({template:template, precompiled:precompiled});

});

app.listen(port, () => console.log(`listening on port ${port}`));

