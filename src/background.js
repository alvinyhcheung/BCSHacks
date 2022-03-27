importScripts("alarmScripts.js");
const MAXTIME = 5;
const DEFAULT_BLACKLIST = ["reddit.com", "instagram.com", "facebook.com"];
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

const DEFAULT_LINKS = [
    `https://i.imgur.com/CyWTP3S.jpg`,
    `https://i.imgur.com/7uGzZ8A.jpg`,
    `https://i.imgur.com/W7YSWlz.jpg`,
    `https://i.imgur.com/M3djSgP.jpg`
];

function randomLink(e) {
    chrome.storage.sync.get({'storedLinks': DEFAULT_LINKS}, (data) => {
        var link = data.storedLinks[Math.floor(Math.random()*data.storedLinks.length)];
        console.log(link);
        chrome.tabs.create({url: link});
    })
}

function alarmOn() {
	console.log("in on handler");
	chrome.alarms.create("myAlarm", {
		delayInMinutes: 0.1,
		periodInMinutes: 0.01,
	});
}

function alarmOff() {
	console.log("in off handler");
	chrome.alarms.clear("myAlarm");

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
            title : 'This is a scheduled interrupt',
            message : 'Click this message to be redirected',
            iconUrl : 'icon.png',
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
        randomLink();
        notification("in big trouble mister");         
        timer = 0;
    }
});

chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener(async (newState) => {
    // notification(newState);
    
    console.log(`you are ${newState}`);

    const currentTab = await getCurrentTab();

    if (newState === 'idle') {
        chrome.storage.sync.set({'alarmState': false}); 
        timer = 0;
    } else {
    
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
                // do nothing 
                //console.log("turned off");
                //chrome.storage.sync.set({'alarmState': false}); 
            }
        })
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    console.log(changes);
    if (area === 'sync' && changes.alarmState) {
        changes.alarmState.newValue? alarmOn(): alarmOff();
    }
})

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.sync.get({'blackList': DEFAULT_BLACKLIST}, (data)=> {
            if (data.blackList.some((blockedURL) => {
                console.log(blockedURL);
                return changeInfo.url.includes(blockedURL);
            })) {
                chrome.storage.sync.get({'alarmState': false} , (data) => {
                    if (!data.alarmState) {
                        chrome.storage.sync.set({'alarmState': true}); 
                    }
                })
            } else {
                chrome.storage.sync.get({'alarmState': false} , (data) => {
                    if (data.alarmState) {
                        chrome.storage.sync.set({'alarmState': false}); 
                    }
                })
            }
        })
    }
})

