chrome.storage.local.get(["urls"], function (result) {
  const currentURL = window.location.href;
  const urls = result.urls || [];

  // Check if the current URL is in the stored URLs list
  if (urls.includes(currentURL)) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "y" || event.key === "Y") {
        chrome.runtime.sendMessage({ action: "classify", result: "yes" });
      } else if (event.key === "o" || event.key === "O") {
        chrome.runtime.sendMessage({ action: "classify", result: "no" });
      }
    });
  }
});
