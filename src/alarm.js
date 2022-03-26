function onHandler() {
	console.log("in on handler");
	chrome.alarms.create("myAlarm", {
		delayInMinutes: 0.1,
		periodInMinutes: 0.01,
	});
	window.close();
}
function offHandler() {
	console.log("in off handler");

	chrome.alarms.clear("myAlarm");
	window.close();
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
	},
};

document.addEventListener("DOMContentLoaded", function () {
	alarmClock.setup();
});