// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

const url = 'http://api.douban.com/v2/movie/subject/'
async function fetchMovie(item) {
  const apiUrl = `${url}/${item.doubanId}`
  const res = await rp(apiUrl)
  return res
};
(async () => {
  let movies = [
    {
      doubanId: 4920528,
      title: '那些年，我们一起追的女孩',
      rate: '8.1',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1062824805.jpg'
    }, {
      doubanId: 2131459,
      title: '机器人总动员',
      rate: '9.3',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1461851991.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.summary);
    } catch (err) {
      console.log(err)
    }
  })
})()
