const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=T&range=6,10&tags='

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  // 等待class为more的加载更多按钮出现
  await page.waitForSelector('.more')

  for (let i = 0; i < 1; i++) { // 点击一次按钮加载更多
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    const $ = window.$
    let items = $('.list-wp a')
    let links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let $it = $(item)
        let doubanId = $it.find('.cover-wp').data('id')
        let title = $it.find('.title').text()
        let rate = $it.find('.rate').text()
        let poster = $it.find('.pic img').attr('src').replace('s_ratio_poster', 'l_ratio_poster')
        // https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })
  await browser.close()

  // 监听主进程发送的消息
  process.on('message', mess => {
    console.log(mess);
    process.exit(0)
  })
  // 向主进程发送消息
  process.send({result})

})();
