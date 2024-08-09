let urls = [];
let index = 0;
let yesList = [];
let noList = [];
let skipList = [];
let currentTabId = null;

function startClassification() {
  chrome.storage.local.get(["urls"], function (result) {
    urls = result.urls || [];
    index = 0;
    yesList = [];
    noList = [];
    let skipList = [];
    if (urls.length > 0) {
      loadNextURL();
    }
  });
}

function loadNextURL() {
  if (index < urls.length) {
    if (currentTabId !== null) {
      chrome.tabs.remove(currentTabId, function () {
        createAndOpenNextTab();
      });
    } else {
      createAndOpenNextTab();
    }
  } else {
    chrome.tabs.remove(currentTabId);
    chrome.storage.local.set(
      { yesList: yesList, noList: noList, skipList: skipList },
      function () {
        chrome.tabs.create({ url: chrome.runtime.getURL("results.html") });
      }
    );
  }
}

function createAndOpenNextTab() {
  chrome.tabs.create({ url: urls[index], active: true }, function (tab) {
    currentTabId = tab.id; // Store the current tab ID
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (tabId === currentTabId && changeInfo.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "classify") {
    if (message.result === "yes") {
      yesList.push(urls[index]);
    } else {
      noList.push(urls[index]);
    }
    index++;
    loadNextURL();
  } else if (message.action === "skip") {
    skipList.push(urls[index]);
    index++;
    loadNextURL();
  } else if (message.action === "start") {
    startClassification();
  }
});
