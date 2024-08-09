// Retrieve lists from local storage and populate the text areas
chrome.storage.local.get(["yesList", "noList"], function (result) {
  const yesList = result.yesList || [];
  const noList = result.noList || [];

  document.getElementById("yes-list").value = yesList.join("\n");
  document.getElementById("no-list").value = noList.join("\n");
});
