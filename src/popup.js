const DEFAULT_LINKS = [
    `https://placekitten.com/${(Math.floor(Math.random()*10)+1) * 100}/${(Math.floor(Math.random()*10)+1) * 100}`,
    `https://placedog.net/${(Math.floor(Math.random()*10)+1) * 100}`
]

function randomLink(e) {
    chrome.storage.sync.get({'storedLinks': DEFAULT_LINKS}, (data) => {
        var link = data.storedLinks[Math.floor(Math.random()*data.storedLinks.length)];
        console.log(link);
        chrome.tabs.create({url: link});
    })
}

function addLinks(e) { 
    const url = document.getElementById('linkInput').value;
    chrome.storage.sync.get({'storedLinks': DEFAULT_LINKS}, (data) => {
        storedLinks = data.storedLinks;

        if (url!= '') {
            if (storedLinks) {
                storedLinks.push(url);
            } else {
                storedLinks = [url];
            }
        }
        chrome.storage.sync.set({'storedLinks':storedLinks});

        console.log(storedLinks);
    })
    //window.close();

}

function resetLinks (e) {
    chrome.storage.sync.clear();
    console.log(`storage reset`);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('redirect').addEventListener('click', randomLink);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLink').addEventListener('click', addLinks);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resetLinks').addEventListener('click', resetLinks);
});

