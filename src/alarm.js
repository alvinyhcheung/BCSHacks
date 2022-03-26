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