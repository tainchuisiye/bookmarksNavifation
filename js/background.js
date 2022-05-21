chrome.runtime.onInstalled.addListener(function (e) {
  console.log(e)

  if (!localStorage.getItem('bookmarks')) {
    chrome.bookmarks.getTree((list) => {
      localStorage.setItem('bookmarks', JSON.stringify(list))
    })
  }
});

chrome.commands.onCommand.addListener(function (cmd) {
  console.log(cmd)
  if (cmd == 'openNav') {
     console.log(cmd)
     window.open('./html/nav')
  }
})

window.addEventListener('keydown',(e)=>{
  var keyCode = e.code;
  var ctrlKey = e.ctrlKey || e.metaKey;
  if(ctrlKey && keyCode===66){
    createDom(bookmarks);
  }
})


console.log('this is the bookmarks navigation!')
