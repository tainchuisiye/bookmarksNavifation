chrome.runtime.onInstalled.addListener(function () {
  if (!localStorage.getItem('bookmarks')) {
    chrome.bookmarks.getTree((list) => {
      localStorage.setItem('bookmarks', JSON.stringify(list))
    })
  }
});
