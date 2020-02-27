/**
 * CSS to hide everything on the page,
 * except for elements that have the "url-text" class.
 */
const hidePage = `body > :not(.url-text) {
                    display: none;
                  }`;

function logTabs(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
    console.log(tab.url);
}
				  
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Add":
          return "Adding";
        case "Remove":
          return "Removing";
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function add(tabs) {
      browser.tabs.insertCSS({code: hidePage}).then(() => {
        let url = beastNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "add",
          beastURL: url
        });
      });
    }

    function remove(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "remove",
        });
      });
    }
    
    function generate(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "generate",
        });
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not recipy: ${error}`);
    }

    /**
     * Get the active tab,
     * then call appropriate function.
     */
    if (e.target.classList.contains("add")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(add)
        .catch(reportError);
    }
    else if (e.target.classList.contains("remove")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(remove)
        .catch(reportError);
    }
    else if (e.target.classList.contains("generate")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(generate)
        .catch(reportError);
    }    
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute recipy content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/recipy.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
