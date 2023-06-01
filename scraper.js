/*
    //Instructions
    -/ Copy this code
    -/ Find an account whos followers you want to scrape
    -/ Paste this into the console
    -/ Click on the followers tab
    -/ click the "Snag Usernames" Button
    -/ It will scroll for a bit
    -/ It will download a text file with the usernames
    ---//some stray links may be at the top so be careful
    ---// i think i got them all ignored but you never know
    
    ---//USE AT OWN DISGRESSION
    ---//IM NOT RESPONSIBLE IF YOUR ACCOUNT GETS BANNED
    ---//DONT SUE ME.
    ---//THIS PROJECT IS FOR EDUCATIONAL PURPOSES ONLY

    Instagram Follower Scraper (For now)
    // UP COMING FEATURES
    ---/  Image and video scraping
    ---/  Caption Scraping
    ---/  Followings Scraping
    ---/  Auto DM service
    ---/  Comment scraping per post

    (Plan on making one for twitter and tiktok too)

    plan on making this a chrome extension in the near future

    Designed By Ced
    6/1/2023 2:12 AM
    https://designedbyced.com
    hire me plz.

    Instagram: https://www.instagram.com/call.me.ceddy/
    Twitter: 

    please give stars so future employers think im cool :)
*/


// Function to scroll the div by class name
function scrollDivByClassName(className) {
    // Set the duration for scrolling (in milliseconds)
    var duration = 10000; //CHANGE THIS TO RUN LONGER
  
    // Get the div element that you want to scroll
    var divElements = document.getElementsByClassName(className);
  
    // Check if the div element with the specified class name exists
    if (divElements.length === 0) {
      console.log('No div element found with the class name:', className);
      return;
    }
  
    var divElement = divElements[0]; // Assuming only one div element with the specified class name
  
    // Calculate the start and end time for scrolling
    var startTime = Date.now();
    var endTime = startTime + duration;
  
    // Scroll the div every 100 milliseconds until the end time is reached
    var scrollInterval = setInterval(function() {
      // Calculate the current time
      var currentTime = Date.now();
  
      // Check if the end time is reached
      if (currentTime >= endTime) {
        clearInterval(scrollInterval); // Stop the scrolling
        // Call the function to copy the links
        initiateDownload();
      }
  
      // Scroll the div down by a certain amount
      divElement.scrollTop += 1000; // Adjust the value as needed
    }, 100);
  }
  
  
  // Function to copy the links and initiate download
 // Function to copy the links
// Function to copy the links
function copyLinks() {
    var links = document.querySelectorAll('a');
    var hrefSet = new Set(); // Use Set to store unique href values
  
    var repetitiveString = 'https://www.instagram.com/';
    var substringsToSkip = ['/p/', '/explore/', '/reels/', '/direct/', '/followers/', '/tagged/', '/following/', 'https://about', 'https://l.instagram', 'about/jobs', 'https://help', 'legal/privacy', 'https://developers', 'legal/terms', 'directory/profiles', 'web/lite', 'https://l.', 'https://developers', 'https://about.','accounts/edit','/saved'];
  
    for (var i = 0; i < links.length; i++) {
      var href = links[i].href;
  
      var shouldSkip = substringsToSkip.some(function(substring) {
        return href.includes(substring);
      });
  
      if (shouldSkip) {
        continue;
      }
  
      var modifiedHref = href.replace(repetitiveString, '');
      modifiedHref = modifiedHref.slice(0, -1);
  
      hrefSet.add(modifiedHref); // Add href to Set
    }
  
    // Convert Set back to an array
    var modifiedHrefArray = Array.from(hrefSet);
    return modifiedHrefArray;
  }
  
  // Function to initiate the download
  function initiateDownload() {
    var modifiedHrefArray = copyLinks();
  
    var fileName = window.location.pathname;
    var fileContent = modifiedHrefArray.join('\n');
    var blob = new Blob([fileContent], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName + '.txt';
    downloadLink.click();
    URL.revokeObjectURL(url);
    downloadLink.remove();
  }
  
  // Function to check the URL and show/hide the button
  function checkURLAndToggleButton() {
    // Check if the URL ends with "/followers/"
    if (window.location.pathname.endsWith("/followers/")) {
      // Create the button if it doesn't exist
      if (!button) {
        button = document.createElement('button');
        button.textContent = 'Scroll Div';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
  
        // Attach a click event listener to the button
        button.addEventListener('click', function() {
          scrollDivByClassName('_aano');
        });
  
        // Append the button to the document body
        document.body.appendChild(button);
      }
    } else {
      // Remove the button if it exists
      if (button) {
        button.parentNode.removeChild(button);
        button = null;
      }
    }
  }
  
  // Variable to hold the button element
  var button = null;
  
  // Check the URL initially
  checkURLAndToggleButton();
  
  // Check the URL every 3 seconds
  setInterval(checkURLAndToggleButton, 3000);