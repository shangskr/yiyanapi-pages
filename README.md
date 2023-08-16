# yiyanapi-pages
一言api-workers部署

## 你可以用replit部署，不过多解释了！

## 用cloudflare的workers部署，自行绑定域名，workers.js的内容改为

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname === '/') {
    const docResponse = await fetch('https://raw.githubusercontent.com/shangskr/yiyanapi-pages/main/public/index.html')
    const docContent = await docResponse.text()

    return new Response(docContent, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }

  if (url.pathname === '/api/yiyan') {
    const yiyanResponse = await fetch('https://raw.githubusercontent.com/shangskr/yiyanapi-pages/main/yiyan.txt')
    const yiyanText = await yiyanResponse.text()
    const yiyanLines = yiyanText.split('\n')
    const randomIndex = Math.floor(Math.random() * yiyanLines.length)
    const randomYiyan = yiyanLines[randomIndex]

    return new Response(randomYiyan, {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    })
  }

  return new Response('Not Found', { status: 404 })
}

## 最后保存，然后用GET或者POST请求（body）就可以了，建议用GET
