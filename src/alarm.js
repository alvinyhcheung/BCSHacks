function onHandler() {
	console.log("in on handler");
	chrome.alarms.create("myAlarm", {
		delayInMinutes: 0.1,
		periodInMinutes: 0.01,
	});
	document.getElementById('alarmToggle').style['background-color'] = '#81A39D';
	document.getElementById('alarmToggle').innerHTML = "Disable";

	//window.close();
}
function offHandler() {
	console.log("in off handler");
	chrome.alarms.clear("myAlarm");
	document.getElementById('alarmToggle').style['background-color'] = '#97BEB7';
	document.getElementById('alarmToggle').innerHTML = "Enable";

	//window.close();
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
	chrome.storage.sync.set({'alarmState': false}); 
});