
const MAXTIME = 15;
const DEFAULT_BLACKLIST = ["reddit.com", "instagram.com", "facebook.com"];
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}


chrome.tabs.onActivated.addListener(async () => {
    
	const currentTab = await getCurrentTab();
    
    chrome.storage.sync.get({'blackList': DEFAULT_BLACKLIST}, (data)=> {
        console.log(currentTab.url);
        console.log(data.blackList);
        if (data.blackList.some((blockedURL) => {
            console.log(blockedURL);
            return currentTab.url.includes(blockedURL);
        })) {
            console.log("turned on");
            chrome.storage.sync.set({'alarmState': true}); 
        } else {
            console.log("turned off");
            chrome.storage.sync.set({'alarmState': false}); 
        }
    })
    
	console.log(`tab changed to ${currentTab.url}`);
});

chrome.notifications.onClicked.addListener(
	(e) => {
		chrome.windows.create();
	}
);

function notification(newState) {
    chrome.notifications.create(
        {
            title : 'STATE CHANGED',
            message : `You are ${newState}`,
            iconUrl : 'assets/clock.png',
            type : 'basic'
        }
    )
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
        chrome.storage.sync.set({'alarmState': false}); 
        timer = 0;
    } else {
        chrome.storage.sync.set({'alarmState': true});
    }
});

