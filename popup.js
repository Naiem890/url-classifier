document.getElementById("start").addEventListener("click", function () {
  const urlInput = document.getElementById("urlInput").value;
  if (urlInput) {
    // Process the URLs from input
    const urls = urlInput
      .split(/\s+/)
      .map((url) => url.trim())
      .filter((url) => url);

    // Save new URLs to local storage, replacing any existing ones
    chrome.storage.local.set({ urls: urls }, function () {
      // Update the status
      document.getElementById("status").textContent =
        "URLs added and classification started!";

      // Start the classification process
      chrome.runtime.sendMessage({ action: "start" });
      // Clear the input field
      document.getElementById("urlInput").value = "";
    });
  } else {
    // Handle case when no URLs are provided
    document.getElementById("status").textContent = "Please enter some URLs.";
  }
});
