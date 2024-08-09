document.getElementById("start").addEventListener("click", function () {
  const urlInput = document.getElementById("urlInput").value;
  if (urlInput) {
    const urls = urlInput
      .split(/\s+/)
      .map((url) => url.trim())
      .filter((url) => url);

    chrome.storage.local.set({ urls: urls }, function () {
      document.getElementById("status").textContent =
        "URLs added and classification started!";

      chrome.runtime.sendMessage({ action: "start" });
      document.getElementById("urlInput").value = "";
    });
  } else {
    document.getElementById("status").textContent = "Please enter some URLs.";
  }
});
