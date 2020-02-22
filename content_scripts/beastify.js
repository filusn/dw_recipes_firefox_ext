(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * At "add" command, remove all existing beasts,
   * get current url, create and style P element, 
   * then insert the element into the document.
   */
  function getURL() {
    removeExistingBeasts();
    let currentURL = window.location.href;
    let urlP = document.createElement("p");
    urlP.style.height = "100vh";
    urlP.style.fontSize = "20px";
    urlP.innerHTML = currentURL;
    document.body.appendChild(urlP)
  }

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    let beastImage = document.createElement("p");
	let url = window.location.href;
	beastImage.innerHTML = url;
    // beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    } else if (message.command === "add") {
      getURL();
    }
  });

})();