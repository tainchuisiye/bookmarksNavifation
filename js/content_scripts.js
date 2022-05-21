let isOpenKeyMapString = localStorage.getItem('isOpenKeyMap')
const classNameMap = { '1': 'middle', '2': ' full', '3': 'small' }
const classNameMap1 = { '1': 'glyphicon-unchecked', '2': ' glyphicon-resize-small', '3': ' glyphicon-resize-full', }
const createDom = (list) => {

  let isOpenKeyMap = JSON.parse(isOpenKeyMapString) || {}
  list.forEach(({ title, id, children, parentId, url }) => {

    if (parentId) {
      switch (parentId) {
        case '0': break // todo...
        case '1':
          if (children) {
            if (!isOpenKeyMap[title]) {
              isOpenKeyMap[title] = '1'
            }
            const _dom = document.createElement('div')
            _dom.innerHTML = `<fieldset id="bm_${id}" class="${classNameMap[isOpenKeyMap[title]]}">
              <legend>${title}</legend>
              <span tag="${title}" id="${id}"  class="glyphicon ${classNameMap1[isOpenKeyMap[title]]}" aria-hidden="true"></span>
            </fieldset>`

            document.getElementById('container').appendChild(_dom)
            localStorage.setItem('isOpenKeyMap', JSON.stringify(isOpenKeyMap))
          }
          break;
        default:
          if (url) {
            const _link = document.createElement('a')
            _link.className = "btn btn-default"
            _link.innerText = title;
            _link.href = url
            _link.target = "_blank"
            _link.title = title + '--' + url

            try {
              document.getElementById('bm_' + parentId).appendChild(_link)
            } catch (error) {
              console.log('parentId', parentId)
            }

          }

      }
    }
  
    if (children) {
      return createDom(children)
    }
    return null
  }
  );
}




window.onload = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  if (bookmarks && location.protocol === 'chrome-extension:') {
    createDom(bookmarks);
    document.querySelectorAll('.glyphicon').forEach(item => {
      item.addEventListener('click', (e) => {
        let isOpenKeyMap = JSON.parse(localStorage.getItem('isOpenKeyMap'))
        const tagName = e.target.getAttribute('tag');
        // if (isOpenKeyMap[tagName]) {
        //   item.className = 'glyphicon glyphicon-resize-full'
        // }
        if (isOpenKeyMap[tagName] < 3) {
          isOpenKeyMap[tagName] = (parseInt(isOpenKeyMap[tagName]) || 0) + 1 + ''
        } else {
          isOpenKeyMap[tagName] = '1'
        }
        item.className = `glyphicon ${classNameMap1[isOpenKeyMap[tagName]]}`
        document.getElementById('bm_' + e.target.id).className = `${classNameMap[isOpenKeyMap[tagName]]}`

        localStorage.setItem('isOpenKeyMap', JSON.stringify(isOpenKeyMap))
      })
    })
  }

}
