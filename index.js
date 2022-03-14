const PORT = process.env.PORT || 3000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const app = express()

const nigerian = [{
    name: 'vanguard',
    address: 'https://www.vanguardngr.com',
    base: 'www.vanguardngr.com'

    // TODO add more website for better scrapping and to get more result (nigerian news)
}]

const articles = []

nigerian.forEach(news => {
    axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("latest news")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr(href)

                articles.push({
                    title,
                    url: news.base + url,
                    source: news.name
                })
            })
        })
})

app.get('/', (req, res) => {
    res.json('Welcome to the Nigerian News Scraper (NNS).')
})