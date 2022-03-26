function randomLink(e) {
    chrome.storage.sync.get('storedLinks', (data) => {
        var link = data.storedLinks[Math.floor(Math.random()*data.storedLinks.length)];
        console.log(link);
        chrome.tabs.create({url: link});
        //window.close(); // Note: window.close(), not this.close()
    })
}

function addLinks(e) { 
    const url = document.getElementById('linkInput').value;
    //chrome.storage.sync.clear();
    chrome.storage.sync.get('storedLinks', (data) => {
        //console.log(data);
        storedLinks = data.storedLinks;
        if (storedLinks) {
            storedLinks.push(url);
        } else {
            storedLinks = [url];
        }
        console.log(storedLinks);

        chrome.storage.sync.set({'storedLinks':storedLinks});  
    })
    //window.close();
}

function resetLinks (e) {
    chrome.storage.sync.clear();
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

