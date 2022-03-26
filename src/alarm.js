//mportScripts("alarmScripts.js");

function onHandler() {
	//alarmOn();
	document.getElementById('alarmToggle').style['background-color'] = '#81A39D';
	document.getElementById('alarmToggle').innerHTML = "Disable";
}

function offHandler() {
	//alarmOff();
	document.getElementById('alarmToggle').style['background-color'] = '#97BEB7';
	document.getElementById('alarmToggle').innerHTML = "Enable";
}

var alarmClock = {
	toggleHandler: function (e) {
		chrome.storage.sync.get({'alarmState': false}, (data) => {
			const newState = !data.alarmState;
			newState? onHandler():offHandler();
			chrome.storage.sync.set({'alarmState': newState});
			console.log(newState);
		});
	},
	
	setup: function () {
		// var a = document.getElementById("alarmOn");
		// a.addEventListener("click", alarmClock.onHandler);
		// var a = document.getElementById("alarmOff");
		// a.addEventListener("click", alarmClock.offHandler);
		document.getElementById("alarmToggle").addEventListener("click", alarmClock.toggleHandler);
		// TODO: add listener for storage
		chrome.storage.sync.get({'alarmState': false}, (data) => {
			data.alarmState? onHandler():offHandler();
		})

		chrome.storage.onChanged.addListener((changes, area) => {
			console.log(changes);
			if (area === 'sync' && changes.alarmState) {
				changes.alarmState.newValue? onHandler(): offHandler();
			}
		})
	},
};

document.addEventListener("DOMContentLoaded", function () {
	alarmClock.setup();
	//chrome.storage.sync.set({'alarmState': false}); 
});

function openTab(evt, tabName) {
	// Declare all variables
	var i, tabcontent, tablinks;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
  }