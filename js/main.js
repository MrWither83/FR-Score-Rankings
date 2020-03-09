const rankingDataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFk1cMN1qqi08Rm6Gj--Z2ygEV0uuVCp0GPCHZGDgGQrz-NtgIpzw-CviDpCNBc-I4KZwlfhspgkK8/pub?output=csv";
let rankingData;

let updateDates;
let lastUpdateDate;
let lastWeekUpdateDate;

let lastUpdateData = [];

let lastUpdateTotalScore;
let totalScoreChange;
let lastUpdateScoreGainTop;


function loadData() {
    Papa.parse(rankingDataUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            rankingData = results;
            init();
        }
    });
}

loadData();

function getPlayerData(name) {
    let playerData = [];
    rankingData.data.forEach(player => {
        if (player["Name"] == name) {
            playerData.push(player);
        }
    });
    return playerData;
}

function getPlayerCurrentRank(playerData) {
    let rank = playerData[playerData.length - 1]["Rank"]
    return rank;
}

function getAllUpdateDates() {
    let dates = []
    rankingData.data.forEach(row => {
        rowDate = row["Date"];
        if (dates.indexOf(rowDate) == -1) {
            dates.push(rowDate);
        }
    });
    return dates;
}

function getTotalScore(date) {
    let totalScore = 0;
    rankingData.data.forEach(row => {
        if (row["Date"] == date) {
            totalScore += row["Score"];
        }
    });
    return Math.round(totalScore * 100) / 100;
}

function getPlayerCount(date) {
    let count = 0;
    rankingData.data.forEach(row => {
        if (row["Date"] == date) {
            count += 1;
        }
    });
    return count;
}

function getLastUpdateScoreGainTop() {
    let scoreGainTop = [];
    for (let i = 0; i < 5; i++) {
        let bestGain = 0;
        let bestGainIndex = 0;

        let currentIndex = 0;
        lastUpdateData.forEach(row => {
            if (row["Score Change"] > bestGain && scoreGainTop.indexOf(row) == -1) {
                bestGain = row["Score Change"];
                bestGainIndex = currentIndex;
            }
            currentIndex++;
        });

        scoreGainTop.push(lastUpdateData[bestGainIndex])
    }
    return scoreGainTop;
}

function loadLastUpdateData() {
    rankingData.data.forEach(row => {
        if (row["Date"] == lastUpdateDate) {
            lastUpdateData.push(row);
        }
    });
}

function updateGeneralStats() {
    lastUpdateDate = updateDates[updateDates.length - 1];
    lastWeekUpdateDate = updateDates[Math.max(updateDates.length - 2, 0)];
    lastUpdateTotalScore = Math.round(getTotalScore(lastUpdateDate));
    totalScoreChange = Math.round(getTotalScore(lastUpdateDate)) - Math.round(getTotalScore(lastWeekUpdateDate));
}

function displayGeneralStats() {
    document.getElementById("playerCount").innerHTML = getPlayerCount(lastUpdateDate) + " Joueurs";
    document.getElementById("lastUpdate").innerHTML = lastUpdateDate;
    document.getElementById("totalScore").innerHTML = lastUpdateTotalScore + " Milliards";
    document.getElementById("totalScoreChange").innerHTML = totalScoreChange + " Milliards";
}

function updateScoreGainTop() {
    lastUpdateScoreGainTop = getLastUpdateScoreGainTop();
}

function displayScoreGainTop() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("player" + i.toString()).innerHTML = lastUpdateScoreGainTop[0]["Name"];
        document.getElementById("playerScore" + i.toString()).innerHTML = lastUpdateScoreGainTop[0]["Score Change"].toString();
    }
}

function init() {
    console.log(rankingData);
    loadTotalScoreChart();

    updateDates = getAllUpdateDates();

    updateGeneralStats();
    displayGeneralStats();

    loadLastUpdateData();
    updateScoreGainTop();
    displayScoreGainTop();
}