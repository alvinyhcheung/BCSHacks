function randomLink(e) {
    chrome.storage.sync.get('storedLinks', (data) => {
        var link = data.storedLinks[Math.floor(Math.random()*data.storedLinks.length)];
        chrome.tabs.create({url: "https://google.com"});
        window.close(); // Note: window.close(), not this.close()
    })
}

function addLink(e) { 
    console.log()
    chrome.storage.sync.clear();
    chrome.storage.sync.get('storedLinks', (data) => {
        storedLinks = data.storedLinks;
        if (storedLinks) {
            storedLinks.push(e.targetvalue);
        } else {
            storedLinks = [e.targetvalue];
        }
        console.log(storedLinks);

        chrome.storage.sync.set({'storedLinks':storedLinks});  
    })
    //window.close();
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('redirect').addEventListener('click', randomLink);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLink').addEventListener('click', addLink);
});
