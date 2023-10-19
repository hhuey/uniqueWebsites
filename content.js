// Listen for page load events
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'pageLoad') {
    // Extract the current URL
    const currentUrl = window.location.href;

    // Store the URL in Chrome's local storage
    chrome.storage.local.get('visitedWebsites', function (data) {
      const visitedWebsites = data.visitedWebsites || [];
      
      // Ensure the URL is not already in the list before adding it
      if (!visitedWebsites.includes(currentUrl)) {
        visitedWebsites.push(currentUrl);
      }

      // Update the local storage with the updated list
      chrome.storage.local.set({ visitedWebsites }, function () {
        console.log('Visited websites updated:', visitedWebsites);
      });
    });
  }
});

// Send a message to the background script when the page loads
chrome.runtime.sendMessage({ message: 'pageLoad' });
