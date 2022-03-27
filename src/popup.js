const DEFAULT_LINKS = [
    `https://placekitten.com/${(Math.floor(Math.random()*10)+1) * 100}/${(Math.floor(Math.random()*10)+1) * 100}`,
    `https://placedog.net/${(Math.floor(Math.random()*10)+1) * 100}`
];

const DEFAULT_BLACKLIST = ["reddit.com", "instagram.com", "facebook.com"];

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
        let storedLinks = data['storedLinks'];

        if (url !=  '') {
            if (storedLinks) {
                storedLinks.push(url);
            } else {
                storedLinks = [url];
            }
        }
        chrome.storage.sync.set({'storedLinks':storedLinks});

        console.log(storedLinks);
    })
    document.getElementById('linkInput').value = '';
    //window.close();

}


function addInterrupt(e) { 
    const url = document.getElementById('linkInput').value;
    chrome.storage.sync.get({'blackList': DEFAULT_BLACKLIST}, (data) => {
        let newblacklist = data['blackList'];

        if (url !=  '') {
            if (newblacklist) {
                newblacklist.push(url);
            } else {
                newblacklist = [url];
            }
        }
        chrome.storage.sync.set({'blackList':newblacklist});

        console.log(newblacklist);
    })
    document.getElementById('linkInput').value = '';
    //window.close();
}



function resetLinks (e) {
    chrome.storage.sync.clear();
    console.log(`storage reset`);
}

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('redirect').addEventListener('click', randomLink);
// });

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLink').addEventListener('click', addLinks);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resetLinks').addEventListener('click', resetLinks);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitInterrupt').addEventListener('click', addInterrupt);
});

