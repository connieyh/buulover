
// var $form = document.getElementsByClassName('shareForm');
// console.log($form);

// var $shareBtnObj = document.getElementById('shareBtn');
// console.log($shareBtnObj);

// var $input = document.getElementById('shareUrl');
// console.log($input);


var ref = new Firebase("https://blinding-fire-4757.firebaseio.com/");

function captureEl() {
	return {
		form: document.getElementsByClassName('shareForm'),
		shareBtn: document.getElementById('shareBtn'),
		input: document.getElementById('shareUrl')
	}
}


function isValidUrl(url) {
	var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	return url.match(regex);
}







