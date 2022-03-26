function alarmOn() {
	console.log("in on handler");
	chrome.alarms.create("myAlarm", {
		delayInMinutes: 0.1,
		periodInMinutes: 0.01,
	});
	// document.getElementById('alarmToggle').style['background-color'] = '#81A39D';
	// document.getElementById('alarmToggle').innerHTML = "Disable";

	//window.close();
}

function alarmOff() {
	console.log("in off handler");
	chrome.alarms.clear("myAlarm");
	// document.getElementById('alarmToggle').style['background-color'] = '#97BEB7';
	// document.getElementById('alarmToggle').innerHTML = "Enable";

	//window.close();
}