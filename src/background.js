import { randomLink } from 'popup.js';

const MAXTIME = 15;
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}


chrome.tabs.onActivated.addListener(async () => {
	const currentTab = await getCurrentTab();
	console.log(`tab changed to ${currentTab.url}`);
});

function notification(newState) {
    chrome.notifications.create(
        {
            title : 'STATE CHANGED',
            message : `You are ${newState}`,
            iconUrl : 'assets/clock.png',
            type : 'basic'
        }
    )

    chrome.notifications.onClicked.addListener(
        (e) => {
            randomLink(e);
        }
    );
}

let timer = 0;
chrome.alarms.onAlarm.addListener(function (alarm) {
	timer = timer +1;
	if(timer %5 ==0) {
		console.log(`The timer is ${timer}`);
	}
    if (timer > MAXTIME) { 
        chrome.storage.sync.set({'alarmState': false}); 
        notification("in big trouble mister");         
        timer = 0;
    }
});

chrome.idle.setDetectionInterval(10);

chrome.idle.onStateChanged.addListener((newState) => {
    notification(newState);
    
    console.log(`you are ${newState}`);
    if (newState === 'idle') {
        chrome.storage.sync.set({'alarmState': false}); 
        timer = 0;
    } else {
        chrome.storage.sync.set({'alarmState': false});
    }
});

