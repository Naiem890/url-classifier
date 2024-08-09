chrome.storage.local.get(["yesList", "noList", "skipList"], function (result) {
  const yesList = result.yesList || [];
  const noList = result.noList || [];
  const skipList = result.skipList || [];

  document.getElementById("yes-list").value = yesList.join("\n");
  document.getElementById("no-list").value = noList.join("\n");
  document.getElementById("skip-list").value = skipList.join("\n");
});
