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

document.getElementById("skip").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "skip" });
});

document.getElementById("reset").addEventListener("click", function () {
  chrome.storage.local.remove(
    ["urls", "yesList", "noList", "skipList"],
    function () {
      //   document.getElementById("status").textContent =
      // "All data has been reset!";
      document.getElementById("urlInput").value = "";
      document.getElementById("skip").style.display = "none";
      document.getElementById("reset").style.display = "none";
    }
  );
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentTabUrl = new URL(tabs[0].url).hostname; // Extract hostname from URL

  chrome.storage.local.get(["urls"], function (result) {
    const storedUrls = result.urls || [];
    const isInStorage = storedUrls.some(
      (url) => new URL(url).hostname === currentTabUrl
    );

    if (isInStorage) {
      document.getElementById("skip").style.display = "block";
    } else {
      document.getElementById("skip").style.display = "none";
    }
  });
});

chrome.storage.local.get(["urls"], function (result) {
  const urls = result.urls || [];
  const resetButton = document.getElementById("reset");
  if (urls.length > 0) {
    resetButton.style.display = "block";
  } else {
    resetButton.style.display = "none";
  }
});
