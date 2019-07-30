const createDom = (list) => {
  list.forEach(({ title, id, children, parentId, url }) => {

    if (parentId) {
      switch (parentId) {
        case '0': break // todo...
        case '1':
          if (children) {
            const _dom = document.createElement('div')
            _dom.innerHTML = `<fieldset id="bm_${id}">
              <legend>${title}</legend>
            </fieldset>`
            console.log('object', _dom)
            document.getElementById('container').appendChild(_dom)
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
    } else {
      return null
    }
  }
  );
}


window.onload = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  console.log('bookmarks', bookmarks)
  createDom(bookmarks)

}
