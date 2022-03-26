function redirectHandler(e) {
    chrome.tabs.create({url: "https://google.com"});
    window.close(); // Note: window.close(), not this.close()
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('google').addEventListener('click', redirectHandler);
});