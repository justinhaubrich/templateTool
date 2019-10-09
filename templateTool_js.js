//Javascript to handle the template tool
const config = {};
const script_path = 'http://10.60.153.99:3033/templateCompiler/';

//Using the FileReader API (https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
var reader = new FileReader()
	reader.onload = event => {config.text = event.target.result;} // desired file content
	reader.onerror = error => reject(error)

//when the submit button is clicked, check if a file was uploaded or if a template was pasted
$('#submitButton').click(function (e) {
	console.log('submit buttons clicked', e);
	//check if a file was uploaded
	if (document.getElementsByTagName('input')[0].files[0] != undefined) {
		config.templateType = 'file';
		var file = document.getElementsByTagName('input')[0].files[0];
		reader.readAsText(document.getElementsByTagName('input')[0].files[0]); // you could also read images and other binaries
	}
	//user pasted a template
	else if ( $('textarea').val().toString().length > 1) {
		console.log('A Template was pasted...');
		config.templateType = 'paste';
		config.text = $('textarea').val().toString();
	}
	//user did not upload or paste a template...
	else {
		new swal('Upload or Paste a template...');
		return;
	}
	//going to use ajax to send the template to a node script for nunjucks to precompile it and return a function
	$.ajax({
		url: script_path,
		method: 'POST',
		data: {template: config.text},
		success: function (res, status, jqXHR) {
			console.log(res, status, jqXHR);
			let precompiled = new swal(res.precompiled);
			$('#swal2-title').css({'font-size':'10pt', 'text-align':'left', 'word-break':'break-word'});
			$('.swal2-popup').css({'width':'90%'});

		},
		error: function (jqXHR, status, error) {
			console.log(jqXHR, status, error);
		}
		

	
	});
	
});


