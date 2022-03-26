async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};
  
chrome.tabs.onActivated.addListener(async () => {
    const currentTab = await getCurrentTab();
    console.log(`tab changed to ${currentTab.url}`);
});

chrome.idle.setDetectionInterval(15);

chrome.idle.onStateChanged.addListener((newState) => {
    console.log(`you are ${newState}`);
})