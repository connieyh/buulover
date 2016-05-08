
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

function reset(input) {
	input.value = "";
}

function getSharedFrom() {
	var titleStrArr = document.getElementsByClassName('shareForm-title')[0].innerHTML.split(" ");
	return titleStrArr[titleStrArr.length-1];
}

function getSharedBy() {
	if (getSharedFrom() == 'Connie') {
		return 'David';
	}
	return 'Connie';
}

function doActionAfterShare() {
	var $els = captureEl();
	var $input = $els.input;
	var $form = $els.form;
	var $shareBtn = $els.shareBtn;
	// var sharedBy = getSharedBy();

	var inputText = $input.value;
	var $emptyAlert = document.getElementById('empty-input-alert');
	var $wrongAlert = document.getElementById('wrong-input-alert');
	if (!inputText) {
		if ($wrongAlert.style.display == 'block') {
			$wrongAlert.style.display = 'none';
		}
		$emptyAlert.style.display = 'block';
		// alert("Please enter a valid link");
	} else if (!isValidUrl(inputText)){
		if ($emptyAlert.style.display == 'block') {
			$emptyAlert.style.display = 'none';
		}
		$wrongAlert.style.display = 'block';
	} else {
		// var db = new Firebase("https://blinding-fire-4757.firebaseio.com/" + shareTo);
		ref.child(getSharedBy()).push({
			// title: "Hello World II!",
		  	url: inputText,
		});
		reset($input);
		if ($emptyAlert.style.display == 'block') {
			$emptyAlert.style.display = 'none';
		} else if ($wrongAlert.style.display == 'block') {
			$wrongAlert.style.display = 'none';
		}
	}
	// console.log("inside do action");

}

function bindEventListenerOnShareBtn() {
	var $els = captureEl();
	var $input = $els.input;
	var $form = $els.form;
	var $shareBtn = $els.shareBtn;
	var sharedBy = getSharedBy();
	
	// $shareBtn.addEventListener('click', function() {
	// 	var inputText = $input.value;
	// 	var $emptyAlert = document.getElementById('empty-input-alert');
	// 	var $wrongAlert = document.getElementById('wrong-input-alert');
	// 	if (!inputText) {
	// 		if ($wrongAlert.style.display == 'block') {
	// 			$wrongAlert.style.display = 'none';
	// 		}
	// 		$emptyAlert.style.display = 'block';
	// 		// alert("Please enter a valid link");
	// 	} else if (!isValidUrl(inputText)){
	// 		if ($emptyAlert.style.display == 'block') {
	// 			$emptyAlert.style.display = 'none';
	// 		}
	// 		$wrongAlert.style.display = 'block';
	// 	} else {
	// 		var db = new Firebase("https://blinding-fire-4757.firebaseio.com/" + shareTo);
	// 		db.push({
	// 			// title: "Hello World II!",
	// 		  	url: inputText,
	// 		});
	// 		reset($input);
	// 		if ($emptyAlert.style.display == 'block') {
	// 			$emptyAlert.style.display = 'none';
	// 		} else if ($wrongAlert.style.display == 'block') {
	// 			$wrongAlert.style.display = 'none';
	// 		}
	// 	}
	// });
	// console.log("inside bind");

	$shareBtn.addEventListener('click', doActionAfterShare);

}

function addKeyboardEventListner() {
	document.getElementById('shareUrl').addEventListener("keydown", checkKeyPressed, false);
	function checkKeyPressed(e) {
    	if (e.keyCode == 13) {
        	doActionAfterShare();
    	}
	}
}

function displaySharedContent() {
	var hasData = false;
	var $urlArea=  document.getElementById('url-view-area');
	var $urlList= document.getElementById('url-list');
	var sharedFrom = getSharedFrom();
	
	// var db = new Firebase("https://blinding-fire-4757.firebaseio.com/" + curViewer);


	ref.child(getSharedFrom()).on('child_added', function(snapshot) {
		var message = snapshot.val();
		// console.log(message.url);
		if (!hasData && message) {
			hasData = true;
			$urlArea.style.display = 'block';
			$urlArea.style.textAlign = 'center';
			$urlArea.style.marginTop = '5em';
		}
		appendList(message.url);
		
	});

	
	function appendList(url) {
		var list = document.createElement('li');
		var anchor = document.createElement('a');
		var t = document.createTextNode(url);
		anchor.appendChild(t);
		anchor.href = url;
		anchor.target = "_blank";
		list.appendChild(anchor);
		$urlList.appendChild(list);
	}
}










