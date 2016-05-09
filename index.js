
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
		var dateTime = new Date();
		ref.child(getSharedBy()).push({
			// title: "Hello World II!",
		  	url: inputText,
		  	read: false,
		  	dateTime: Firebase.ServerValue.TIMESTAMP
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
	var $urlListContainer=  document.getElementById('url-list-container');
	var $urlListGroup= document.getElementById('url-list-group');
	
	
	// var db = new Firebase("https://blinding-fire-4757.firebaseio.com/" + curViewer);

	var currentId = 0;
	var sharedFrom = getSharedFrom();

	ref.child(getSharedFrom()).once('value', function(snapshot) {
		var urlListObject = snapshot.val();
		var keyArray = Object.keys(urlListObject);
		console.log(keyArray);

		keyArray.reverse();
		console.log(keyArray);
		// console.log(message.url);
		if (!hasData && urlListObject) {
			hasData = true;
			// make $urlListContainer show
			$urlListContainer.style.display = 'block';
			// $urlListContainer.style.textAlign = 'center';
			$urlListContainer.style.marginTop = '5em';
		}

		for (var i = 0; i < keyArray.length; i++) {
			var $elements = buildElements(urlListObject[keyArray[i]], keyArray[i], i);
			assembleList($elements);
		}

	});


	function isRead(urlObject) {
		return urlObject.read;
	}

	function buildElements(urlObject, key, index) {
		// create element 'li'
		var url = urlObject.url;
		var $listLi = document.createElement('li');
		// listLi.setAttribute('id', 'url-'+index);
		$listLi.id = 'url-'+(index+1);
		$listLi.className = 'url-item-wrapper'
		// console.log($listLi);
		


		// create element 'article' with classname 'url-item'
		var $listArticle = document.createElement('article');
		$listArticle.className = 'url-item';
		// $listArticle.className += ' ' + 'whatever';
		
		// text to put into 'p'
		var urlText = document.createTextNode(url);

		// create 'div' with classname 'url-item-info'
		// create 'p' with classname 'url-item-text' and append into 'url-item-info'


		var $urlItemInfo = document.createElement('div');
		$urlItemInfo.className = 'url-item-info';

		var $urlItemText = document.createElement('p');
		$urlItemText.className = 'url-item-text';
		$urlItemText.appendChild(urlText);
		$urlItemInfo.appendChild($urlItemText);

		addEventListenerToUrlItem($urlItemInfo, url);

		

		// create element 'a'
		var $anchor = document.createElement('a');
		$anchor.className = 'url-link';
		$anchor.href = url;


		// create 'div' with classname 'url-item-manage-group'
		var $urlManageGroup = document.createElement('div');
		$urlManageGroup.className = 'url-item-manage-group';

		var $newUrlWrapper = document.createElement('p');
		$newUrlWrapper.className = 'new-url-text-wrapper';

		if (!isRead(urlObject)) {
			var newUrlText = document.createTextNode('NEW');
			$newUrlWrapper.appendChild(newUrlText);
			$urlManageGroup.appendChild($newUrlWrapper);
			addEventListenerToNewurlText(urlObject, key, $newUrlWrapper);
		}
		




		// anchor.appendChild(t);
		// anchor.href = url;
		// anchor.target = "_blank";

		return {
			listLi: $listLi,
			listArticle: $listArticle,
			urlItemInfo: $urlItemInfo,
			anchor: $anchor,
			urlManageGroup: $urlManageGroup
		}

	}

	
	function assembleList($elements) {
		
		// list.appendChild(anchor);
		// $urlListGroup.appendChild(list);
		var $listLi = $elements.listLi;
		var $listArticle = $elements.listArticle;
		var $urlItemInfo = $elements.urlItemInfo;
		var $anchor = $elements.anchor;
		var $urlManageGroup = $elements.urlManageGroup;

		$listArticle.appendChild($urlItemInfo);
		$listArticle.appendChild($anchor);
		$listArticle.appendChild($urlManageGroup)
		// console.log($listArticle);

		$listLi.appendChild($listArticle);
		$urlListGroup.appendChild($listLi);

		// console.log($urlListGroup);

		return $listLi;


		// console.log($urlListContainer);
	}

	function addEventListenerToUrlItem($urlItemInfo, url) {
		$urlItemInfo.addEventListener('click', function() {
			window.open(url, '_blank');
		});
	}

	function addEventListenerToNewurlText(urlObj, key ,$newUrlWrapper) {
		console.log(getSharedFrom());
		console.log(key);

		$newUrlWrapper.addEventListener('click', function() {
			$newUrlWrapper.style.display = 'none';
			// var newurlRef = new Firebase("https://blinding-fire-4757.firebaseio.com/David/"+key);
			console.log(urlObj.url);
			ref.child(getSharedFrom()).child(key).update({
				url: urlObj.url,
				read: true,
				dateTime: urlObj.dateTime
			});
			
		});
	}
}










