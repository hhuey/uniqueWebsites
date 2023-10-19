// Initialize the visited websites array if it doesn't exist
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get('visitedWebsites', function (data) {
      if (!data.visitedWebsites) {
        chrome.storage.local.set({ visitedWebsites: [] });
      }
    });
  });
  
  // Add a website to the list of visited websites
  function addVisitedWebsite(url) {
    chrome.storage.local.get('visitedWebsites', function (data) {
      const visitedWebsites = data.visitedWebsites || [];
  
      // Ensure the URL is not already in the list before adding it
      if (!visitedWebsites.includes(url)) {
        visitedWebsites.push(url);
  
        // Update the local storage with the updated list
        chrome.storage.local.set({ visitedWebsites }, function () {
          console.log('Visited websites updated:', visitedWebsites);
        });
      }
    });
  }
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'pageLoad') {
      // Extract the URL from the content script's message
      const currentUrl = sender.tab.url;
  
      // Add the visited website to the list
      addVisitedWebsite(currentUrl);
    }
  });
  