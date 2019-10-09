//Javascript to handle the template tool
const config = {};
const script_path = 'http://10.60.153.99:3033/templateCompiler/';

//Using the FileReader API (https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
var reader = new FileReader()
	reader.onload = event => {
		console.log('a new file was uploaded');
		var file = document.getElementsByTagName('input')[0].files[0];
		config.text = event.target.result;
		//need a callback that will perform the ajax call after the text has been read from the blob, or the ajax will be called before the text is read...
		nunjucks_callback();
	
	} // desired file content
	reader.onerror = error => reject(error)

//when the submit button is clicked, check if a file was uploaded or if a template was pasted
$('#submitButton').click(function (e) {
	console.log('submit buttons clicked', e);
	//check if a file was uploaded
	if (document.getElementsByTagName('input')[0].files[0] != undefined) {
		config.templateType = 'file';
		var file = document.getElementsByTagName('input')[0].files[0];
		reader.readAsText(document.getElementsByTagName('input')[0].files[0]); // you could also read images and other binaries, this function will fire the reader.onload event...
		//the name of the file needs to be passed to the ajax
		config.name = document.getElementsByTagName('input')[0].files[0].name;
		return;
	}
	//user pasted a template
	else if ( $('textarea').val().toString().length > 1) {
		console.log('A Template was pasted...');
		config.templateType = 'paste';
		config.text = $('textarea').val().toString();
		//the name of the file needs to be passed to the ajax
		config.name = ('Template Pasted at: ' + Date());
		nunjucks_callback();
	}
	//user did not upload or paste a template...
	else {
		new swal('Upload or Paste a template...');
		return;
	}
});
	//going to use ajax to send the template to a node script for nunjucks to precompile it and return a function
function nunjucks_callback() {
	$.ajax({
		url: script_path,
		method: 'POST',
		data: {template: config.text, name: config.name},
		success: function (res, status, jqXHR) {
			console.log(res, status, jqXHR);
			config.precompiled = js_beautify(res.precompiled.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
			let precompiled = new swal('<pre><code id="code_to_copy">' + config.precompiled.replace(/& gt;/g, '>').replace(/& lt;/g, '<')  + '</pre></code>');
			$('#swal2-title').css({'font-size':'10pt', 'text-align':'left', 'word-break':'break-word','cursor':'copy'});
			$('.swal2-popup').css({'width':'90%'});
			//add the copy to clipboard click handler to the text
			$('#swal2-title').click(function () {
				copy_to_clipboard();
				new swal('The precompiled template function has been copied to your clipboard');
			});

		},
		error: function (jqXHR, status, error) {
			console.log(jqXHR, status, error);
			//the first click has some kind of error in the backend with the node modules, so autoclick if it doesn't work the first time...
			$('#submitButton').click();
		}
		

	
	});
	
}


//function to copy to clipboard
function copy_to_clipboard() {
	//window.copy(document.getElementById('code_to_copy').textContent);
	let code_to_copy = document.getElementById('code_to_copy').textContent;
	copyToClipboard(code_to_copy);
}
function copyToClipboard(text) {
	    var dummy = document.createElement("textarea");
	    // to avoid breaking orgain page when copying more words
	     // cant copy when adding below this code
	         // dummy.style.display = 'none'
	             document.body.appendChild(dummy);
	                 //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	                     dummy.value = text;
	                         dummy.select();
	                             document.execCommand("copy");
	                                 document.body.removeChild(dummy);
	                                 }
