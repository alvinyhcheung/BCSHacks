const MAXTIME = 10;
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
            iconUrl : 'clock.png',
            type : 'basic',
            buttons : [
                {
                    title : 'Open reddit'
                },
                {
                    title : 'Cancel'
                }
            ]
        }
    )

    chrome.notifications.onButtonClicked.addListener(
        (id, idx) => {
            if (idx == 0) {
                chrome.tabs.create({url : "https://www.reddit.com/"});
            } else {
                chrome.tabs.create({url : "https://www.google.com/"});
            }
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

chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener((newState) => {
    notification(newState);
    
    console.log(`you are ${newState}`);
    if (newState === 'idle') {
        timer = 0;
    }
});

