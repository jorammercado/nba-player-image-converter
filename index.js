const playerImageSource = require("./playerImageSource.json")
const fs = require('fs')

const resultPlayers = []
const names = []
const duplicateNames = []
let formatResultSQLPlayers = ""
let index = 0

for (let i = 0; i < playerImageSource.length; i++) {

    let { NBAName, NBABirthDate, NBAID } = playerImageSource[i]

    if (NBAName === "NA")
        continue

    NBAName = NBAName.replace(/['`]/g, "''").replace(/[.]/g, "").toLowerCase()
    resultPlayers.push({ NBAName, NBABirthDate, NBAID })

    if (names.includes(NBAName)) {
        duplicateNames.push(NBAName)
    }

    formatResultSQLPlayers += `('${resultPlayers[index].NBAName}', '${resultPlayers[index].NBABirthDate}'` +
        `, 'https://cdn.nba.com/headshots/nba/latest/1040x760/${resultPlayers[index].NBAID}.png'),\n`
    index++
    names.push(NBAName)
}

console.log(duplicateNames)
console.log(duplicateNames.length)

fs.writeFile('OutputSQLPlayersImage.sql', formatResultSQLPlayers, (err) => {
    if (err) throw err
})