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

chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener((newState) => {
    notification(newState);
    console.log(`you are ${newState}`);
});

var timer = 0;
chrome.alarms.onAlarm.addListener(function (alarm) {
	timer = timer + 1;
	console.log(`The timer is now: ${timer}`);
});
