// Function to display the number of unique websites
function displayUniqueWebsiteCount() {
    chrome.storage.local.get('visitedWebsites', function (data) {
      const visitedWebsites = data.visitedWebsites || [];
      const uniqueWebsites = new Set(visitedWebsites);
      const uniqueWebsiteCount = uniqueWebsites.size;
  
      const uniqueWebsiteCountElement = document.getElementById('unique-website-count');
      uniqueWebsiteCountElement.textContent = uniqueWebsiteCount;
    });
  }
  
  // Call the function to display the count when the popup is opened
  displayUniqueWebsiteCount();
  
  