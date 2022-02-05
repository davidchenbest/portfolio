const express = require('express');
const routes = express.Router()
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const config = require('../config')

// const testdata = require('../../testData.json')

routes.get('/score', async (req, res) => {
    const url = config.nba.url.score
    const response = await fetch(url)
    const data = await response.json()
    // req.json(testdata)
    res.json(data)
})

routes.get('/standings', async (req, res) => {
    const keys = config.nba.standingKeys
    const url = config.nba.url.standing
    let data = await fetch(url)
    data = await data.text()
    const $ = cheerio.load(data);
    const rows = $('.TableBase-bodyTr')
    const standings = new Array(rows.length)
    for (let j = 0; j < rows.length; j++) {
        const teamData = {}
        const row = rows[j];
        const tds = $(row).find('td')
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            teamData[key] = $(tds[i]).text().trim()
        }
        standings[j] = teamData
    }
    res.json({ standings: { east: standings.slice(0, standings.length / 2), west: standings.slice(standings.length / 2) } })
})


module.exports = routes