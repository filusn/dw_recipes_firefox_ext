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
   * At "add" command, remove all existing url texts,
   * get current url, create and style P element, 
   * then insert the element into the document.
   */
  function addURL() {
    removeExistingURLs();
    let currentURL = window.location.href;
    let urlP = document.createElement("p");
    urlP.style.height = "100vh";
    urlP.style.fontSize = "20px";
    urlP.innerHTML = currentURL;
    urlP.className = "url-text";
    document.body.appendChild(urlP);
    browser.runtime.sendMessage({"command": "add", "url": currentURL});
  }

  /**
   * Remove every added text from the page.
   */
  function removeExistingURLs() {
    let existingURLs = document.querySelectorAll(".url-text");
    for (let url of existingURLs) {
      url.remove();
    }
    browser.runtime.sendMessage({"command": "reset", "url": ""});
  }

  function removeURL() {
    let currentURL = window.location.href;
    browset.runtime.sendMessage({"command": "remove", "url": currentURL});
  }

  function generateList() {
    browser.runtime.sendMessage({"command": "generate", "url": ""});
  }

  /**
   * Listen for messages from the background script.
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "add") {
      addURL();
    } else if (message.command === "remove") {
      removeURL();
    } else if (message.command === "generate") {
      generateList();
    } else if (message.command === "reset") {
      removeExistingURLs();
    }
  });

})();