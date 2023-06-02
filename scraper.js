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

/*
----------------------------
AUTO FOLLOW FOLLOWERS
----------------------------
*/
function clickDivsOneByOne() {
  const divs = document.querySelectorAll("div._aacl._aaco._aacw._aad6._aade");
  let index = 0;
  let clickCount = 0;

  function clickNextDiv() {
    if (clickCount >= 3 || index >= divs.length) {
      console.log("Click limit reached or no more divs to click");
      return;
    }

    const div = divs[index];
    console.log(div.innerHTML); // Log the innerHTML value for debugging purposes

    if (div.innerHTML.trim() === "Follow") {
      console.log(div);
      div.click();
      clickCount++;
    }

    index++;
    setTimeout(clickNextDiv, 3000);
  }

  clickNextDiv();
}
/*
----------------------------
AUTO FOLLOW FOLLOWERS/
----------------------------
*/

// Function to check the URL and show/hide the button
function checkURLAndToggleButton() {
  // Check if the URL ends with "/followers/"
  if (window.location.pathname.endsWith("/followers/")) {
    // Create the button if it doesn't exist
    if (!scraperButton) {
      
      // Button For scrape
      scraperButton = document.createElement('button');
      scraperButton.textContent = 'Snag Followers';
      scraperButton.style.display = 'inline'
      scraperButton.style.textAlign = 'center';
      scraperButton.style.zIndex = '9999';
      scraperButton.style.width = '130px';
      scraperButton.style.height = '40px';
      scraperButton.style.color = '#ffffff';
      scraperButton.style.font = 'Arial'
      scraperButton.style.fontWeight = '700'
      scraperButton.style.background = 'rgb(56, 151, 240)';
      scraperButton.style.borderRadius = '8px';
      scraperButton.style.fontSize = '14px';
      scraperButton.style.borderColor = 'rgb(56, 151, 240)';
      scraperButton.style.marginTop = '10px';
      scraperButton.style.marginRight = '20px';
      scraperButton.style.marginLeft = '43px';

      // Button For Follow All
      followerButton = document.createElement('button');
      followerButton.textContent = 'Follow All';
      followerButton.style.display = 'inline'
      followerButton.style.textAlign = 'center';
      followerButton.style.zIndex = '9999';
      followerButton.style.width = '130px';
      followerButton.style.height = '40px';
      followerButton.style.color = '#ffffff';
      followerButton.style.font = 'Arial'
      followerButton.style.fontWeight = '700'
      followerButton.style.background = 'rgb(56, 151, 240)';
      followerButton.style.borderRadius = '8px';
      followerButton.style.fontSize = '14px';
      followerButton.style.borderColor = 'rgb(56, 151, 240)';
      followerButton.style.marginTop = '10px';
      followerButton.style.marginRight = '43px';
      followerButton.style.marginLeft = '20px';
      

      //Button container
      divElement = document.createElement('div');
      divElement.id = 'buttonContainer';
      divElement.style.position = 'fixed';
      divElement.style.top = '20px';
      divElement.style.left = '34vw';
      divElement.style.alignContent = 'center';
      divElement.style.zIndex = '9998';
      divElement.style.width = '30.8vw';
      divElement.style.height = '60px';
      divElement.style.backgroundColor = '#ffffff';
      divElement.style.borderRadius = '8px';


      // Attach a click event listener to the button
      scraperButton.addEventListener('click', function() {
          scrollDivByClassName('_aano');
      });

      followerButton.addEventListener('click', function() {
          clickDivsOneByOne();
      })
      
      
      document.body.appendChild(divElement)
      // Append the button to the document body
      divElement.appendChild(scraperButton);
      divElement.appendChild(followerButton);
    }
  } else {
    // Remove the button if it exists
    if (scraperButton || followerButton) {
      scraperButton.parentNode.removeChild(scraperButton);
      scraperButton = null;

      followerButton.parentNode.removeChild(followerButton);
      followerButton = null;
      divElement.parentNode.removeChild(divElement);
      divElement = null
    }
  }
}

// Variable to hold the button element
var scraperButton = null;
var followerButton = null;
var divElement = null;

// Check the URL initially
checkURLAndToggleButton();

// Check the URL every 3 seconds
setInterval(checkURLAndToggleButton, 1000);
